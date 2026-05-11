// Supabase migration layer:
// - `internal_users`, `staff`, `prospects`, and `students` now use Supabase as primary.
// - localStorage remains as cache/fallback for graceful offline behavior.
// - all other entities still use localStorage until later migrations.
(function initDataService(globalScope) {
  function __veneziaGet(value, key) {
    return value == null ? undefined : value[key];
  }

  function __veneziaCoalesce(value, fallback) {
    return value == null ? fallback : value;
  }

  const STORAGE_KEYS = {
    prospects: "venezia-one-v2-prospectos",
    students: "venezia-one-v2-altas",
    attendance: "venezia-one-v2-asistencias",
    payments: "venezia-one-v2-pagos",
    teachers: "venezia-one-v2-maestras",
    teacherAttendance: "venezia-one-v2-maestras-asistencias",
    teacherPayments: "venezia-one-v2-maestras-pagos",
    balanceExpenses: "venezia-one-v2-balance-expenses",
    financialMovements: "venezia-one-v2-finanzas",
    studentPortalAccess: "venezia-one-v2-student-access",
    internalUsers: "venezia-one-v2-internal-users",
    staff: "venezia-one-v2-staff",
    webRequests: "venezia-one-v2-web-requests",
    webSettings: "venezia-one-v2-web-settings",
    internalSession: "venezia-one-v2-internal-session",
    studentSession: "venezia-one-v2-mi-venezia-session",
  };

  const STUDENT_DOCUMENT_REQUIREMENTS = [
    "Reglamento interno",
    "Contrato de alumno",
    "Acta de nacimiento",
    "CURP",
    "INE",
    "Comprobante de domicilio",
    "Comprobante de último grado de estudios",
  ];

  function getStorage() {
    return globalScope.localStorage;
  }

  const studentSessionMemoryStore = new Map();

  function getAvailableStorage(storageName) {
    try {
      const storage = globalScope[storageName];
      if (!storage) {
        return null;
      }

      const probeKey = `__venezia_probe__${storageName}`;
      storage.setItem(probeKey, "1");
      storage.removeItem(probeKey);
      return storage;
    } catch (error) {
      return null;
    }
  }

  function getStudentSessionStorage() {
    return getAvailableStorage("sessionStorage") || getAvailableStorage("localStorage");
  }

  function readStudentSessionValue() {
    const storages = [
      getAvailableStorage("sessionStorage"),
      getAvailableStorage("localStorage"),
    ].filter(Boolean);

    for (const storage of storages) {
      try {
        const storedValue = storage.getItem(STORAGE_KEYS.studentSession) || "";
        if (storedValue) {
          return storedValue;
        }
      } catch (error) {
        continue;
      }
    }

    return studentSessionMemoryStore.get(STORAGE_KEYS.studentSession) || "";
  }

  function writeStudentSessionValue(value) {
    const storage = getStudentSessionStorage();
    if (storage) {
      try {
        storage.setItem(STORAGE_KEYS.studentSession, value);
        studentSessionMemoryStore.delete(STORAGE_KEYS.studentSession);
        return;
      } catch (error) {
        // Fall through to in-memory storage.
      }
    }

    studentSessionMemoryStore.set(STORAGE_KEYS.studentSession, value);
  }

  function clearStudentSessionValue() {
    const sessionStorage = getAvailableStorage("sessionStorage");
    const localStorage = getAvailableStorage("localStorage");

    if (sessionStorage) {
      try {
        sessionStorage.removeItem(STORAGE_KEYS.studentSession);
      } catch (error) {
        // Ignore storage cleanup errors.
      }
    }
    if (localStorage) {
      try {
        localStorage.removeItem(STORAGE_KEYS.studentSession);
      } catch (error) {
        // Ignore storage cleanup errors.
      }
    }

    studentSessionMemoryStore.delete(STORAGE_KEYS.studentSession);
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
    useLocalFallbackWhenRemoteEmpty = true,
    persistLocalOnMutationFailure = true,
  }) {
    const localService = createLocalEntityService(key);

    function getSupabaseErrorMessage(error) {
      if (!error) {
        return "Error desconocido de Supabase.";
      }

      return error.message || error.details || error.hint || error.code || String(error);
    }

    async function selectAllFromSupabase() {
      const client = __veneziaGet(globalScope.VeneziaSupabase, "client");
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
      const client = __veneziaGet(globalScope.VeneziaSupabase, "client");
      if (!client) {
        throw new Error(`Supabase client unavailable for ${table}`);
      }

      const payload = records.map(toDb);
      const { data, error, status, statusText } = await client
        .from(table)
        .upsert(payload, { onConflict: "id" })
        .select();

      if (error) {
        error.supabaseResponse = {
          data: data || [],
          payload,
          status: status || null,
          statusText: statusText || "",
        };
        throw error;
      }

      return {
        records: (data || []).map(fromDb),
        data: data || [],
        payload,
        status: status || null,
        statusText: statusText || "",
      };
    }

    async function selectOneByIdFromSupabase(id) {
      const client = __veneziaGet(globalScope.VeneziaSupabase, "client");
      if (!client || !id) {
        return null;
      }

      const { data, error } = await client.from(table).select("*").eq("id", id).limit(1);
      if (error) {
        throw error;
      }

      return __veneziaGet(data, 0) || null;
    }

    function normalizeComparableDbValue(value) {
      if (value === undefined || value === null) {
        return "";
      }

      return String(value).trim();
    }

    function numbersMatch(left, right) {
      const normalizedLeft = normalizeComparableDbValue(left);
      const normalizedRight = normalizeComparableDbValue(right);
      if (!normalizedLeft && !normalizedRight) {
        return true;
      }

      const leftNumber = Number(normalizedLeft);
      const rightNumber = Number(normalizedRight);
      return Number.isFinite(leftNumber) && Number.isFinite(rightNumber)
        ? leftNumber === rightNumber
        : normalizedLeft === normalizedRight;
    }

    function metadataValuesMatch(leftNotes, rightNotes, label) {
      return normalizeComparableDbValue(extractAltaMetadata(leftNotes, label)) ===
        normalizeComparableDbValue(extractAltaMetadata(rightNotes, label));
    }

    function doesRemotePaymentMatchPayload(remoteRecord, expectedPayload) {
      if (!remoteRecord || !expectedPayload) {
        return false;
      }

      const textFields = [
        "id",
        "student_id",
        "pending_payments",
        "payment_method",
        "reports",
      ];
      const numberFields = [
        "tuition_amount",
        "certificate_p1_amount",
        "certificate_p2_amount",
        "first_month_amount",
        "second_month_amount",
        "third_month_amount",
        "fourth_month_amount",
        "fifth_month_amount",
      ];
      const noteMetadataFields = [
        "Mes pago",
        "Fecha real pago",
        "Concepto real pago",
        "Certificado P1",
        "Certificado P2",
        "1ra mensualidad",
        "2da mensualidad",
        "3ra mensualidad",
        "4ta mensualidad",
        "5ta mensualidad",
        "Última mensualidad del ciclo",
        "Seguimiento continuidad",
        "Curso siguiente",
        "Estado operativo ciclo",
        "Cantidad pagada",
      ];

      return (
        textFields.every(
          (field) => normalizeComparableDbValue(remoteRecord[field]) === normalizeComparableDbValue(expectedPayload[field])
        ) &&
        numberFields.every((field) => numbersMatch(remoteRecord[field], expectedPayload[field])) &&
        noteMetadataFields.every((label) => metadataValuesMatch(remoteRecord.notes, expectedPayload.notes, label))
      );
    }

    function summarizeLocalPaymentFallbackPayload(payload) {
      if (!payload) {
        return null;
      }

      return {
        id: payload.id || "",
        student_id: payload.student_id || "",
        payment_method: payload.payment_method || "",
        amount: extractAltaMetadata(payload.notes, "Cantidad pagada"),
        payment_real_date: extractAltaMetadata(payload.notes, "Fecha real pago"),
        payment_concept: extractAltaMetadata(payload.notes, "Concepto real pago"),
        payment_month: extractAltaMetadata(payload.notes, "Mes pago"),
      };
    }

    function buildLocalPaymentFallbackRecord(record, error, payload) {
      if (table !== "student_payments") {
        return record;
      }

      return {
        ...record,
        localSyncStatus: "pending",
        localSyncError: getSupabaseErrorMessage(error),
        localSyncErrorCode: __veneziaGet(error, "code") || "",
        localSyncAttemptedAt: new Date().toISOString(),
        localSyncPayloadSummary: summarizeLocalPaymentFallbackPayload(payload),
      };
    }

    return {
      key,
      table,
      async getRemoteRecords() {
        return selectAllFromSupabase();
      },
      // Supabase-first read with localStorage cache fallback.
      async getAllPrimary(fallbackFactoryOverride) {
        const activeFallbackFactory = fallbackFactoryOverride || fallbackFactory;
        try {
          const remoteRecords = await selectAllFromSupabase();

          if (remoteRecords.length === 0) {
            if (table === "student_payments") {
              const fallbackRecords = localService.getAll(activeFallbackFactory);
              localService.setAll(fallbackRecords);
              return [];
            }

            if (!useLocalFallbackWhenRemoteEmpty) {
              localService.setAll([]);
              return [];
            }

            const fallbackRecords = localService.getAll(activeFallbackFactory);
            if (hydrateEmptyFromFallback && fallbackRecords.length > 0) {
              await upsertManyToSupabase(fallbackRecords);
            }
            localService.setAll(fallbackRecords);
            return fallbackRecords;
          }

          if (table === "student_payments") {
            const localRecordsBeforeRefresh = localService.getAll(activeFallbackFactory);
            const mergedPaymentRecords = mergeRemotePaymentsWithLocalFallbacks(
              remoteRecords,
              localRecordsBeforeRefresh
            );
            localService.setAll(mergedPaymentRecords.cacheRecords);
            return mergedPaymentRecords.primaryRecords;
          }

          localService.setAll(remoteRecords);
          return remoteRecords;
        } catch (error) {
          console.error(`Fallo Supabase en ${table}, usando cache local.`, error);
          if (table === "student_payments") {
            return [];
          }
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
        let normalizedRecord = record;
        if (table === "student_payments") {
          const targetMonth = String(record.mesPago || "").trim();
          const getPaymentMonthKey = (item) => {
            if (__veneziaGet(item, "mesPago")) {
              return String(item.mesPago).trim();
            }

            const timestamp = String(__veneziaGet(item, "updatedAt") || __veneziaGet(item, "createdAt") || "").slice(0, 7);
            return timestamp || "";
          };
          const existingRecordByStudentAndMonth = existingRecords.find(
            (item) =>
              item.studentId === record.studentId &&
              item.id !== record.id &&
              isUuidValue(item.id) &&
              getPaymentMonthKey(item) &&
              getPaymentMonthKey(item) === targetMonth
          );
          if (__veneziaGet(existingRecordByStudentAndMonth, "id")) {
            normalizedRecord = {
              ...record,
              id: existingRecordByStudentAndMonth.id,
              createdAt: record.createdAt || existingRecordByStudentAndMonth.createdAt || null,
            };
            console.log('Supabase payment existing month row reused before upsert:', {
              studentId: record.studentId || "",
              targetMonth,
              previousId: record.id || "",
              reusedId: existingRecordByStudentAndMonth.id,
            });
          }
        }

        const hadExistingRecord = existingRecords.some((item) => item.id === normalizedRecord.id);
        const payload = [toDb(normalizedRecord)];
        const operationLabel = hadExistingRecord ? "update" : "insert";
        const shouldTracePayload =
          table === "prospects" || table === "staff" || table === "students" || table === "student_payments";

        try {
          if (shouldTracePayload) {
            console.log(`Supabase payload for "${table}" ${operationLabel}:`, payload[0]);
          }

          const response = await upsertManyToSupabase([normalizedRecord]);
          console.log(`Supabase response for "${table}" ${operationLabel}:`, response.data);
          if (table === "students" && response.records.length === 0) {
            throw new Error('Supabase upsert to "students" returned no rows.');
          }

          const syncedRecord = response.records[0] || normalizedRecord;
          localService.setAll(
            table === "student_payments"
              ? mergeSyncedPaymentRecord(localService.getAll(fallbackFactory), syncedRecord)
              : mergeRecord(localService.getAll(fallbackFactory), syncedRecord)
          );
          return {
            record: syncedRecord,
            synced: true,
            error: null,
            response: {
              data: response.data,
              payload: response.payload,
              status: response.status || null,
              statusText: response.statusText || "",
            },
          };
        } catch (error) {
          console.error(`Supabase ${operationLabel} failed for ${table}. Full error:`, error);
          console.error(`Supabase ${operationLabel} message for ${table}:`, getSupabaseErrorMessage(error));
          let remoteVerification = null;
          if (table === "student_payments") {
            console.error(`Supabase ${operationLabel} response for ${table}:`, error.supabaseResponse || null);
            try {
              const remoteRecord = await selectOneByIdFromSupabase(normalizedRecord.id);
              remoteVerification = {
                found: Boolean(remoteRecord),
                matchesPayload: doesRemotePaymentMatchPayload(remoteRecord, payload[0]),
                remoteId: __veneziaGet(remoteRecord, "id") || "",
                remoteUpdatedAt: __veneziaGet(remoteRecord, "updated_at") || "",
              };
              console.log("=== PAYMENT REMOTE VERIFY ===", {
                foundRemote: remoteVerification.found ? "yes" : "no",
                matchesPayload: remoteVerification.matchesPayload ? "yes" : "no",
                remoteId: remoteVerification.remoteId,
                remoteUpdatedAt: remoteVerification.remoteUpdatedAt,
                paymentId: normalizedRecord.id || "",
                studentId: normalizedRecord.studentId || "",
                targetMonth: normalizedRecord.mesPago || "",
              });
              if (remoteVerification.matchesPayload) {
                const syncedRecord = fromDb(remoteRecord);
                localService.setAll(mergeSyncedPaymentRecord(localService.getAll(fallbackFactory), syncedRecord));
                console.warn("Supabase payment upsert reported an error, but the payment is already persisted remotely.", {
                  paymentId: normalizedRecord.id || "",
                  studentId: normalizedRecord.studentId || "",
                  targetMonth: normalizedRecord.mesPago || "",
                  originalError: getSupabaseErrorMessage(error),
                });
                return {
                  record: syncedRecord,
                  synced: true,
                  recoveredFromSupabase: true,
                  error: null,
                  originalError: error,
                  response: {
                    data: [remoteRecord],
                    payload,
                    status: 200,
                    statusText: "Recovered from Supabase after upsert response error",
                    remoteVerification,
                  },
                };
              }
            } catch (verificationError) {
              console.error(`No se pudo verificar si ${table} quedó guardado tras el error.`, verificationError);
            }
          }
          const fallbackRecord = buildLocalPaymentFallbackRecord(normalizedRecord, error, payload[0]);
          if (persistLocalOnMutationFailure) {
            localService.setAll(mergeRecord(existingRecords, fallbackRecord));
          } else {
            localService.setAll(existingRecords);
          }
          if (uiLabel && options.alertOnFailure !== false) {
            globalScope.alert(`No se pudo guardar ${uiLabel} en Supabase.`);
          }
          return {
            record: fallbackRecord,
            synced: false,
            error,
            response: {
              ...(error.supabaseResponse || {
                data: [],
                payload,
                status: error.status || null,
                statusText: error.statusText || "",
              }),
              remoteVerification,
            },
          };
        }
      },
      async deleteOne(id, options = {}) {
        const existingRecords = localService.getAll(fallbackFactory);
        const nextRecords = existingRecords.filter((record) => record.id !== id);

        try {
          const client = __veneziaGet(globalScope.VeneziaSupabase, "client");
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
    const normalized = String(__veneziaCoalesce(value, "")).trim();
    if (!normalized) {
      return null;
    }

    const numericValue = Number(normalized.replace(/,/g, ""));
    return Number.isFinite(numericValue) ? numericValue : null;
  }

  function isUuidValue(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i.test(
      String(value || "").trim()
    );
  }

  function getPaymentMonthKey(record) {
    if (__veneziaGet(record, "mesPago")) {
      return String(record.mesPago).trim();
    }

    const timestamp = String(__veneziaGet(record, "updatedAt") || __veneziaGet(record, "createdAt") || "").slice(0, 7);
    return timestamp || "";
  }

  function getPaymentRecordIdentityKey(record) {
    const studentId = String(__veneziaGet(record, "studentId") || "").trim();
    const month = getPaymentMonthKey(record);
    return studentId && month ? `${studentId}::${month}` : "";
  }

  function getPaymentRecordSortDate(record) {
    return String(__veneziaGet(record, "updatedAt") || __veneziaGet(record, "createdAt") || "");
  }

  function isRecoverableLocalPaymentRecord(localRecord, remoteRecords = []) {
    const localId = String(__veneziaGet(localRecord, "id") || "").trim();
    const localIdentityKey = getPaymentRecordIdentityKey(localRecord);
    if (!localId || !__veneziaGet(localRecord, "studentId")) {
      return false;
    }

    const remoteIds = new Set(remoteRecords.map((record) => String(__veneziaGet(record, "id") || "").trim()));
    if (remoteIds.has(localId)) {
      return false;
    }

    const remoteSameIdentity = remoteRecords.find((record) => getPaymentRecordIdentityKey(record) === localIdentityKey);
    if (!remoteSameIdentity) {
      return true;
    }

    if (!isUuidValue(localId)) {
      return true;
    }

    return getPaymentRecordSortDate(localRecord) > getPaymentRecordSortDate(remoteSameIdentity);
  }

    function mergeRemotePaymentsWithLocalFallbacks(remoteRecords, localRecords) {
      const recoverableLocalRecords = localRecords.filter((record) => isRecoverableLocalPaymentRecord(record, remoteRecords));
      if (recoverableLocalRecords.length === 0) {
        return {
          primaryRecords: remoteRecords,
          cacheRecords: remoteRecords,
          pendingLocalRecords: [],
        };
      }

      console.warn("Pagos locales pendientes conservados para recuperación:", {
        count: recoverableLocalRecords.length,
        ids: recoverableLocalRecords.map((record) => __veneziaGet(record, "id") || ""),
      });
      return {
        primaryRecords: remoteRecords,
        cacheRecords: [...recoverableLocalRecords, ...remoteRecords],
        pendingLocalRecords: recoverableLocalRecords,
      };
    }

  function mergeSyncedPaymentRecord(records, syncedRecord) {
    const syncedIdentityKey = getPaymentRecordIdentityKey(syncedRecord);
    const merged = records.filter((record) => {
      if (record.id === syncedRecord.id) {
        return false;
      }

      if (syncedIdentityKey && getPaymentRecordIdentityKey(record) === syncedIdentityKey) {
        return false;
      }

      return true;
    });

    return [syncedRecord, ...merged];
  }

  function extractAltaMetadata(notes, label) {
    const source = String(notes || "");
    const segments = source.split(" | ");
    const targetSegment = segments.find((segment) => segment.startsWith(`${label}: `));
    return targetSegment ? targetSegment.slice(label.length + 2).trim() : "";
  }

  function extractAltaMetadataAny(notes, labels) {
    return labels.map((label) => extractAltaMetadata(notes, label)).find(Boolean) || "";
  }

  function normalizeAltaDocumentKey(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
  }

  function parseAltaDocumentList(value) {
    const rawItems = Array.isArray(value)
      ? value
      : String(value || "")
          .split(",")
          .map((item) => item.trim());
    const canonicalByKey = new Map(
      STUDENT_DOCUMENT_REQUIREMENTS.map((documentName) => [normalizeAltaDocumentKey(documentName), documentName])
    );
    const aliasesByKey = new Map([
      [normalizeAltaDocumentKey("INE / identificación oficial"), ["INE"]],
      [normalizeAltaDocumentKey("Comprobante de estudios"), ["Comprobante de último grado de estudios"]],
      [normalizeAltaDocumentKey("Reglamento / contrato firmado"), ["Reglamento interno", "Contrato de alumno"]],
      [normalizeAltaDocumentKey("Reglamento firmado"), ["Reglamento interno"]],
      [normalizeAltaDocumentKey("Contrato firmado"), ["Contrato de alumno"]],
      [normalizeAltaDocumentKey("Contrato de inscripción"), ["Contrato de alumno"]],
    ]);
    const seen = new Set();
    const resolveDocumentNames = (item) => {
      const key = normalizeAltaDocumentKey(item);
      if (!key) {
        return [];
      }
      if (canonicalByKey.has(key)) {
        return [canonicalByKey.get(key)];
      }
      if (aliasesByKey.has(key)) {
        return aliasesByKey.get(key);
      }
      return [];
    };

    return rawItems
      .map((item) => String(item || "").trim())
      .filter((item) => item && item !== "-")
      .reduce((items, item) => items.concat(resolveDocumentNames(item)), [])
      .filter((item) => {
        const key = normalizeAltaDocumentKey(item);
        if (!key || seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
  }

  function normalizeAltaDocumentationStatus(value) {
    const normalized = normalizeAltaDocumentKey(value);
    if (!normalized || normalized === "-") {
      return "";
    }
    if (normalized === "completa" || normalized === "completo") {
      return "Completa";
    }
    if (normalized === "parcial") {
      return "Parcial";
    }
    if (normalized === "incompleta" || normalized === "incompleto") {
      return "Incompleta";
    }
    return String(value || "").trim();
  }

  function getAltaDocumentationSaveState(record) {
    let status = normalizeAltaDocumentationStatus(record.documentos);
    let delivered = parseAltaDocumentList(record.documentosEntregados);
    const requiredKeys = STUDENT_DOCUMENT_REQUIREMENTS.map(normalizeAltaDocumentKey);

    if (status === "Completa" && delivered.length === 0) {
      delivered = [...STUDENT_DOCUMENT_REQUIREMENTS];
    }

    const deliveredKeys = new Set(delivered.map(normalizeAltaDocumentKey));
    const missingRequiredCount = requiredKeys.filter((key) => !deliveredKeys.has(key)).length;

    if (missingRequiredCount === 0) {
      status = "Completa";
    } else if (status === "Completa") {
      status = "Parcial";
    } else if (!status && delivered.length > 0) {
      status = "Parcial";
    }

    return { status, delivered };
  }

  function stripAltaMetadata(notes) {
    const metadataLabels = new Set([
      "ID Alumna",
      "Fecha de inicio",
      "Fecha de inscripción",
      "Día de clases",
      "Correo",
      "Dirección",
      "Fecha de nacimiento",
      "Tutor",
      "Clave de elector",
      "Escolaridad",
      "Contacto de emergencia",
      "Asesor que inscribió",
      "Asesora que inscribió",
      "Método de pago",
      "Tipo de pago",
      "Inscripción pagada",
      "Cantidad de pago",
      "Cantidad de pago de inscripción",
      "Mensualidad asignada",
      "Colegiatura",
      "Promoción",
      "Apoyo gobierno",
      "Documentación",
      "Documentos entregados",
      "Tiene hijos",
      "Trabaja actualmente",
      "Notas médicas",
      "Usuario alta",
      "Usuario Mi Venezia",
      "Password Mi Venezia",
      "Estado operativo ciclo",
      "Seguimiento continuidad",
      "Curso siguiente",
      "Última mensualidad del ciclo",
      "Lectura reglamento",
      "Fecha lectura reglamento",
      "Lectura contrato",
      "Fecha lectura contrato",
    ]);

    return String(notes || "")
      .split(" | ")
      .filter((segment) => {
        const [label] = segment.split(": ");
        return segment && !metadataLabels.has(label);
      })
      .join(" | ")
      .trim();
  }

  function buildStudentNotes(record) {
    const normalizeValue = (value) => String(value || "").trim() || "-";
    const startDate = normalizeValue(record.fechaInicio || record.fechaInscripcion);
    const documentation = getAltaDocumentationSaveState(record);

    return [
      stripAltaMetadata(record.observaciones || ""),
      `ID Alumna: ${normalizeValue(record.studentCode)}`,
      `Fecha de inicio: ${startDate}`,
      `Día de clases: ${normalizeValue(record.diaClases)}`,
      `Correo: ${normalizeValue(record.correo)}`,
      `Dirección: ${normalizeValue(record.direccion)}`,
      `Fecha de nacimiento: ${normalizeValue(record.fechaNacimiento)}`,
      `Tutor: ${normalizeValue(record.tutor)}`,
      `Clave de elector: ${normalizeValue(record.claveElector)}`,
      `Escolaridad: ${normalizeValue(record.escolaridad)}`,
      `Contacto de emergencia: ${normalizeValue(record.contactoEmergencia)}`,
      `Asesor que inscribió: ${normalizeValue(record.asesoraInscribio)}`,
      `Método de pago: ${normalizeValue(record.metodoPago)}`,
      `Tipo de pago: ${normalizeValue(record.tipoPago)}`,
      `Inscripción pagada: ${normalizeValue(record.inscripcionPagada)}`,
      `Cantidad de pago de inscripción: ${normalizeValue(record.cantidadPago)}`,
      `Mensualidad asignada: ${normalizeValue(record.mensualidad)}`,
      `Colegiatura: ${normalizeValue(record.colegiatura)}`,
      `Promoción: ${normalizeValue(record.promocion)}`,
      `Apoyo gobierno: ${normalizeValue(record.apoyoGobierno)}`,
      `Documentación: ${normalizeValue(documentation.status || record.documentos)}`,
      `Documentos entregados: ${normalizeValue(documentation.delivered.join(", "))}`,
      `Tiene hijos: ${normalizeValue(record.tieneHijos)}`,
      `Trabaja actualmente: ${normalizeValue(record.trabajaActualmente)}`,
      `Notas médicas: ${normalizeValue(record.notasMedicas)}`,
      `Usuario alta: ${normalizeValue(record.usuarioAlta)}`,
      `Usuario Mi Venezia: ${normalizeValue(record.portalUser || record.telefono)}`,
      `Password Mi Venezia: ${normalizeValue(record.portalPassword)}`,
      `Estado operativo ciclo: ${normalizeValue(record.lifecycleStatus)}`,
      `Seguimiento continuidad: ${normalizeValue(record.continuityStatus)}`,
      `Curso siguiente: ${normalizeValue(record.nextCourse)}`,
      `Última mensualidad del ciclo: ${normalizeValue(record.lastMonthlyPaymentStatus)}`,
      record.lecturaReglamento ? "Lectura reglamento: Sí" : "",
      record.fechaLecturaReglamento
        ? `Fecha lectura reglamento: ${record.fechaLecturaReglamento}`
        : "",
      record.lecturaContrato ? "Lectura contrato: Sí" : "",
      record.fechaLecturaContrato
        ? `Fecha lectura contrato: ${record.fechaLecturaContrato}`
        : "",
    ]
      .filter(Boolean)
      .join(" | ");
  }

  function extractStaffMetadata(notes, label) {
    const source = String(notes || "");
    const segments = source.split(" | ");
    const targetSegment = segments.find((segment) => segment.startsWith(`${label}: `));
    return targetSegment ? targetSegment.slice(label.length + 2).trim() : "";
  }

  function stripStaffMetadata(notes) {
    const metadataLabels = new Set([
      "Fecha de nacimiento",
      "Usuario de acceso",
      "Contraseña temporal",
      "Cobertura Mi Venezia",
    ]);

    return String(notes || "")
      .split(" | ")
      .filter((segment) => {
        const [label] = segment.split(": ");
        return segment && !metadataLabels.has(label);
      })
      .join(" | ")
      .trim();
  }

  function buildStaffNotes(record) {
    return [
      stripStaffMetadata(record.observaciones || ""),
      record.fechaNacimiento ? `Fecha de nacimiento: ${record.fechaNacimiento}` : "",
      record.username ? `Usuario de acceso: ${record.username}` : "",
      record.password ? `Contraseña temporal: ${record.password}` : "",
      record.contactScheduleScope ? `Cobertura Mi Venezia: ${record.contactScheduleScope}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
  }

  function buildPaymentNotes(record) {
    return [
      `Mes pago: ${record.mesPago || ""}`,
      `Fecha real pago: ${record.paymentRealDate || ""}`,
      `Concepto real pago: ${record.paymentMovementConcept || ""}`,
      `Certificado P1: ${record.certificadoP1 || ""}`,
      `Certificado P2: ${record.certificadoP2 || ""}`,
      `1ra mensualidad: ${record.mensualidad1 || ""}`,
      `2da mensualidad: ${record.mensualidad2 || ""}`,
      `3ra mensualidad: ${record.mensualidad3 || ""}`,
      `4ta mensualidad: ${record.mensualidad4 || ""}`,
      `5ta mensualidad: ${record.mensualidad5 || ""}`,
      `Última mensualidad del ciclo: ${record.lastMonthlyPaymentStatus || ""}`,
      `Seguimiento continuidad: ${record.continuityStatus || ""}`,
      `Curso siguiente: ${record.nextCourse || ""}`,
      `Estado operativo ciclo: ${record.lifecycleStatus || ""}`,
      `Cantidad pagada: ${record.cantidadPagada || ""}`,
      `Observaciones: ${record.observaciones || ""}`,
    ].join(" | ");
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
    hydrateEmptyFromFallback: false,
    useLocalFallbackWhenRemoteEmpty: false,
    persistLocalOnMutationFailure: false,
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
      notes: buildStudentNotes(record),
      created_at: record.createdAt || null,
    }),
    fromDb: (record) => ({
      id: record.id,
      nombre: record.full_name || "",
      telefono: record.phone || "",
      sucursal: record.branch || "",
      curso: record.course || "",
      studentCode: extractAltaMetadata(record.notes, "ID Alumna"),
      fechaInscripcion:
        record.start_date ||
        extractAltaMetadataAny(record.notes, ["Fecha de inicio", "Fecha de inscripción"]),
      horario: record.schedule || "",
      diaClases: extractAltaMetadata(record.notes, "Día de clases"),
      fechaInicio:
        record.start_date ||
        extractAltaMetadataAny(record.notes, ["Fecha de inicio", "Fecha de inscripción"]),
      accesoElegido: record.access_selected || "",
      correo: extractAltaMetadata(record.notes, "Correo"),
      direccion: extractAltaMetadata(record.notes, "Dirección"),
      fechaNacimiento: extractAltaMetadata(record.notes, "Fecha de nacimiento"),
      tutor: extractAltaMetadata(record.notes, "Tutor"),
      claveElector: extractAltaMetadata(record.notes, "Clave de elector"),
      escolaridad: extractAltaMetadata(record.notes, "Escolaridad"),
      contactoEmergencia: extractAltaMetadata(record.notes, "Contacto de emergencia"),
      asesoraInscribio:
        extractAltaMetadata(record.notes, "Asesor que inscribió") ||
        extractAltaMetadata(record.notes, "Asesora que inscribió"),
      metodoPago: extractAltaMetadata(record.notes, "Método de pago"),
      tipoPago: extractAltaMetadata(record.notes, "Tipo de pago"),
      inscripcionPagada: extractAltaMetadata(record.notes, "Inscripción pagada"),
      cantidadPago: extractAltaMetadataAny(record.notes, ["Cantidad de pago de inscripción", "Cantidad de pago"]),
      mensualidad: extractAltaMetadata(record.notes, "Mensualidad asignada"),
      colegiatura: extractAltaMetadata(record.notes, "Colegiatura"),
      promocion: extractAltaMetadata(record.notes, "Promoción"),
      apoyoGobierno: extractAltaMetadata(record.notes, "Apoyo gobierno"),
      documentos: extractAltaMetadata(record.notes, "Documentación"),
      documentosEntregados: parseAltaDocumentList(extractAltaMetadata(record.notes, "Documentos entregados")),
      tieneHijos: extractAltaMetadata(record.notes, "Tiene hijos"),
      trabajaActualmente: extractAltaMetadata(record.notes, "Trabaja actualmente"),
      notasMedicas: extractAltaMetadata(record.notes, "Notas médicas"),
      portalUser: extractAltaMetadata(record.notes, "Usuario Mi Venezia") || record.phone || "",
      portalPassword: record.password || "",
      lecturaReglamento:
        ["si", "sí", "true", "confirmada"].includes(
          extractAltaMetadata(record.notes, "Lectura reglamento").trim().toLowerCase()
        ) || Boolean(extractAltaMetadata(record.notes, "Fecha lectura reglamento")),
      fechaLecturaReglamento: extractAltaMetadata(record.notes, "Fecha lectura reglamento"),
      lecturaContrato:
        ["si", "sí", "true", "confirmada"].includes(
          extractAltaMetadata(record.notes, "Lectura contrato").trim().toLowerCase()
        ) || Boolean(extractAltaMetadata(record.notes, "Fecha lectura contrato")),
      fechaLecturaContrato: extractAltaMetadata(record.notes, "Fecha lectura contrato"),
      estado: record.status || "Activa",
      lifecycleStatus: extractAltaMetadata(record.notes, "Estado operativo ciclo"),
      continuityStatus: extractAltaMetadata(record.notes, "Seguimiento continuidad"),
      nextCourse: extractAltaMetadata(record.notes, "Curso siguiente"),
      lastMonthlyPaymentStatus: extractAltaMetadata(record.notes, "Última mensualidad del ciclo"),
      prospectId: record.source_prospect_id || "",
      observaciones: stripAltaMetadata(record.notes),
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
      notes: buildPaymentNotes(record),
      updated_at: record.updatedAt || null,
      created_at: record.createdAt || null,
    }),
    fromDb: (record) => ({
      id: record.id,
      studentId: record.student_id || "",
      mensualidadPactada: record.tuition_amount || "",
      mesPago: extractAltaMetadata(record.notes, "Mes pago"),
      paymentRealDate: extractAltaMetadata(record.notes, "Fecha real pago"),
      paymentMovementConcept: extractAltaMetadata(record.notes, "Concepto real pago"),
      certificadoP1: extractAltaMetadata(record.notes, "Certificado P1") || record.certificate_p1_amount || "",
      certificadoP2: extractAltaMetadata(record.notes, "Certificado P2") || record.certificate_p2_amount || "",
      mensualidad1: extractAltaMetadata(record.notes, "1ra mensualidad") || record.first_month_amount || "",
      mensualidad2: extractAltaMetadata(record.notes, "2da mensualidad") || record.second_month_amount || "",
      mensualidad3: extractAltaMetadata(record.notes, "3ra mensualidad") || record.third_month_amount || "",
      mensualidad4: extractAltaMetadata(record.notes, "4ta mensualidad") || record.fourth_month_amount || "",
      mensualidad5: extractAltaMetadata(record.notes, "5ta mensualidad") || record.fifth_month_amount || "",
      lastMonthlyPaymentStatus: extractAltaMetadata(record.notes, "Última mensualidad del ciclo"),
      continuityStatus: extractAltaMetadata(record.notes, "Seguimiento continuidad"),
      nextCourse: extractAltaMetadata(record.notes, "Curso siguiente"),
      lifecycleStatus: extractAltaMetadata(record.notes, "Estado operativo ciclo"),
      pagosPendientes: record.pending_payments || "",
      metodoPago: record.payment_method || "",
      cantidadPagada: extractAltaMetadata(record.notes, "Cantidad pagada"),
      reportes: record.reports || "",
      observaciones: extractAltaMetadata(record.notes, "Observaciones"),
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
      reference: record.reference || "",
      related_student_id: record.relatedStudentId || null,
      related_payment_id: record.relatedPaymentId || null,
      notes: [
        `Concepto: ${record.concepto || ""}`,
        `Concepto real pago: ${record.paymentConcept || record.concepto || ""}`,
        `Origen: ${record.source || ""}`,
        `Clave de concepto: ${record.conceptKey || ""}`,
        `Alta ID: ${record.relatedAltaId || ""}`,
        `Cancelado: ${record.cancelled ? "Sí" : "No"}`,
        `Fecha cancelación: ${record.cancelledAt || ""}`,
        `Usuario cancelación: ${record.cancelledBy || ""}`,
        `Motivo cancelación: ${record.cancelledReason || ""}`,
        `Alumna: ${record.alumna || ""}`,
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
      reference: record.reference || "",
      relatedStudentId: record.related_student_id || "",
      relatedPaymentId: record.related_payment_id || "",
      paymentConcept: extractAltaMetadata(record.notes, "Concepto real pago"),
      source: extractAltaMetadata(record.notes, "Origen"),
      conceptKey: extractAltaMetadata(record.notes, "Clave de concepto"),
      relatedAltaId: extractAltaMetadata(record.notes, "Alta ID"),
      cancelled: ["si", "sí", "true"].includes(extractAltaMetadata(record.notes, "Cancelado").trim().toLowerCase()),
      cancelledAt: extractAltaMetadata(record.notes, "Fecha cancelación"),
      cancelledBy: extractAltaMetadata(record.notes, "Usuario cancelación"),
      cancelledReason: extractAltaMetadata(record.notes, "Motivo cancelación"),
      alumna: extractAltaMetadata(record.notes, "Alumna"),
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
    supabaseReady: Boolean(__veneziaGet(globalScope.VeneziaSupabase, "client")),
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
          permissions: Array.isArray(record.permissions) ? record.permissions : [],
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
          permissions: Array.isArray(record.permissions) ? record.permissions : [],
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
          notes: buildStaffNotes(record),
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
          fechaNacimiento: extractStaffMetadata(record.notes, "Fecha de nacimiento"),
          username: extractStaffMetadata(record.notes, "Usuario de acceso"),
          password: extractStaffMetadata(record.notes, "Contraseña temporal"),
          contactScheduleScope: extractStaffMetadata(record.notes, "Cobertura Mi Venezia"),
          observaciones: stripStaffMetadata(record.notes || ""),
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
      teachers: createLocalEntityService(STORAGE_KEYS.teachers),
      teacherAttendance: createLocalEntityService(STORAGE_KEYS.teacherAttendance),
      teacherPayments: createLocalEntityService(STORAGE_KEYS.teacherPayments),
      balanceExpenses: createLocalEntityService(STORAGE_KEYS.balanceExpenses),
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
        return readStudentSessionValue();
      },
      setStudent(value) {
        writeStudentSessionValue(value);
      },
      clearStudent() {
        clearStudentSessionValue();
      },
    },
  };
})(window);
