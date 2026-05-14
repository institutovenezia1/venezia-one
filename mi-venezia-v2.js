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
  var TLAXCALA_WEEKEND_DIRECTOR_WHATSAPP = "2461379504";
  var DEFAULT_ATTENDANCE_SESSION_COUNT = 16;
  // Misma referencia de Pagos: cada concepto vence en la sesión marcada.
  var PAYMENT_CALENDAR_RULES = [
    { field: "mensualidad1", label: "Mensualidad 1", shortLabel: "Men1", sessionIndex: 0, amountField: "mensualidad1Amount", amountType: "monthly" },
    { field: "mensualidad2", label: "Mensualidad 2", shortLabel: "Men2", sessionIndex: 3, amountField: "mensualidad2Amount", amountType: "monthly" },
    { field: "certificadoP1", label: "Certificado C1", shortLabel: "C1", sessionIndex: 4, amountField: "certificadoP1Amount", amountType: "certificate" },
    { field: "mensualidad3", label: "Mensualidad 3", shortLabel: "Men3", sessionIndex: 7, amountField: "mensualidad3Amount", amountType: "monthly" },
    { field: "certificadoP2", label: "Certificado C2", shortLabel: "C2", sessionIndex: 8, amountField: "certificadoP2Amount", amountType: "certificate" },
    { field: "mensualidad4", label: "Mensualidad 4", shortLabel: "Men4", sessionIndex: 11, amountField: "mensualidad4Amount", amountType: "monthly" },
    { field: "mensualidad5", label: "Mensualidad 5", shortLabel: "Men5", sessionIndex: 15, amountField: "mensualidad5Amount", amountType: "monthly", onlyFifthMonth: true }
  ];
  var STUDENT_DOCUMENT_REQUIREMENTS = [
    "Reglamento interno",
    "Contrato de alumno",
    "Acta de nacimiento",
    "CURP",
    "INE",
    "Comprobante de domicilio",
    "Comprobante de último grado de estudios"
  ];
  var DOCUMENT_DOWNLOADS = [
    { label: "Descargar reglamento interno", href: "/images/reglamentooficial-venezia.pdf" },
    { label: "Descargar contrato de alumno", href: "/images/CONTRATO-ALUMNO.pdf" }
  ];
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

  function clearRuntimeMessage() {
    var box = byId("runtimeErrorBox");
    if (box) {
      box.hidden = true;
      box.textContent = "";
    }
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

  function getDocumentKey(value) {
    return normalizeLoose(value);
  }

  function parseDocumentList(value) {
    var rawItems = Array.isArray(value) ? value : String(value || "").split(",");
    var canonical = {};
    var aliases = {};
    var seen = {};
    var items = [];
    var index;
    var item;
    var key;

    for (index = 0; index < STUDENT_DOCUMENT_REQUIREMENTS.length; index += 1) {
      canonical[getDocumentKey(STUDENT_DOCUMENT_REQUIREMENTS[index])] = STUDENT_DOCUMENT_REQUIREMENTS[index];
    }

    aliases[getDocumentKey("INE / identificación oficial")] = ["INE"];
    aliases[getDocumentKey("Comprobante de estudios")] = ["Comprobante de último grado de estudios"];
    aliases[getDocumentKey("Reglamento / contrato firmado")] = ["Reglamento interno", "Contrato de alumno"];
    aliases[getDocumentKey("Reglamento firmado")] = ["Reglamento interno"];
    aliases[getDocumentKey("Contrato firmado")] = ["Contrato de alumno"];
    aliases[getDocumentKey("Contrato de inscripción")] = ["Contrato de alumno"];

    for (index = 0; index < rawItems.length; index += 1) {
      item = text(rawItems[index]);
      if (!item || item === "-") {
        continue;
      }
      key = getDocumentKey(item);
      if (canonical[key]) {
        aliases[key] = [canonical[key]];
      }
      if (!aliases[key]) {
        continue;
      }
      aliases[key].forEach(function (documentName) {
        var documentKey = getDocumentKey(documentName);
        if (!documentKey || seen[documentKey]) {
          return;
        }
        seen[documentKey] = true;
        items.push(documentName);
      });
    }

    return items;
  }

  function normalizeDocumentationStatus(value) {
    var normalized = normalizeLoose(value);
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
    return text(value);
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
      documentosEntregados: parseDocumentList(row.documentosEntregados || extractMetadata(notes, "Documentos entregados")),
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
    var normalized = normalizeLoose(student && student.estado);
    return normalized === "eliminada" || normalized === "eliminado";
  }

  function getStudentStatusInfo(student) {
    var normalized = normalizeLoose(student && student.estado);
    if (normalized === "baja temporal") {
      return {
        key: "paused",
        label: "Baja temporal",
        badge: "Estado: Baja temporal",
        heroTitle: "Acceso en pausa temporal",
        notice: "Tu acceso se encuentra en pausa temporal. Si deseas reactivar tu curso, comunícate con Dirección.",
        intro: "Tu expediente permanece disponible para consulta de historial, pagos, clases, documentos y contacto.",
        courseLabel: "Curso en expediente",
        paymentCopy: "Historial de pagos registrados en tu expediente.",
        attendanceCopy: "Historial de clases y asistencias registradas."
      };
    }
    if (normalized === "baja definitiva") {
      return {
        key: "withdrawn",
        label: "Baja definitiva",
        badge: "Estado: Baja definitiva",
        heroTitle: "Expediente en historial",
        notice: "Tu curso fue dado de baja de forma definitiva. Si deseas más información o revisar tu expediente, comunícate con Dirección.",
        intro: "Puedes consultar tu historial visible de pagos, documentos y clases registradas.",
        courseLabel: "Curso en historial",
        paymentCopy: "Historial de pagos registrados en tu expediente.",
        attendanceCopy: "Historial de clases y asistencias registradas."
      };
    }
    if (normalized === "curso finalizado") {
      return {
        key: "completed",
        label: "Curso finalizado",
        badge: "Estado: Curso finalizado",
        heroTitle: "Curso finalizado",
        notice: "¡Felicidades! Has finalizado tu curso en Instituto Venezia.",
        intro: "Tu expediente queda disponible como historial académico y financiero.",
        courseLabel: "Curso finalizado",
        paymentCopy: "Historial de pagos del curso finalizado.",
        attendanceCopy: "Historial de asistencias del curso finalizado."
      };
    }
    if (normalized === "eliminada" || normalized === "eliminado") {
      return {
        key: "unavailable",
        label: "Acceso no disponible",
        badge: "Acceso no disponible",
        heroTitle: "Acceso no disponible",
        notice: "Tu acceso no está disponible. Comunícate con Dirección.",
        intro: "Comunícate con Dirección para revisar el estado de tu acceso.",
        courseLabel: "Estado del acceso",
        paymentCopy: "",
        attendanceCopy: ""
      };
    }
    return {
      key: "active",
      label: "Activa",
      badge: "Estado: Activa",
      heroTitle: safe(student && student.curso, "Tu curso Venezia"),
      notice: "",
      intro: "Resumen real de tu expediente en Venezia.",
      courseLabel: "Curso actual",
      paymentCopy: "Pagos realizados, mensualidades y pendientes visibles.",
      attendanceCopy: "Resumen de asistencias registradas."
    };
  }

  function statusBadgeHtml(statusInfo) {
    return '<span class="mv2-status-badge mv2-status-' + escapeHtml(statusInfo.key) + '">' + escapeHtml(statusInfo.badge) + '</span>';
  }

  function statusNoticeHtml(statusInfo) {
    if (!statusInfo.notice || statusInfo.key === "active") {
      return "";
    }
    return '<div class="mv2-status-notice mv2-status-' + escapeHtml(statusInfo.key) + '">' + escapeHtml(statusInfo.notice) + '</div>';
  }

  function showUnavailableAccessMessage() {
    var box = byId("runtimeErrorBox");
    clearSession();
    state.currentStudent = null;
    state.details = null;
    if (byId("dashboardView")) {
      byId("dashboardView").hidden = true;
    }
    if (byId("loginView")) {
      byId("loginView").hidden = false;
    }
    setLoginBusy(false);
    setFeedback("Tu acceso no está disponible. Comunícate con Dirección.", "error");
    if (box) {
      box.hidden = false;
      box.innerHTML = '<strong>Acceso no disponible</strong><span>Tu acceso no está disponible. Comunícate con Dirección.</span>';
    }
    updateDebug();
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
      state.debugInfo.studentsReviewed += 1;
      portalUser = normalizeIdentifier(student.portalUser || "");
      portalPhone = normalizeIdentifier(student.telefono || "");
      identifierMatches = identifiersMatch(normalizedIdentifier, portalUser) || identifiersMatch(normalizedIdentifier, portalPhone);
      candidatePassword = normalizePassword(student.portalPassword || "");
      profilePassword = normalizePassword(student.profilePassword || "");
      passwordMatches = candidatePassword === normalizedPassword || (!!profilePassword && profilePassword === normalizedPassword);
      if (identifierMatches && passwordMatches) {
        state.debugInfo.matchFound = true;
        state.debugInfo.matchedStudent = isStudentDeleted(student) ? "Acceso no disponible" : (student.nombre || "Sin nombre") + " / " + (student.id || "sin id");
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
      certificadoP1Amount: text(row.certificate_p1_amount || row.certificadoP1Amount),
      certificadoP2Amount: text(row.certificate_p2_amount || row.certificadoP2Amount),
      mensualidad1Amount: text(row.first_month_amount || row.mensualidad1Amount),
      mensualidad2Amount: text(row.second_month_amount || row.mensualidad2Amount),
      mensualidad3Amount: text(row.third_month_amount || row.mensualidad3Amount),
      mensualidad4Amount: text(row.fourth_month_amount || row.mensualidad4Amount),
      mensualidad5Amount: text(row.fifth_month_amount || row.mensualidad5Amount),
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
      relatedPaymentId: text(row.related_payment_id || row.relatedPaymentId),
      conceptKey: text(extractMetadata(notes, "Clave de concepto") || row.conceptKey),
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

  function twoDigit(value) {
    return ("0" + value).slice(-2);
  }

  function formatDateKey(date) {
    return [
      date.getFullYear(),
      twoDigit(date.getMonth() + 1),
      twoDigit(date.getDate())
    ].join("-");
  }

  function parseLocalDateKey(value) {
    var match = text(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    var year;
    var month;
    var day;
    var date;
    if (!match) {
      return null;
    }
    year = Number(match[1]);
    month = Number(match[2]);
    day = Number(match[3]);
    date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }
    return date;
  }

  function normalizeLocalDateKey(value) {
    var normalized = text(value);
    var directDate = parseLocalDateKey(normalized);
    var slicedDate;
    if (directDate) {
      return formatDateKey(directDate);
    }
    slicedDate = parseLocalDateKey(normalized.slice(0, 10));
    return slicedDate ? formatDateKey(slicedDate) : "";
  }

  function addDaysToDateKey(dateKey, days) {
    var baseDate = parseLocalDateKey(dateKey);
    var nextDate;
    if (!baseDate) {
      return "";
    }
    nextDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    nextDate.setDate(nextDate.getDate() + days);
    return formatDateKey(nextDate);
  }

  function normalizeAttendanceDayLabel(dayLabel) {
    var normalized = normalizeLoose(dayLabel);
    if (!normalized) {
      return "";
    }
    if (normalized === "viernes") {
      return "Viernes";
    }
    if (normalized === "sabado") {
      return "Sábado";
    }
    if (normalized === "domingo") {
      return "Domingo";
    }
    if (
      normalized === "entre semana" ||
      normalized === "entresemana" ||
      normalized === "martes a jueves" ||
      normalized === "martes-jueves" ||
      normalized === "martes a jueves (3 dias)"
    ) {
      return "Entre semana";
    }
    return text(dayLabel);
  }

  function getStudentClassDayLabel(student) {
    var source = normalizeLoose([
      student && student.diaClases,
      student && student.horario,
      student && student.schedule
    ].join(" "));
    if (!source) {
      return "";
    }
    if (
      source.indexOf("entre semana") !== -1 ||
      source.indexOf("martes a jueves") !== -1 ||
      source.indexOf("martes-jueves") !== -1 ||
      source.indexOf("3 dias") !== -1 ||
      source.indexOf("tres dias") !== -1 ||
      source.indexOf("lunes a jueves") !== -1 ||
      source.indexOf("martes y jueves") !== -1 ||
      source.indexOf("lunes y miercoles") !== -1
    ) {
      return "Entre semana";
    }
    if (source.indexOf("viernes") !== -1) {
      return "Viernes";
    }
    if (source.indexOf("sabado") !== -1) {
      return "Sábado";
    }
    if (source.indexOf("domingo") !== -1) {
      return "Domingo";
    }
    return normalizeAttendanceDayLabel(student && student.diaClases);
  }

  function getAttendanceWeekdayIndex(dayLabel) {
    var normalized = normalizeAttendanceDayLabel(dayLabel);
    if (normalized === "Viernes") {
      return 5;
    }
    if (normalized === "Sábado") {
      return 6;
    }
    if (normalized === "Domingo") {
      return 0;
    }
    if (normalized === "Entre semana") {
      return 2;
    }
    return null;
  }

  function alignDateToSelectedClassDay(dateValue, dayLabel) {
    var normalizedDate = normalizeLocalDateKey(dateValue);
    var normalizedDay = normalizeAttendanceDayLabel(dayLabel);
    var weekday = getAttendanceWeekdayIndex(normalizedDay);
    var date;
    var currentDay;
    var diff;
    if (!normalizedDate || weekday === null) {
      return normalizedDate;
    }
    date = parseLocalDateKey(normalizedDate);
    if (!date) {
      return "";
    }
    if (normalizedDay === "Entre semana") {
      currentDay = date.getDay();
      if (currentDay >= 2 && currentDay <= 4) {
        date.setDate(date.getDate() - (currentDay - 2));
        return formatDateKey(date);
      }
    }
    diff = (weekday - date.getDay() + 7) % 7;
    date.setDate(date.getDate() + diff);
    return formatDateKey(date);
  }

  function getAttendanceSessionCountForCourse(course) {
    var normalizedCourse = normalizeLoose(course);
    if (normalizedCourse === "barberia") {
      return 20;
    }
    return DEFAULT_ATTENDANCE_SESSION_COUNT;
  }

  function courseUsesFifthMonth(course) {
    return normalizeLoose(course) === "barberia";
  }

  function getStudentAttendanceBaseDate(student) {
    var startDate = normalizeLocalDateKey(student && student.fechaInicio);
    if (!startDate) {
      return "";
    }
    return alignDateToSelectedClassDay(startDate, getStudentClassDayLabel(student));
  }

  function getStudentAttendanceReferenceSessions(student) {
    var baseDate = getStudentAttendanceBaseDate(student);
    var sessionCount = getAttendanceSessionCountForCourse(student && student.curso);
    var dayLabel = normalizeAttendanceDayLabel(getStudentClassDayLabel(student));
    var sessions = [];
    var index;
    if (!baseDate) {
      return sessions;
    }
    if (dayLabel === "Entre semana") {
      for (index = 0; index < sessionCount; index += 1) {
        sessions.push({
          key: "w" + (index + 1),
          date: addDaysToDateKey(baseDate, index * 7),
          classLabel: "Semana " + (index + 1)
        });
      }
      return sessions;
    }
    for (index = 0; index < sessionCount; index += 1) {
      sessions.push({
        key: "s" + (index + 1),
        date: addDaysToDateKey(baseDate, index * 7),
        classLabel: "Clase " + (index + 1)
      });
    }
    return sessions;
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
    var status = normalizeDocumentationStatus(student.documentos);
    var delivered = parseDocumentList(student.documentosEntregados);
    var deliveredKeys;
    var missing;
    var count;

    if (status === "Completa" && delivered.length === 0) {
      delivered = STUDENT_DOCUMENT_REQUIREMENTS.slice();
    }

    deliveredKeys = {};
    delivered.forEach(function (documentName) {
      deliveredKeys[getDocumentKey(documentName)] = true;
    });
    missing = STUDENT_DOCUMENT_REQUIREMENTS.filter(function (documentName) {
      return !deliveredKeys[getDocumentKey(documentName)];
    });
    count = missing.length;

    if (count === 0) {
      status = "Completa";
    } else if (status === "Completa") {
      status = "Parcial";
    } else if (!status) {
      status = delivered.length > 0 ? "Parcial" : "Incompleta";
    }

    return {
      raw: raw,
      status: status,
      delivered: delivered,
      missing: missing,
      complete: count === 0,
      pendingCount: count,
      summary: count === 0 ? "Tu expediente está completo." : (count === 1 ? "Te falta 1 documento" : "Te faltan " + count + " documentos"),
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

  function normalizePaymentPlanStatus(value) {
    var normalized = normalizePaymentStatus(value);
    if (normalized === "Pagado" || normalized === "Parcial" || normalized === "Pendiente" || normalized === "No aplica") {
      return normalized;
    }
    return "";
  }

  function getEmptyPaymentPlanRecord(studentId) {
    return {
      id: "",
      studentId: studentId || "",
      mensualidadPactada: "",
      certificadoP1: "",
      certificadoP2: "",
      mensualidad1: "",
      mensualidad2: "",
      mensualidad3: "",
      mensualidad4: "",
      mensualidad5: "",
      certificadoP1Amount: "",
      certificadoP2Amount: "",
      mensualidad1Amount: "",
      mensualidad2Amount: "",
      mensualidad3Amount: "",
      mensualidad4Amount: "",
      mensualidad5Amount: "",
      pagosPendientes: "",
      metodoPago: "",
      cantidadPagada: "",
      mesPago: "",
      paymentRealDate: "",
      paymentMovementConcept: "",
      observaciones: "",
      updatedAt: "",
      createdAt: ""
    };
  }

  function getPaymentSortValue(payment) {
    return text(payment && (payment.updatedAt || payment.createdAt));
  }

  function getMergedPaymentPlanRecord(payments) {
    var sortedPayments = (payments || []).slice().sort(function (left, right) {
      return getPaymentSortValue(left).localeCompare(getPaymentSortValue(right));
    });
    var latest = sortedPayments.length ? sortedPayments[sortedPayments.length - 1] : null;
    var merged = getEmptyPaymentPlanRecord(latest && latest.studentId);
    var stickyFields = [
      "mensualidadPactada",
      "certificadoP1",
      "certificadoP2",
      "mensualidad1",
      "mensualidad2",
      "mensualidad3",
      "mensualidad4",
      "mensualidad5",
      "certificadoP1Amount",
      "certificadoP2Amount",
      "mensualidad1Amount",
      "mensualidad2Amount",
      "mensualidad3Amount",
      "mensualidad4Amount",
      "mensualidad5Amount",
      "pagosPendientes"
    ];
    var paymentIndex;
    var fieldIndex;
    var field;
    var value;
    for (paymentIndex = 0; paymentIndex < sortedPayments.length; paymentIndex += 1) {
      for (fieldIndex = 0; fieldIndex < stickyFields.length; fieldIndex += 1) {
        field = stickyFields[fieldIndex];
        value = text(sortedPayments[paymentIndex][field]);
        if (value) {
          merged[field] = value;
        }
      }
    }
    if (latest) {
      merged.id = latest.id || "";
      merged.studentId = latest.studentId || merged.studentId;
      merged.metodoPago = latest.metodoPago || merged.metodoPago;
      merged.cantidadPagada = latest.cantidadPagada || "";
      merged.mesPago = latest.mesPago || "";
      merged.paymentRealDate = latest.paymentRealDate || "";
      merged.paymentMovementConcept = latest.paymentMovementConcept || "";
      merged.observaciones = latest.observaciones || "";
      merged.updatedAt = latest.updatedAt || "";
      merged.createdAt = latest.createdAt || "";
    }
    return merged;
  }

  function buildPaymentReferences(payments, student) {
    var result = [];
    var plan = getMergedPaymentPlanRecord(payments || []);
    var index;
    var rule;
    var status;
    if (!payments || !payments.length) {
      return result;
    }
    for (index = 0; index < PAYMENT_CALENDAR_RULES.length; index += 1) {
      rule = PAYMENT_CALENDAR_RULES[index];
      if (rule.onlyFifthMonth && !courseUsesFifthMonth(student && student.curso)) {
        status = "No aplica";
      } else {
        status = normalizePaymentPlanStatus(plan[rule.field]) || "Pendiente";
      }
      result.push({
        field: rule.field,
        label: rule.label,
        status: status,
        month: plan.mesPago || "",
        updatedAt: plan.updatedAt || plan.createdAt || ""
      });
    }
    return result;
  }

  function getPaymentsSummary(details, student) {
    var references = buildPaymentReferences(details.payments || [], student);
    var pending = 0;
    var paid = 0;
    var partial = 0;
    var index;
    var latest = getMergedPaymentPlanRecord(details.payments || []);
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
    var paymentSummary = details ? getPaymentsSummary(details, student) : null;
    var attendanceSummary = details ? getAttendanceSummary(details.attendance) : null;
    var statusInfo = getStudentStatusInfo(student);
    byId("studentName").textContent = student.nombre || "Estudiante";
    byId("studentMeta").textContent = "Estado: " + statusInfo.label + " | " + safe(student.curso, "Curso por confirmar") + " | " + safe(student.sucursal, "Plantel por confirmar") + " | " + safe(student.horario, "Horario por confirmar");
    byId("heroGreeting").textContent = statusInfo.key === "completed" ? "¡Felicidades!" : "Hola, " + (student.nombre || "estudiante");
    byId("heroCourse").textContent = statusInfo.key === "active" ? safe(student.curso, "Tu curso Venezia") : statusInfo.heroTitle;
    byId("heroDetails").textContent = statusInfo.key === "active"
      ? safe(student.sucursal, "Plantel por confirmar") + " | " + safe(student.horario, "Horario por confirmar")
      : statusInfo.notice + " " + safe(student.curso, "Curso por confirmar") + " | " + safe(student.sucursal, "Plantel por confirmar");
    byId("heroDocStatus").className = "mv2-doc-badge mv2-status-badge mv2-status-" + statusInfo.key;
    byId("heroDocStatus").textContent = statusInfo.badge;
    renderReferralCard(student, details, statusInfo);
    byId("quickStats").innerHTML =
      statCard(statusInfo.courseLabel, safe(student.curso, "-"), statusInfo.label + " | " + safe(student.horario, "Horario pendiente")) +
      statCard("Pagos", paymentSummary ? paymentSummary.status : "Cargando...", "Mensualidad: " + safe(student.mensualidad || student.colegiatura, "-")) +
      statCard("Asistencia", attendanceSummary ? attendanceSummary.percentage + "%" : "Cargando...", attendanceSummary ? attendanceSummary.asistencias + " asistencias registradas" : "Leyendo clases") +
      statCard("Documentos", docState.label, docState.raw);
  }

  function statCard(label, value, meta) {
    return '<article class="mv2-stat-card"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(meta || "") + '</small></article>';
  }

  function shouldShowReferralCard(statusInfo) {
    return statusInfo && statusInfo.key !== "unavailable";
  }

  function buildReferralWhatsappMessage(student) {
    return [
      "Hola quiero invitar a un amigo o amiga a estudiar para ganarme el bono o descuento de recomendacion",
      "soy: " + safe(student.nombre, "-"),
      "curso: " + safe(student.curso, "-"),
      "horario: " + safe(student.horario, "-"),
      "plantel: " + safe(student.sucursal, "-")
    ].join("\n");
  }

  function resolveOfficialContactOverride(student) {
    var branch = normalizeLoose(student && student.sucursal);
    if (branch.indexOf("tlaxcala") !== -1 && classifySchedule(student) === "weekend") {
      return {
        phone: TLAXCALA_WEEKEND_DIRECTOR_WHATSAPP,
        coverage: "weekend",
        name: "Dirección fin de semana Tlaxcala"
      };
    }
    return null;
  }

  function resolveReferralContact(student, details) {
    return resolveContact(student, details);
  }

  function renderReferralCard(student, details, statusInfo) {
    var container = byId("referralCard");
    var contact;
    var message;
    var url;
    var discreetClass;
    if (!container) {
      return;
    }
    if (!shouldShowReferralCard(statusInfo)) {
      container.hidden = true;
      container.innerHTML = "";
      return;
    }
    contact = resolveReferralContact(student, details || {});
    message = buildReferralWhatsappMessage(student);
    url = whatsappUrl(contact.phone, message);
    discreetClass = statusInfo.key === "withdrawn" ? " is-discreet" : "";
    container.hidden = false;
    container.innerHTML =
      '<article class="mv2-referral-card' + discreetClass + '">' +
      '<div class="mv2-referral-copy">' +
      '<span class="mv2-referral-badge">Bono disponible</span>' +
      '<h2>GANA $200 RECOMENDANDO</h2>' +
      '<p>Invita a una amiga o amigo a estudiar en Instituto Venezia y gana $200 de bono o descuento cuando se inscriba.</p>' +
      '<small>Dirección asignada: ' + escapeHtml(contact.name || "Soporte Venezia") + '</small>' +
      '</div>' +
      '<a class="mv2-referral-button" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">Enviar recomendación por WhatsApp</a>' +
      '</article>';
  }

  function timelineMeta(label, value) {
    var resolved = safe(value, "-");
    if (resolved === "-") {
      return "";
    }
    return '<small><span>' + escapeHtml(label) + '</span>' + escapeHtml(resolved) + '</small>';
  }

  function renderTimelineMetric(label, value, meta) {
    return '<article class="mv2-timeline-metric"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(meta || "") + '</small></article>';
  }

  function getPaymentStatusKey(status) {
    var normalized = normalizePaymentStatus(status);
    if (normalized === "Pagado") {
      return "paid";
    }
    if (normalized === "Pendiente" || normalized === "Parcial") {
      return "pending";
    }
    if (normalized === "No aplica") {
      return "na";
    }
    return "unknown";
  }

  function getPaymentStatusLabel(status) {
    var normalized = normalizePaymentStatus(status);
    return normalized || "Sin información";
  }

  function inferPaymentAmount(reference, student, summary) {
    var label = normalizeLoose(reference && reference.label);
    if (label.indexOf("mensualidad") !== -1) {
      return student.mensualidad || student.colegiatura || (summary.latest && summary.latest.mensualidadPactada) || "";
    }
    return "";
  }

  function renderPaymentTimelineItem(item) {
    return (
      '<article class="mv2-timeline-item is-' + escapeHtml(item.state) + '">' +
      '<div class="mv2-timeline-marker" aria-hidden="true"></div>' +
      '<div class="mv2-timeline-card">' +
      '<div class="mv2-timeline-card-head">' +
      '<span class="mv2-timeline-type">' + escapeHtml(item.type || "Pago") + '</span>' +
      '<span class="mv2-timeline-badge">' + escapeHtml(item.status) + '</span>' +
      '</div>' +
      '<strong>' + escapeHtml(item.label) + '</strong>' +
      '<div class="mv2-timeline-meta">' +
      timelineMeta("Monto", item.amount) +
      timelineMeta("Fecha programada", item.scheduledDate) +
      timelineMeta("Fecha real", item.realDate) +
      timelineMeta("Método", item.method) +
      timelineMeta("Periodo", item.period) +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }

  function normalizePaymentRuleKey(value) {
    return normalizeLoose(value).replace(/[^a-z0-9]/g, "");
  }

  function paymentRuleKeyMatches(value, rule) {
    var normalized = normalizePaymentRuleKey(value);
    var aliases;
    var index;
    if (!normalized || !rule) {
      return false;
    }
    aliases = getPaymentRuleAliases(rule);
    if (normalized === normalizePaymentRuleKey(rule.field)) {
      return true;
    }
    for (index = 0; index < aliases.length; index += 1) {
      if (normalized === normalizePaymentRuleKey(aliases[index])) {
        return true;
      }
    }
    return false;
  }

  function findPaymentRecordById(payments, paymentId) {
    var normalizedId = text(paymentId);
    var index;
    if (!normalizedId) {
      return null;
    }
    for (index = 0; payments && index < payments.length; index += 1) {
      if (text(payments[index].id) === normalizedId) {
        return payments[index];
      }
    }
    return null;
  }

  function getPaymentRuleDetailSortValue(payment) {
    return normalizeLocalDateKey(payment && payment.paymentRealDate) || text(payment && (payment.updatedAt || payment.createdAt));
  }

  function getSpecificPaymentRecordForRule(rule, payments) {
    var sortedPayments = (payments || []).slice().sort(function (left, right) {
      return getPaymentRuleDetailSortValue(right).localeCompare(getPaymentRuleDetailSortValue(left));
    });
    var index;
    var payment;
    for (index = 0; index < sortedPayments.length; index += 1) {
      payment = sortedPayments[index];
      if (isEligiblePaymentStatus(payment && payment[rule.field]) && paymentRecordMatchesRuleConcept(payment, rule)) {
        return payment;
      }
    }
    return null;
  }

  function getFinanceRuleSortValue(financeItem) {
    return normalizeLocalDateKey(financeItem && financeItem.fecha) || text(financeItem && financeItem.createdAt);
  }

  function referenceLooksLikePaymentConcept(value) {
    var normalized = normalizeLoose(value);
    var compact = normalizePaymentRuleKey(value);
    return Boolean(
      normalized.indexOf("mens") !== -1 ||
      normalized.indexOf("certificado") !== -1 ||
      compact === "c1" ||
      compact === "c2" ||
      compact === "men1" ||
      compact === "men2" ||
      compact === "men3" ||
      compact === "men4" ||
      compact === "men5"
    );
  }

  function financeRecordMatchesRuleConcept(financeItem, rule, payments) {
    var linkedPayment;
    if (!financeItem || financeItem.cancelled || normalizeLoose(financeItem.tipo) === "egreso") {
      return false;
    }
    if (paymentRuleKeyMatches(financeItem.conceptKey, rule)) {
      return true;
    }
    if (textMatchesPaymentRule([financeItem.concepto, financeItem.categoria].join(" "), rule)) {
      return true;
    }
    if (referenceLooksLikePaymentConcept(financeItem.reference) && textMatchesPaymentRule(financeItem.reference, rule)) {
      return true;
    }
    linkedPayment = findPaymentRecordById(payments || [], financeItem.relatedPaymentId);
    return Boolean(linkedPayment && paymentRecordMatchesRuleConcept(linkedPayment, rule));
  }

  function findSpecificFinanceRecordForRule(rule, finance, payments) {
    var sortedFinance = (finance || []).slice().sort(function (left, right) {
      return getFinanceRuleSortValue(right).localeCompare(getFinanceRuleSortValue(left));
    });
    var index;
    for (index = 0; index < sortedFinance.length; index += 1) {
      if (financeRecordMatchesRuleConcept(sortedFinance[index], rule, payments)) {
        return sortedFinance[index];
      }
    }
    return null;
  }

  function getPaymentPeriodForFinanceRule(financeItem, rule, payments) {
    var linkedPayment = findPaymentRecordById(payments || [], financeItem && financeItem.relatedPaymentId);
    var specificPayment = linkedPayment && paymentRecordMatchesRuleConcept(linkedPayment, rule)
      ? linkedPayment
      : getSpecificPaymentRecordForRule(rule, payments || []);
    return text(specificPayment && specificPayment.mesPago);
  }

  function buildPaymentRuleDetailFromFinance(financeItem, rule, payments) {
    if (!financeItem) {
      return null;
    }
    return {
      source: "finance",
      financeId: financeItem.id || "",
      date: normalizeLocalDateKey(financeItem.fecha),
      method: financeItem.metodoPago || "",
      amount: financeItem.monto,
      period: getPaymentPeriodForFinanceRule(financeItem, rule, payments),
      reference: financeItem.concepto || financeItem.categoria || financeItem.reference || ""
    };
  }

  function buildPaymentRuleDetailFromPayment(payment) {
    if (!payment) {
      return null;
    }
    return {
      source: "payment",
      paymentId: payment.id || "",
      date: normalizeLocalDateKey(payment.paymentRealDate),
      method: payment.metodoPago || "",
      amount: payment.cantidadPagada || "",
      period: payment.mesPago || "",
      reference: payment.paymentMovementConcept || ""
    };
  }

  function resolvePaymentRuleDetail(rule, payments, finance) {
    var financeItem = findSpecificFinanceRecordForRule(rule, finance || [], payments || []);
    if (financeItem) {
      return buildPaymentRuleDetailFromFinance(financeItem, rule, payments || []);
    }
    return buildPaymentRuleDetailFromPayment(getSpecificPaymentRecordForRule(rule, payments || []));
  }

  function getPaymentReferenceByField(summary, field) {
    var index;
    for (index = 0; summary && summary.references && index < summary.references.length; index += 1) {
      if (summary.references[index].field === field) {
        return summary.references[index];
      }
    }
    return null;
  }

  function getPaymentEstimatedDateForRule(rule, student) {
    var sessions = getStudentAttendanceReferenceSessions(student);
    var session = sessions[rule.sessionIndex] || null;
    return session && session.date ? session.date : "";
  }

  function buildPaymentTimelinePlanItem(rule, status, detail, plan, student) {
    var normalizedStatus = getPaymentStatusLabel(status);
    var state = getPaymentStatusKey(status);
    var applicable = normalizedStatus !== "No aplica";
    var isCovered = normalizedStatus === "Pagado" || normalizedStatus === "Parcial";
    var estimatedDate = applicable ? getPaymentEstimatedDateForRule(rule, student) : "";
    var amount = applicable ? formatMoney((detail && detail.amount) || getPaymentRuleAmount(rule, plan, student)) : "";
    var scheduledDate = "";
    var realDate = "";
    var method = "";
    var period = "";

    if (applicable) {
      scheduledDate = estimatedDate ? formatDate(estimatedDate) : "Sin fecha calculable";
    } else {
      scheduledDate = "No aplica";
    }

    if (isCovered) {
      realDate = detail && detail.date ? formatDate(detail.date) : "No registrada";
      method = detail && detail.method ? detail.method : "No registrado";
      period = detail && detail.period ? detail.period : "";
    }

    return {
      label: rule.label,
      status: normalizedStatus,
      state: state,
      type: "Plan de pagos",
      amount: amount,
      scheduledDate: scheduledDate,
      realDate: realDate,
      method: method,
      period: period
    };
  }

  function buildUnmatchedFinanceTimelineItem(financeItem) {
    return {
      label: financeItem.concepto || financeItem.categoria || "Pago registrado",
      status: "Pagado",
      state: "paid",
      type: "Movimiento registrado",
      amount: formatMoney(financeItem.monto),
      scheduledDate: "",
      realDate: formatDate(financeItem.fecha),
      method: financeItem.metodoPago || "Método no registrado",
      period: ""
    };
  }

  function buildPaymentTimeline(summary, details, student) {
    var items = [];
    var index;
    var reference;
    var rule;
    var status;
    var detail;
    var matchedFinanceIds = {};
    var plan = summary && summary.latest ? summary.latest : getMergedPaymentPlanRecord(details && details.payments);
    var financeItem;
    for (index = 0; index < PAYMENT_CALENDAR_RULES.length; index += 1) {
      rule = PAYMENT_CALENDAR_RULES[index];
      reference = getPaymentReferenceByField(summary, rule.field);
      if (!reference) {
        continue;
      }
      status = reference.status;
      detail = resolvePaymentRuleDetail(rule, details.payments || [], summary.finance || []);
      if (detail && detail.financeId) {
        matchedFinanceIds[detail.financeId] = true;
      }
      items.push(buildPaymentTimelinePlanItem(rule, status, detail, plan, student));
    }
    for (index = 0; index < summary.finance.length; index += 1) {
      financeItem = summary.finance[index];
      if (!matchedFinanceIds[financeItem.id]) {
        items.push(buildUnmatchedFinanceTimelineItem(financeItem));
      }
    }
    if (!items.length && details.payments.length) {
      for (index = 0; index < details.payments.length; index += 1) {
        items.push({
          label: details.payments[index].paymentMovementConcept || details.payments[index].mesPago || "Pago registrado",
          status: "Pagado",
          state: "paid",
          type: "Pago visible",
          amount: formatMoney(details.payments[index].cantidadPagada || details.payments[index].mensualidadPactada),
          scheduledDate: "",
          realDate: details.payments[index].paymentRealDate ? formatDate(details.payments[index].paymentRealDate) : "No registrada",
          method: details.payments[index].metodoPago || "No registrado",
          period: details.payments[index].mesPago || ""
        });
      }
    }
    return items;
  }

  function getNextPendingPayment(summary) {
    var index;
    var status;
    for (index = 0; index < summary.references.length; index += 1) {
      status = normalizePaymentStatus(summary.references[index].status);
      if (status === "Pendiente" || status === "Parcial") {
        return summary.references[index].label;
      }
    }
    return "Sin pendiente visible";
  }

  function getCalendarPaymentStatus(value) {
    var normalized = normalizePaymentPlanStatus(value);
    if (normalized === "Pagado") {
      return "Pagado";
    }
    if (normalized === "No aplica") {
      return "No aplica";
    }
    return "Pendiente";
  }

  function isEligiblePaymentStatus(value) {
    var normalized = normalizePaymentPlanStatus(value);
    return normalized === "Pagado" || normalized === "Parcial";
  }

  function getPaymentRuleAmount(rule, plan, student) {
    var explicitAmount = text(plan && rule && plan[rule.amountField]);
    if (explicitAmount) {
      return explicitAmount;
    }
    if (rule && rule.amountType === "monthly") {
      return text((plan && plan.mensualidadPactada) || (student && student.mensualidad) || (student && student.colegiatura));
    }
    return "";
  }

  function getPaymentRuleAliases(rule) {
    var aliases = [rule.field, rule.label, rule.shortLabel];
    var monthlyAliases = {
      mensualidad1: ["Primera mensualidad", "1ra mensualidad", "Mensualidad uno", "Mens 1"],
      mensualidad2: ["Segunda mensualidad", "2da mensualidad", "Mensualidad dos", "Mens 2"],
      mensualidad3: ["Tercera mensualidad", "3ra mensualidad", "Mensualidad tres", "Mens 3"],
      mensualidad4: ["Cuarta mensualidad", "4ta mensualidad", "Mensualidad cuatro", "Mens 4"],
      mensualidad5: ["Quinta mensualidad", "5ta mensualidad", "Mensualidad cinco", "Mens 5"]
    };
    if (rule.field === "certificadoP1") {
      aliases.push("Certificado P1", "Certificado uno", "Pago C1", "Pago certificado C1", "C1");
    }
    if (rule.field === "certificadoP2") {
      aliases.push("Certificado P2", "Certificado dos", "Pago C2", "Pago certificado C2", "C2");
    }
    if (rule.field.indexOf("mensualidad") === 0) {
      aliases.push(rule.label.replace("Mensualidad", "Mens"), rule.label.replace("Mensualidad", "Mensualidad "));
      aliases = aliases.concat(monthlyAliases[rule.field] || []);
    }
    return aliases;
  }

  function textMatchesPaymentRule(value, rule) {
    var normalized = normalizeLoose(value);
    var aliases = getPaymentRuleAliases(rule);
    var index;
    var alias;
    if (!normalized) {
      return false;
    }
    for (index = 0; index < aliases.length; index += 1) {
      alias = normalizeLoose(aliases[index]);
      if (alias && normalized.indexOf(alias) !== -1) {
        return true;
      }
    }
    return false;
  }

  function getPaidPaymentFields(payment) {
    var fields = [];
    var index;
    var rule;
    for (index = 0; index < PAYMENT_CALENDAR_RULES.length; index += 1) {
      rule = PAYMENT_CALENDAR_RULES[index];
      if (isEligiblePaymentStatus(payment && payment[rule.field])) {
        fields.push(rule.field);
      }
    }
    return fields;
  }

  function paymentRecordMatchesRuleConcept(payment, rule) {
    var concept = text(payment && payment.paymentMovementConcept);
    var paidFields;
    if (concept) {
      return textMatchesPaymentRule(concept, rule);
    }
    paidFields = getPaidPaymentFields(payment);
    return paidFields.length === 1 && paidFields[0] === rule.field;
  }

  function getPaymentRuleRealDate(rule, payments, finance) {
    var detail = resolvePaymentRuleDetail(rule, payments || [], finance || []);
    return detail && detail.date ? detail.date : "";
  }

  function buildPaymentCalendarEntries(student, details, summary) {
    var entries = [];
    var plan = summary && summary.latest ? summary.latest : getMergedPaymentPlanRecord(details && details.payments);
    var sessions = getStudentAttendanceReferenceSessions(student);
    var index;
    var rule;
    var applicable;
    var status;
    var session;
    if (!details || !details.payments || !details.payments.length) {
      return entries;
    }
    for (index = 0; index < PAYMENT_CALENDAR_RULES.length; index += 1) {
      rule = PAYMENT_CALENDAR_RULES[index];
      applicable = !rule.onlyFifthMonth || courseUsesFifthMonth(student && student.curso);
      status = applicable ? getCalendarPaymentStatus(plan[rule.field]) : "No aplica";
      session = sessions[rule.sessionIndex] || null;
      entries.push({
        field: rule.field,
        label: rule.label,
        status: status,
        state: getPaymentStatusKey(status),
        estimatedDate: applicable ? (session && session.date ? session.date : "") : "",
        amount: applicable ? formatMoney(getPaymentRuleAmount(rule, plan, student)) : "",
        paidAt: status === "Pagado" ? getPaymentRuleRealDate(rule, details.payments || [], summary.finance || []) : ""
      });
    }
    return entries;
  }

  function renderPaymentCalendarItem(item) {
    var dateLabel = item.status === "No aplica" ? "No aplica" : (item.estimatedDate || "Sin fecha calculable");
    return (
      '<article class="mv2-payment-calendar-card is-' + escapeHtml(item.state) + '">' +
      '<div class="mv2-payment-calendar-head">' +
      '<strong>' + escapeHtml(item.label) + '</strong>' +
      '<span class="mv2-payment-calendar-badge">' + escapeHtml(item.status) + '</span>' +
      '</div>' +
      '<div class="mv2-payment-calendar-meta">' +
      timelineMeta("Fecha de pago", dateLabel) +
      timelineMeta("Monto", item.amount) +
      timelineMeta("Pagado el", item.paidAt) +
      '</div>' +
      '</article>'
    );
  }

  function getAttendanceStatusKey(status) {
    if (status === "Asistencia") {
      return "attended";
    }
    if (status === "Falta") {
      return "absence";
    }
    if (status === "Recuperación") {
      return "recovery";
    }
    if (status === "Permiso") {
      return "permit";
    }
    return "pending";
  }

  function getAttendanceStatusLabel(status) {
    if (status === "Asistencia") {
      return "Asistió";
    }
    return status || "Pendiente";
  }

  function renderAttendanceTimelineItem(record, index) {
    var status = normalizeAttendanceStatus(record.estado);
    var state = getAttendanceStatusKey(status);
    var label = status === "Recuperación" ? "Recuperación" : "Clase " + (index + 1);
    return (
      '<article class="mv2-timeline-item is-' + escapeHtml(state) + '">' +
      '<div class="mv2-timeline-marker" aria-hidden="true"></div>' +
      '<div class="mv2-timeline-card">' +
      '<div class="mv2-timeline-card-head">' +
      '<span class="mv2-timeline-type">' + escapeHtml(label) + '</span>' +
      '<span class="mv2-timeline-badge">' + escapeHtml(getAttendanceStatusLabel(status)) + '</span>' +
      '</div>' +
      '<strong>' + escapeHtml(formatDate(record.fecha)) + '</strong>' +
      '<div class="mv2-timeline-meta">' +
      timelineMeta("Observación", record.observaciones || "Sin observaciones") +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }

  function getDocumentationStatusKey(status) {
    var normalized = normalizeLoose(status);
    if (normalized === "completa" || normalized === "completo") {
      return "complete";
    }
    if (normalized === "parcial") {
      return "partial";
    }
    return "incomplete";
  }

  function renderInicioDocumentsNotice(docState) {
    if (docState.complete) {
      return (
        '<section class="mv2-document-alert is-complete">' +
        '<div><span>Documentación completa</span><strong>Tu expediente está completo.</strong><p>No tienes documentos pendientes registrados.</p></div>' +
        '</section>'
      );
    }
    return (
      '<section class="mv2-document-alert is-pending">' +
      '<div><span>Documentos pendientes por entregar</span><strong>' + escapeHtml(docState.summary) + '</strong><p>Tienes documentos pendientes. Entrégalos en dirección para completar tu expediente.</p></div>' +
      '<button class="mv2-inline-action" type="button" data-documents-action="open">Ver documentos pendientes</button>' +
      '</section>'
    );
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
    var payments = details ? getPaymentsSummary(details, student) : null;
    var attendance = details ? getAttendanceSummary(details.attendance) : null;
    var statusInfo = getStudentStatusInfo(student);
    byId("panelInicio").innerHTML =
      '<div class="mv2-panel-header"><h2>Inicio</h2><p>' + escapeHtml(statusInfo.intro) + '</p></div>' +
      statusNoticeHtml(statusInfo) +
      renderInicioDocumentsNotice(docState) +
      '<div class="mv2-info-grid">' +
      infoItem(statusInfo.courseLabel, student.curso) +
      infoItem("Plantel", student.sucursal) +
      infoItem("Horario", student.horario) +
      infoItem("Documentación", docState.label) +
      infoItem("Pagos", payments ? payments.status : "Cargando pagos...") +
      infoItem("Asistencia", attendance ? attendance.percentage + "% visible" : "Cargando asistencias...") +
      '</div>' +
      '<div class="mv2-pill-row">' +
      statusBadgeHtml(statusInfo) +
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
    var calendarEntries;
    var statusInfo = getStudentStatusInfo(student);
    if (!details || details.errors.payments) {
      byId("panelPagos").innerHTML = '<div class="mv2-panel-header"><h2>Pagos</h2><p>No pudimos cargar tus pagos en este momento.</p></div><div class="mv2-empty">No pudimos cargar tus pagos en este momento.</div>';
      return;
    }
    summary = getPaymentsSummary(details, student);
    calendarEntries = buildPaymentCalendarEntries(student, details, summary);
    html =
      '<div class="mv2-panel-header"><h2>Pagos</h2><p>' + escapeHtml(statusInfo.paymentCopy || "Pagos realizados, mensualidades y pendientes visibles.") + '</p></div>' +
      '<div class="mv2-timeline-summary">' +
      renderTimelineMetric("Pagos completados", String(summary.paid || summary.finance.length), "Movimientos visibles") +
      renderTimelineMetric("Pagos pendientes", String(summary.pending), "Plan de pagos") +
      renderTimelineMetric("Próximo pendiente", getNextPendingPayment(summary), "Según registros visibles") +
      renderTimelineMetric("Estado general", summary.status, "Resumen actual") +
      '</div>' +
      '<div class="mv2-section-block"><h3>Calendario de pagos</h3>';

    if (calendarEntries.length) {
      html += '<div class="mv2-payment-calendar">';
      for (index = 0; index < calendarEntries.length; index += 1) {
        html += renderPaymentCalendarItem(calendarEntries[index]);
      }
      html += '</div>';
    } else {
      html += '<div class="mv2-empty">Aún no hay calendario de pagos disponible.</div>';
    }
    html += '</div>';
    byId("panelPagos").innerHTML = html;
  }

  function renderAsistencias(student, details) {
    var summary;
    var html;
    var index;
    var records;
    var statusInfo = getStudentStatusInfo(student);
    if (!details || details.errors.attendance) {
      byId("panelAsistencias").innerHTML = '<div class="mv2-panel-header"><h2>Clases / Asistencias</h2><p>No pudimos cargar tus asistencias en este momento.</p></div><div class="mv2-empty">No pudimos cargar tus asistencias en este momento.</div>';
      return;
    }
    summary = getAttendanceSummary(details.attendance);
    records = (details.attendance || []).slice().reverse();
    html =
      '<div class="mv2-panel-header"><h2>Clases / Asistencias</h2><p>' + escapeHtml(statusInfo.attendanceCopy || "Resumen de asistencias registradas.") + '</p></div>' +
      '<div class="mv2-timeline-summary">' +
      renderTimelineMetric("Clases tomadas", String(summary.asistencias), "Asistencias registradas") +
      renderTimelineMetric("Faltas", String(summary.faltas), "Registros visibles") +
      renderTimelineMetric("Recuperaciones", String(summary.recuperaciones), "Clases recuperadas") +
      renderTimelineMetric("Asistencia", summary.percentage + "%", "Avance visible") +
      '</div>' +
      '<div class="mv2-section-block"><h3>Línea de tiempo de clases</h3>';
    if (records.length) {
      html += '<div class="mv2-timeline">';
      for (index = 0; index < records.length; index += 1) {
        html += renderAttendanceTimelineItem(records[index], index);
      }
      html += '</div>';
    } else {
      html += '<div class="mv2-empty">No hay asistencias registradas todavía.</div>';
    }
    html += '</div>';
    byId("panelAsistencias").innerHTML = html;
  }

  function renderOfficialDocumentList(items, type, emptyText) {
    var stateClass = type === "delivered" ? "is-delivered" : "is-missing";
    var stateLabel = type === "delivered" ? "Entregado" : "Pendiente";
    if (!items.length) {
      return '<div class="mv2-empty">' + escapeHtml(emptyText) + '</div>';
    }
    return '<div class="mv2-doc-list mv2-official-doc-list">' + items.map(function (item) {
      return (
        '<article class="mv2-doc-item mv2-official-doc ' + stateClass + '">' +
        '<span>' + escapeHtml(stateLabel) + '</span>' +
        '<strong>' + escapeHtml(item) + '</strong>' +
        '</article>'
      );
    }).join("") + '</div>';
  }

  function renderDocumentDownloadLinks() {
    if (!DOCUMENT_DOWNLOADS.length) {
      return '<p class="mv2-document-download-note">Los formatos estarán disponibles próximamente.</p>';
    }
    return (
      '<div class="mv2-document-downloads">' +
      DOCUMENT_DOWNLOADS.map(function (documentLink) {
        return '<a class="mv2-download-link" href="' + escapeHtml(documentLink.href) + '" target="_blank" rel="noopener" download>' + escapeHtml(documentLink.label) + '</a>';
      }).join("") +
      '</div>'
    );
  }

  function renderDocumentos(student) {
    var docState = getDocumentsState(student);
    var statusKey = getDocumentationStatusKey(docState.status);
    byId("panelDocumentos").innerHTML =
      '<div class="mv2-panel-header"><h2>Documentos</h2><p>Documentos registrados en tu expediente.</p></div>' +
      '<section class="mv2-document-summary-card mv2-document-status-' + escapeHtml(statusKey) + '">' +
      '<span>Estado general</span>' +
      '<strong>' + escapeHtml(docState.status || docState.raw) + '</strong>' +
      '<p>' + escapeHtml(docState.complete ? "Tu documentación está completa." : docState.summary + ". Revisa la lista de pendientes.") + '</p>' +
      '</section>' +
      '<div class="mv2-section-block"><h3>Documentos entregados</h3>' +
      renderOfficialDocumentList(docState.delivered, "delivered", "Aún no hay documentos entregados registrados.") +
      '</div>' +
      '<div class="mv2-section-block"><h3>Documentos pendientes por entregar</h3>' +
      renderOfficialDocumentList(docState.missing, "missing", "Tu documentación está completa.") +
      '</div>' +
      '<div class="mv2-section-block"><h3>Formatos descargables</h3>' +
      renderDocumentDownloadLinks() +
      '</div>';
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
    var officialOverride = resolveOfficialContactOverride(student);
    var candidates = [];
    var index;
    var user;
    var staff;
    var phone;
    var coverage;
    if (officialOverride) {
      return officialOverride;
    }
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
    clearRuntimeMessage();
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
      if (isStudentDeleted(student)) {
        showUnavailableAccessMessage();
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
    if (byId("dashboardView")) {
      byId("dashboardView").addEventListener("click", function (event) {
        var target = event.target || event.srcElement;
        var trigger = target && target.closest ? target.closest('[data-documents-action="open"]') : null;
        if (!trigger) {
          return;
        }
        event.preventDefault();
        activateTab("documentos");
      });
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
    var matchedStudent = null;
    var index;
    if (!session || !session.studentId) {
      return;
    }
    loadStudents(function () {
      for (index = 0; index < state.students.length; index += 1) {
        if (state.students[index].id === session.studentId) {
          matchedStudent = state.students[index];
          break;
        }
      }
      if (matchedStudent && isStudentDeleted(matchedStudent)) {
        showUnavailableAccessMessage();
        return;
      }
      student = matchedStudent;
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
