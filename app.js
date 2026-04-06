const PROSPECTS_STORAGE_KEY = "venezia-one-v2-prospectos";
const STUDENTS_STORAGE_KEY = "venezia-one-v2-altas";
const ATTENDANCE_STORAGE_KEY = "venezia-one-v2-asistencias";
const PAYMENTS_STORAGE_KEY = "venezia-one-v2-pagos";
const FINANCE_STORAGE_KEY = "venezia-one-v2-finanzas";
const STUDENT_ACCESS_STORAGE_KEY = "venezia-one-v2-student-access";
const INTERNAL_USERS_STORAGE_KEY = "venezia-one-v2-internal-users";
const STAFF_STORAGE_KEY = "venezia-one-v2-staff";
const WEB_SETTINGS_STORAGE_KEY = "venezia-one-v2-web-settings";
const MI_VENEZIA_SESSION_KEY = "venezia-one-v2-mi-venezia-session";
const INTERNAL_SESSION_KEY = "venezia-one-v2-internal-session";
const dataService = window.VeneziaDataService;

const INCOME_CATEGORIES = [
  "Inscripción",
  "Colegiatura",
  "Certificado P1",
  "Certificado P2",
  "Otro ingreso",
];

const EXPENSE_CATEGORIES = [
  "Renta",
  "Luz",
  "Agua",
  "Internet",
  "Publicidad",
  "Nómina",
  "Materiales",
  "Mantenimiento",
  "Otro egreso",
];

const PAYMENT_STATUS_OPTIONS = ["", "Pagado", "Pendiente", "No aplica"];
const PAYMENT_METHOD_OPTIONS = ["", "Transferencia", "Efectivo", "Mixto"];
const ATTENDANCE_STATUS_OPTIONS = ["", "Asistencia", "Falta", "Retardo", "Recuperación"];

const BASE_ROLE_PERMISSIONS = {
  "Director General": ["dashboard", "crm-prospectos", "altas", "asistencias", "pagos", "finanzas", "web-venezia", "mi-venezia"],
  Gerente: ["crm-prospectos", "altas"],
  "Director de sucursal": ["altas", "asistencias", "pagos", "finanzas"],
  Asesora: ["crm-prospectos"],
  Maestra: ["asistencias"],
  Alumna: ["mi-venezia"],
};

const BRANCH_LIMITED_ROLES = new Set(["Director de sucursal", "Maestra", "Asesora"]);
const ALL_MODULE_PERMISSIONS = [
  "dashboard",
  "crm-prospectos",
  "altas",
  "asistencias",
  "pagos",
  "finanzas",
  "web-venezia",
  "mi-venezia",
  "usuarios-accesos",
  "personal",
];

const form = document.getElementById("prospectForm");
const loginShell = document.getElementById("loginShell");
const appShell = document.getElementById("appShell");
const internalLoginForm = document.getElementById("internalLoginForm");
const internalLoginError = document.getElementById("internalLoginError");
const openStudentPortalButton = document.getElementById("openStudentPortalButton");
const closeLoginPanelButton = document.getElementById("closeLoginPanelButton");
const publicInternalAccessButton = document.getElementById("publicInternalAccessButton");
const publicStudentAccessButton = document.getElementById("publicStudentAccessButton");
const footerInternalAccessButton = document.getElementById("footerInternalAccessButton");
const footerStudentAccessButton = document.getElementById("footerStudentAccessButton");
const internalLogoutButton = document.getElementById("internalLogoutButton");
const userBadge = document.getElementById("userBadge");
const clearButton = document.getElementById("clearButton");
const internalUserForm = document.getElementById("internalUserForm");
const internalUserClearButton = document.getElementById("internalUserClearButton");
const internalUserSubmitButton = document.getElementById("internalUserSubmitButton");
const internalUsersTableBody = document.getElementById("internalUsersTableBody");
const internalUsersEmptyState = document.getElementById("internalUsersEmptyState");
const staffForm = document.getElementById("staffForm");
const staffClearButton = document.getElementById("staffClearButton");
const staffSubmitButton = document.getElementById("staffSubmitButton");
const staffTableBody = document.getElementById("staffTableBody");
const staffEmptyState = document.getElementById("staffEmptyState");
const altaForm = document.getElementById("altaForm");
const clearAltaButton = document.getElementById("clearAltaButton");
const financeForm = document.getElementById("financeForm");
const financeClearButton = document.getElementById("financeClearButton");
const financeSubmitButton = document.getElementById("financeSubmitButton");
const searchInput = document.getElementById("searchInput");
const crmAccessFilter = document.getElementById("crmAccessFilter");
const crmAdvisorFilter = document.getElementById("crmAdvisorFilter");
const monthFilter = document.getElementById("monthFilter");
const dashboardBranchFilter = document.getElementById("dashboardBranchFilter");
const tableBody = document.getElementById("prospectsTableBody");
const emptyState = document.getElementById("emptyState");
const pendingAltasTableBody = document.getElementById("pendingAltasTableBody");
const pendingAltasEmptyState = document.getElementById("pendingAltasEmptyState");
const submitButton = document.getElementById("submitButton");
const navItems = document.querySelectorAll(".nav-item");
const moduleBadge = document.getElementById("moduleBadge");

const attendanceDate = document.getElementById("attendanceDate");
const attendanceSucursalFilter = document.getElementById("attendanceSucursalFilter");
const attendanceCursoFilter = document.getElementById("attendanceCursoFilter");
const attendanceHorarioFilter = document.getElementById("attendanceHorarioFilter");
const attendanceTableBody = document.getElementById("attendanceTableBody");
const attendanceEmptyState = document.getElementById("attendanceEmptyState");
const attendanceHistoryPanel = document.getElementById("attendanceHistoryPanel");
const attendanceHistoryTitle = document.getElementById("attendanceHistoryTitle");
const attendanceHistoryBody = document.getElementById("attendanceHistoryBody");
const attendanceHistoryEmptyState = document.getElementById("attendanceHistoryEmptyState");

const paymentsTableBody = document.getElementById("paymentsTableBody");
const paymentsEmptyState = document.getElementById("paymentsEmptyState");
const paymentsRegisteredCount = document.getElementById("paymentsRegisteredCount");
const paymentsPendingCount = document.getElementById("paymentsPendingCount");
const paymentsMensualidadesPaid = document.getElementById("paymentsMensualidadesPaid");
const paymentsCertificadosPaid = document.getElementById("paymentsCertificadosPaid");

const financeCategoria = document.getElementById("financeCategoria");
const financeTipo = document.getElementById("financeTipo");
const financeMonthFilter = document.getElementById("financeMonthFilter");
const financeBranchFilter = document.getElementById("financeBranchFilter");
const financeTableBody = document.getElementById("financeTableBody");
const financeEmptyState = document.getElementById("financeEmptyState");
const financeIngresos = document.getElementById("financeIngresos");
const financeEgresos = document.getElementById("financeEgresos");
const financeBalance = document.getElementById("financeBalance");
const financeMovimientos = document.getElementById("financeMovimientos");
const miVeneziaLoginForm = document.getElementById("miVeneziaLoginForm");
const miVeneziaLoginPanel = document.getElementById("miVeneziaLoginPanel");
const miVeneziaDashboard = document.getElementById("miVeneziaDashboard");
const miVeneziaLogoutButton = document.getElementById("miVeneziaLogoutButton");
const miVeneziaPerfil = document.getElementById("miVeneziaPerfil");
const miVeneziaPagos = document.getElementById("miVeneziaPagos");
const miVeneziaResumenAsistencias = document.getElementById("miVeneziaResumenAsistencias");
const miVeneziaAsistenciasBody = document.getElementById("miVeneziaAsistenciasBody");
const miVeneziaAsistenciasEmptyState = document.getElementById("miVeneziaAsistenciasEmptyState");
const miVeneziaAvance = document.getElementById("miVeneziaAvance");
const webLeadForm = document.getElementById("webLeadForm");
const webSuccessAlert = document.getElementById("webSuccessAlert");
const webErrorAlert = document.getElementById("webErrorAlert");
const webVeneziaSection = document.getElementById("webVeneziaSection");
const webTipoSolicitud = document.getElementById("webTipoSolicitud");
const webHorarioCitaField = document.getElementById("webHorarioCitaField");
const webHorarioCita = document.getElementById("webHorarioCita");
const webHoraSugeridaField = document.getElementById("webHoraSugeridaField");
const webHoraSugerida = document.getElementById("webHoraSugerida");
const webLeadSubmitButton = document.getElementById("webLeadSubmitButton");
const webCoursesGrid = document.getElementById("webCoursesGrid");
const webCourseButtons = document.querySelectorAll(".web-course-btn");
const webAccessButtons = document.querySelectorAll(".web-access-btn");
const webScrollButtons = document.querySelectorAll("[data-web-scroll]");
const webScholarshipCard = document.getElementById("webScholarshipCard");
const webWhatsappLinks = document.querySelectorAll(".web-whatsapp-link");
const heroSlider = document.getElementById("heroSlider");
const heroSlides = heroSlider ? Array.from(heroSlider.querySelectorAll(".hero-slide")) : [];
const heroSliderDots = heroSlider ? Array.from(heroSlider.querySelectorAll("[data-hero-slider-dot]")) : [];
const heroSliderPrevButton = heroSlider ? heroSlider.querySelector("[data-hero-slider-prev]") : null;
const heroSliderNextButton = heroSlider ? heroSlider.querySelector("[data-hero-slider-next]") : null;

const moduleSections = {
  dashboard: document.getElementById("dashboardSection"),
  "crm-prospectos": document.getElementById("crmSection"),
  altas: document.getElementById("altasSection"),
  asistencias: document.getElementById("asistenciasSection"),
  pagos: document.getElementById("pagosSection"),
  finanzas: document.getElementById("finanzasSection"),
  "usuarios-accesos": document.getElementById("usersAccessSection"),
  personal: document.getElementById("personalSection"),
  "mi-venezia": document.getElementById("miVeneziaSection"),
  "web-venezia": document.getElementById("webVeneziaSection"),
};

const statProspectos = document.getElementById("statProspectos");
const statInformaciones = document.getElementById("statInformaciones");
const statInscritas = document.getElementById("statInscritas");
const statAlumnasActivas = document.getElementById("statAlumnasActivas");
const statPagosPendientesDashboard = document.getElementById("statPagosPendientesDashboard");
const statIngresosDashboard = document.getElementById("statIngresosDashboard");
const statEgresosDashboard = document.getElementById("statEgresosDashboard");
const statBalanceDashboard = document.getElementById("statBalanceDashboard");
const dashboardOriginList = document.getElementById("dashboardOriginList");
const dashboardAdvisorList = document.getElementById("dashboardAdvisorList");
const dashboardIncomeBranchList = document.getElementById("dashboardIncomeBranchList");

const attendanceAsistencias = document.getElementById("attendanceAsistencias");
const attendanceFaltas = document.getElementById("attendanceFaltas");
const attendanceRetardos = document.getElementById("attendanceRetardos");
const attendanceRecuperaciones = document.getElementById("attendanceRecuperaciones");

const DASHBOARD_ORIGIN_BUCKETS = [
  "TikTok",
  "Facebook",
  "Instagram",
  "Abordaje en calle",
  "Referido",
  "Web",
  "WhatsApp directo",
  "Otro",
];

const DASHBOARD_ADVISORS = [
  "Ismael Capir",
  "Mari Flores",
  "Moises Velazco",
  "Ysela Herrera",
  "Yuritzi Pertupe",
];

const DASHBOARD_BRANCHES = ["Tlaxcala", "Puebla"];
const WEB_DEFAULT_WHATSAPP_NUMBER = "522463831375";
const WEB_DEFAULT_COURSES = [
  {
    name: "Uñas",
    description: "Aprende con horarios pensados para tu ritmo de vida.",
    statusLabel: "Curso activo y disponible",
    imagePath: "images/unas.jpg",
    availabilityTitle: "Horarios nuevos",
    summaryBlocks: [
      {
        title: "Entre semana · 3 días de clases",
        detail: "Turnos: 9am a 11am · 12pm a 2pm · 3pm a 5pm",
      },
      {
        title: "Fin de semana · 1 día de clases",
        detail: "Viernes o sábado",
      },
    ],
    extraNote: "Domingo: solo matutino de 9am a 1pm",
    capacityNote: "Grupos limitados a 7 cupos",
  },
  {
    name: "Pestañas",
    description: "Capacítate en fines de semana y da el primer paso para generar ingresos.",
    statusLabel: "Curso activo y disponible",
    imagePath: "images/pestanas.jpg",
    availabilityTitle: "Horarios nuevos",
    summaryBlocks: [
      {
        title: "Fin de semana · 1 día de clases",
        detail: "Turnos: Viernes o sábado · 9am a 1pm o 2pm a 6pm",
      },
    ],
    extraNote: "Domingo: solo matutino de 9am a 1pm",
    capacityNote: "Grupos limitados a 7 cupos",
  },
  {
    name: "Barbería",
    description: "Elige el turno que mejor se adapte a ti.",
    statusLabel: "Curso activo y disponible",
    imagePath: "images/barberia.jpg",
    availabilityTitle: "Horarios nuevos",
    summaryBlocks: [
      {
        title: "Entre semana · 3 días de clases",
        detail: "Turnos: 9am a 11am · 12pm a 2pm · 3pm a 5pm",
      },
      {
        title: "Fin de semana · 1 día de clases",
        detail: "Viernes o sábado",
      },
    ],
    extraNote: "Domingo: solo matutino de 9am a 1pm",
    capacityNote: "Grupos limitados a 7 cupos",
  },
  {
    name: "Maquillaje",
    description: "",
    statusLabel: "Próximamente",
    imagePath: "",
    availabilityTitle: "PROXIMAMENTE",
    comingSoon: "AUTOMAQUILLAJE / MAYO",
  },
];

