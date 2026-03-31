// Supabase migration layer:
// - `internal_users`, `staff`, and `prospects` now use Supabase as primary.
// - localStorage remains as cache/fallback for graceful offline behavior.
// - all other entities still use localStorage until later migrations.
(function initDataService(globalScope) {
  const STORAGE_KEYS = {
    prospects: "venezia-one-v2-prospectos",
    students: "venezia-one-v2-altas",
    attendance: "venezia-one-v2-asistencias",
    payments: "venezia-one-v2-pagos",
    financialMovements: "venezia-one-v2-finanzas",
    studentPortalAccess: "venezia-one-v2-student-access",
    internalUsers: "venezia-one-v2-internal-users",
    staff: "venezia-one-v2-staff",
    webRequests: "venezia-one-v2-web-requests",
    webSettings: "venezia-one-v2-web-settings",
    internalSession: "venezia-one-v2-internal-session",
    studentSession: "venezia-one-v2-mi-venezia-session",
  };

  function getStorage() {
    return globalScope.localStorage;
  }

  function readCollection(key, fallbackFactory) {
    try {
      const stored = getStorage().getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }

      const fallback = fallbackFactory ? fallbackFactory() : [];
      getStorage().setItem(key, JSON.stringify(fallback));
      return fallback;
    } catch (error) {
      console.error(`No se pudo cargar ${key}:`, error);
      return fallbackFactory ? fallbackFactory() : [];
    }
  }

  function writeCollection(key, value) {
    getStorage().setItem(key, JSON.stringify(value));
    return value;
  }

  function removeValue(key) {
    getStorage().removeItem(key);
  }

  function toSnakeCaseRecord(record) {
    return Object.entries(record).reduce((accumulator, [key, value]) => {
      const snakeKey = key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
      accumulator[snakeKey] = value;
      return accumulator;
    }, {});
  }

  function toCamelCaseRecord(record) {
    return Object.entries(record).reduce((accumulator, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
      accumulator[camelKey] = value;
      return accumulator;
    }, {});
  }

  function createLocalEntityService(key) {
    return {
      key,
      getAll(fallbackFactory) {
        return readCollection(key, fallbackFactory);
      },
      setAll(records) {
        return writeCollection(key, records);
      },
      clear() {
        removeValue(key);
      },
    };
  }

  function createSupabaseEntityService({
    key,
    table,
    orderBy,
    fallbackFactory,
    toDb,
    fromDb,
    uiLabel,
    hydrateEmptyFromFallback = true,
  }) {
    const localService = createLocalEntityService(key);

    function getSupabaseErrorMessage(error) {
      if (!error) {
        return "Error desconocido de Supabase.";
      }

      return error.message || error.details || error.hint || error.code || String(error);
    }

    async function selectAllFromSupabase() {
      const client = globalScope.VeneziaSupabase?.client;
      if (!client) {
        throw new Error(`Supabase client unavailable for ${table}`);
      }

      let query = client.from(table).select("*");
      if (orderBy) {
        query = query.order(orderBy, { ascending: false });
      }

      const { data, error } = await query;
      if (error) {
        throw error;
      }

      return (data || []).map(fromDb);
    }

    async function upsertManyToSupabase(records) {
      const client = globalScope.VeneziaSupabase?.client;
      if (!client) {
        throw new Error(`Supabase client unavailable for ${table}`);
      }

      const payload = records.map(toDb);
      const { data, error } = await client
        .from(table)
        .upsert(payload, { onConflict: "id" })
        .select();

      if (error) {
        throw error;
      }

      return {
        records: (data || []).map(fromDb),
        data: data || [],
        payload,
      };
    }

    return {
      key,
      table,
      // Supabase-first read with localStorage cache fallback.
      async getAllPrimary(fallbackFactoryOverride) {
        const activeFallbackFactory = fallbackFactoryOverride || fallbackFactory;
        try {
          const remoteRecords = await selectAllFromSupabase();

          if (remoteRecords.length === 0) {
            const fallbackRecords = localService.getAll(activeFallbackFactory);
            if (hydrateEmptyFromFallback && fallbackRecords.length > 0) {
              await upsertManyToSupabase(fallbackRecords);
            }
            localService.setAll(fallbackRecords);
            return fallbackRecords;
          }

          localService.setAll(remoteRecords);
          return remoteRecords;
        } catch (error) {
          console.error(`Fallo Supabase en ${table}, usando cache local.`, error);
          return localService.getAll(activeFallbackFactory);
        }
      },
      getAll(fallbackFactoryOverride) {
        return localService.getAll(fallbackFactoryOverride || fallbackFactory);
      },
      async setAll(records) {
        localService.setAll(records);
        try {
          if (table === "student_portal_profiles") {
            console.log("portal payload", records.map(toDb));
          }
          const response = await upsertManyToSupabase(records);
          if (table === "student_portal_profiles") {
            console.log("portal success", response.data);
          }
        } catch (error) {
          console.error(`No se pudo sincronizar ${table} hacia Supabase.`, error);
          if (table === "student_portal_profiles") {
            console.error("portal error", error);
          }
          if (uiLabel) {
            globalScope.alert(`No se pudo sincronizar ${uiLabel} con Supabase.`);
          }
        }
        return records;
      },
      // Supabase mutation path for migrated entities.
      async upsertOne(record, options = {}) {
        const existingRecords = localService.getAll(fallbackFactory);
        const hadExistingRecord = existingRecords.some((item) => item.id === record.id);
        const payload = [toDb(record)];
        const operationLabel = hadExistingRecord ? "update" : "insert";

        try {
          if (table === "prospects" || table === "staff" || table === "students") {
            console.log(`Supabase payload for "${table}" ${operationLabel}:`, payload[0]);
          }

          const response = await upsertManyToSupabase([record]);
          console.log(`Supabase response for "${table}" ${operationLabel}:`, response.data);
          if (table === "students" && response.records.length === 0) {
            throw new Error('Supabase upsert to "students" returned no rows.');
          }

          const syncedRecord = response.records[0] || record;
          localService.setAll(
            mergeRecord(localService.getAll(fallbackFactory), syncedRecord)
          );
          return {
            record: syncedRecord,
            synced: true,
            error: null,
            response: response.data,
          };
        } catch (error) {
          console.error(`Supabase ${operationLabel} failed for ${table}. Full error:`, error);
          console.error(`Supabase ${operationLabel} message for ${table}:`, getSupabaseErrorMessage(error));
          localService.setAll(mergeRecord(existingRecords, record));
          if (uiLabel && options.alertOnFailure !== false) {
            globalScope.alert(`No se pudo guardar ${uiLabel} en Supabase.`);
          }
          return {
            record,
            synced: false,
            error,
            response: null,
          };
        }
      },
      async deleteOne(id, options = {}) {
        const existingRecords = localService.getAll(fallbackFactory);
        const nextRecords = existingRecords.filter((record) => record.id !== id);

        try {
          const client = globalScope.VeneziaSupabase?.client;
          if (!client) {
            throw new Error(`Supabase client unavailable for ${table}`);
          }

          const { error } = await client.from(table).delete().eq("id", id);
          if (error) {
            throw error;
          }
          localService.setAll(nextRecords);
        } catch (error) {
          console.error(`No se pudo eliminar en ${table}. Full error:`, error);
          console.error(`No se pudo eliminar en ${table}. Message:`, getSupabaseErrorMessage(error));
          localService.setAll(existingRecords);
          if (uiLabel && options.alertOnFailure !== false) {
            globalScope.alert(`No se pudo eliminar ${uiLabel} en Supabase.`);
          }
          return {
            records: existingRecords,
            synced: false,
            error,
          };
        }

        return {
          records: nextRecords,
          synced: true,
          error: null,
        };
      },
      clear() {
        removeValue(key);
      },
    };
  }

  function mergeRecord(records, nextRecord) {
    const existingIndex = records.findIndex((record) => record.id === nextRecord.id);
    if (existingIndex >= 0) {
      const updated = [...records];
      updated[existingIndex] = nextRecord;
      return updated;
    }

    return [nextRecord, ...records];
  }

  function toNullableDateValue(value) {
    const normalized = String(value || "").trim();
    return normalized || null;
  }

  function toNullableTimestampValue(value) {
    const normalized = String(value || "").trim();
    return normalized || null;
  }

  function toNullableNumberValue(value) {
    const normalized = String(value ?? "").trim();
    if (!normalized) {
      return null;
    }

    const numericValue = Number(normalized.replace(/,/g, ""));
    return Number.isFinite(numericValue) ? numericValue : null;
  }

  function extractAltaMetadata(notes, label) {
    const source = String(notes || "");
    const segments = source.split(" | ");
    const targetSegment = segments.find((segment) => segment.startsWith(`${label}: `));
    return targetSegment ? targetSegment.slice(label.length + 2).trim() : "";
  }

  function extractProspectMetadata(notes, label) {
    return extractAltaMetadata(notes, label);
  }

  function stripProspectMetadata(notes) {
    const source = String(notes || "");
    if (!source) {
      return "";
    }

    return source
      .split(" | ")
      .filter(
        (segment) =>
          segment &&
          !segment.startsWith("Próximo seguimiento: ") &&
          !segment.startsWith("Asesora asignada: ") &&
          !segment.startsWith("Temperatura: ")
      )
      .join(" | ")
      .trim();
  }

  function buildProspectNotes(record) {
    const segments = [];
    const baseNotes = stripProspectMetadata(record.notas || "");

    if (baseNotes) {
      segments.push(baseNotes);
    }

    if (record.proximoSeguimiento) {
      segments.push(`Próximo seguimiento: ${record.proximoSeguimiento}`);
    }

    if (record.asesoraAsignada) {
      segments.push(`Asesora asignada: ${record.asesoraAsignada}`);
    }

    if (record.temperatura) {
      segments.push(`Temperatura: ${record.temperatura}`);
    }

    return segments.join(" | ");
  }

  const prospectsFallbackFactory = () => [];
  const internalUsersFallbackFactory = () => [];
  const staffFallbackFactory = () => [];
  const studentsFallbackFactory = () => [];
  const attendanceFallbackFactory = () => [];
  const paymentsFallbackFactory = () => [];
  const financeFallbackFactory = () => [];
  const studentPortalProfilesFallbackFactory = () => [];

  const studentsEntityService = createSupabaseEntityService({
    key: STORAGE_KEYS.students,
    table: "students",
    orderBy: "created_at",
    fallbackFactory: studentsFallbackFactory,
    uiLabel: "altas",
    toDb: (record) => ({
      id: record.id,
      full_name: record.nombre || "",
      phone: record.telefono || "",
      branch: record.sucursal || "",
      course: record.curso || "",
      schedule: record.horario || "",
      start_date: record.fechaInicio || null,
      access_selected: record.accesoElegido || "",
      password: record.portalPassword || "",
      status: record.estado || "Activa",
      source_prospect_id: record.prospectId || null,
      notes: record.observaciones || "",
      created_at: record.createdAt || null,
    }),
    fromDb: (record) => ({
      id: record.id,
      nombre: record.full_name || "",
      telefono: record.phone || "",
      sucursal: record.branch || "",
      curso: record.course || "",
      horario: record.schedule || "",
      fechaInicio: record.start_date || "",
      accesoElegido: record.access_selected || "",
      portalPassword: record.password || "",
      estado: record.status || "Activa",
      prospectId: record.source_prospect_id || "",
      observaciones: record.notes || "",
      usuarioAlta: extractAltaMetadata(record.notes, "Usuario alta"),
      createdAt: record.created_at || "",
    }),
  });

  const attendanceEntityService = createSupabaseEntityService({
    key: STORAGE_KEYS.attendance,
    table: "attendance_records",
    orderBy: "created_at",
    fallbackFactory: attendanceFallbackFactory,
    uiLabel: "asistencias",
    toDb: (record) => ({
      id: record.id,
      student_id: record.studentId || null,
      attendance_date: record.fecha || null,
      status: record.estado || "",
      notes: record.observaciones || "",
      recorded_by: record.recordedBy || "",
      created_at: record.createdAt || null,
    }),
    fromDb: (record) => ({
      id: record.id,
      studentId: record.student_id || "",
      fecha: record.attendance_date || "",
      estado: record.status || "",
      observaciones: record.notes || "",
      recordedBy: record.recorded_by || "",
      createdAt: record.created_at || "",
    }),
  });

  const paymentsEntityService = createSupabaseEntityService({
    key: STORAGE_KEYS.payments,
    table: "student_payments",
    orderBy: "updated_at",
    fallbackFactory: paymentsFallbackFactory,
    uiLabel: "pagos",
    toDb: (record) => ({
      id: record.id,
      student_id: record.studentId || null,
      tuition_amount: toNullableNumberValue(record.mensualidadPactada),
      certificate_p1_amount: toNullableNumberValue(record.certificadoP1),
      certificate_p2_amount: toNullableNumberValue(record.certificadoP2),
      first_month_amount: toNullableNumberValue(record.mensualidad1),
      second_month_amount: toNullableNumberValue(record.mensualidad2),
      third_month_amount: toNullableNumberValue(record.mensualidad3),
      fourth_month_amount: toNullableNumberValue(record.mensualidad4),
      fifth_month_amount: toNullableNumberValue(record.mensualidad5),
      pending_payments: record.pagosPendientes || "",
      payment_method: record.metodoPago || "",
      reports: record.reportes || "",
      notes: record.observaciones || "",
      updated_at: record.updatedAt || null,
      created_at: record.createdAt || null,
    }),
    fromDb: (record) => ({
      id: record.id,
      studentId: record.student_id || "",
      mensualidadPactada: record.tuition_amount || "",
      certificadoP1: record.certificate_p1_amount || "",
      certificadoP2: record.certificate_p2_amount || "",
      mensualidad1: record.first_month_amount || "",
      mensualidad2: record.second_month_amount || "",
      mensualidad3: record.third_month_amount || "",
      mensualidad4: record.fourth_month_amount || "",
      mensualidad5: record.fifth_month_amount || "",
      pagosPendientes: record.pending_payments || "",
      metodoPago: record.payment_method || "",
      reportes: record.reports || "",
      observaciones: record.notes || "",
      updatedAt: record.updated_at || "",
      createdAt: record.created_at || "",
    }),
  });

  const financeEntityService = createSupabaseEntityService({
    key: STORAGE_KEYS.financialMovements,
    table: "finance_records",
    orderBy: "created_at",
    fallbackFactory: financeFallbackFactory,
    uiLabel: "finanzas",
    toDb: (record) => ({
      id: record.id,
      record_date: toNullableDateValue(record.fecha),
      branch: record.sucursal || "",
      type: record.tipo || "",
      category: record.categoria || "",
      amount: toNullableNumberValue(record.monto),
      payment_method: record.metodoPago || "",
      notes: [
        `Concepto: ${record.concepto || ""}`,
        `Observaciones: ${record.observaciones || ""}`,
      ].join(" | "),
      recorded_by: record.usuario || "",
      created_at: toNullableTimestampValue(record.createdAt),
    }),
    fromDb: (record) => ({
      id: record.id,
      fecha: record.record_date || "",
      sucursal: record.branch || "",
      tipo: record.type || "",
      categoria: record.category || "",
      concepto: extractAltaMetadata(record.notes, "Concepto"),
      monto: Number(record.amount || 0),
      metodoPago: record.payment_method || "",
      observaciones: extractAltaMetadata(record.notes, "Observaciones"),
      usuario: record.recorded_by || "",
      createdAt: record.created_at || "",
    }),
  });

  const studentPortalProfilesEntityService = createSupabaseEntityService({
    key: STORAGE_KEYS.studentPortalAccess,
    table: "student_portal_profiles",
    orderBy: "updated_at",
    fallbackFactory: studentPortalProfilesFallbackFactory,
    uiLabel: "",
    toDb: (record) => ({
      id: record.id,
      student_id: record.studentId || null,
      portal_password: record.password || "",
      notes: record.notes || "",
      created_at: toNullableTimestampValue(record.createdAt),
      updated_at: toNullableTimestampValue(record.updatedAt),
    }),
    fromDb: (record) => ({
      id: record.id,
      studentId: record.student_id || "",
      password: record.portal_password || "",
      notes: record.notes || "",
      createdAt: record.created_at || "",
      updatedAt: record.updated_at || "",
    }),
  });

  globalScope.VeneziaDataService = {
    keys: STORAGE_KEYS,
    provider: "supabase+localStorage",
    supabaseReady: Boolean(globalScope.VeneziaSupabase?.client),
    entities: {
      // Supabase-based modules:
      internalUsers: createSupabaseEntityService({
        key: STORAGE_KEYS.internalUsers,
        table: "internal_users",
        orderBy: "username",
        fallbackFactory: internalUsersFallbackFactory,
        uiLabel: "usuarios internos",
        hydrateEmptyFromFallback: false,
        toDb: (record) => ({
          id: record.id,
          full_name: record.fullName || "",
          username: record.username || "",
          phone: record.phone || "",
          password: record.password || "",
          role: record.role || "",
          branch: record.branch || "",
          status: record.status || "Activo",
        }),
        fromDb: (record) => ({
          id: record.id,
          fullName: record.full_name || "",
          username: record.username || "",
          phone: record.phone || "",
          password: record.password || "",
          role: record.role || "",
          branch: record.branch || "",
          status: record.status || "Activo",
        }),
      }),
      staff: createSupabaseEntityService({
        key: STORAGE_KEYS.staff,
        table: "staff",
        orderBy: "created_at",
        fallbackFactory: staffFallbackFactory,
        uiLabel: "staff",
        toDb: (record) => ({
          id: record.id,
          full_name: record.nombre || "",
          phone: record.telefono || "",
          position: record.puesto || "",
          area: record.area || "",
          branch: record.sucursal || "",
          hire_date: toNullableDateValue(record.fechaIngreso),
          status: record.estado || "",
          linked_user_id: record.linkedUserId || null,
          notes: record.observaciones || "",
          created_at: toNullableTimestampValue(record.createdAt),
        }),
        fromDb: (record) => ({
          id: record.id,
          nombre: record.full_name || "",
          telefono: record.phone || "",
          puesto: record.position || "",
          area: record.area || "",
          sucursal: record.branch || "",
          fechaIngreso: record.hire_date ? String(record.hire_date).slice(0, 10) : "",
          estado: record.status || "",
          linkedUserId: record.linked_user_id || "",
          observaciones: record.notes || "",
          createdAt: record.created_at || null,
        }),
      }),
      prospects: createSupabaseEntityService({
        key: STORAGE_KEYS.prospects,
        table: "prospects",
        orderBy: "created_at",
        fallbackFactory: prospectsFallbackFactory,
        uiLabel: "prospectos",
        toDb: (record) => ({
          id: record.id,
          full_name: record.nombre || "",
          phone: record.telefono || "",
          contact_date: record.fechaContacto || "",
          branch_interest: record.sucursal || "",
          course_interest: record.curso || "",
          origin: record.origen || "",
          contact_channel: record.medio || "",
          info_status: record.informacion || "",
          prospect_status: record.estado || "",
          notes: buildProspectNotes(record),
          access_interest: record.accesoInteres || "",
          enrolled_by: record.inscribio || "",
          appointment_time: record.horarioCita || "",
          suggested_time: record.horaSugerida || "",
          request_type: record.tipoSolicitud || "",
          created_at: record.createdAt || "",
        }),
        fromDb: (record) => ({
          id: record.id,
          nombre: record.full_name || "",
          telefono: record.phone || "",
          fechaContacto: record.contact_date || "",
          sucursal: record.branch_interest || "",
          curso: record.course_interest || "",
          origen: record.origin || "",
          medio: record.contact_channel || "",
          informacion: record.info_status || "",
          estado: record.prospect_status || "",
          proximoSeguimiento: extractProspectMetadata(record.notes, "Próximo seguimiento"),
          asesoraAsignada: extractProspectMetadata(record.notes, "Asesora asignada"),
          temperatura: extractProspectMetadata(record.notes, "Temperatura"),
          contacto: "",
          notas: stripProspectMetadata(record.notes || ""),
          accesoInteres: record.access_interest || "",
          inscribio: record.enrolled_by || "",
          horarioCita: record.appointment_time || "",
          horaSugerida: record.suggested_time || "",
          tipoSolicitud: record.request_type || "",
          createdAt: record.created_at || "",
        }),
      }),
      students: studentsEntityService,
      altas: studentsEntityService,
      attendance: attendanceEntityService,
      payments: paymentsEntityService,
      financialMovements: financeEntityService,
      webRequests: createLocalEntityService(STORAGE_KEYS.webRequests),
      studentPortalAccess: studentPortalProfilesEntityService,
      webSettings: createLocalEntityService(STORAGE_KEYS.webSettings),
    },
    sessions: {
      // Sessions remain browser-based for now; later replace with Supabase Auth.
      getInternal() {
        return globalScope.localStorage.getItem(STORAGE_KEYS.internalSession) || "";
      },
      setInternal(value) {
        globalScope.localStorage.setItem(STORAGE_KEYS.internalSession, value);
      },
      clearInternal() {
        globalScope.localStorage.removeItem(STORAGE_KEYS.internalSession);
      },
      getStudent() {
        return globalScope.sessionStorage.getItem(STORAGE_KEYS.studentSession) || "";
      },
      setStudent(value) {
        globalScope.sessionStorage.setItem(STORAGE_KEYS.studentSession, value);
      },
      clearStudent() {
        globalScope.sessionStorage.removeItem(STORAGE_KEYS.studentSession);
      },
    },
  };
})(window);
