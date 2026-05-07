(function () {
  var SUPABASE_URL = "https://cvcmvvfobuelmvobsvue.supabase.co";
  var SUPABASE_KEY = "sb_publishable_yUaiuhQG_TQKiuqFSGDF5A_Wc5L90zR";
  var SESSION_KEY = "venezia-one-v2-mi-venezia-v2-session";
  var LEGACY_STUDENTS_KEY = "venezia-one-v2-altas";
  var LEGACY_PAYMENTS_KEY = "venezia-one-v2-pagos";
  var LEGACY_ATTENDANCE_KEY = "venezia-one-v2-asistencias";
  var LEGACY_FINANCE_KEY = "venezia-one-v2-finanzas";
  var LEGACY_STAFF_KEY = "venezia-one-v2-staff";
  var LEGACY_USERS_KEY = "venezia-one-v2-internal-users";
  var SUPPORT_WHATSAPP = "522463831375";
  var BOOTSTRAP_DIRECTORS = [
    { branch: "Tlaxcala", scheduleType: "weekday", phone: "2461208995" }
  ];

  var state = {
    debug: false,
    students: [],
    profiles: [],
    studentsLoaded: false,
    studentsLoading: false,
    studentsSource: "pendiente",
    loginBusy: false,
    lastLoginAt: 0,
    currentStudent: null,
    details: null,
    debugInfo: {
      userAgent: "",
      dataSourceLoaded: false,
      studentsReviewed: 0,
      capturedUser: "",
      normalizedUser: "",
      passwordLength: 0,
      matchFound: false,
      matchedStudent: "",
      dashboardOpened: false,
      errors: []
    }
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function text(value) {
    return String(value == null ? "" : value).trim();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function stripDiacritics(value) {
    var normalized = String(value || "");
    try {
      if (typeof normalized.normalize === "function") {
        return normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
    } catch (error) {
      addDebugError("normalize: " + getErrorMessage(error));
    }
    return normalized
      .replace(/[áàäâ]/gi, "a")
      .replace(/[éèëê]/gi, "e")
      .replace(/[íìïî]/gi, "i")
      .replace(/[óòöô]/gi, "o")
      .replace(/[úùüû]/gi, "u")
      .replace(/[ñ]/gi, "n");
  }

  function normalizeLoose(value) {
    return stripDiacritics(value)
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function normalizeIdentifier(value) {
    var normalized = normalizeLoose(value);
    var compact = normalized.replace(/\s+/g, "");
    var numeric = compact.replace(/\D/g, "");
    if (numeric.length >= 7) {
      return numeric;
    }
    return compact;
  }

  function normalizePassword(value) {
    return String(value || "").replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
  }

  function normalizePhone(value) {
    var digits = String(value || "").replace(/\D/g, "");
    if (digits.length === 10) {
      return "52" + digits;
    }
    if (digits.length === 12 && digits.indexOf("52") === 0) {
      return digits;
    }
    return digits;
  }

  function identifiersMatch(inputIdentifier, candidateIdentifier) {
    var inputDigits;
    var candidateDigits;
    if (!inputIdentifier || !candidateIdentifier) {
      return false;
    }
    if (inputIdentifier === candidateIdentifier) {
      return true;
    }
    inputDigits = String(inputIdentifier).replace(/\D/g, "");
    candidateDigits = String(candidateIdentifier).replace(/\D/g, "");
    if (inputDigits.length >= 10 && candidateDigits.length >= 10) {
      return inputDigits.slice(-10) === candidateDigits.slice(-10);
    }
    return false;
  }

  function getErrorMessage(error) {
    if (!error) {
      return "Error desconocido";
    }
    return error.message || error.details || error.hint || String(error);
  }

  function getQueryFlag(name) {
    var query = window.location.search || "";
    var pattern = new RegExp("(?:^|[?&])" + name + "=(1|true|yes)(?:&|$)", "i");
    return pattern.test(query);
  }

  function readStorage(key, fallback) {
    var raw = "";
    try {
      raw = window.localStorage ? window.localStorage.getItem(key) : "";
      if (!raw) {
        return fallback;
      }
      return JSON.parse(raw);
    } catch (error) {
      addDebugError("storage " + key + ": " + getErrorMessage(error));
      return fallback;
    }
  }

  function getSessionStorage() {
    try {
      if (!window.sessionStorage) {
        return null;
      }
      window.sessionStorage.setItem("__mv2_probe", "1");
      window.sessionStorage.removeItem("__mv2_probe");
      return window.sessionStorage;
    } catch (error) {
      return null;
    }
  }

  function saveSession(student) {
    var storage = getSessionStorage();
    var payload = {
      studentId: student.id || "",
      savedAt: new Date().toISOString ? new Date().toISOString() : String(new Date())
    };
    if (storage) {
      try {
        storage.setItem(SESSION_KEY, JSON.stringify(payload));
      } catch (error) {
        addDebugError("saveSession: " + getErrorMessage(error));
      }
    }
  }

  function readSession() {
    var storage = getSessionStorage();
    var raw = "";
    if (!storage) {
      return null;
    }
    try {
      raw = storage.getItem(SESSION_KEY) || "";
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      addDebugError("readSession: " + getErrorMessage(error));
      return null;
    }
  }

  function clearSession() {
    var storage = getSessionStorage();
    if (storage) {
      try {
        storage.removeItem(SESSION_KEY);
      } catch (error) {
        addDebugError("clearSession: " + getErrorMessage(error));
      }
    }
  }

  function setFeedback(message, tone) {
    var element = byId("loginFeedback");
    if (!element) {
      return;
    }
    element.textContent = message || "";
    element.setAttribute("data-tone", tone || "info");
  }

  function setLoginBusy(isBusy, label) {
    var button = byId("loginButton");
    state.loginBusy = isBusy;
    if (!button) {
      return;
    }
    if (!button.getAttribute("data-default-label")) {
      button.setAttribute("data-default-label", button.textContent || "Ingresar");
    }
    button.disabled = !!isBusy;
    button.textContent = isBusy ? (label || "Validando...") : (button.getAttribute("data-default-label") || "Ingresar");
  }

  function showRuntimeError(message, error) {
    var box = byId("runtimeErrorBox");
    var fullMessage = message || "Ocurrió un error, pero el portal sigue disponible.";
    if (error) {
      addDebugError(fullMessage + ": " + getErrorMessage(error));
    }
    if (box) {
      box.hidden = false;
      box.textContent = fullMessage;
    }
    setFeedback(fullMessage, "error");
    updateDebug();
  }

  function addDebugError(message) {
    state.debugInfo.errors.push(String(message || "Error"));
    if (state.debugInfo.errors.length > 12) {
      state.debugInfo.errors.shift();
    }
  }

  function updateDebug() {
    var panel = byId("debugPanel");
    var log = byId("debugLog");
    var info = state.debugInfo;
    if (!state.debug || !panel || !log) {
      return;
    }
    panel.hidden = false;
    log.textContent =
      "userAgent: " + info.userAgent + "\n" +
      "fuente de datos cargada: " + (info.dataSourceLoaded ? "si" : "no") + "\n" +
      "fuente: " + state.studentsSource + "\n" +
      "alumnos cargados: " + state.students.length + "\n" +
      "alumnos revisados: " + info.studentsReviewed + "\n" +
      "usuario capturado: " + info.capturedUser + "\n" +
      "usuario normalizado: " + info.normalizedUser + "\n" +
      "longitud de contraseña: " + info.passwordLength + "\n" +
      "match encontrado: " + (info.matchFound ? "si" : "no") + "\n" +
      "alumno encontrado: " + info.matchedStudent + "\n" +
      "dashboard abierto: " + (info.dashboardOpened ? "si" : "no") + "\n" +
      "errores: " + (info.errors.length ? info.errors.join(" | ") : "sin errores");
  }

  function requestJson(path, callback) {
    var xhr;
    var url = SUPABASE_URL + "/rest/v1/" + path;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("apikey", SUPABASE_KEY);
      xhr.setRequestHeader("Authorization", "Bearer " + SUPABASE_KEY);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.timeout = 22000;
      xhr.onreadystatechange = function () {
        var data;
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            data = JSON.parse(xhr.responseText || "[]");
            callback(null, data);
          } catch (error) {
            callback(error, []);
          }
          return;
        }
        callback(new Error("Supabase HTTP " + xhr.status + " en " + path), []);
      };
      xhr.ontimeout = function () {
        callback(new Error("Tiempo agotado leyendo " + path), []);
      };
      xhr.onerror = function () {
        callback(new Error("No se pudo conectar con Supabase"), []);
      };
      xhr.send();
      return;
    }
    if (window.fetch) {
      window.fetch(url, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: "Bearer " + SUPABASE_KEY,
          Accept: "application/json"
        }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Supabase HTTP " + response.status + " en " + path);
          }
          return response.json();
        })
        .then(function (data) {
          callback(null, data || []);
        })
        .catch(function (error) {
          callback(error, []);
        });
      return;
    }
    callback(new Error("Este navegador no tiene XMLHttpRequest ni fetch."), []);
  }

  function buildQuery(params) {
    var parts = [];
    var key;
    for (key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key) && params[key] !== null && params[key] !== undefined) {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(params[key])));
      }
    }
    return parts.join("&");
  }

  function selectTable(table, params, callback) {
    requestJson(table + "?" + buildQuery(params || { select: "*" }), callback);
  }

  function extractMetadata(notes, label) {
    var source = String(notes || "");
    var segments = source.split(" | ");
    var prefix = label + ": ";
    var index;
    for (index = 0; index < segments.length; index += 1) {
      if (segments[index].indexOf(prefix) === 0) {
        return segments[index].slice(prefix.length).trim();
      }
    }
    return "";
  }

  function metadataAny(notes, labels) {
    var index;
    var value;
    for (index = 0; index < labels.length; index += 1) {
      value = extractMetadata(notes, labels[index]);
      if (value) {
        return value;
      }
    }
    return "";
  }

  function isConfirmed(value) {
    var normalized = normalizeLoose(value);
    return normalized === "si" || normalized === "true" || normalized === "confirmada" || normalized === "confirmado";
  }

  function studentFromRow(row) {
    var notes = row.notes || row.observaciones || "";
    var student = {
      id: text(row.id),
      nombre: text(row.full_name || row.nombre || row.fullName),
      telefono: text(row.phone || row.telefono),
      sucursal: text(row.branch || row.sucursal),
      curso: text(row.course || row.curso),
      horario: text(row.schedule || row.horario),
      fechaInicio: text(row.start_date || row.fechaInicio || row.fechaInscripcion || metadataAny(notes, ["Fecha de inicio", "Fecha de inscripción"])),
      diaClases: text(row.diaClases || extractMetadata(notes, "Día de clases")),
      accesoElegido: text(row.access_selected || row.accesoElegido),
      estado: text(row.status || row.estado || "Activa"),
      portalUser: text(row.portalUser || extractMetadata(notes, "Usuario Mi Venezia") || row.phone || row.telefono),
      portalPassword: text(row.password || row.portalPassword || extractMetadata(notes, "Password Mi Venezia")),
      profilePassword: "",
      correo: text(row.correo || extractMetadata(notes, "Correo")),
      direccion: text(row.direccion || extractMetadata(notes, "Dirección")),
      tutor: text(row.tutor || extractMetadata(notes, "Tutor")),
      documentos: text(row.documentos || extractMetadata(notes, "Documentación")),
      metodoPago: text(row.metodoPago || extractMetadata(notes, "Método de pago")),
      mensualidad: text(row.mensualidad || extractMetadata(notes, "Mensualidad asignada")),
      colegiatura: text(row.colegiatura || extractMetadata(notes, "Colegiatura")),
      lecturaReglamento: isConfirmed(extractMetadata(notes, "Lectura reglamento")) || !!extractMetadata(notes, "Fecha lectura reglamento"),
      fechaLecturaReglamento: text(extractMetadata(notes, "Fecha lectura reglamento")),
      lecturaContrato: isConfirmed(extractMetadata(notes, "Lectura contrato")) || !!extractMetadata(notes, "Fecha lectura contrato"),
      fechaLecturaContrato: text(extractMetadata(notes, "Fecha lectura contrato")),
      lifecycleStatus: text(row.lifecycleStatus || extractMetadata(notes, "Estado operativo ciclo")),
      continuityStatus: text(row.continuityStatus || extractMetadata(notes, "Seguimiento continuidad")),
      nextCourse: text(row.nextCourse || extractMetadata(notes, "Curso siguiente")),
      lastMonthlyPaymentStatus: text(row.lastMonthlyPaymentStatus || extractMetadata(notes, "Última mensualidad del ciclo")),
      createdAt: text(row.created_at || row.createdAt),
      notes: notes
    };
    return student;
  }

  function profileFromRow(row) {
    return {
      id: text(row.id),
      studentId: text(row.student_id || row.studentId),
      password: text(row.portal_password || row.password),
      updatedAt: text(row.updated_at || row.updatedAt)
    };
  }

  function applyProfiles(students, profiles) {
    var profileMap = {};
    var index;
    for (index = 0; index < profiles.length; index += 1) {
      if (profiles[index].studentId && profiles[index].password) {
        profileMap[profiles[index].studentId] = profiles[index].password;
      }
    }
    for (index = 0; index < students.length; index += 1) {
      students[index].profilePassword = profileMap[students[index].id] || "";
      if (!students[index].portalPassword && students[index].profilePassword) {
        students[index].portalPassword = students[index].profilePassword;
      }
    }
  }

  function loadStudents(callback) {
    if (state.studentsLoaded) {
      callback(null, state.students);
      return;
    }
    if (state.studentsLoading) {
      window.setTimeout(function () {
        loadStudents(callback);
      }, 180);
      return;
    }

    state.studentsLoading = true;
    state.studentsSource = "supabase";
    setFeedback("Cargando fuente de datos real...");
    updateDebug();

    selectTable("students", {
      select: "id,full_name,phone,branch,course,schedule,start_date,access_selected,password,status,source_prospect_id,notes,created_at",
      order: "created_at.desc"
    }, function (error, rows) {
      var localRows;
      if (error) {
        addDebugError("students: " + getErrorMessage(error));
        localRows = readStorage(LEGACY_STUDENTS_KEY, []);
        rows = localRows || [];
        state.studentsSource = rows.length ? "cache local" : "sin datos";
      }

      state.students = mapArray(rows, studentFromRow);
      selectTable("student_portal_profiles", {
        select: "id,student_id,portal_password,updated_at",
        order: "updated_at.desc"
      }, function (profileError, profileRows) {
        if (profileError) {
          addDebugError("student_portal_profiles: " + getErrorMessage(profileError));
          profileRows = [];
        }
        state.profiles = mapArray(profileRows || [], profileFromRow);
        applyProfiles(state.students, state.profiles);
        state.studentsLoaded = true;
        state.studentsLoading = false;
        state.debugInfo.dataSourceLoaded = state.students.length > 0;
        if (!error && state.studentsSource === "supabase") {
          state.studentsSource = "supabase";
        }
        setFeedback(state.students.length ? "Listo. Ingresa tus datos." : "No pudimos cargar alumnas en este momento.", state.students.length ? "info" : "error");
        updateDebug();
        callback(error && !state.students.length ? error : null, state.students);
      });
    });
  }

  function mapArray(items, mapper) {
    var result = [];
    var index;
    if (!items || !items.length) {
      return result;
    }
    for (index = 0; index < items.length; index += 1) {
      result.push(mapper(items[index]));
    }
    return result;
  }

  function isStudentDeleted(student) {
    return normalizeLoose(student && student.estado) === "eliminada";
  }

  function findStudentForLogin(identifier, password) {
    var normalizedIdentifier = normalizeIdentifier(identifier);
    var normalizedPassword = normalizePassword(password);
    var index;
    var student;
    var portalUser;
    var portalPhone;
    var candidatePassword;
    var profilePassword;
    var identifierMatches;
    var passwordMatches;

    state.debugInfo.capturedUser = text(identifier);
    state.debugInfo.normalizedUser = normalizedIdentifier;
    state.debugInfo.passwordLength = normalizedPassword.length;
    state.debugInfo.studentsReviewed = 0;
    state.debugInfo.matchFound = false;
    state.debugInfo.matchedStudent = "";

    if (!normalizedIdentifier || !normalizedPassword) {
      updateDebug();
      return null;
    }

    for (index = 0; index < state.students.length; index += 1) {
      student = state.students[index];
      if (isStudentDeleted(student)) {
        continue;
      }
      state.debugInfo.studentsReviewed += 1;
      portalUser = normalizeIdentifier(student.portalUser || "");
      portalPhone = normalizeIdentifier(student.telefono || "");
      identifierMatches = identifiersMatch(normalizedIdentifier, portalUser) || identifiersMatch(normalizedIdentifier, portalPhone);
      candidatePassword = normalizePassword(student.portalPassword || "");
      profilePassword = normalizePassword(student.profilePassword || "");
      passwordMatches = candidatePassword === normalizedPassword || (!!profilePassword && profilePassword === normalizedPassword);
      if (identifierMatches && passwordMatches) {
        state.debugInfo.matchFound = true;
        state.debugInfo.matchedStudent = (student.nombre || "Sin nombre") + " / " + (student.id || "sin id");
        updateDebug();
        return student;
      }
    }
    updateDebug();
    return null;
  }

  function paymentFromRow(row) {
    var notes = row.notes || row.observaciones || "";
    return {
      id: text(row.id),
      studentId: text(row.student_id || row.studentId),
      mensualidadPactada: text(row.tuition_amount || row.mensualidadPactada),
      certificadoP1: text(extractMetadata(notes, "Certificado P1") || row.certificadoP1 || row.certificate_p1_amount),
      certificadoP2: text(extractMetadata(notes, "Certificado P2") || row.certificadoP2 || row.certificate_p2_amount),
      mensualidad1: text(extractMetadata(notes, "1ra mensualidad") || row.mensualidad1),
      mensualidad2: text(extractMetadata(notes, "2da mensualidad") || row.mensualidad2),
      mensualidad3: text(extractMetadata(notes, "3ra mensualidad") || row.mensualidad3),
      mensualidad4: text(extractMetadata(notes, "4ta mensualidad") || row.mensualidad4),
      mensualidad5: text(extractMetadata(notes, "5ta mensualidad") || row.mensualidad5),
      pagosPendientes: text(row.pending_payments || row.pagosPendientes),
      metodoPago: text(row.payment_method || row.metodoPago),
      cantidadPagada: text(extractMetadata(notes, "Cantidad pagada") || row.cantidadPagada),
      mesPago: text(extractMetadata(notes, "Mes pago") || row.mesPago),
      paymentRealDate: text(extractMetadata(notes, "Fecha real pago") || row.paymentRealDate),
      paymentMovementConcept: text(extractMetadata(notes, "Concepto real pago") || row.paymentMovementConcept),
      observaciones: text(extractMetadata(notes, "Observaciones") || row.observaciones),
      updatedAt: text(row.updated_at || row.updatedAt),
      createdAt: text(row.created_at || row.createdAt)
    };
  }

  function attendanceFromRow(row) {
    return {
      id: text(row.id),
      studentId: text(row.student_id || row.studentId),
      fecha: text(row.attendance_date || row.fecha),
      estado: text(row.status || row.estado),
      observaciones: text(row.notes || row.observaciones),
      createdAt: text(row.created_at || row.createdAt)
    };
  }

  function financeFromRow(row) {
    var notes = row.notes || row.observaciones || "";
    return {
      id: text(row.id),
      fecha: text(row.record_date || row.fecha),
      sucursal: text(row.branch || row.sucursal),
      tipo: text(row.type || row.tipo),
      categoria: text(row.category || row.categoria),
      monto: row.amount != null ? Number(row.amount) : Number(row.monto || 0),
      metodoPago: text(row.payment_method || row.metodoPago),
      reference: text(row.reference),
      relatedStudentId: text(row.related_student_id || row.relatedStudentId),
      concepto: text(extractMetadata(notes, "Concepto real pago") || extractMetadata(notes, "Concepto") || row.concepto),
      cancelled: isConfirmed(extractMetadata(notes, "Cancelado")),
      createdAt: text(row.created_at || row.createdAt)
    };
  }

  function userFromRow(row) {
    return {
      id: text(row.id),
      fullName: text(row.full_name || row.fullName),
      username: text(row.username),
      phone: text(row.phone),
      role: text(row.role),
      branch: text(row.branch),
      status: text(row.status || "Activo")
    };
  }

  function staffFromRow(row) {
    var notes = row.notes || row.observaciones || "";
    return {
      id: text(row.id),
      nombre: text(row.full_name || row.nombre),
      telefono: text(row.phone || row.telefono),
      puesto: text(row.position || row.puesto),
      sucursal: text(row.branch || row.sucursal),
      linkedUserId: text(row.linked_user_id || row.linkedUserId),
      username: text(extractMetadata(notes, "Usuario de acceso") || row.username),
      contactScheduleScope: text(extractMetadata(notes, "Cobertura Mi Venezia") || row.contactScheduleScope),
      estado: text(row.status || row.estado)
    };
  }

  function loadStudentDetails(student, callback) {
    var pending = 5;
    var details = {
      payments: [],
      attendance: [],
      finance: [],
      users: [],
      staff: [],
      errors: {}
    };

    function done() {
      pending -= 1;
      if (pending <= 0) {
        callback(details);
      }
    }

    selectTable("student_payments", {
      select: "id,student_id,tuition_amount,certificate_p1_amount,certificate_p2_amount,first_month_amount,second_month_amount,third_month_amount,fourth_month_amount,fifth_month_amount,pending_payments,payment_method,reports,notes,updated_at,created_at",
      student_id: "eq." + student.id,
      order: "updated_at.desc"
    }, function (error, rows) {
      if (error) {
        details.errors.payments = getErrorMessage(error);
        addDebugError("student_payments: " + details.errors.payments);
        rows = filterByStudent(readStorage(LEGACY_PAYMENTS_KEY, []), student.id);
      }
      details.payments = mapArray(rows || [], paymentFromRow);
      done();
    });

    selectTable("attendance_records", {
      select: "id,student_id,attendance_date,status,notes,recorded_by,created_at",
      student_id: "eq." + student.id,
      order: "attendance_date.desc"
    }, function (error, rows) {
      if (error) {
        details.errors.attendance = getErrorMessage(error);
        addDebugError("attendance_records: " + details.errors.attendance);
        rows = filterByStudent(readStorage(LEGACY_ATTENDANCE_KEY, []), student.id);
      }
      details.attendance = mapArray(rows || [], attendanceFromRow);
      done();
    });

    selectTable("finance_records", {
      select: "id,record_date,branch,type,category,amount,payment_method,reference,related_student_id,related_payment_id,notes,created_at",
      related_student_id: "eq." + student.id,
      order: "record_date.desc"
    }, function (error, rows) {
      if (error) {
        details.errors.finance = getErrorMessage(error);
        addDebugError("finance_records: " + details.errors.finance);
        rows = filterFinanceByStudent(readStorage(LEGACY_FINANCE_KEY, []), student.id);
      }
      details.finance = mapArray(rows || [], financeFromRow);
      done();
    });

    selectTable("internal_users", {
      select: "id,full_name,username,phone,role,branch,status",
      order: "username.asc"
    }, function (error, rows) {
      if (error) {
        details.errors.users = getErrorMessage(error);
        addDebugError("internal_users: " + details.errors.users);
        rows = readStorage(LEGACY_USERS_KEY, []);
      }
      details.users = mapArray(rows || [], userFromRow);
      done();
    });

    selectTable("staff", {
      select: "id,full_name,phone,position,area,branch,hire_date,status,linked_user_id,notes,created_at",
      order: "created_at.desc"
    }, function (error, rows) {
      if (error) {
        details.errors.staff = getErrorMessage(error);
        addDebugError("staff: " + details.errors.staff);
        rows = readStorage(LEGACY_STAFF_KEY, []);
      }
      details.staff = mapArray(rows || [], staffFromRow);
      done();
    });
  }

  function filterByStudent(rows, studentId) {
    var result = [];
    var index;
    for (index = 0; rows && index < rows.length; index += 1) {
      if (text(rows[index].student_id || rows[index].studentId) === text(studentId)) {
        result.push(rows[index]);
      }
    }
    return result;
  }

  function filterFinanceByStudent(rows, studentId) {
    var result = [];
    var index;
    for (index = 0; rows && index < rows.length; index += 1) {
      if (text(rows[index].related_student_id || rows[index].relatedStudentId) === text(studentId)) {
        result.push(rows[index]);
      }
    }
    return result;
  }

  function formatDate(value) {
    var source = text(value).slice(0, 10);
    var parts;
    if (!source) {
      return "-";
    }
    parts = source.split("-");
    if (parts.length === 3) {
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    }
    return source;
  }

  function formatMoney(value) {
    var amount = Number(String(value || "").replace(/[$,\s]/g, ""));
    var rounded;
    var integerPart;
    if (!isFinite(amount) || amount <= 0) {
      return text(value) || "-";
    }
    rounded = Math.round(amount);
    integerPart = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + integerPart;
  }

  function safe(value, fallback) {
    var normalized = text(value);
    return normalized || (fallback || "Sin información disponible");
  }

  function getDocumentsState(student) {
    var raw = safe(student.documentos, "Por confirmar");
    var normalized = normalizeLoose(raw);
    var complete = normalized.indexOf("completa") !== -1 || normalized.indexOf("completo") !== -1 || normalized.indexOf("entregada") !== -1;
    var pending = normalized.indexOf("pendiente") !== -1 || normalized.indexOf("falta") !== -1 || normalized.indexOf("incompleta") !== -1 || !student.documentos;
    var count = 0;
    if (pending && !complete) {
      count += 1;
    }
    if (!student.lecturaReglamento) {
      count += 1;
    }
    if (!student.lecturaContrato) {
      count += 1;
    }
    return {
      raw: raw,
      complete: complete && count === 0,
      pendingCount: count,
      label: count === 0 ? "Documentación completa" : (count === 1 ? "1 pendiente" : count + " pendientes")
    };
  }

  function normalizePaymentStatus(value) {
    var normalized = normalizeLoose(value);
    if (normalized === "pagado" || normalized === "pagada") {
      return "Pagado";
    }
    if (normalized === "parcial") {
      return "Parcial";
    }
    if (normalized === "pendiente") {
      return "Pendiente";
    }
    if (normalized === "no aplica") {
      return "No aplica";
    }
    return text(value);
  }

  function buildPaymentReferences(payments) {
    var fields = [
      ["certificadoP1", "Certificado P1"],
      ["certificadoP2", "Certificado P2"],
      ["mensualidad1", "1ra mensualidad"],
      ["mensualidad2", "2da mensualidad"],
      ["mensualidad3", "3ra mensualidad"],
      ["mensualidad4", "4ta mensualidad"],
      ["mensualidad5", "5ta mensualidad"]
    ];
    var result = [];
    var paymentIndex;
    var fieldIndex;
    var value;
    for (paymentIndex = 0; paymentIndex < payments.length; paymentIndex += 1) {
      for (fieldIndex = 0; fieldIndex < fields.length; fieldIndex += 1) {
        value = normalizePaymentStatus(payments[paymentIndex][fields[fieldIndex][0]]);
        if (value && value !== "0") {
          result.push({
            label: fields[fieldIndex][1],
            status: value,
            month: payments[paymentIndex].mesPago || "",
            updatedAt: payments[paymentIndex].updatedAt || payments[paymentIndex].createdAt || ""
          });
        }
      }
    }
    return result;
  }

  function getPaymentsSummary(details) {
    var references = buildPaymentReferences(details.payments || []);
    var pending = 0;
    var paid = 0;
    var partial = 0;
    var index;
    var latest = details.payments && details.payments.length ? details.payments[0] : {};
    var finance = [];
    for (index = 0; details.finance && index < details.finance.length; index += 1) {
      if (!details.finance[index].cancelled && normalizeLoose(details.finance[index].tipo) !== "egreso") {
        finance.push(details.finance[index]);
      }
    }
    for (index = 0; index < references.length; index += 1) {
      if (references[index].status === "Pagado") {
        paid += 1;
      } else if (references[index].status === "Parcial") {
        partial += 1;
        pending += 1;
      } else if (references[index].status === "Pendiente") {
        pending += 1;
      }
    }
    return {
      references: references,
      finance: finance,
      paid: paid,
      partial: partial,
      pending: pending,
      latest: latest,
      status: pending > 0 ? (pending === 1 ? "1 pago pendiente" : pending + " pagos pendientes") : (paid || finance.length ? "Al corriente visible" : "Por confirmar")
    };
  }

  function normalizeAttendanceStatus(value) {
    var normalized = normalizeLoose(value);
    if (normalized === "asistencia" || normalized === "asistio" || normalized === "asistio") {
      return "Asistencia";
    }
    if (normalized === "falta") {
      return "Falta";
    }
    if (normalized === "permiso") {
      return "Permiso";
    }
    if (normalized === "recuperacion") {
      return "Recuperación";
    }
    return text(value) || "Sin estado";
  }

  function getAttendanceSummary(records) {
    var total = records ? records.length : 0;
    var asistencias = 0;
    var faltas = 0;
    var permisos = 0;
    var recuperaciones = 0;
    var index;
    var status;
    for (index = 0; records && index < records.length; index += 1) {
      status = normalizeAttendanceStatus(records[index].estado);
      if (status === "Asistencia") {
        asistencias += 1;
      } else if (status === "Falta") {
        faltas += 1;
      } else if (status === "Permiso") {
        permisos += 1;
      } else if (status === "Recuperación") {
        recuperaciones += 1;
      }
    }
    return {
      total: total,
      asistencias: asistencias,
      faltas: faltas,
      permisos: permisos,
      recuperaciones: recuperaciones,
      percentage: total > 0 ? Math.round(((asistencias + recuperaciones) / total) * 100) : 0
    };
  }

  function infoItem(label, value) {
    return '<article class="mv2-info-item"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(safe(value, "-")) + '</strong></article>';
  }

  function renderHeader(student, details) {
    var docState = getDocumentsState(student);
    var paymentSummary = details ? getPaymentsSummary(details) : null;
    var attendanceSummary = details ? getAttendanceSummary(details.attendance) : null;
    byId("studentName").textContent = student.nombre || "Estudiante";
    byId("studentMeta").textContent = safe(student.curso, "Curso por confirmar") + " | " + safe(student.sucursal, "Plantel por confirmar") + " | " + safe(student.horario, "Horario por confirmar");
    byId("heroGreeting").textContent = "Hola, " + (student.nombre || "estudiante");
    byId("heroCourse").textContent = safe(student.curso, "Tu curso Venezia");
    byId("heroDetails").textContent = safe(student.sucursal, "Plantel por confirmar") + " | " + safe(student.horario, "Horario por confirmar");
    byId("heroDocStatus").textContent = docState.label;
    byId("quickStats").innerHTML =
      statCard("Curso activo", safe(student.curso, "-"), safe(student.horario, "Horario pendiente")) +
      statCard("Pagos", paymentSummary ? paymentSummary.status : "Cargando...", "Mensualidad: " + safe(student.mensualidad || student.colegiatura, "-")) +
      statCard("Asistencia", attendanceSummary ? attendanceSummary.percentage + "%" : "Cargando...", attendanceSummary ? attendanceSummary.asistencias + " asistencias registradas" : "Leyendo clases") +
      statCard("Documentos", docState.label, docState.raw);
  }

  function statCard(label, value, meta) {
    return '<article class="mv2-stat-card"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(meta || "") + '</small></article>';
  }

  function renderAllPanels(student, details) {
    renderInicio(student, details);
    renderPerfil(student);
    renderPagos(student, details);
    renderAsistencias(student, details);
    renderDocumentos(student);
    renderContacto(student, details);
  }

  function renderInicio(student, details) {
    var docState = getDocumentsState(student);
    var payments = details ? getPaymentsSummary(details) : null;
    var attendance = details ? getAttendanceSummary(details.attendance) : null;
    byId("panelInicio").innerHTML =
      '<div class="mv2-panel-header"><h2>Inicio</h2><p>Resumen real de tu expediente en Venezia.</p></div>' +
      '<div class="mv2-info-grid">' +
      infoItem("Curso activo", student.curso) +
      infoItem("Plantel", student.sucursal) +
      infoItem("Horario", student.horario) +
      infoItem("Documentación", docState.label) +
      infoItem("Pagos", payments ? payments.status : "Cargando pagos...") +
      infoItem("Asistencia", attendance ? attendance.percentage + "% visible" : "Cargando asistencias...") +
      '</div>' +
      '<div class="mv2-pill-row">' +
      '<span class="mv2-pill">' + escapeHtml(safe(student.estado, "Activa")) + '</span>' +
      '<span class="mv2-pill">' + escapeHtml(safe(student.accesoElegido, "Acceso por confirmar")) + '</span>' +
      '<span class="mv2-pill">' + escapeHtml(formatDate(student.fechaInicio)) + '</span>' +
      '</div>';
  }

  function renderPerfil(student) {
    byId("panelPerfil").innerHTML =
      '<div class="mv2-panel-header"><h2>Perfil</h2><p>Datos registrados en tu alta.</p></div>' +
      '<div class="mv2-info-grid">' +
      infoItem("Nombre", student.nombre) +
      infoItem("Teléfono", student.telefono) +
      infoItem("Usuario Mi Venezia", student.portalUser) +
      infoItem("Correo", student.correo) +
      infoItem("Curso", student.curso) +
      infoItem("Plantel", student.sucursal) +
      infoItem("Horario", student.horario) +
      infoItem("Inicio", formatDate(student.fechaInicio)) +
      infoItem("Tutor", student.tutor) +
      infoItem("Dirección", student.direccion) +
      '</div>';
  }

  function renderPagos(student, details) {
    var summary;
    var html;
    var index;
    if (!details || details.errors.payments) {
      byId("panelPagos").innerHTML = '<div class="mv2-panel-header"><h2>Pagos</h2><p>No pudimos cargar tus pagos en este momento.</p></div><div class="mv2-empty">No pudimos cargar tus pagos en este momento.</div>';
      return;
    }
    summary = getPaymentsSummary(details);
    html =
      '<div class="mv2-panel-header"><h2>Pagos</h2><p>Pagos realizados, mensualidades y pendientes visibles.</p></div>' +
      '<div class="mv2-info-grid">' +
      infoItem("Estado básico", summary.status) +
      infoItem("Mensualidad registrada", student.mensualidad || student.colegiatura || summary.latest.mensualidadPactada) +
      infoItem("Método de pago", summary.latest.metodoPago || student.metodoPago) +
      infoItem("Pagos pendientes", summary.latest.pagosPendientes || String(summary.pending)) +
      '</div>';

    html += '<div class="mv2-section-block"><h3>Pagos realizados</h3><div class="mv2-payment-list">';
    if (summary.finance.length) {
      for (index = 0; index < summary.finance.length; index += 1) {
        html += '<article class="mv2-payment-item"><span>' + escapeHtml(formatDate(summary.finance[index].fecha)) + '</span><strong>' + escapeHtml(summary.finance[index].concepto || "Pago registrado") + '</strong><small>' + escapeHtml(formatMoney(summary.finance[index].monto) + " | " + safe(summary.finance[index].metodoPago, "Método no registrado")) + '</small></article>';
      }
    } else if (details.payments.length) {
      for (index = 0; index < details.payments.length; index += 1) {
        html += '<article class="mv2-payment-item"><span>' + escapeHtml(formatDate(details.payments[index].paymentRealDate || details.payments[index].updatedAt || details.payments[index].createdAt)) + '</span><strong>' + escapeHtml(details.payments[index].paymentMovementConcept || details.payments[index].mesPago || "Pago registrado") + '</strong><small>' + escapeHtml(formatMoney(details.payments[index].cantidadPagada || details.payments[index].mensualidadPactada) + " | " + safe(details.payments[index].metodoPago, "Método no registrado")) + '</small></article>';
      }
    } else {
      html += '<div class="mv2-empty">No hay pagos realizados visibles por ahora.</div>';
    }
    html += '</div></div>';

    html += '<div class="mv2-section-block"><h3>Mensualidades y próximos pagos</h3><div class="mv2-payment-list">';
    if (summary.references.length) {
      for (index = 0; index < summary.references.length; index += 1) {
        html += '<article class="mv2-payment-item"><span>' + escapeHtml(summary.references[index].label) + '</span><strong>' + escapeHtml(summary.references[index].status) + '</strong><small>' + escapeHtml(summary.references[index].month || "Sin mes específico") + '</small></article>';
      }
    } else {
      html += '<div class="mv2-empty">No hay próximos pagos registrados en este momento.</div>';
    }
    html += '</div></div>';
    byId("panelPagos").innerHTML = html;
  }

  function renderAsistencias(student, details) {
    var summary;
    var html;
    var index;
    if (!details || details.errors.attendance) {
      byId("panelAsistencias").innerHTML = '<div class="mv2-panel-header"><h2>Clases / Asistencias</h2><p>No pudimos cargar tus asistencias en este momento.</p></div><div class="mv2-empty">No pudimos cargar tus asistencias en este momento.</div>';
      return;
    }
    summary = getAttendanceSummary(details.attendance);
    html =
      '<div class="mv2-panel-header"><h2>Clases / Asistencias</h2><p>Resumen de asistencias registradas.</p></div>' +
      '<div class="mv2-info-grid">' +
      infoItem("Asistencias", String(summary.asistencias)) +
      infoItem("Faltas", String(summary.faltas)) +
      infoItem("Permisos", String(summary.permisos)) +
      infoItem("Avance visible", summary.percentage + "%") +
      '</div>' +
      '<div class="mv2-section-block"><h3>Historial</h3><div class="mv2-list">';
    if (details.attendance.length) {
      for (index = 0; index < details.attendance.length; index += 1) {
        html += '<article class="mv2-list-item"><span>' + escapeHtml(formatDate(details.attendance[index].fecha)) + '</span><strong>' + escapeHtml(normalizeAttendanceStatus(details.attendance[index].estado)) + '</strong><small>' + escapeHtml(details.attendance[index].observaciones || "Sin observaciones") + '</small></article>';
      }
    } else {
      html += '<div class="mv2-empty">Aún no hay asistencias registradas visibles.</div>';
    }
    html += '</div></div>';
    byId("panelAsistencias").innerHTML = html;
  }

  function renderDocumentos(student) {
    var docState = getDocumentsState(student);
    byId("panelDocumentos").innerHTML =
      '<div class="mv2-panel-header"><h2>Documentos</h2><p>Estado básico de tu documentación.</p></div>' +
      '<div class="mv2-doc-list">' +
      '<article class="mv2-doc-item"><span>Documentación general</span><strong>' + escapeHtml(docState.raw) + '</strong><small>' + escapeHtml(docState.complete ? "Completa" : "Pendiente o por confirmar") + '</small></article>' +
      '<article class="mv2-doc-item"><span>Reglamento</span><strong>' + escapeHtml(student.lecturaReglamento ? "Lectura confirmada" : "Lectura pendiente") + '</strong><small>' + escapeHtml(student.fechaLecturaReglamento || "Sin fecha registrada") + '</small></article>' +
      '<article class="mv2-doc-item"><span>Contrato</span><strong>' + escapeHtml(student.lecturaContrato ? "Lectura confirmada" : "Lectura pendiente") + '</strong><small>' + escapeHtml(student.fechaLecturaContrato || "Sin fecha registrada") + '</small></article>' +
      '</div>' +
      '<div class="mv2-section-block"><h3>Documentos pendientes</h3><div class="mv2-empty">' +
      escapeHtml(docState.pendingCount === 0 ? "No se detectan pendientes visibles." : docState.label + ". Si ya entregaste algo, contacta a soporte para validarlo.") +
      '</div></div>';
  }

  function normalizeScope(value) {
    var normalized = normalizeLoose(value);
    if (!normalized) {
      return "";
    }
    if (normalized === "all" || normalized.indexOf("toda la sucursal") !== -1 || normalized.indexOf("general") !== -1) {
      return "all";
    }
    if (normalized === "weekday" || normalized.indexOf("entre semana") !== -1) {
      return "weekday";
    }
    if (normalized === "weekend" || normalized.indexOf("fin de semana") !== -1 || normalized.indexOf("sabado") !== -1 || normalized.indexOf("domingo") !== -1 || normalized.indexOf("viernes") !== -1) {
      return "weekend";
    }
    return "";
  }

  function classifySchedule(student) {
    var source = normalizeLoose([student.diaClases, student.horario, student.schedule].join(" "));
    if (!source) {
      return "unknown";
    }
    if (/\bfin de semana\b/.test(source) || /\bviernes\b/.test(source) || /\bsabado\b/.test(source) || /\bdomingo\b/.test(source)) {
      return "weekend";
    }
    if (/\bentre semana\b/.test(source) || /\blunes\b/.test(source) || /\bmartes\b/.test(source) || /\bmiercoles\b/.test(source) || /\bjueves\b/.test(source)) {
      return "weekday";
    }
    return "unknown";
  }

  function resolveContact(student, details) {
    var branch = normalizeLoose(student.sucursal);
    var scheduleType = classifySchedule(student);
    var candidates = [];
    var index;
    var user;
    var staff;
    var phone;
    var coverage;
    if (details && details.users && details.staff) {
      for (index = 0; index < details.users.length; index += 1) {
        user = details.users[index];
        if (normalizeLoose(user.status || "Activo") === "inactivo" || user.role !== "Director de sucursal") {
          continue;
        }
        staff = findLinkedStaff(user, details.staff);
        if (normalizeLoose((staff && staff.sucursal) || user.branch) !== branch) {
          continue;
        }
        phone = normalizePhone((staff && staff.telefono) || user.phone);
        coverage = normalizeScope((staff && staff.contactScheduleScope) || "");
        if (phone) {
          candidates.push({ phone: phone, coverage: coverage, name: (staff && staff.nombre) || user.fullName || "Dirección de sucursal" });
        }
      }
    }
    if (candidates.length === 1) {
      return candidates[0];
    }
    for (index = 0; index < candidates.length; index += 1) {
      if (scheduleType !== "unknown" && candidates[index].coverage === scheduleType) {
        return candidates[index];
      }
    }
    for (index = 0; index < candidates.length; index += 1) {
      if (candidates[index].coverage === "all") {
        return candidates[index];
      }
    }
    for (index = 0; index < BOOTSTRAP_DIRECTORS.length; index += 1) {
      if (normalizeLoose(BOOTSTRAP_DIRECTORS[index].branch) === branch && BOOTSTRAP_DIRECTORS[index].scheduleType === scheduleType) {
        return { phone: normalizePhone(BOOTSTRAP_DIRECTORS[index].phone), coverage: "bootstrap", name: "Soporte de sucursal" };
      }
    }
    return { phone: SUPPORT_WHATSAPP, coverage: "support", name: "Soporte Venezia" };
  }

  function findLinkedStaff(user, staffList) {
    var index;
    for (index = 0; index < staffList.length; index += 1) {
      if (staffList[index].linkedUserId && staffList[index].linkedUserId === user.id) {
        return staffList[index];
      }
    }
    for (index = 0; index < staffList.length; index += 1) {
      if (staffList[index].username && user.username && normalizeLoose(staffList[index].username) === normalizeLoose(user.username)) {
        return staffList[index];
      }
    }
    return null;
  }

  function whatsappUrl(phone, message) {
    var normalized = normalizePhone(phone);
    if (!normalized || normalized.length < 10) {
      normalized = SUPPORT_WHATSAPP;
    }
    return "https://wa.me/" + normalized + "?text=" + encodeURIComponent(message);
  }

  function renderContacto(student, details) {
    var contact = resolveContact(student, details || {});
    var message = "Hola, soy " + (student.nombre || "estudiante") + " y necesito apoyo con mi cuenta de Mi Venezia V2.";
    byId("panelContacto").innerHTML =
      '<div class="mv2-panel-header"><h2>Contacto</h2><p>Soporte directo para pagos, clases, documentos o acceso.</p></div>' +
      '<div class="mv2-info-grid">' +
      infoItem("Contacto asignado", contact.name) +
      infoItem("Plantel", student.sucursal) +
      infoItem("Horario", student.horario) +
      infoItem("Cobertura", contact.coverage || "Soporte") +
      '</div>' +
      '<a class="mv2-whatsapp-btn" href="' + escapeHtml(whatsappUrl(contact.phone, message)) + '" target="_blank" rel="noopener">Abrir WhatsApp</a>';
  }

  function renderDashboard(student, details) {
    try {
      renderHeader(student, details);
      renderAllPanels(student, details);
      state.debugInfo.dashboardOpened = true;
      updateDebug();
    } catch (error) {
      showRuntimeError("Mi Venezia V2 abrió, pero un bloque del dashboard no se pudo pintar completo.", error);
      renderSafeFallback(student);
    }
  }

  function renderSafeFallback(student) {
    byId("panelInicio").innerHTML = '<div class="mv2-panel-header"><h2>Inicio</h2><p>Tu portal abrió en modo compatible.</p></div><div class="mv2-empty">No pudimos cargar todos los bloques, pero tu acceso es correcto. Intenta actualizar o contacta soporte.</div>';
    byId("studentName").textContent = student && student.nombre ? student.nombre : "Estudiante";
  }

  function openDashboard(student) {
    state.currentStudent = student;
    byId("loginView").hidden = true;
    byId("dashboardView").hidden = false;
    setFeedback("");
    renderDashboard(student, null);
    loadStudentDetails(student, function (details) {
      state.details = details;
      renderDashboard(student, details);
    });
  }

  function handleLogin(event) {
    var now = new Date().getTime();
    var loginUser;
    var password;
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (state.loginBusy || now - state.lastLoginAt < 650) {
      return false;
    }
    state.lastLoginAt = now;
    loginUser = byId("loginUser") ? byId("loginUser").value : "";
    password = byId("loginPassword") ? byId("loginPassword").value : "";
    state.debugInfo.capturedUser = text(loginUser);
    state.debugInfo.normalizedUser = normalizeIdentifier(loginUser);
    state.debugInfo.passwordLength = normalizePassword(password).length;
    updateDebug();
    setLoginBusy(true, "Validando...");
    setFeedback("Validando acceso...");

    loadStudents(function (error) {
      var student;
      if (error && !state.students.length) {
        setLoginBusy(false);
        showRuntimeError("No pudimos cargar la fuente de datos. Intenta de nuevo en unos segundos.", error);
        return;
      }
      student = findStudentForLogin(loginUser, password);
      if (!student) {
        setLoginBusy(false);
        setFeedback("Usuario o contraseña incorrectos", "error");
        return;
      }
      saveSession(student);
      setLoginBusy(false);
      openDashboard(student);
    });
    return false;
  }

  function bindEvents() {
    var form = byId("loginForm");
    var button = byId("loginButton");
    var logout = byId("logoutButton");
    var tabs = byId("tabsNav");
    if (form) {
      form.onsubmit = handleLogin;
    }
    if (button) {
      button.onclick = function () {};
      button.addEventListener("touchend", function (event) {
        handleLogin(event);
      }, false);
    }
    if (logout) {
      logout.onclick = function () {
        clearSession();
        state.currentStudent = null;
        byId("dashboardView").hidden = true;
        byId("loginView").hidden = false;
        setFeedback("Sesión cerrada.");
      };
    }
    if (tabs) {
      tabs.onclick = function (event) {
        var target = event.target || event.srcElement;
        var tab = target && target.getAttribute ? target.getAttribute("data-tab") : "";
        if (tab) {
          activateTab(tab);
        }
      };
    }
  }

  function activateTab(tab) {
    var tabs = document.querySelectorAll ? document.querySelectorAll(".mv2-tab") : [];
    var panels = document.querySelectorAll ? document.querySelectorAll(".mv2-panel") : [];
    var index;
    for (index = 0; index < tabs.length; index += 1) {
      if (tabs[index].getAttribute("data-tab") === tab) {
        tabs[index].className = "mv2-tab is-active";
      } else {
        tabs[index].className = "mv2-tab";
      }
    }
    for (index = 0; index < panels.length; index += 1) {
      if (panels[index].getAttribute("data-panel") === tab) {
        panels[index].className = "mv2-panel is-active";
      } else {
        panels[index].className = "mv2-panel";
      }
    }
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      addDebugError("scroll: " + getErrorMessage(error));
    }
  }

  function tryRestoreSession() {
    var session = readSession();
    var student = null;
    var index;
    if (!session || !session.studentId) {
      return;
    }
    loadStudents(function () {
      for (index = 0; index < state.students.length; index += 1) {
        if (state.students[index].id === session.studentId && !isStudentDeleted(state.students[index])) {
          student = state.students[index];
          break;
        }
      }
      if (student) {
        openDashboard(student);
      } else {
        clearSession();
      }
    });
  }

  function installGlobalErrors() {
    window.onerror = function (message, source, line, column, error) {
      showRuntimeError("Mi Venezia V2 detectó un error, pero no se cerró.", error || message);
      addDebugError("window.onerror " + source + ":" + line + " " + message);
      return false;
    };
    window.onunhandledrejection = function (event) {
      var reason = event && event.reason ? event.reason : event;
      showRuntimeError("Mi Venezia V2 detectó un error de carga, pero sigue visible.", reason);
    };
  }

  function init() {
    state.debug = getQueryFlag("debug");
    state.debugInfo.userAgent = navigator.userAgent || "";
    installGlobalErrors();
    bindEvents();
    updateDebug();
    loadStudents(function () {
      tryRestoreSession();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