// Supabase-backed modules now hydrate from local cache first and refresh from
// Supabase during init: internal users, staff, prospects.
let prospects = dataService.entities.prospects.getAll(seedProspects);
let students = dataService.entities.students.getAll(() => []);
let attendanceRecords = dataService.entities.attendance.getAll(() => []);
let paymentRecords = dataService.entities.payments.getAll(() => []);
let financeRecords = dataService.entities.financialMovements.getAll(() => []);
let studentAccessRecords = dataService.entities.studentPortalAccess.getAll(() => []);
let internalUsers = dataService.entities.internalUsers.getAll(() => []);
let staffRecords = dataService.entities.staff.getAll(() => []);
let webSettings = dataService.entities.webSettings.getAll(() => ({
  scholarshipActive: true,
  title: "Beca activa para nuevo ingreso",
  description: "Pregunta por beneficios especiales en inscripción y mensualidades para tu curso.",
  availability: "Tiempo limitado | Cupos limitados",
}));
let activeSearch = "";
let activeAccessFilter = "";
let activeModule = "crm-prospectos";
let selectedMonth = getCurrentMonthValue();
let selectedAttendanceStudentId = "";
let currentPortalStudentId = "";
let currentInternalUserId = "";
let currentAccessMode = "logged-out";
let publicAccessPanelOpen = false;
let activeAdvisorFilter = "";

monthFilter.value = selectedMonth;
attendanceDate.value = formatDateForInput(new Date());
financeMonthFilter.value = selectedMonth;

function seedProspects() {
  const today = new Date();
  const currentMonthDate = formatDateForInput(today);
  const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 14);

  const initialProspects = [
    {
      id: crypto.randomUUID(),
      nombre: "Moises Velazco",
      telefono: "525511223344",
      fechaContacto: currentMonthDate,
      sucursal: "Polanco",
      curso: "Cosmetologia Integral",
      origen: "WhatsApp Tlaxcala",
      medio: "WhatsApp Tlaxcala",
      informacion: "Información enviada",
      estado: "Seguimiento",
      contacto: "Si",
      notas: "Solicito horarios vespertinos y plan de pagos.",
      proximoSeguimiento: currentMonthDate,
      asesoraAsignada: "Ysela Herrera | Asesora",
      temperatura: "Caliente",
      createdAt: new Date(`${currentMonthDate}T09:00:00`).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      nombre: "Andrea Rivas",
      telefono: "525533778899",
      fechaContacto: currentMonthDate,
      sucursal: "Roma Norte",
      curso: "Maquillaje Profesional",
      origen: "Referido",
      medio: "Llamada",
      informacion: "Información enviada",
      estado: "Inscrita",
      contacto: "Si",
      notas: "Aparto lugar para la siguiente generacion.",
      proximoSeguimiento: currentMonthDate,
      asesoraAsignada: "Mari Flores | Coordinadora de maestras",
      temperatura: "Tibia",
      createdAt: new Date(`${currentMonthDate}T11:30:00`).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      nombre: "Valeria Campos",
      telefono: "525500112233",
      fechaContacto: formatDateForInput(previousMonth),
      sucursal: "Polanco",
      curso: "Maquillaje Profesional",
      origen: "Formulario web",
      medio: "Formulario web",
      informacion: "Pendiente de enviar",
      estado: "Nuevo",
      contacto: "No",
      notas: "Pendiente seguimiento inicial.",
      proximoSeguimiento: "",
      asesoraAsignada: "",
      temperatura: "Sin respuesta",
      createdAt: new Date(`${formatDateForInput(previousMonth)}T10:00:00`).toISOString(),
    },
  ];
  return initialProspects;
}

function seedInternalUsers() {
  return [];
}

async function saveProspects() {
  // Supabase-based module with local cache fallback.
  await dataService.entities.prospects.setAll(prospects);
}

async function saveProspectRecord(record, options = {}) {
  const { keepLocalOnFailure = true } = options;
  const result = await dataService.entities.prospects.upsertOne(record, { alertOnFailure: false });
  const nextRecord = result.record;
  const existingIndex = prospects.findIndex((item) => item.id === nextRecord.id);

  if (result.synced || keepLocalOnFailure) {
    if (existingIndex >= 0) {
      prospects[existingIndex] = nextRecord;
    } else {
      prospects.unshift(nextRecord);
    }
  }

  if (!result.synced) {
    console.warn(
      keepLocalOnFailure
        ? "Prospect saved only to local fallback cache after Supabase write failure."
        : "Prospect write failed in Supabase and was removed from local cache for Web Venezia.",
      {
      id: nextRecord.id,
      nombre: nextRecord.nombre,
      }
    );

    if (!keepLocalOnFailure) {
      prospects = prospects.filter((item) => item.id !== nextRecord.id);
      localStorage.setItem(dataService.keys.prospects, JSON.stringify(prospects));
    }
  }

  return result;
}

async function saveStudentRecord(record) {
  console.log('Altas module target table: "students"');
  console.log("ALTA -> students payload", {
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
  });
  const result = await dataService.entities.students.upsertOne(record, { alertOnFailure: false });
  if (!result.synced) {
    console.log('Supabase write to "students" failed.');
    console.log('Supabase response for "students" write:', result.response);
    console.error('Supabase error for "students" write:', result.error);
    console.error(
      'Supabase error message for "students" write:',
      result.error?.message || result.error?.details || String(result.error)
    );
    console.warn("Alta saved only to local fallback cache after Supabase write failure.", {
      id: record.id,
      nombre: record.nombre,
    });
  } else {
    const nextRecord = result.record;
    const existingIndex = students.findIndex((item) => item.id === nextRecord.id);

    if (existingIndex >= 0) {
      students[existingIndex] = nextRecord;
    } else {
      students.unshift(nextRecord);
    }

    console.log('Supabase write to "students" succeeded.', {
      id: nextRecord.id,
    });
    console.log('Supabase response for "students" write:', result.response);
    console.log("ALTA -> students success", {
      id: nextRecord.id,
    });
  }

  return result;
}

function saveAttendanceRecords() {
  dataService.entities.attendance.setAll(attendanceRecords);
}

async function saveAttendanceRecord(record) {
  console.log('Asistencias module target table: "attendance_records"');
  console.log("ASISTENCIA payload", {
    id: record.id,
    student_id: record.studentId || null,
    attendance_date: record.fecha || null,
    status: record.estado || "",
    notes: record.observaciones || "",
    recorded_by: record.recordedBy || "",
    created_at: record.createdAt || null,
  });

  const result = await dataService.entities.attendance.upsertOne(record, { alertOnFailure: false });

  if (!result.synced) {
    console.error("ASISTENCIA error", result.error);
    console.error(
      "ASISTENCIA error message",
      result.error?.message || result.error?.details || String(result.error)
    );
    console.warn("Attendance saved only to local fallback cache after Supabase write failure.", {
      id: record.id,
      studentId: record.studentId,
    });
    return result;
  }

  const nextRecord = result.record;
  const existingIndex = attendanceRecords.findIndex((item) => item.id === nextRecord.id);
  if (existingIndex >= 0) {
    attendanceRecords[existingIndex] = nextRecord;
  } else {
    attendanceRecords.unshift(nextRecord);
  }

  console.log("ASISTENCIA success", result.response || nextRecord);
  return result;
}

function savePaymentRecords() {
  dataService.entities.payments.setAll(paymentRecords);
}

function toNullablePaymentNumber(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) {
    return null;
  }

  const numericValue = Number(normalized.replace(/,/g, ""));
  return Number.isFinite(numericValue) ? numericValue : null;
}

async function savePaymentRecord(record) {
  console.log('Pagos module target table: "student_payments"');
  console.log("PAGO payload", {
    id: record.id,
    student_id: record.studentId || null,
    tuition_amount: toNullablePaymentNumber(record.mensualidadPactada),
    certificate_p1_amount: toNullablePaymentNumber(record.certificadoP1),
    certificate_p2_amount: toNullablePaymentNumber(record.certificadoP2),
    first_month_amount: toNullablePaymentNumber(record.mensualidad1),
    second_month_amount: toNullablePaymentNumber(record.mensualidad2),
    third_month_amount: toNullablePaymentNumber(record.mensualidad3),
    fourth_month_amount: toNullablePaymentNumber(record.mensualidad4),
    fifth_month_amount: toNullablePaymentNumber(record.mensualidad5),
    pending_payments: record.pagosPendientes || "",
    payment_method: record.metodoPago || "",
    reports: record.reportes || "",
    notes: record.observaciones || "",
    updated_at: record.updatedAt || null,
    created_at: record.createdAt || null,
  });

  const result = await dataService.entities.payments.upsertOne(record, { alertOnFailure: false });

  if (!result.synced) {
    console.error("PAGO error", result.error);
    console.error(
      "PAGO error message",
      result.error?.message || result.error?.details || String(result.error)
    );
    console.warn("Payment saved only to local fallback cache after Supabase write failure.", {
      id: record.id,
      studentId: record.studentId,
    });
    return result;
  }

  const nextRecord = result.record;
  const existingIndex = paymentRecords.findIndex((item) => item.id === nextRecord.id);
  if (existingIndex >= 0) {
    paymentRecords[existingIndex] = nextRecord;
  } else {
    paymentRecords.unshift(nextRecord);
  }

  console.log("PAGO success", result.response || nextRecord);
  return result;
}

function saveFinanceRecords() {
  dataService.entities.financialMovements.setAll(financeRecords);
}

async function saveFinanceRecord(record) {
  console.log('Finanzas module target table: "finance_records"');
  console.log("finance payload", {
    id: record.id,
    record_date: record.fecha || null,
    branch: record.sucursal || "",
    type: record.tipo || "",
    category: record.categoria || "",
    amount: Number(record.monto || 0),
    payment_method: record.metodoPago || "",
    notes: [
      `Concepto: ${record.concepto || ""}`,
      `Observaciones: ${record.observaciones || ""}`,
    ].join(" | "),
    recorded_by: record.usuario || "",
    created_at: record.createdAt || null,
  });

  const result = await dataService.entities.financialMovements.upsertOne(record, { alertOnFailure: false });

  if (!result.synced) {
    console.error("finance error", result.error);
    console.error(
      "finance error message",
      result.error?.message || result.error?.details || String(result.error)
    );
    console.warn("Finance record saved only to local fallback cache after Supabase write failure.", {
      id: record.id,
    });
    return result;
  }

  const nextRecord = result.record;
  const existingIndex = financeRecords.findIndex((item) => item.id === nextRecord.id);
  if (existingIndex >= 0) {
    financeRecords[existingIndex] = nextRecord;
  } else {
    financeRecords.unshift(nextRecord);
  }

  console.log("finance success", result.response || nextRecord);
  return result;
}

function saveStudentAccessRecords() {
  dataService.entities.studentPortalAccess.setAll(studentAccessRecords);
}

async function saveInternalUsers() {
  // Supabase-based module with local cache fallback.
  await dataService.entities.internalUsers.setAll(internalUsers);
}

async function saveStaffRecord(record) {
  console.log('Personal module target table: "staff"');
  const result = await dataService.entities.staff.upsertOne(record, { alertOnFailure: false });
  const nextRecord = result.record;
  const existingIndex = staffRecords.findIndex((item) => item.id === nextRecord.id);

  if (existingIndex >= 0) {
    staffRecords[existingIndex] = nextRecord;
  } else {
    staffRecords.unshift(nextRecord);
  }

  if (!result.synced) {
    console.log('Supabase write to "staff" failed.');
    console.warn("Staff record saved only to local fallback cache after Supabase write failure.", {
      id: nextRecord.id,
      nombre: nextRecord.nombre,
    });
  } else {
    console.log('Supabase write to "staff" succeeded.', {
      id: nextRecord.id,
    });
  }

  return result;
}

function getCurrentMonthValue() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
}

function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getProspectDate(prospect) {
  return prospect.fechaContacto || (prospect.createdAt ? prospect.createdAt.slice(0, 10) : "");
}

function normalizeLeadOrigin(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (!normalized) return "";
  if (normalized === "web" || normalized.includes("pagina web") || normalized.includes("página web") || normalized.includes("formulario web")) return "Formulario web";
  if (normalized.includes("tlaxcala") && normalized.includes("whatsapp")) return "WhatsApp Tlaxcala";
  if (normalized.includes("puebla") && normalized.includes("whatsapp")) return "WhatsApp Puebla";
  if (normalized.includes("asesora")) return "Informes con una asesora";
  if (normalized.includes("instagram")) return "Instagram";
  if (normalized.includes("tiktok")) return "TikTok";
  if (normalized.includes("refer")) return "Referido";
  if (normalized.includes("facebook")) return "Facebook";
  if (normalized.includes("redes")) return "Instagram";
  return String(value || "").trim();
}

function normalizeLeadChannel(value, origin = "") {
  const normalized = String(value || "").trim().toLowerCase();
  const normalizedOrigin = normalizeLeadOrigin(origin);

  if (!normalized && normalizedOrigin) {
    return normalizedOrigin;
  }

  if (normalized === "whatsapp") {
    return normalizedOrigin === "WhatsApp Puebla" ? "WhatsApp Puebla" : "WhatsApp Tlaxcala";
  }

  if (normalized === "facebook messenger") return "Facebook";
  if (normalized === "instagram dm") return "Instagram";
  if (normalized.includes("formulario web") || normalized === "web") return "Formulario web";
  if (normalized.includes("tlaxcala") && normalized.includes("whatsapp")) return "WhatsApp Tlaxcala";
  if (normalized.includes("puebla") && normalized.includes("whatsapp")) return "WhatsApp Puebla";
  if (normalized.includes("asesora")) return "Informes con una asesora";
  if (normalized.includes("instagram")) return "Instagram";
  if (normalized.includes("tiktok")) return "TikTok";
  if (normalized.includes("refer")) return "Referido";
  if (normalized.includes("facebook")) return "Facebook";
  if (normalized === "llamada") return "Llamada";
  if (normalized === "presencial") return "Presencial";
  if (normalized === "otro") return "Otro";
  return String(value || normalizedOrigin || "").trim();
}

function getTemperatureTone(temperature) {
  const normalized = String(temperature || "").trim().toLowerCase();

  if (normalized === "caliente") return "hot";
  if (normalized === "tibia") return "warm";
  if (normalized === "fría" || normalized === "fria") return "cold";
  if (normalized === "sin respuesta") return "quiet";
  if (normalized === "reagendar") return "reschedule";
  if (normalized === "interesada en beca") return "scholarship";
  return "default";
}

function getProspectHistorySummary(prospect) {
  return [
    `Nombre: ${prospect.nombre || "-"}`,
    `Fecha de contacto: ${getProspectDate(prospect) || "-"}`,
    `Estado: ${prospect.estado || "-"}`,
    `Temperatura: ${prospect.temperatura || "-"}`,
    `Asesora asignada: ${prospect.asesoraAsignada || "-"}`,
    `Próximo seguimiento: ${prospect.proximoSeguimiento || "-"}`,
    `Origen: ${prospect.origen || "-"}`,
    `Canal: ${prospect.medio || "-"}`,
    `Notas: ${prospect.notas || "Sin notas registradas."}`,
  ].join("\n");
}

function getMonthStartEnd(monthValue) {
  const [year, month] = monthValue.split("-").map(Number);
  return {
    start: new Date(year, month - 1, 1),
    end: new Date(year, month, 0),
  };
}

function isDateInMonth(dateValue, monthValue) {
  if (!dateValue || !monthValue) {
    return false;
  }

  const { start, end } = getMonthStartEnd(monthValue);
  const date = new Date(`${dateValue}T12:00:00`);
  return date >= start && date <= end;
}

function isDateInSelectedMonth(dateValue) {
  return isDateInMonth(dateValue, selectedMonth);
}

function isProspectInSelectedMonth(prospect) {
  return isDateInSelectedMonth(getProspectDate(prospect));
}

async function normalizeLegacyProspects() {
  let changed = false;

  prospects = prospects.map((prospect) => {
    const normalized = { ...prospect };

    if (normalized.nombre === "Moises Velazo") {
      normalized.nombre = "Moises Velazco";
      changed = true;
    }

    if (!normalized.fechaContacto) {
      normalized.fechaContacto = getProspectDate(normalized) || formatDateForInput(new Date());
      changed = true;
    }

    if (normalized.informacion === "Si") {
      normalized.informacion = "Información enviada";
      changed = true;
    }

    if (normalized.informacion === "No") {
      normalized.informacion = "Pendiente de enviar";
      changed = true;
    }

    if (normalized.medio === "Correo") {
      normalized.medio = "Otro";
      changed = true;
    }

    const nextOrigin = normalizeLeadOrigin(normalized.origen);
    if (nextOrigin && nextOrigin !== normalized.origen) {
      normalized.origen = nextOrigin;
      changed = true;
    }

    const nextChannel = normalizeLeadChannel(normalized.medio, normalized.origen);
    if (nextChannel && nextChannel !== normalized.medio) {
      normalized.medio = nextChannel;
      changed = true;
    }

    if (!Object.prototype.hasOwnProperty.call(normalized, "proximoSeguimiento")) {
      normalized.proximoSeguimiento = "";
      changed = true;
    }

    if (!Object.prototype.hasOwnProperty.call(normalized, "asesoraAsignada")) {
      normalized.asesoraAsignada = "";
      changed = true;
    }

    if (!Object.prototype.hasOwnProperty.call(normalized, "temperatura")) {
      normalized.temperatura = "";
      changed = true;
    }

    return normalized;
  });

  if (changed) {
    await saveProspects();
  }
}

async function normalizeInternalUsers() {
  let changed = false;

  internalUsers = internalUsers.map((user) => {
    const normalized = {
      ...user,
      fullName: user.fullName || "",
      username: user.username || "",
      phone: user.phone || "",
      role: user.role || "",
      branch: user.branch || "",
      status: user.status || "Activo",
    };

    if (!normalized.status) {
      normalized.status = "Activo";
      changed = true;
    }

    if (!Array.isArray(normalized.permissions)) {
      normalized.permissions =
        normalized.role === "Director General"
          ? [...ALL_MODULE_PERMISSIONS]
          : [...(BASE_ROLE_PERMISSIONS[normalized.role] || [])];
      changed = true;
    }

    if (normalized.role === "Director General" && !normalized.permissions.includes("usuarios-accesos")) {
      normalized.permissions = [...new Set(normalized.permissions.concat("usuarios-accesos"))];
      changed = true;
    }

    normalized.phone = normalizePhone(normalized.phone);

    return normalized;
  });

  if (changed) {
    await saveInternalUsers();
  }
}

function getFormData() {
  const formData = new FormData(form);
  const existingId = document.getElementById("prospectId").value;
  const existingProspect = prospects.find((item) => item.id === existingId);
  const fechaContacto = formData.get("fechaContacto");

  return {
    id: existingId || crypto.randomUUID(),
    nombre: formData.get("nombre").trim(),
    telefono: normalizePhone(formData.get("telefono")),
    fechaContacto,
    sucursal: formData.get("sucursal").trim(),
    curso: formData.get("curso").trim(),
    origen: normalizeLeadOrigin(formData.get("origen")),
    medio: normalizeLeadChannel(formData.get("medio"), formData.get("origen")),
    informacion: formData.get("informacion"),
    estado: formData.get("estado"),
    proximoSeguimiento: String(formData.get("proximoSeguimiento") || ""),
    asesoraAsignada: String(formData.get("asesoraAsignada") || ""),
    temperatura: String(formData.get("temperatura") || ""),
    contacto: formData.get("contacto"),
    notas: formData.get("notas").trim(),
    accesoInteres: formData.get("accesoInteres"),
    createdAt: existingProspect?.createdAt || new Date(`${fechaContacto}T12:00:00`).toISOString(),
  };
}

function getAltaFormData() {
  const formData = new FormData(altaForm);
  const telefono = formData.get("telefono").trim();
  const portalPassword = String(formData.get("portalPassword") || "").trim();
  const allowedBranch = getAllowedBranch();
  return {
    id: crypto.randomUUID(),
    prospectId: document.getElementById("altaProspectId").value,
    nombre: formData.get("nombre").trim(),
    telefono,
    sucursal: allowedBranch || formData.get("sucursal").trim(),
    curso: formData.get("curso").trim(),
    accesoElegido: formData.get("accesoElegido"),
    horario: formData.get("horario").trim(),
    fechaInicio: formData.get("fechaInicio"),
    observaciones: [
      String(formData.get("observaciones") || "").trim(),
      `Inscripción pagada: ${String(formData.get("inscripcionPagada") || "").trim()}`,
      `Colegiatura: ${String(formData.get("colegiatura") || "").trim()}`,
      `Promoción: ${String(formData.get("promocion") || "").trim() || "-"}`,
      `Documentos: ${String(formData.get("documentos") || "").trim()}`,
      `Usuario alta: ${String(formData.get("usuarioAlta") || "").trim()}`,
    ]
      .filter(Boolean)
      .join(" | "),
    portalPassword: portalPassword || getDefaultStudentPassword(telefono),
    estado: "Activa",
    createdAt: new Date().toISOString(),
  };
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function getCurrentInternalUser() {
  return internalUsers.find((user) => user.id === currentInternalUserId) || null;
}

function hasInternalAccess(module) {
  const user = getCurrentInternalUser();
  if (!user) {
    return false;
  }
  if (user.status !== "Activo") {
    return false;
  }
  if (module === "usuarios-accesos") {
    return user.role === "Director General" && Array.isArray(user.permissions) && user.permissions.includes(module);
  }
  return Array.isArray(user.permissions) && user.permissions.includes(module);
}

function isRoleBranchLimited() {
  const user = getCurrentInternalUser();
  return Boolean(user && BRANCH_LIMITED_ROLES.has(user.role));
}

function getAllowedBranch() {
  const user = getCurrentInternalUser();
  if (!user || !isRoleBranchLimited()) {
    return "";
  }
  return user.branch;
}

function matchesCurrentBranch(branch) {
  const allowedBranch = getAllowedBranch();
  return !allowedBranch || branch === allowedBranch;
}

function getDefaultModuleForCurrentContext() {
  if (currentAccessMode === "student") {
    return "mi-venezia";
  }

  if (currentAccessMode !== "internal") {
    return "web-venezia";
  }

  const user = getCurrentInternalUser();
  return ALL_MODULE_PERMISSIONS.find((module) => hasInternalAccess(module)) || "crm-prospectos";
}

function applyRoleToSidebar() {
  navItems.forEach((navItem) => {
    const module = navItem.dataset.module;
    const visible =
      currentAccessMode === "student"
        ? module === "mi-venezia"
        : currentAccessMode === "internal"
          ? hasInternalAccess(module)
          : false;
    navItem.hidden = !visible;
  });
}

function updateSessionUI() {
  const user = getCurrentInternalUser();
  const inApp = currentAccessMode === "internal" || currentAccessMode === "student";
  const publicMode = !inApp;

  document.body.classList.toggle("public-mode", publicMode);
  loginShell.hidden = inApp || !publicAccessPanelOpen;
  appShell.hidden = false;
  loginShell.style.display = inApp || !publicAccessPanelOpen ? "none" : "grid";
  appShell.style.display = "grid";

  if (currentAccessMode === "internal" && user) {
    userBadge.hidden = false;
    userBadge.textContent = `${user.fullName} | ${user.role}${user.branch && user.branch !== "Todas" ? ` | ${user.branch}` : ""}`;
    internalLogoutButton.hidden = false;
    internalLoginError.hidden = true;
  } else if (currentAccessMode === "student") {
    userBadge.hidden = false;
    userBadge.textContent = "Mi Venezia | Alumna";
    internalLogoutButton.hidden = false;
    internalLoginError.hidden = true;
  } else {
    userBadge.hidden = true;
    internalLogoutButton.hidden = true;
  }

  applyRoleToSidebar();
}

function openPublicAccessPanel() {
  publicAccessPanelOpen = true;
  updateSessionUI();
}

function restoreInternalAccessFromSavedSession() {
  const user = getCurrentInternalUser();
  if (!currentInternalUserId || !user || user.status !== "Activo") {
    return false;
  }

  currentAccessMode = "internal";
  publicAccessPanelOpen = false;
  internalLoginError.hidden = true;
  updateSessionUI();
  renderAll();
  setActiveModule(getDefaultModuleForCurrentContext());
  return true;
}

function closePublicAccessPanel() {
  publicAccessPanelOpen = false;
  internalLoginError.hidden = true;
  updateSessionUI();
}

function applyBranchRestrictionsToUI() {
  const allowedBranch = getAllowedBranch();
  const branchLocked = Boolean(allowedBranch);

  if (branchLocked) {
    document.getElementById("altaSucursal").value = allowedBranch;
    document.getElementById("financeSucursal").value = allowedBranch;
    attendanceSucursalFilter.value = allowedBranch;
    financeBranchFilter.value = allowedBranch;
    dashboardBranchFilter.value = allowedBranch;
  }

  document.getElementById("altaSucursal").readOnly = branchLocked;
  document.getElementById("financeSucursal").value = branchLocked ? allowedBranch : document.getElementById("financeSucursal").value;
  document.getElementById("financeSucursal").disabled = branchLocked;
  document.getElementById("staffSucursal").value = branchLocked ? allowedBranch : document.getElementById("staffSucursal").value;
  document.getElementById("staffSucursal").disabled = branchLocked;
  attendanceSucursalFilter.disabled = branchLocked;
  financeBranchFilter.disabled = branchLocked;
  dashboardBranchFilter.disabled = branchLocked || !hasInternalAccess("dashboard");
}

function logoutInternalSession() {
  currentInternalUserId = "";
  currentAccessMode = "logged-out";
  currentPortalStudentId = "";
  publicAccessPanelOpen = false;
  // Still local/session-backed through dataService sessions.
  dataService.sessions.clearInternal();
  dataService.sessions.clearStudent();
  miVeneziaLoginForm.reset();
  miVeneziaLoginPanel.hidden = false;
  miVeneziaDashboard.hidden = true;
  updateSessionUI();
}

function getDefaultStudentPassword(phone) {
  const digits = normalizePhone(phone);
  return `venezia${digits.slice(-4) || "0000"}`;
}

function syncStudentAccessRecords() {
  const accessByStudentId = new Map(studentAccessRecords.map((record) => [record.studentId, record]));
  let changed = false;
  const allOperationalStudents = students.filter((student) => {
    const prospect = prospects.find((item) => item.id === student.prospectId);
    return !prospect || prospect.estado === "Alta completada" || prospect.estado === "Inscrita";
  });

  studentAccessRecords = allOperationalStudents.map((student) => {
    const existing = accessByStudentId.get(student.id);
    if (existing) {
      const nextPassword = student.portalPassword || existing.password || getDefaultStudentPassword(student.telefono);
      if (existing.telefono !== normalizePhone(student.telefono) || existing.password !== nextPassword) {
        changed = true;
      }
      return {
        ...existing,
        telefono: normalizePhone(student.telefono),
        password: nextPassword,
      };
    }

    changed = true;
    return {
      id: crypto.randomUUID(),
      studentId: student.id,
      telefono: normalizePhone(student.telefono),
      password: student.portalPassword || getDefaultStudentPassword(student.telefono),
    };
  });

  if (changed) {
    saveStudentAccessRecords();
  }
}

function getFinanceFormData() {
  const formData = new FormData(financeForm);
  const existingId = document.getElementById("financeId").value;
  const existingRecord = financeRecords.find((record) => record.id === existingId);
  const allowedBranch = getAllowedBranch();

  return {
    id: existingId || crypto.randomUUID(),
    fecha: formData.get("fecha"),
    sucursal: allowedBranch || formData.get("sucursal"),
    tipo: formData.get("tipo"),
    categoria: formData.get("categoria"),
    concepto: formData.get("concepto").trim(),
    monto: Number(formData.get("monto")),
    metodoPago: formData.get("metodoPago"),
    observaciones: formData.get("observaciones").trim(),
    usuario: formData.get("usuario").trim(),
    createdAt: existingRecord?.createdAt || new Date().toISOString(),
  };
}

function getInternalUserFormData() {
  const formData = new FormData(internalUserForm);
  const existingId = document.getElementById("internalUserId").value;
  const existingUser = internalUsers.find((user) => user.id === existingId);
  const username = String(formData.get("login") || "").trim();
  let permissions = Array.from(
    internalUserForm.querySelectorAll('input[name="permissions"]:checked')
  ).map((input) => input.value);
  const role = formData.get("rol");

  if (role === "Director General" && !permissions.includes("usuarios-accesos")) {
    permissions = permissions.concat("usuarios-accesos");
  }

  return {
    id: existingId || crypto.randomUUID(),
    fullName: String(formData.get("nombre") || "").trim(),
    username,
    phone: existingUser?.phone || "",
    password: String(formData.get("password") || "").trim(),
    role,
    branch: formData.get("sucursal"),
    status: formData.get("estado"),
    permissions,
  };
}

function getStaffFormData() {
  const formData = new FormData(staffForm);
  const existingId = document.getElementById("staffId").value;
  const existingRecord = staffRecords.find((record) => record.id === existingId);
  const allowedBranch = getAllowedBranch();

  return {
    id: existingId || crypto.randomUUID(),
    nombre: String(formData.get("nombre") || "").trim(),
    telefono: normalizePhone(formData.get("telefono")),
    puesto: formData.get("puesto"),
    area: formData.get("area"),
    sucursal: allowedBranch || formData.get("sucursal"),
    fechaIngreso: formData.get("fechaIngreso"),
    estado: formData.get("estado"),
    linkedUserId: String(formData.get("linkedUserId") || "").trim(),
    observaciones: String(formData.get("observaciones") || "").trim(),
    createdAt: existingRecord?.createdAt || new Date().toISOString(),
  };
}

async function resolveLinkedInternalUserId(selectedId) {
  const normalizedId = String(selectedId || "").trim();
  if (!normalizedId) {
    return null;
  }

  internalUsers = await dataService.entities.internalUsers.getAllPrimary(() => []);
  await normalizeInternalUsers();

  const matchedUser = internalUsers.find((user) => user.id === normalizedId);
  return matchedUser ? matchedUser.id : null;
}

function getWebLeadFormData() {
  const formData = new FormData(webLeadForm);
  const today = formatDateForInput(new Date());
  const notes = "Lead captado desde Web Venezia.";

  return {
    id: crypto.randomUUID(),
    nombre: String(formData.get("nombre") || "").trim(),
    telefono: normalizePhone(formData.get("telefono")),
    fechaContacto: today,
    sucursal: String(formData.get("sucursal") || "").trim(),
    curso: String(formData.get("curso") || "").trim(),
    origen: "Formulario web",
    medio: "Formulario web",
    informacion: "Pendiente de enviar",
    estado: "Nuevo",
    proximoSeguimiento: "",
    asesoraAsignada: "",
    temperatura: "",
    contacto: "Web",
    notas: notes,
    accesoInteres: "",
    horarioCita: "",
    horaSugerida: "",
    tipoSolicitud: "",
    inscribio: "Pendiente",
    createdAt: new Date().toISOString(),
  };
}

function updateWebAppointmentFields() {
  if (!webTipoSolicitud || !webHorarioCitaField || !webHorarioCita || !webHoraSugeridaField || !webHoraSugerida) {
    return;
  }

  const tipoSolicitud = webTipoSolicitud.value;
  const requiresAppointment =
    tipoSolicitud === "Agendar visita para inscribirme" ||
    tipoSolicitud === "Agendar visita para aplicar a una beca";
  const useCustomHour = requiresAppointment && webHorarioCita.value === "Otro horario";

  webHorarioCitaField.hidden = !requiresAppointment;
  webHorarioCita.disabled = !requiresAppointment;
  webHorarioCita.required = requiresAppointment;

  if (!requiresAppointment) {
    webHorarioCita.value = "";
  }

  webHoraSugeridaField.hidden = !useCustomHour;
  webHoraSugerida.disabled = !useCustomHour;
  webHoraSugerida.required = useCustomHour;

  if (!useCustomHour) {
    webHoraSugerida.value = "";
  }
}

function getWebWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(
    message || "Hola, quiero información sobre los cursos y saber si aún hay becas disponibles 🙏"
  );
  return `https://wa.me/${WEB_DEFAULT_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

function getWebLeadWhatsAppRedirectUrl({ fullName, courseInterest, branchInterest }) {
  const message = encodeURIComponent(
    `Hola, acabo de registrarme en Instituto Venezia.

Mi nombre es ${fullName}
Me interesa el curso de ${courseInterest} en ${branchInterest}

Quiero recibir informacion y revisar si todavia hay beca o apoyo disponible.
¿Me puedes compartir la informacion para empezar?`
  );

  return `https://wa.me/${WEB_DEFAULT_WHATSAPP_NUMBER}?text=${message}`;
}

function getWebCourseCatalog() {
  return WEB_DEFAULT_COURSES.map((course) => ({ ...course }));
}

function renderWebCourseAvailability(course) {
  if (course.comingSoon) {
    return `
      <div class="web-course-availability web-course-availability-soon">
        <p class="web-course-availability-title">${escapeHtml(course.availabilityTitle || "Próximamente")}</p>
        <p class="web-course-coming-soon">${escapeHtml(course.comingSoon)}</p>
      </div>
    `;
  }

  if (!Array.isArray(course.summaryBlocks) || course.summaryBlocks.length === 0) {
    return "";
  }

  return `
    <div class="web-course-availability">
      <p class="web-course-availability-title">${escapeHtml(course.availabilityTitle || "Horarios nuevos")}</p>
      ${course.summaryBlocks
        .map(
          (block) => `
            <section class="web-course-schedule-group">
              <div class="web-course-schedule-heading">
                <strong>${escapeHtml(block.title)}</strong>
                ${block.kicker ? `<span class="web-course-schedule-kicker">${escapeHtml(block.kicker)}</span>` : ""}
                ${block.detail ? `<p class="web-course-schedule-detail">${escapeHtml(block.detail)}</p>` : ""}
              </div>
            </section>
          `
        )
        .join("")}
      ${course.extraNote ? `<p class="web-course-extra-note">${escapeHtml(course.extraNote)}</p>` : ""}
      ${course.capacityNote ? `<p class="web-course-capacity-note">${escapeHtml(course.capacityNote)}</p>` : ""}
    </div>
  `;
}

function renderWebCourses() {
  const courses = getWebCourseCatalog();

  if (webCoursesGrid) {
    webCoursesGrid.innerHTML = courses
      .map(
        (course) => `
          <article class="web-course-card">
            ${course.imagePath ? `<div class="web-course-media"><img src="${escapeHtml(course.imagePath)}" alt="${escapeHtml(course.name)} en Instituto Venezia" /></div>` : ""}
            <span class="web-course-tag">${escapeHtml(course.statusLabel || "Curso activo y disponible")}</span>
            <strong>${escapeHtml(course.name)}</strong>
            ${course.description ? `<p>${escapeHtml(course.description)}</p>` : ""}
            ${renderWebCourseAvailability(course)}
            <button class="secondary-btn web-course-btn" type="button" data-course="${escapeHtml(course.name)}">Quiero información</button>
          </article>
        `
      )
      .join("");
  }

  populateSelectWithValues(
    document.getElementById("webCurso"),
    courses.map((course) => course.name),
    "Selecciona una opcion"
  );
}

function renderWebWhatsappLinks() {
  webWhatsappLinks.forEach((link) => {
    link.href = getWebWhatsAppUrl("Hola, quiero información sobre los cursos y saber si aún hay becas disponibles 🙏");
  });
}

function getWebLeadUiElements() {
  return {
    successAlert: document.getElementById("webSuccessAlert"),
    errorAlert: document.getElementById("webErrorAlert"),
    submitButton: document.getElementById("webLeadSubmitButton"),
  };
}

function setWebLeadFeedback({ success, message }) {
  const { successAlert, errorAlert } = getWebLeadUiElements();

  if (successAlert) {
    successAlert.hidden = !success;
  }
  if (errorAlert) {
    errorAlert.hidden = success;
  }

  if (success) {
    if (successAlert) {
      successAlert.textContent = message;
    }
    return;
  }

  if (errorAlert) {
    errorAlert.textContent = message;
  }
}

function initHeroSlider() {
  if (!heroSlider || heroSlides.length <= 1) {
    return;
  }

  const autoplayDelay = 5000;
  let activeIndex = Math.max(
    0,
    heroSlides.findIndex((slide) => slide.classList.contains("is-active"))
  );
  let autoplayTimer = null;
  let isPaused = false;

  const updateSliderState = (nextIndex) => {
    activeIndex = (nextIndex + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    heroSliderDots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  const startAutoplay = () => {
    if (autoplayTimer || isPaused) {
      return;
    }

    autoplayTimer = window.setInterval(() => {
      updateSliderState(activeIndex + 1);
    }, autoplayDelay);
  };

  const stopAutoplay = () => {
    if (!autoplayTimer) {
      return;
    }

    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  heroSliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSliderState(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  if (heroSliderPrevButton) {
    heroSliderPrevButton.addEventListener("click", () => {
      updateSliderState(activeIndex - 1);
      stopAutoplay();
      startAutoplay();
    });
  }

  if (heroSliderNextButton) {
    heroSliderNextButton.addEventListener("click", () => {
      updateSliderState(activeIndex + 1);
      stopAutoplay();
      startAutoplay();
    });
  }

  heroSlider.addEventListener("mouseenter", () => {
    isPaused = true;
    stopAutoplay();
  });

  heroSlider.addEventListener("mouseleave", () => {
    isPaused = false;
    startAutoplay();
  });

  heroSlider.addEventListener("focusin", stopAutoplay);
  heroSlider.addEventListener("focusout", () => {
    if (!heroSlider.matches(":hover")) {
      startAutoplay();
    }
  });

  updateSliderState(activeIndex);
  startAutoplay();
}

function resetForm() {
  form.reset();
  document.getElementById("prospectId").value = "";
  document.getElementById("fechaContacto").value = formatDateForInput(new Date());
  submitButton.textContent = "Guardar prospecto";
}

function resetAltaForm() {
  altaForm.reset();
  document.getElementById("altaProspectId").value = "";
}

function resetFinanceForm() {
  financeForm.reset();
  document.getElementById("financeId").value = "";
  document.getElementById("financeFecha").value = formatDateForInput(new Date());
  updateFinanceCategories();
  financeSubmitButton.textContent = "Guardar movimiento";
}

function resetInternalUserForm() {
  internalUserForm.reset();
  document.getElementById("internalUserId").value = "";
  internalUserSubmitButton.textContent = "Guardar usuario";
}

function resetStaffForm() {
  staffForm.reset();
  document.getElementById("staffId").value = "";
  document.getElementById("staffFechaIngreso").value = formatDateForInput(new Date());
  staffSubmitButton.textContent = "Guardar personal";
}

function updateStats() {
  const sameMonthProspects = getDashboardMonthProspects();

  statProspectos.textContent = sameMonthProspects.length;
  statInformaciones.textContent = sameMonthProspects.filter(
    (prospect) => prospect.informacion === "Información enviada"
  ).length;
  statInscritas.textContent = sameMonthProspects.filter(
    (prospect) => prospect.estado === "Inscrita" || prospect.estado === "Alta completada"
  ).length;
}

function matchesDashboardBranch(branch) {
  return matchesCurrentBranch(branch) && (!dashboardBranchFilter.value || branch === dashboardBranchFilter.value);
}

function getDashboardMonthProspects() {
  return prospects.filter(
    (prospect) => isProspectInSelectedMonth(prospect) && matchesDashboardBranch(prospect.sucursal)
  );
}

function getDashboardActiveStudents() {
  return getActiveStudents().filter((student) => matchesDashboardBranch(student.sucursal));
}

function getDashboardPaymentRecords() {
  const activeStudentIds = new Set(getDashboardActiveStudents().map((student) => student.id));
  return paymentRecords.filter((record) => activeStudentIds.has(record.studentId));
}

function getDashboardFinanceRecords() {
  return financeRecords.filter(
    (record) => isDateInSelectedMonth(record.fecha) && matchesDashboardBranch(record.sucursal)
  );
}

function normalizeDashboardOrigin(prospect) {
  const origen = normalizeLeadOrigin(prospect.origen);

  if (origen === "TikTok") return "TikTok";
  if (origen === "Facebook") return "Facebook";
  if (origen === "Instagram") return "Instagram";
  if (origen === "Referido") return "Referido";
  if (origen === "Formulario web") return "Web";
  if (origen === "WhatsApp Tlaxcala" || origen === "WhatsApp Puebla") return "WhatsApp directo";
  return "Otro";
}

function getAdvisorNameForProspect(prospect) {
  const linkedStudent = students.find((student) => student.prospectId === prospect.id);
  const advisor = linkedStudent?.usuarioAlta || prospect.inscribio || "";
  return DASHBOARD_ADVISORS.includes(advisor) ? advisor : "";
}

function renderDashboard() {
  const monthProspects = getDashboardMonthProspects();
  const activeStudents = getDashboardActiveStudents();
  const relevantPayments = getDashboardPaymentRecords();
  const relevantFinanceRecords = getDashboardFinanceRecords();
  const ingresos = relevantFinanceRecords
    .filter((record) => record.tipo === "Ingreso")
    .reduce((sum, record) => sum + Number(record.monto || 0), 0);
  const egresos = relevantFinanceRecords
    .filter((record) => record.tipo === "Egreso")
    .reduce((sum, record) => sum + Number(record.monto || 0), 0);
  const pendingPayments = relevantPayments.filter((record) => {
    const statusFields = [
      record.certificadoP1,
      record.certificadoP2,
      record.mensualidad1,
      record.mensualidad2,
      record.mensualidad3,
      record.mensualidad4,
      record.mensualidad5,
    ];
    return statusFields.includes("Pendiente") || Boolean(String(record.pagosPendientes || "").trim());
  }).length;

  updateStats();
  statAlumnasActivas.textContent = activeStudents.length;
  statPagosPendientesDashboard.textContent = pendingPayments;
  statIngresosDashboard.textContent = formatCurrency(ingresos);
  statEgresosDashboard.textContent = formatCurrency(egresos);
  statBalanceDashboard.textContent = formatCurrency(ingresos - egresos);

  renderInfoList(
    dashboardOriginList,
    DASHBOARD_ORIGIN_BUCKETS.map((origin) => ({
      label: origin,
      value: String(monthProspects.filter((prospect) => normalizeDashboardOrigin(prospect) === origin).length),
    }))
  );

  renderInfoList(
    dashboardAdvisorList,
    DASHBOARD_ADVISORS.map((advisor) => ({
      label: advisor,
      value: String(
        monthProspects.filter((prospect) => {
          if (!(prospect.estado === "Inscrita" || prospect.estado === "Alta completada")) {
            return false;
          }
          return getAdvisorNameForProspect(prospect) === advisor;
        }).length
      ),
    }))
  );

  renderInfoList(
    dashboardIncomeBranchList,
    DASHBOARD_BRANCHES.map((branch) => ({
      label: branch,
      value: formatCurrency(
        financeRecords
          .filter(
            (record) =>
              record.tipo === "Ingreso" &&
              record.sucursal === branch &&
              isDateInSelectedMonth(record.fecha) &&
              matchesDashboardBranch(record.sucursal)
          )
          .reduce((sum, record) => sum + Number(record.monto || 0), 0)
      ),
    }))
  );
}

function populateStaffLinkedUsers() {
  const previousValue = document.getElementById("staffLinkedUser").value;
  const availableUsers = internalUsers
    .filter((user) => matchesCurrentBranch(user.branch) || user.branch === "Todas")
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  document.getElementById("staffLinkedUser").innerHTML = ['<option value="">Sin vincular</option>']
    .concat(
      availableUsers.map(
        (user) =>
          `<option value="${escapeHtml(user.id)}">${escapeHtml(user.fullName)} | ${escapeHtml(user.role)}</option>`
      )
    )
    .join("");

  if (availableUsers.some((user) => user.id === previousValue)) {
    document.getElementById("staffLinkedUser").value = previousValue;
  }
}

function getVisibleInternalUsers() {
  return internalUsers.filter((user) =>
    getCurrentInternalUser()?.role === "Director General" ? true : matchesCurrentBranch(user.branch)
  );
}

function renderInternalUsersTable() {
  const visibleUsers = getVisibleInternalUsers();

  internalUsersTableBody.innerHTML = visibleUsers
    .map(
      (user) => `
        <tr>
          <td>${escapeHtml(user.fullName)}</td>
          <td>${escapeHtml(user.username || user.phone)}</td>
          <td>${escapeHtml(user.role)}</td>
          <td>${escapeHtml(user.branch || "-")}</td>
          <td><span class="status-pill">${escapeHtml(user.status || "Activo")}</span></td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-user" data-id="${user.id}">Editar</button>
              <button class="table-action secondary-btn" type="button" data-action="toggle-user" data-id="${user.id}">${user.status === "Activo" ? "Desactivar" : "Activar"}</button>
              <button class="table-action action-delete" type="button" data-action="delete-user" data-id="${user.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  internalUsersEmptyState.hidden = visibleUsers.length > 0;
}

function getVisibleStaffRecords() {
  return staffRecords.filter((record) => matchesCurrentBranch(record.sucursal));
}

function getLinkedUserLabel(userId) {
  const user = internalUsers.find((item) => item.id === userId);
  return user ? `${user.fullName} | ${user.role}` : "-";
}

function renderStaffTable() {
  const visibleStaff = getVisibleStaffRecords();

  staffTableBody.innerHTML = visibleStaff
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.nombre)}</td>
          <td>${escapeHtml(record.telefono)}</td>
          <td>${escapeHtml(record.puesto)}</td>
          <td>${escapeHtml(record.area)}</td>
          <td>${escapeHtml(record.sucursal)}</td>
          <td>${escapeHtml(record.fechaIngreso)}</td>
          <td><span class="status-pill">${escapeHtml(record.estado)}</span></td>
          <td>${escapeHtml(getLinkedUserLabel(record.linkedUserId))}</td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-staff" data-id="${record.id}">Editar</button>
              <button class="table-action action-delete" type="button" data-action="delete-staff" data-id="${record.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  staffEmptyState.hidden = visibleStaff.length > 0;
}

function editInternalUser(id) {
  const user = internalUsers.find((item) => item.id === id);
  if (!user) {
    return;
  }

  document.getElementById("internalUserId").value = user.id;
  document.getElementById("internalUserNombre").value = user.fullName;
  document.getElementById("internalUserLogin").value = user.username || user.phone;
  document.getElementById("internalUserPassword").value = user.password;
  document.getElementById("internalUserRol").value = user.role;
  document.getElementById("internalUserSucursal").value = user.branch;
  document.getElementById("internalUserEstado").value = user.status || "Activo";
  internalUserForm.querySelectorAll('input[name="permissions"]').forEach((input) => {
    input.checked = Array.isArray(user.permissions) && user.permissions.includes(input.value);
  });
  internalUserSubmitButton.textContent = "Actualizar usuario";
  setActiveModule("usuarios-accesos");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function toggleInternalUserState(id) {
  internalUsers = internalUsers.map((user) =>
    user.id === id ? { ...user, status: user.status === "Activo" ? "Inactivo" : "Activo" } : user
  );
  await saveInternalUsers();
  if (currentInternalUserId === id && getCurrentInternalUser()?.status !== "Activo") {
    logoutInternalSession();
    return;
  }
  renderAll();
}

async function deleteInternalUser(id) {
  if (currentInternalUserId === id) {
    alert("No puedes eliminar tu propia sesión activa.");
    return;
  }
  const deleteResult = await dataService.entities.internalUsers.deleteOne(id);
  internalUsers = deleteResult.records;
  renderAll();
  if (document.getElementById("internalUserId").value === id) {
    resetInternalUserForm();
  }
}

function editStaffRecord(id) {
  const record = staffRecords.find((item) => item.id === id);
  if (!record) {
    return;
  }

  document.getElementById("staffId").value = record.id;
  document.getElementById("staffNombre").value = record.nombre;
  document.getElementById("staffTelefono").value = record.telefono;
  document.getElementById("staffPuesto").value = record.puesto;
  document.getElementById("staffArea").value = record.area;
  document.getElementById("staffSucursal").value = record.sucursal;
  document.getElementById("staffFechaIngreso").value = record.fechaIngreso;
  document.getElementById("staffEstado").value = record.estado;
  document.getElementById("staffLinkedUser").value = record.linkedUserId || "";
  document.getElementById("staffObservaciones").value = record.observaciones || "";
  staffSubmitButton.textContent = "Actualizar personal";
  setActiveModule("personal");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteStaffRecord(id) {
  const deleteResult = await dataService.entities.staff.deleteOne(id, { alertOnFailure: false });
  staffRecords = deleteResult.records;
  if (!deleteResult.synced) {
    alert("No se pudo eliminar el registro de personal en Supabase.");
  }
  renderStaffTable();
  if (document.getElementById("staffId").value === id) {
    resetStaffForm();
  }
}

function getFilteredProspects() {
  const base = prospects.filter(
    (prospect) => isProspectInSelectedMonth(prospect) && matchesCurrentBranch(prospect.sucursal)
  );
  return base.filter((prospect) => {
    const matchesAccess = !activeAccessFilter || prospect.accesoInteres === activeAccessFilter;
    const matchesAdvisor = !activeAdvisorFilter || prospect.asesoraAsignada === activeAdvisorFilter;
    if (!matchesAccess || !matchesAdvisor) {
      return false;
    }

    if (!activeSearch) {
      return true;
    }

    const query = activeSearch.toLowerCase();
    return [
      prospect.nombre,
      prospect.curso,
      prospect.sucursal,
      prospect.estado,
      prospect.temperatura,
      prospect.asesoraAsignada,
      prospect.proximoSeguimiento,
      prospect.origen,
      prospect.medio,
      prospect.informacion,
      prospect.accesoInteres,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
}

function renderTable() {
  const filteredProspects = getFilteredProspects();

  tableBody.innerHTML = filteredProspects
    .map(
      (prospect) => `
        <tr>
          <td>
            <strong>${escapeHtml(prospect.nombre)}</strong>
            <small>${escapeHtml(prospect.origen)} | ${escapeHtml(getProspectDate(prospect))}</small>
          </td>
          <td>
            ${escapeHtml(prospect.telefono)}
            <small>${escapeHtml(prospect.medio)}</small>
          </td>
          <td>${escapeHtml(prospect.sucursal)}</td>
          <td>
            ${escapeHtml(prospect.curso)}
            <small>${escapeHtml(prospect.informacion)}</small>
          </td>
          <td>${escapeHtml(prospect.accesoInteres || "-")}</td>
          <td><span class="status-pill">${escapeHtml(prospect.estado)}</span></td>
          <td>
            <div class="prospect-followup-cell">
              <span class="status-pill status-pill-temperature status-pill-${escapeHtml(getTemperatureTone(prospect.temperatura))}">${escapeHtml(prospect.temperatura || "Sin temperatura")}</span>
              <small>Próximo: ${escapeHtml(prospect.proximoSeguimiento || "-")}</small>
              <small>Asesora: ${escapeHtml(prospect.asesoraAsignada || "-")}</small>
            </div>
          </td>
          <td>
            <div class="actions-cell actions-cell-prospect">
              <button class="table-action action-whatsapp" type="button" data-action="whatsapp" data-id="${prospect.id}">WhatsApp</button>
              <button class="table-action action-schedule" type="button" data-action="schedule" data-id="${prospect.id}">Agendar cita</button>
              <button class="table-action action-enrolled" type="button" data-action="enroll" data-id="${prospect.id}">Marcar como inscrita</button>
              <button class="table-action action-alta" type="button" data-action="alta" data-id="${prospect.id}">Mandar a alta</button>
              <button class="table-action action-history" type="button" data-action="history" data-id="${prospect.id}">Ver historial</button>
              <button class="table-action action-edit" type="button" data-action="edit" data-id="${prospect.id}">Editar</button>
              <button class="table-action action-delete" type="button" data-action="delete" data-id="${prospect.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  emptyState.hidden = filteredProspects.length > 0;
  updateStats();
}

function getPendingAltas() {
  return prospects.filter(
    (prospect) => prospect.estado === "Inscrita" && matchesCurrentBranch(prospect.sucursal)
  );
}

function renderPendingAltas() {
  const pendingAltas = getPendingAltas();

  pendingAltasTableBody.innerHTML = pendingAltas
    .map(
      (prospect) => `
        <tr>
          <td>${escapeHtml(prospect.nombre)}</td>
          <td>${escapeHtml(prospect.telefono)}</td>
          <td>${escapeHtml(prospect.sucursal)}</td>
          <td>${escapeHtml(prospect.curso)}</td>
          <td>${escapeHtml(prospect.accesoInteres || "-")}</td>
          <td><button class="table-action action-edit" type="button" data-action="alta" data-id="${prospect.id}">Dar de alta</button></td>
        </tr>
      `
    )
    .join("");

  pendingAltasEmptyState.hidden = pendingAltas.length > 0;
}

function getActiveStudents() {
  return students.filter((student) => {
    const prospect = prospects.find((item) => item.id === student.prospectId);
    return (
      matchesCurrentBranch(student.sucursal) &&
      (!prospect || prospect.estado === "Alta completada" || prospect.estado === "Inscrita")
    );
  });
}

function getStudentById(studentId) {
  return students.find((student) => student.id === studentId);
}

function populateSelectWithValues(select, values, defaultLabel) {
  const previousValue = select.value;
  const uniqueValues = [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  select.innerHTML = [`<option value="">${defaultLabel}</option>`]
    .concat(uniqueValues.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`))
    .join("");

  if (uniqueValues.includes(previousValue)) {
    select.value = previousValue;
  }
}

function populateAttendanceFilters() {
  const studentsList = getActiveStudents();
  populateSelectWithValues(attendanceSucursalFilter, studentsList.map((student) => student.sucursal), "Todas");
  populateSelectWithValues(attendanceCursoFilter, studentsList.map((student) => student.curso), "Todos");
  populateSelectWithValues(attendanceHorarioFilter, studentsList.map((student) => student.horario), "Todos");
}

function getAttendanceRecord(studentId, date) {
  return attendanceRecords.find((record) => record.studentId === studentId && record.fecha === date);
}

function getFilteredStudentsForAttendance() {
  return getActiveStudents().filter((student) => {
    if (attendanceSucursalFilter.value && student.sucursal !== attendanceSucursalFilter.value) return false;
    if (attendanceCursoFilter.value && student.curso !== attendanceCursoFilter.value) return false;
    if (attendanceHorarioFilter.value && student.horario !== attendanceHorarioFilter.value) return false;
    return true;
  });
}

function renderAttendanceOptions(selectedValue) {
  return ATTENDANCE_STATUS_OPTIONS.map((option) => {
    const label = option || "Selecciona";
    return `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
}

function renderAttendanceTable() {
  const selectedDate = attendanceDate.value || formatDateForInput(new Date());
  const studentsList = getFilteredStudentsForAttendance();

  attendanceTableBody.innerHTML = studentsList
    .map((student) => {
      const record = getAttendanceRecord(student.id, selectedDate);
      return `
        <tr>
          <td>${escapeHtml(student.nombre)}</td>
          <td>${escapeHtml(student.sucursal)}</td>
          <td>${escapeHtml(student.curso)}</td>
          <td>${escapeHtml(student.horario)}</td>
          <td>${escapeHtml(selectedDate)}</td>
          <td><select data-attendance-field="estado" data-student-id="${student.id}">${renderAttendanceOptions(record?.estado || "")}</select></td>
          <td><input type="text" value="${escapeHtml(record?.observaciones || "")}" placeholder="Observaciones" data-attendance-field="observaciones" data-student-id="${student.id}" /></td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="save-attendance" data-id="${student.id}">Guardar</button>
              <button class="table-action secondary-btn" type="button" data-action="view-history" data-id="${student.id}">Ver historial</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  attendanceEmptyState.hidden = studentsList.length > 0;
}

async function saveAttendanceForStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    alert("No se encontró la alumna vinculada para guardar la asistencia.");
    return;
  }

  const date = attendanceDate.value || formatDateForInput(new Date());
  const estadoField = attendanceTableBody.querySelector(`[data-attendance-field="estado"][data-student-id="${studentId}"]`);
  const observacionesField = attendanceTableBody.querySelector(`[data-attendance-field="observaciones"][data-student-id="${studentId}"]`);

  if (!estadoField || !estadoField.value) {
    alert("Selecciona un estado de asistencia antes de guardar.");
    return;
  }

  const existingIndex = attendanceRecords.findIndex((record) => record.studentId === studentId && record.fecha === date);
  const newRecord = {
    id: existingIndex >= 0 ? attendanceRecords[existingIndex].id : crypto.randomUUID(),
    studentId,
    fecha: date,
    estado: estadoField.value,
    observaciones: observacionesField?.value.trim() || "",
    recordedBy: getCurrentInternalUser()?.id || "",
    createdAt:
      existingIndex >= 0
        ? attendanceRecords[existingIndex].createdAt || new Date().toISOString()
        : new Date().toISOString(),
  };

  const saveResult = await saveAttendanceRecord(newRecord);
  if (!saveResult.synced) {
    updateAttendanceSummary();
    if (selectedAttendanceStudentId === studentId) {
      renderAttendanceHistory(studentId);
    }
    alert("No se pudo guardar la asistencia en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  renderAttendanceTable();
  updateAttendanceSummary();
  if (selectedAttendanceStudentId === studentId) {
    renderAttendanceHistory(studentId);
  }
}

function updateAttendanceSummary() {
  const monthlyRecords = attendanceRecords.filter((record) => isDateInSelectedMonth(record.fecha));
  attendanceAsistencias.textContent = monthlyRecords.filter((record) => record.estado === "Asistencia").length;
  attendanceFaltas.textContent = monthlyRecords.filter((record) => record.estado === "Falta").length;
  attendanceRetardos.textContent = monthlyRecords.filter((record) => record.estado === "Retardo").length;
  attendanceRecuperaciones.textContent = monthlyRecords.filter((record) => record.estado === "Recuperación").length;
}

function renderAttendanceHistory(studentId) {
  selectedAttendanceStudentId = studentId;
  const student = students.find((item) => item.id === studentId);
  const history = attendanceRecords
    .filter((record) => record.studentId === studentId)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  attendanceHistoryTitle.textContent = student ? `Historial de ${student.nombre}` : "Ver historial";
  attendanceHistoryBody.innerHTML = history
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.fecha)}</td>
          <td>${escapeHtml(record.estado)}</td>
          <td>${escapeHtml(record.observaciones || "-")}</td>
        </tr>
      `
    )
    .join("");

  attendanceHistoryPanel.hidden = false;
  attendanceHistoryEmptyState.hidden = history.length > 0;
}

function getPaymentRecord(studentId) {
  return (
    paymentRecords.find((record) => record.studentId === studentId) || {
      mensualidadPactada: "",
      certificadoP1: "",
      certificadoP2: "",
      mensualidad1: "",
      mensualidad2: "",
      mensualidad3: "",
      mensualidad4: "",
      mensualidad5: "",
      pagosPendientes: "",
      metodoPago: "",
      reportes: "",
      observaciones: "",
    }
  );
}

function renderPaymentSelectOptions(selectedValue, options) {
  return options
    .map((option) => {
      const label = option || "Selecciona";
      return `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderPaymentsTable() {
  const studentsList = getActiveStudents();

  paymentsTableBody.innerHTML = studentsList
    .map((student) => {
      const payment = getPaymentRecord(student.id);
      return `
        <tr>
          <td>${escapeHtml(student.nombre)}</td>
          <td>${escapeHtml(student.sucursal)}</td>
          <td>${escapeHtml(student.curso)}</td>
          <td>${escapeHtml(student.horario)}</td>
          <td><input type="text" value="${escapeHtml(payment.mensualidadPactada)}" data-payment-field="mensualidadPactada" data-student-id="${student.id}" /></td>
          <td><select data-payment-field="certificadoP1" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.certificadoP1, PAYMENT_STATUS_OPTIONS)}</select></td>
          <td><select data-payment-field="certificadoP2" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.certificadoP2, PAYMENT_STATUS_OPTIONS)}</select></td>
          <td><select data-payment-field="mensualidad1" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.mensualidad1, PAYMENT_STATUS_OPTIONS)}</select></td>
          <td><select data-payment-field="mensualidad2" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.mensualidad2, PAYMENT_STATUS_OPTIONS)}</select></td>
          <td><select data-payment-field="mensualidad3" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.mensualidad3, PAYMENT_STATUS_OPTIONS)}</select></td>
          <td><select data-payment-field="mensualidad4" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.mensualidad4, PAYMENT_STATUS_OPTIONS)}</select></td>
          <td><select data-payment-field="mensualidad5" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.mensualidad5, PAYMENT_STATUS_OPTIONS)}</select></td>
          <td><input type="text" value="${escapeHtml(payment.pagosPendientes)}" data-payment-field="pagosPendientes" data-student-id="${student.id}" /></td>
          <td><select data-payment-field="metodoPago" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.metodoPago, PAYMENT_METHOD_OPTIONS)}</select></td>
          <td><input type="text" value="${escapeHtml(payment.reportes)}" data-payment-field="reportes" data-student-id="${student.id}" /></td>
          <td><input type="text" value="${escapeHtml(payment.observaciones)}" data-payment-field="observaciones" data-student-id="${student.id}" /></td>
          <td><button class="table-action action-edit" type="button" data-action="save-payment" data-id="${student.id}">Guardar</button></td>
        </tr>
      `;
    })
    .join("");

  paymentsEmptyState.hidden = studentsList.length > 0;
}

async function savePaymentForStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    alert("No se encontró la alumna vinculada para guardar el pago.");
    return;
  }

  const fields = [
    "mensualidadPactada",
    "certificadoP1",
    "certificadoP2",
    "mensualidad1",
    "mensualidad2",
    "mensualidad3",
    "mensualidad4",
    "mensualidad5",
    "pagosPendientes",
    "metodoPago",
    "reportes",
    "observaciones",
  ];

  const current = getPaymentRecord(studentId);
  const newRecord = {
    id: current.id || crypto.randomUUID(),
    studentId,
    createdAt: current.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  fields.forEach((field) => {
    const input = paymentsTableBody.querySelector(`[data-payment-field="${field}"][data-student-id="${studentId}"]`);
    newRecord[field] = input ? input.value.trim() : "";
  });

  const saveResult = await savePaymentRecord({ ...current, ...newRecord });
  if (!saveResult.synced) {
    updatePaymentsSummary();
    renderDashboard();
    alert("No se pudo guardar el pago en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  renderPaymentsTable();
  updatePaymentsSummary();
  renderDashboard();
}

function updatePaymentsSummary() {
  const activeStudentIds = new Set(getActiveStudents().map((student) => student.id));
  const validRecords = paymentRecords.filter((record) => activeStudentIds.has(record.studentId));
  const mensualidadFields = ["mensualidad1", "mensualidad2", "mensualidad3", "mensualidad4", "mensualidad5"];
  const certificadoFields = ["certificadoP1", "certificadoP2"];

  paymentsRegisteredCount.textContent = validRecords.length;
  paymentsPendingCount.textContent = validRecords.reduce(
    (total, record) => total + certificadoFields.concat(mensualidadFields).filter((field) => record[field] === "Pendiente").length,
    0
  );
  paymentsMensualidadesPaid.textContent = validRecords.reduce(
    (total, record) => total + mensualidadFields.filter((field) => record[field] === "Pagado").length,
    0
  );
  paymentsCertificadosPaid.textContent = validRecords.reduce(
    (total, record) => total + certificadoFields.filter((field) => record[field] === "Pagado").length,
    0
  );
}

function updateFinanceCategories() {
  const options = financeTipo.value === "Egreso" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const previousValue = financeCategoria.value;
  financeCategoria.innerHTML = [`<option value="">Selecciona una opcion</option>`]
    .concat(options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`))
    .join("");

  if (options.includes(previousValue)) {
    financeCategoria.value = previousValue;
  }
}

function getFilteredFinanceRecords() {
  return financeRecords.filter((record) => {
    if (!isDateInMonth(record.fecha, financeMonthFilter.value || selectedMonth)) {
      return false;
    }
    if (!matchesCurrentBranch(record.sucursal)) {
      return false;
    }
    if (financeBranchFilter.value && record.sucursal !== financeBranchFilter.value) {
      return false;
    }
    return true;
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(amount || 0);
}

function renderFinanceTable() {
  const records = getFilteredFinanceRecords().sort((a, b) => b.fecha.localeCompare(a.fecha));

  financeTableBody.innerHTML = records
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.fecha)}</td>
          <td>${escapeHtml(record.sucursal)}</td>
          <td>${escapeHtml(record.tipo)}</td>
          <td>${escapeHtml(record.categoria)}</td>
          <td>${escapeHtml(record.concepto)}</td>
          <td>${formatCurrency(record.monto)}</td>
          <td>${escapeHtml(record.metodoPago)}</td>
          <td>${escapeHtml(record.usuario)}</td>
          <td>${escapeHtml(record.observaciones || "-")}</td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-finance" data-id="${record.id}">Editar</button>
              <button class="table-action action-delete" type="button" data-action="delete-finance" data-id="${record.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  financeEmptyState.hidden = records.length > 0;
}

function updateFinanceSummary() {
  const records = getFilteredFinanceRecords();
  const ingresos = records.filter((record) => record.tipo === "Ingreso").reduce((sum, record) => sum + Number(record.monto || 0), 0);
  const egresos = records.filter((record) => record.tipo === "Egreso").reduce((sum, record) => sum + Number(record.monto || 0), 0);
  const balance = ingresos - egresos;

  financeIngresos.textContent = formatCurrency(ingresos);
  financeEgresos.textContent = formatCurrency(egresos);
  financeBalance.textContent = formatCurrency(balance);
  financeMovimientos.textContent = records.length;
}

function renderInfoList(container, items) {
  container.innerHTML = items
    .map(
      (item) => `
        <div class="info-item">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.value)}</span>
        </div>
      `
    )
    .join("");
}

function renderWebScholarshipSection() {
  webScholarshipCard.innerHTML = `
    <div class="web-access-grid">
      <article class="web-access-card web-access-card-featured">
        <span class="web-course-tag">Platinum</span>
        <strong>Platinum</strong>
        <p class="web-access-price">Inscripción: $2,299.99</p>
        <ul class="web-access-list">
          <li>Mensualidad fija en $1,800</li>
          <li>50% de material para practicar durante todos los cursos</li>
          <li>Clases personalizadas</li>
          <li>Horarios flexibles</li>
          <li>Asesoría para emprendimiento</li>
          <li>3 cursos o más</li>
        </ul>
        <small>Ideal para ti si quieres avanzar más rápido y aprovechar más beneficios.</small>
      </article>
      <article class="web-access-card">
        <span class="web-course-tag">Oro</span>
        <strong>Oro</strong>
        <p class="web-access-price">Inscripción: $1,499.99</p>
        <ul class="web-access-list">
          <li>Mensualidad en $1,700</li>
          <li>No incluye material para practicar</li>
          <li>Clases personalizadas</li>
          <li>Solo 2 cursos</li>
        </ul>
        <small>Ideal si quieres estudiar más de un curso con una inversión accesible.</small>
      </article>
      <article class="web-access-card">
        <span class="web-course-tag">Plata</span>
        <strong>Plata</strong>
        <p class="web-access-price">Inscripción: $999.99</p>
        <ul class="web-access-list">
          <li>Mensualidad en $1,600</li>
          <li>No incluye material para practicar</li>
          <li>Clases personalizadas</li>
          <li>Solo 1 curso</li>
        </ul>
        <small>Ideal para empezar desde cero con una opción más económica.</small>
      </article>
      <article class="web-access-card web-access-card-scholarship">
        <figure class="web-access-media">
          <img src="images/beca-venezia.jpg" alt="Beca Venezia en Instituto Venezia" />
        </figure>
        <span class="web-course-tag">Beca Venezia</span>
        <strong>Beca Venezia</strong>
        <p class="web-access-urgency">Solo 7 Becas Venezia disponibles</p>
        <p>Pregunta por la opción de beca disponible y conoce si puedes obtener apoyo especial en inscripción o beneficios según temporada y sucursal.</p>
        <small>Cupos limitados y sujetos a disponibilidad real.</small>
      </article>
    </div>
    <div class="web-access-footer">
      <div class="web-access-copy">
        <p class="eyebrow">Accesos Venezia</p>
        <h3>Elige el acceso que mejor se adapta a ti</h3>
        <p>En Instituto Venezia creemos que cada alumna merece una oportunidad real de aprender y crecer. Por eso contamos con diferentes accesos según tus metas, tu presupuesto y el nivel de acompañamiento que buscas.</p>
      </div>
      <p>¿No sabes cuál acceso te conviene más? Escríbenos por WhatsApp y te orientamos según tu meta, tu tiempo y tu presupuesto.</p>
      <div class="form-actions">
        <a class="primary-btn web-link-btn web-whatsapp-link" href="${escapeHtml(getWebWhatsAppUrl("Hola, quiero información sobre los accesos Venezia y saber cuál me conviene más."))}" target="_blank" rel="noopener">Quiero información</a>
        <button class="secondary-btn web-course-btn" type="button" data-course="Aplicar a beca">Quiero aplicar a una Beca Venezia</button>
      </div>
    </div>
  `;

  renderWebWhatsappLinks();
}

function renderMiVeneziaDashboard() {
  const student = getStudentById(currentPortalStudentId);
  if (!student) {
    dataService.sessions.clearStudent();
    miVeneziaLoginPanel.hidden = false;
    miVeneziaDashboard.hidden = true;
    return;
  }

  const payment = getPaymentRecord(student.id);
  const attendanceHistory = attendanceRecords
    .filter((record) => record.studentId === student.id)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  const faltas = attendanceHistory.filter((record) => record.estado === "Falta").length;
  const retardos = attendanceHistory.filter((record) => record.estado === "Retardo").length;
  const recuperaciones = attendanceHistory.filter((record) => record.estado === "Recuperación").length;
  const totalClases = attendanceHistory.length;
  const clasesTomadas = attendanceHistory.filter((record) => record.estado !== "Falta").length;
  const clasesPendientes = Math.max(totalClases - clasesTomadas, 0);

  renderInfoList(miVeneziaPerfil, [
    { label: "Nombre completo", value: student.nombre },
    { label: "Sucursal", value: student.sucursal },
    { label: "Curso", value: student.curso },
    { label: "Horario", value: student.horario },
    { label: "Fecha de inicio", value: student.fechaInicio },
    { label: "Acceso elegido", value: student.accesoElegido || "-" },
  ]);

  renderInfoList(miVeneziaPagos, [
    { label: "Mensualidad pactada", value: payment.mensualidadPactada || "-" },
    { label: "Certificado P1", value: payment.certificadoP1 || "-" },
    { label: "Certificado P2", value: payment.certificadoP2 || "-" },
    { label: "1ra mensualidad", value: payment.mensualidad1 || "-" },
    { label: "2da mensualidad", value: payment.mensualidad2 || "-" },
    { label: "3ra mensualidad", value: payment.mensualidad3 || "-" },
    { label: "4ta mensualidad", value: payment.mensualidad4 || "-" },
    { label: "5ta mensualidad", value: payment.mensualidad5 || "-" },
    { label: "Pagos pendientes", value: payment.pagosPendientes || "-" },
    { label: "Método de pago", value: payment.metodoPago || "-" },
    { label: "Observaciones de pago", value: payment.observaciones || "-" },
  ]);

  renderInfoList(miVeneziaResumenAsistencias, [
    { label: "Faltas", value: String(faltas) },
    { label: "Retardos", value: String(retardos) },
    { label: "Recuperaciones", value: String(recuperaciones) },
  ]);

  miVeneziaAsistenciasBody.innerHTML = attendanceHistory
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.fecha)}</td>
          <td>${escapeHtml(record.estado)}</td>
          <td>${escapeHtml(record.observaciones || "-")}</td>
        </tr>
      `
    )
    .join("");
  miVeneziaAsistenciasEmptyState.hidden = attendanceHistory.length > 0;

  renderInfoList(miVeneziaAvance, [
    { label: "Total de clases registradas", value: String(totalClases) },
    { label: "Clases tomadas", value: String(clasesTomadas) },
    { label: "Clases pendientes", value: String(clasesPendientes) },
  ]);

  miVeneziaLoginPanel.hidden = true;
  miVeneziaDashboard.hidden = false;
  dataService.sessions.setStudent(student.id);
}

function logoutMiVenezia() {
  currentPortalStudentId = "";
  miVeneziaLoginForm.reset();
  miVeneziaLoginPanel.hidden = false;
  miVeneziaDashboard.hidden = true;
  dataService.sessions.clearStudent();
}

function editFinanceRecord(id) {
  const record = financeRecords.find((item) => item.id === id);
  if (!record) {
    return;
  }

  document.getElementById("financeId").value = record.id;
  document.getElementById("financeFecha").value = record.fecha;
  document.getElementById("financeSucursal").value = record.sucursal;
  document.getElementById("financeTipo").value = record.tipo;
  updateFinanceCategories();
  document.getElementById("financeCategoria").value = record.categoria;
  document.getElementById("financeConcepto").value = record.concepto;
  document.getElementById("financeMonto").value = record.monto;
  document.getElementById("financeMetodoPago").value = record.metodoPago;
  document.getElementById("financeObservaciones").value = record.observaciones;
  document.getElementById("financeUsuario").value = record.usuario;
  financeSubmitButton.textContent = "Actualizar movimiento";
  setActiveModule("finanzas");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteFinanceRecord(id) {
  dataService.entities.financialMovements.deleteOne(id, { alertOnFailure: false }).then((deleteResult) => {
    financeRecords = deleteResult.records;
    if (!deleteResult.synced) {
      alert("No se pudo eliminar el movimiento en Supabase.");
    }
    renderFinanceTable();
    updateFinanceSummary();
    renderDashboard();
  });
  if (document.getElementById("financeId").value === id) {
    resetFinanceForm();
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function editProspect(id) {
  const prospect = prospects.find((item) => item.id === id);
  if (!prospect) {
    return;
  }

  document.getElementById("prospectId").value = prospect.id;
  document.getElementById("nombre").value = prospect.nombre;
  document.getElementById("telefono").value = prospect.telefono;
  document.getElementById("fechaContacto").value = getProspectDate(prospect);
  document.getElementById("sucursal").value = prospect.sucursal;
  document.getElementById("curso").value = prospect.curso;
  document.getElementById("origen").value = prospect.origen;
  document.getElementById("medio").value = prospect.medio;
  document.getElementById("informacion").value = prospect.informacion;
  document.getElementById("estado").value = prospect.estado;
  document.getElementById("proximoSeguimiento").value = prospect.proximoSeguimiento || "";
  document.getElementById("asesoraAsignada").value = prospect.asesoraAsignada || "";
  document.getElementById("temperatura").value = prospect.temperatura || "";
  document.getElementById("contacto").value = prospect.contacto;
  document.getElementById("notas").value = prospect.notas;
  document.getElementById("accesoInteres").value = prospect.accesoInteres || "";
  submitButton.textContent = "Actualizar prospecto";
  setActiveModule("crm-prospectos");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteProspect(id) {
  const deleteResult = await dataService.entities.prospects.deleteOne(id);
  prospects = deleteResult.records;
  renderAll();
  if (document.getElementById("prospectId").value === id) {
    resetForm();
  }
}

function openWhatsApp(id) {
  const prospect = prospects.find((item) => item.id === id);
  if (!prospect) {
    return;
  }

  const message = encodeURIComponent("Hola, te contacto de Instituto Venezia para dar seguimiento a tu información.");
  const url = `https://wa.me/${normalizePhone(prospect.telefono)}?text=${message}`;
  window.open(url, "_blank", "noopener");
}

async function updateProspectQuickState(id, updates, successMessage = "") {
  const prospect = prospects.find((item) => item.id === id);
  if (!prospect) {
    return;
  }

  const updatedProspect = { ...prospect, ...updates };
  const saveResult = await saveProspectRecord(updatedProspect);
  renderAll();

  if (!saveResult.synced) {
    alert("No se pudo sincronizar el cambio en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  if (successMessage) {
    alert(successMessage);
  }
}

function viewProspectHistory(id) {
  const prospect = prospects.find((item) => item.id === id);
  if (!prospect) {
    return;
  }

  alert(getProspectHistorySummary(prospect));
}

function loadProspectIntoAlta(id) {
  const prospect = prospects.find((item) => item.id === id);
  if (!prospect) {
    return;
  }

  document.getElementById("altaProspectId").value = prospect.id;
  document.getElementById("altaNombre").value = prospect.nombre;
  document.getElementById("altaTelefono").value = prospect.telefono;
  document.getElementById("altaSucursal").value = prospect.sucursal;
  document.getElementById("altaCurso").value = prospect.curso;
  document.getElementById("altaAccesoElegido").value = prospect.accesoInteres || "";
  setActiveModule("altas");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveModule(module) {
  const allowedModule =
    currentAccessMode === "student"
      ? "mi-venezia"
      : currentAccessMode === "internal"
        ? hasInternalAccess(module)
          ? module
          : getDefaultModuleForCurrentContext()
        : "web-venezia";

  activeModule = allowedModule;

  Object.entries(moduleSections).forEach(([key, section]) => {
    section.classList.toggle("active", key === allowedModule);
  });

  navItems.forEach((navItem) => {
    navItem.classList.toggle("active", navItem.dataset.module === allowedModule);
  });

  const badgeMap = {
    dashboard: "Dashboard",
    "crm-prospectos": "CRM Prospectos",
    altas: "Altas",
    asistencias: "Asistencias",
    pagos: "Pagos",
    finanzas: "Finanzas",
    "usuarios-accesos": "Usuarios y accesos",
    personal: "Personal",
    "mi-venezia": "Mi Venezia",
    "web-venezia": "Web Venezia",
  };

  moduleBadge.textContent = badgeMap[allowedModule] || "Venezia One";
}

function renderAll() {
  applyBranchRestrictionsToUI();
  populateStaffLinkedUsers();
  renderDashboard();
  renderTable();
  renderPendingAltas();
  populateAttendanceFilters();
  if (getAllowedBranch()) {
    attendanceSucursalFilter.value = getAllowedBranch();
  }
  renderAttendanceTable();
  updateAttendanceSummary();
  renderPaymentsTable();
  updatePaymentsSummary();
  renderFinanceTable();
  updateFinanceSummary();
  renderInternalUsersTable();
  renderStaffTable();
  syncStudentAccessRecords();
  renderMiVeneziaDashboard();
  renderWebCourses();
  renderWebWhatsappLinks();
  renderWebScholarshipSection();
  if (selectedAttendanceStudentId) {
    renderAttendanceHistory(selectedAttendanceStudentId);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = getFormData();
  const saveResult = await saveProspectRecord(formData);
  if (!saveResult.synced) {
    renderAll();
    alert("No se pudo guardar la prospecta en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }
  renderAll();
  resetForm();
});

altaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const altaData = getAltaFormData();
  console.log("ALTA submit handler invoked");

  if (!altaData.prospectId) {
    alert("Selecciona primero una prospecta inscrita para dar de alta.");
    return;
  }

  console.log("ALTA -> students payload", {
    id: altaData.id,
    full_name: altaData.nombre || "",
    phone: altaData.telefono || "",
    branch: altaData.sucursal || "",
    course: altaData.curso || "",
    schedule: altaData.horario || "",
    start_date: altaData.fechaInicio || null,
    access_selected: altaData.accesoElegido || "",
    password: altaData.portalPassword || "",
    status: altaData.estado || "Activa",
    source_prospect_id: altaData.prospectId || null,
    notes: altaData.observaciones || "",
    created_at: altaData.createdAt || null,
  });
  const studentSaveResult = await saveStudentRecord(altaData);
  console.log("ALTA -> students result", studentSaveResult);
  if (!studentSaveResult.synced) {
    renderAll();
    alert("No se pudo guardar la alta en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  prospects = prospects.map((prospect) =>
    prospect.id === altaData.prospectId ? { ...prospect, estado: "Alta completada" } : prospect
  );

  const updatedProspect = prospects.find((prospect) => prospect.id === altaData.prospectId);
  if (updatedProspect) {
    console.log("ALTA -> prospect status update", {
      prospectId: updatedProspect.id,
      estado: updatedProspect.estado,
    });
    const prospectSaveResult = await saveProspectRecord(updatedProspect);
    if (!prospectSaveResult.synced) {
      renderAll();
      alert("La alta se guardó, pero no se pudo actualizar la prospecta en Supabase. Se conservó sólo en el respaldo local.");
      return;
    }
  }
  syncStudentAccessRecords();
  renderAll();
  resetAltaForm();
  alert("Alta guardada correctamente.");
});

internalLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  internalLoginError.hidden = true;
  // Supabase-based module:
  // refresh internal users before login validation.
  internalUsers = await dataService.entities.internalUsers.getAllPrimary();
  await normalizeInternalUsers();
  const formData = new FormData(internalLoginForm);
  const username = String(formData.get("login") || "").trim();
  const password = String(formData.get("password") || "");
  const user = internalUsers.find(
    (item) =>
      item.username === username &&
      item.password === password &&
      item.status === "Activo" &&
      item.role !== "Alumna"
  );

  if (!user) {
    internalLoginError.hidden = false;
    return;
  }

  currentInternalUserId = user.id;
  currentAccessMode = "internal";
  publicAccessPanelOpen = false;
  dataService.sessions.setInternal(user.id);
  updateSessionUI();
  renderAll();
  setActiveModule(getDefaultModuleForCurrentContext());
  internalLoginForm.reset();
});

internalUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (getCurrentInternalUser()?.role !== "Director General") {
    alert("Sólo Director General puede gestionar usuarios.");
    return;
  }

  const userData = getInternalUserFormData();
  const existingIndex = internalUsers.findIndex((user) => user.id === userData.id);

  if (existingIndex >= 0) {
    internalUsers[existingIndex] = userData;
  } else {
    internalUsers.unshift(userData);
  }

  await saveInternalUsers();
  if (currentInternalUserId === userData.id) {
    const currentUser = getCurrentInternalUser();
    if (!currentUser || currentUser.status !== "Activo") {
      logoutInternalSession();
      return;
    }
    updateSessionUI();
  }
  renderAll();
  setActiveModule(getDefaultModuleForCurrentContext());
  resetInternalUserForm();
});

staffForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const staffData = getStaffFormData();
  staffData.linkedUserId = await resolveLinkedInternalUserId(staffData.linkedUserId);
  const saveResult = await saveStaffRecord(staffData);
  if (!saveResult.synced) {
    renderStaffTable();
    alert("No se pudo guardar el personal en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  renderAll();
  resetStaffForm();
});

openStudentPortalButton.addEventListener("click", () => {
  currentInternalUserId = "";
  currentAccessMode = "student";
  publicAccessPanelOpen = false;
  internalLoginError.hidden = true;
  dataService.sessions.clearInternal();
  updateSessionUI();
  renderAll();
  setActiveModule("mi-venezia");
});

miVeneziaLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(miVeneziaLoginForm);
  const telefono = normalizePhone(formData.get("telefono"));
  const password = String(formData.get("password") || "");
  const access = studentAccessRecords.find(
    (record) => record.telefono === telefono && record.password === password
  );

  if (!access) {
    alert("Teléfono o contraseña incorrectos.");
    return;
  }

  currentPortalStudentId = access.studentId;
  renderMiVeneziaDashboard();
  miVeneziaLoginForm.reset();
});

async function handleWebLeadSubmit(event) {
  console.log("WEB ENVIAR SOLICITUD CLICKED");
  event.preventDefault();
  updateWebAppointmentFields();
  const leadData = getWebLeadFormData();
  const { successAlert, errorAlert, submitButton } = getWebLeadUiElements();
  console.log("WEB lead payload", leadData);
  if (successAlert) {
    successAlert.hidden = true;
  }
  if (errorAlert) {
    errorAlert.hidden = true;
  }
  if (submitButton) {
    submitButton.disabled = true;
  }
  const saveResult = await saveProspectRecord(leadData, { keepLocalOnFailure: false });
  if (!saveResult.synced) {
    renderAll();
    console.error("WEB lead error", saveResult.error);
    setWebLeadFeedback({
      success: false,
      message: "No se pudo guardar tu solicitud en Supabase. Escríbenos por WhatsApp o intenta nuevamente.",
    });
    const refreshedUi = getWebLeadUiElements();
    if (refreshedUi.submitButton) {
      refreshedUi.submitButton.disabled = false;
    }
    return;
  }

  console.log("WEB lead success", saveResult.response || saveResult.record);
  renderAll();
  webLeadForm.reset();
  updateWebAppointmentFields();
  setWebLeadFeedback({
    success: true,
    message: "Tu información fue enviada correctamente. Una asesora te contactará para compartirte opciones y apoyos disponibles.",
  });
  const whatsappRedirectUrl = getWebLeadWhatsAppRedirectUrl({
    fullName: leadData.nombre || "",
    courseInterest: leadData.curso || "",
    branchInterest: leadData.sucursal || "",
  });
  console.log("WEB whatsapp redirect", whatsappRedirectUrl);
  window.open(whatsappRedirectUrl, "_blank", "noopener");
  const refreshedUi = getWebLeadUiElements();
  if (refreshedUi.submitButton) {
    refreshedUi.submitButton.disabled = false;
  }
}

if (webLeadForm) {
  webLeadForm.addEventListener("submit", handleWebLeadSubmit);
}

if (webLeadSubmitButton) {
  webLeadSubmitButton.addEventListener("click", () => {
    if (webLeadSubmitButton.form !== webLeadForm && webLeadForm) {
      webLeadForm.requestSubmit();
    }
  });
}

[publicInternalAccessButton, footerInternalAccessButton]
  .filter(Boolean)
  .forEach((button) => {
    button.addEventListener("click", () => {
      if (restoreInternalAccessFromSavedSession()) {
        return;
      }
      openPublicAccessPanel();
    });
  });

[publicStudentAccessButton, footerStudentAccessButton]
  .filter(Boolean)
  .forEach((button) => {
    button.addEventListener("click", () => {
      openPublicAccessPanel();
    });
  });

if (closeLoginPanelButton) {
  closeLoginPanelButton.addEventListener("click", () => {
    closePublicAccessPanel();
  });
}

financeForm.addEventListener("submit", async (event) => {
  console.log("FINANZA GUARDAR CLICKED");
  event.preventDefault();
  const financeData = getFinanceFormData();
  const saveResult = await saveFinanceRecord(financeData);
  if (!saveResult.synced) {
    renderFinanceTable();
    updateFinanceSummary();
    renderDashboard();
    alert("No se pudo guardar el movimiento en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  renderFinanceTable();
  updateFinanceSummary();
  renderDashboard();
  resetFinanceForm();
});

clearButton.addEventListener("click", resetForm);
internalUserClearButton.addEventListener("click", resetInternalUserForm);
staffClearButton.addEventListener("click", resetStaffForm);
clearAltaButton.addEventListener("click", resetAltaForm);
financeClearButton.addEventListener("click", resetFinanceForm);
miVeneziaLogoutButton.addEventListener("click", logoutMiVenezia);
internalLogoutButton.addEventListener("click", logoutInternalSession);
internalLoginForm.addEventListener("input", () => {
  internalLoginError.hidden = true;
});

webVeneziaSection.addEventListener("click", (event) => {
  const courseButton = event.target.closest(".web-course-btn");
  if (courseButton) {
    const course = courseButton.dataset.course;
    const webCurso = document.getElementById("webCurso");
    const availableCourses = getWebCourseCatalog().map((item) => item.name);

    if (availableCourses.includes(course)) {
      webCurso.value = course;
    } else if (course === "Aplicar a beca" && webCurso) {
      webCurso.value = "";
    }

    updateWebAppointmentFields();
    document.getElementById("leadForm").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const whatsappLink = event.target.closest(".web-whatsapp-link");
  if (whatsappLink) {
    whatsappLink.href = getWebWhatsAppUrl("Hola, quiero información sobre los cursos y saber si aún hay becas disponibles 🙏");
  }
});

if (webTipoSolicitud) {
  webTipoSolicitud.addEventListener("change", updateWebAppointmentFields);
}

if (webHorarioCita) {
  webHorarioCita.addEventListener("change", updateWebAppointmentFields);
}

webScrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.webScroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

searchInput.addEventListener("input", (event) => {
  activeSearch = event.target.value.trim();
  renderTable();
});

crmAccessFilter.addEventListener("change", (event) => {
  activeAccessFilter = event.target.value;
  renderTable();
});

if (crmAdvisorFilter) {
  crmAdvisorFilter.addEventListener("change", (event) => {
    activeAdvisorFilter = event.target.value;
    renderTable();
  });
}

monthFilter.addEventListener("change", (event) => {
  selectedMonth = event.target.value || getCurrentMonthValue();
  renderDashboard();
  renderTable();
  updateAttendanceSummary();
});

dashboardBranchFilter.addEventListener("change", renderDashboard);

attendanceDate.addEventListener("change", renderAttendanceTable);
financeTipo.addEventListener("change", updateFinanceCategories);
financeMonthFilter.addEventListener("change", () => {
  renderFinanceTable();
  updateFinanceSummary();
});
financeBranchFilter.addEventListener("change", () => {
  renderFinanceTable();
  updateFinanceSummary();
});

[attendanceSucursalFilter, attendanceCursoFilter, attendanceHorarioFilter].forEach((filter) => {
  filter.addEventListener("change", renderAttendanceTable);
});

tableBody.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  if (action === "edit") editProspect(id);
  if (action === "delete") await deleteProspect(id);
  if (action === "whatsapp") openWhatsApp(id);
  if (action === "schedule") {
    await updateProspectQuickState(
      id,
      {
        estado: "Cita agendada",
        proximoSeguimiento: formatDateForInput(new Date()),
      },
      "Prospecto actualizado a cita agendada."
    );
    document.getElementById("proximoSeguimiento").focus();
  }
  if (action === "enroll") {
    await updateProspectQuickState(id, { estado: "Inscrita" }, "Prospecto marcado como inscrita.");
  }
  if (action === "alta") loadProspectIntoAlta(id);
  if (action === "history") viewProspectHistory(id);
});

pendingAltasTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action='alta']");
  if (actionButton) {
    loadProspectIntoAlta(actionButton.dataset.id);
  }
});

attendanceTableBody.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  if (action === "save-attendance") {
    console.log("ASISTENCIA GUARDAR CLICKED", {
      studentId: id,
    });
    await saveAttendanceForStudent(id);
  }
  if (action === "view-history") renderAttendanceHistory(id);
});

paymentsTableBody.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-action='save-payment']");
  if (actionButton) {
    console.log("PAGO GUARDAR CLICKED", {
      studentId: actionButton.dataset.id,
    });
    await savePaymentForStudent(actionButton.dataset.id);
  }
});

financeTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  if (action === "edit-finance") editFinanceRecord(id);
  if (action === "delete-finance") deleteFinanceRecord(id);
});

internalUsersTableBody.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  if (action === "edit-user") editInternalUser(id);
  if (action === "toggle-user") await toggleInternalUserState(id);
  if (action === "delete-user") await deleteInternalUser(id);
});

staffTableBody.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  if (action === "edit-staff") editStaffRecord(id);
  if (action === "delete-staff") await deleteStaffRecord(id);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const module = item.dataset.module;

    if (currentAccessMode === "student" && module !== "mi-venezia") {
      return;
    }

    if (currentAccessMode === "internal" && !hasInternalAccess(module)) {
      alert("No tienes permiso para acceder a este módulo.");
      return;
    }

    if (
      module === "dashboard" ||
      module === "crm-prospectos" ||
      module === "altas" ||
      module === "asistencias" ||
      module === "pagos" ||
      module === "finanzas" ||
      module === "usuarios-accesos" ||
      module === "personal" ||
      module === "mi-venezia" ||
      module === "web-venezia"
    ) {
      setActiveModule(module);
      return;
    }

    alert("Próximamente");
  });
});

async function initApp() {
  // Supabase-based modules load here first, with local cache fallback.
  internalUsers = await dataService.entities.internalUsers.getAllPrimary(() => []);
  students = await dataService.entities.students.getAllPrimary(() => []);
  attendanceRecords = await dataService.entities.attendance.getAllPrimary(() => []);
  paymentRecords = await dataService.entities.payments.getAllPrimary(() => []);
  financeRecords = await dataService.entities.financialMovements.getAllPrimary(() => []);
  studentAccessRecords = await dataService.entities.studentPortalAccess.getAllPrimary(() => []);
  staffRecords = await dataService.entities.staff.getAllPrimary(() => []);
  prospects = await dataService.entities.prospects.getAllPrimary(seedProspects);

  await normalizeLegacyProspects();
  await normalizeInternalUsers();
  resetForm();
  resetInternalUserForm();
  resetStaffForm();
  resetAltaForm();
  resetFinanceForm();
  updateWebAppointmentFields();
  currentInternalUserId = dataService.sessions.getInternal();
  currentPortalStudentId = dataService.sessions.getStudent();
  if (currentInternalUserId && getCurrentInternalUser()?.status !== "Activo") {
    currentInternalUserId = "";
    dataService.sessions.clearInternal();
  }
  currentAccessMode = "logged-out";
  publicAccessPanelOpen = false;
  updateSessionUI();
  renderAll();
  setActiveModule("web-venezia");
}

initHeroSlider();
initApp();
