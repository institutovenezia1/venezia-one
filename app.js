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
const INTERNAL_USER_PERMISSIONS_STORAGE_KEY = "venezia-one-v2-internal-user-permissions";
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

const PAYMENT_STATUS_OPTIONS = ["", "Pagado", "Parcial", "Pendiente", "No aplica"];
const PAYMENT_METHOD_OPTIONS = ["", "Efectivo", "Transferencia"];
const ATTENDANCE_STATUS_OPTIONS = ["", "Asistencia", "Permiso", "Falta"];
const DEFAULT_ATTENDANCE_SESSION_COUNT = 16;
const DATA_RESET_VERSION = "2026-04-07-clean-reset";
const BALANCE_PAYMENT_CONCEPT_FIELDS = [
  { key: "certificadoP1", label: "Pago C1" },
  { key: "certificadoP2", label: "Pago C2" },
  { key: "mensualidad1", label: "Mensualidad 1" },
  { key: "mensualidad2", label: "Mensualidad 2" },
  { key: "mensualidad3", label: "Mensualidad 3" },
  { key: "mensualidad4", label: "Mensualidad 4" },
  { key: "mensualidad5", label: "Mensualidad 5" },
];
const ATTENDANCE_STATUS_LABELS = {
  Asistencia: "A",
  Permiso: "P",
  Falta: "F",
};

const BASE_ROLE_PERMISSIONS = {
  "Director General": ["dashboard", "crm-prospectos", "altas", "asistencias", "pagos", "balance", "finanzas", "web-venezia", "mi-venezia"],
  Gerente: ["crm-prospectos", "altas"],
  "Director de sucursal": ["altas", "asistencias", "pagos", "balance", "finanzas"],
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
  "balance",
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
const staffFechaNacimiento = document.getElementById("staffFechaNacimiento");
const staffAccessUsername = document.getElementById("staffAccessUsername");
const staffTemporaryPassword = document.getElementById("staffTemporaryPassword");
const altaForm = document.getElementById("altaForm");
const clearAltaButton = document.getElementById("clearAltaButton");
const altaValidationAlert = document.getElementById("altaValidationAlert");
const altaSummaryStudentCode = document.getElementById("altaSummaryStudentCode");
const altaSummaryNombre = document.getElementById("altaSummaryNombre");
const altaSummaryCurso = document.getElementById("altaSummaryCurso");
const altaSummarySucursal = document.getElementById("altaSummarySucursal");
const altaSummaryAcceso = document.getElementById("altaSummaryAcceso");
const altaSummaryHorario = document.getElementById("altaSummaryHorario");
const altaSummaryFechaInicio = document.getElementById("altaSummaryFechaInicio");
const altaSummaryMetodoPago = document.getElementById("altaSummaryMetodoPago");
const altaSummaryCantidadPago = document.getElementById("altaSummaryCantidadPago");
const altaSummaryPortalUser = document.getElementById("altaSummaryPortalUser");
const altaSummaryPortalPassword = document.getElementById("altaSummaryPortalPassword");
const altaConfirmCard = document.getElementById("altaConfirmCard");
const altaConfirmMessage = document.getElementById("altaConfirmMessage");
const altaConfirmStudentCode = document.getElementById("altaConfirmStudentCode");
const altaConfirmNombre = document.getElementById("altaConfirmNombre");
const altaConfirmCurso = document.getElementById("altaConfirmCurso");
const altaConfirmSucursal = document.getElementById("altaConfirmSucursal");
const altaConfirmAcceso = document.getElementById("altaConfirmAcceso");
const altaConfirmHorario = document.getElementById("altaConfirmHorario");
const altaConfirmFechaInicio = document.getElementById("altaConfirmFechaInicio");
const altaConfirmMetodoPago = document.getElementById("altaConfirmMetodoPago");
const altaConfirmCantidadPago = document.getElementById("altaConfirmCantidadPago");
const altaConfirmPortalUser = document.getElementById("altaConfirmPortalUser");
const altaConfirmPortalPassword = document.getElementById("altaConfirmPortalPassword");
const altaConfirmProceedButton = document.getElementById("altaConfirmProceedButton");
const altaConfirmCancelButton = document.getElementById("altaConfirmCancelButton");
const altasMonthFilter = document.getElementById("altasMonthFilter");
const altaHistoryTotal = document.getElementById("altaHistoryTotal");
const altaHistoryBeca = document.getElementById("altaHistoryBeca");
const altaHistoryTlaxcala = document.getElementById("altaHistoryTlaxcala");
const altaHistoryPuebla = document.getElementById("altaHistoryPuebla");
const altaHistoryTableBody = document.getElementById("altaHistoryTableBody");
const altaHistoryEmptyState = document.getElementById("altaHistoryEmptyState");
const financeForm = document.getElementById("financeForm");
const financeClearButton = document.getElementById("financeClearButton");
const financeSubmitButton = document.getElementById("financeSubmitButton");
const searchInput = document.getElementById("searchInput");
const crmBranchFilter = document.getElementById("crmBranchFilter");
const crmTemperatureFilter = document.getElementById("crmTemperatureFilter");
const crmStateFilter = document.getElementById("crmStateFilter");
const crmFollowupFilter = document.getElementById("crmFollowupFilter");
const crmAccessFilter = document.getElementById("crmAccessFilter");
const crmAdvisorFilter = document.getElementById("crmAdvisorFilter");
const monthFilter = document.getElementById("monthFilter");
const dashboardBranchFilter = document.getElementById("dashboardBranchFilter");
const tableBody = document.getElementById("prospectsTableBody");
const emptyState = document.getElementById("emptyState");
const crmCountNew = document.getElementById("crmCountNew");
const crmCountToday = document.getElementById("crmCountToday");
const crmCountLate = document.getElementById("crmCountLate");
const crmCountScheduled = document.getElementById("crmCountScheduled");
const crmCountEnrolled = document.getElementById("crmCountEnrolled");
const pendingAltasTableBody = document.getElementById("pendingAltasTableBody");
const pendingAltasEmptyState = document.getElementById("pendingAltasEmptyState");
const submitButton = document.getElementById("submitButton");
const navItems = document.querySelectorAll(".nav-item");
const moduleBadge = document.getElementById("moduleBadge");

const attendanceDate = document.getElementById("attendanceDate");
const attendanceSearchInput = document.getElementById("attendanceSearchInput");
const attendanceSucursalFilter = document.getElementById("attendanceSucursalFilter");
const attendanceCursoFilter = document.getElementById("attendanceCursoFilter");
const attendanceHorarioFilter = document.getElementById("attendanceHorarioFilter");
const attendanceDayFilter = document.getElementById("attendanceDayFilter");
const attendanceTableHead = document.getElementById("attendanceTableHead");
const attendanceTableBody = document.getElementById("attendanceTableBody");
const attendanceEmptyState = document.getElementById("attendanceEmptyState");
const attendanceHistoryPanel = document.getElementById("attendanceHistoryPanel");
const attendanceHistoryTitle = document.getElementById("attendanceHistoryTitle");
const attendanceHistoryBody = document.getElementById("attendanceHistoryBody");
const attendanceHistoryEmptyState = document.getElementById("attendanceHistoryEmptyState");
const attendanceGroupCount = document.getElementById("attendanceGroupCount");
const studentFileOverlay = document.getElementById("studentFileOverlay");
const studentFileCloseButton = document.getElementById("studentFileCloseButton");
const studentFileTitle = document.getElementById("studentFileTitle");
const studentFileSummary = document.getElementById("studentFileSummary");
const studentFileQuickActions = document.getElementById("studentFileQuickActions");
const studentFileGeneral = document.getElementById("studentFileGeneral");
const studentFileAcademic = document.getElementById("studentFileAcademic");
const studentFileAdministrative = document.getElementById("studentFileAdministrative");
const studentFilePortal = document.getElementById("studentFilePortal");
const studentFilePayments = document.getElementById("studentFilePayments");
const studentFileAttendanceSummary = document.getElementById("studentFileAttendanceSummary");
const studentFileAttendanceBody = document.getElementById("studentFileAttendanceBody");
const studentFileAttendanceEmptyState = document.getElementById("studentFileAttendanceEmptyState");
const studentFileNotes = document.getElementById("studentFileNotes");

const paymentsTableBody = document.getElementById("paymentsTableBody");
const paymentsEmptyState = document.getElementById("paymentsEmptyState");
const paymentsRegisteredCount = document.getElementById("paymentsRegisteredCount");
const paymentsPendingCount = document.getElementById("paymentsPendingCount");
const paymentsMensualidadesPaid = document.getElementById("paymentsMensualidadesPaid");
const paymentsSearchInput = document.getElementById("paymentsSearchInput");
const paymentsMonthFilter = document.getElementById("paymentsMonthFilter");
const paymentsMonthlyIncome = document.getElementById("paymentsMonthlyIncome");
const paymentsTlaxcalaCount = document.getElementById("paymentsTlaxcalaCount");
const paymentsPueblaCount = document.getElementById("paymentsPueblaCount");
const balanceBranchFilter = document.getElementById("balanceBranchFilter");
const balanceDateFilter = document.getElementById("balanceDateFilter");
const balanceIncomeTotal = document.getElementById("balanceIncomeTotal");
const balanceExpenseTotal = document.getElementById("balanceExpenseTotal");
const balanceCashTotal = document.getElementById("balanceCashTotal");
const balanceSummaryIncome = document.getElementById("balanceSummaryIncome");
const balanceSummaryExpense = document.getElementById("balanceSummaryExpense");
const balanceSummaryCash = document.getElementById("balanceSummaryCash");
const balanceIncomeTableBody = document.getElementById("balanceIncomeTableBody");
const balanceIncomeEmptyState = document.getElementById("balanceIncomeEmptyState");
const balanceExpenseForm = document.getElementById("balanceExpenseForm");
const balanceExpenseSubmitButton = document.getElementById("balanceExpenseSubmitButton");
const balanceExpenseClearButton = document.getElementById("balanceExpenseClearButton");
const balanceExpenseTableBody = document.getElementById("balanceExpenseTableBody");
const balanceExpenseEmptyState = document.getElementById("balanceExpenseEmptyState");
const balanceExpenseDateField = document.getElementById("balanceExpenseDate");
const balanceExpenseBranchField = document.getElementById("balanceExpenseBranch");
const balanceExpenseTotalField = document.getElementById("balanceExpenseTotalField");
const balanceExpenseResponsibleField = document.getElementById("balanceExpenseResponsible");

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
const miVeneziaPagosBody = document.getElementById("miVeneziaPagosBody");
const miVeneziaPagosEmptyState = document.getElementById("miVeneziaPagosEmptyState");
const miVeneziaResumenAsistencias = document.getElementById("miVeneziaResumenAsistencias");
const miVeneziaAsistenciasBody = document.getElementById("miVeneziaAsistenciasBody");
const miVeneziaAsistenciasEmptyState = document.getElementById("miVeneziaAsistenciasEmptyState");
const miVeneziaAvance = document.getElementById("miVeneziaAvance");
const miVeneziaPaymentSchedule = document.getElementById("miVeneziaPaymentSchedule");
const miVeneziaHeroName = document.getElementById("miVeneziaHeroName");
const miVeneziaHeroMeta = document.getElementById("miVeneziaHeroMeta");
const miVeneziaHeroSummary = document.getElementById("miVeneziaHeroSummary");
const miVeneziaContactButton = document.getElementById("miVeneziaContactButton");
const miVeneziaStatCourse = document.getElementById("miVeneziaStatCourse");
const miVeneziaStatAttendance = document.getElementById("miVeneziaStatAttendance");
const miVeneziaStatPayments = document.getElementById("miVeneziaStatPayments");
const miVeneziaStatStatus = document.getElementById("miVeneziaStatStatus");
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
  balance: document.getElementById("balanceSection"),
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

function applyDataResetIfNeeded() {
  const storage = window.localStorage;
  const resetKey = `venezia-one-v2-reset-${DATA_RESET_VERSION}`;
  if (!storage || storage.getItem(resetKey)) {
    return;
  }

  [
    dataService.keys.prospects,
    dataService.keys.students,
    dataService.keys.attendance,
    dataService.keys.payments,
    dataService.keys.studentPortalAccess,
    dataService.keys.webRequests,
    dataService.keys.internalSession,
    dataService.keys.studentSession,
  ].forEach((key) => storage.removeItem(key));

  storage.setItem(resetKey, "true");
}

applyDataResetIfNeeded();

// Supabase-backed modules now hydrate from local cache first and refresh from
// Supabase during init: internal users, staff, prospects.
let prospects = dataService.entities.prospects.getAll(() => []);
let students = dataService.entities.students.getAll(() => []);
let attendanceRecords = dataService.entities.attendance.getAll(() => []);
let paymentRecords = dataService.entities.payments.getAll(() => []);
let balanceExpenses = dataService.entities.balanceExpenses.getAll(() => []);
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
let activeBranchFilter = "";
let activeTemperatureFilter = "";
let activeStateFilter = "";
let activeFollowupFilter = "";
let activeAccessFilter = "";
let activeModule = "crm-prospectos";
let selectedMonth = getCurrentMonthValue();
let selectedAltasMonth = selectedMonth;
let selectedPaymentsMonth = selectedMonth;
let selectedAttendanceStudentId = "";
let activeAttendanceSearch = "";
let activePaymentsSearch = "";
let activeStudentFileId = "";
let activeAttendanceSessionCount = DEFAULT_ATTENDANCE_SESSION_COUNT;
let currentPortalStudentId = "";
let currentInternalUserId = "";
let currentAccessMode = "logged-out";
let publicAccessPanelOpen = false;
let activeAdvisorFilter = "";
let pendingAltaConfirmation = null;

monthFilter.value = selectedMonth;
altasMonthFilter.value = selectedAltasMonth;
paymentsMonthFilter.value = selectedPaymentsMonth;
attendanceDate.value = formatDateForInput(new Date());
financeMonthFilter.value = selectedMonth;

function seedProspects() {
  return [];
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

function getInternalUserPermissionOverrides() {
  try {
    return JSON.parse(localStorage.getItem(INTERNAL_USER_PERMISSIONS_STORAGE_KEY) || "{}");
  } catch (error) {
    console.error("No se pudieron cargar los permisos locales de usuarios internos.", error);
    return {};
  }
}

function saveInternalUserPermissionOverrides(overrides) {
  localStorage.setItem(INTERNAL_USER_PERMISSIONS_STORAGE_KEY, JSON.stringify(overrides));
}

function setInternalUserPermissionOverride(userId, permissions = []) {
  if (!userId) {
    return;
  }
  const overrides = getInternalUserPermissionOverrides();
  overrides[userId] = Array.from(new Set((permissions || []).filter(Boolean)));
  saveInternalUserPermissionOverrides(overrides);
}

function removeInternalUserPermissionOverride(userId) {
  if (!userId) {
    return;
  }
  const overrides = getInternalUserPermissionOverrides();
  delete overrides[userId];
  saveInternalUserPermissionOverrides(overrides);
}

async function saveInternalUsers() {
  // Supabase-based module with local cache fallback.
  internalUsers.forEach((user) => {
    if (Array.isArray(user.permissions) && user.permissions.length > 0) {
      setInternalUserPermissionOverride(user.id, user.permissions);
    }
  });
  await dataService.entities.internalUsers.setAll(internalUsers);
}

function getStaffRoleFromPosition(position) {
  const normalizedPosition = String(position || "").trim().toLowerCase();

  if (normalizedPosition === "gerente de ventas") {
    return "Gerente";
  }

  if (normalizedPosition === "asesor de ventas") {
    return "Asesora";
  }

  if (
    normalizedPosition === "gerente de sucursal" ||
    normalizedPosition === "director administrativo de sucursal"
  ) {
    return "Director de sucursal";
  }

  return "Maestra";
}

function getPermissionFallbackFromStaff(user) {
  if (!user) {
    return [];
  }

  const linkedStaffRecord =
    staffRecords.find((record) => record.linkedUserId === user.id) ||
    staffRecords.find((record) => record.username && record.username === user.username);

  if (!linkedStaffRecord) {
    return [];
  }

  const normalizedPosition = String(linkedStaffRecord.puesto || "").trim().toLowerCase();
  if (normalizedPosition === "coordinadora de maestras") {
    return ["asistencias", "crm-prospectos", "altas"];
  }

  return [];
}

function getStaffBranchPrefix(branch) {
  const normalizedBranch = String(branch || "").trim().toLowerCase();
  if (normalizedBranch === "tlaxcala") return "tlx";
  if (normalizedBranch === "puebla") return "pue";
  return "ven";
}

function getStaffBirthYear(value) {
  const normalizedValue = String(value || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    return normalizedValue.slice(0, 4);
  }
  if (/^\d{4}$/.test(normalizedValue)) {
    return normalizedValue;
  }
  return "";
}

function slugifyStaffUsername(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function generateStaffUsername({ nombre, telefono, sucursal, staffId = "", linkedUserId = "" }) {
  const firstName = String(nombre || "").trim().split(/\s+/)[0] || "staff";
  const phoneDigits = normalizePhone(telefono);
  const lastFour = phoneDigits.slice(-4) || "0000";
  const prefix = getStaffBranchPrefix(sucursal);
  const usernameBase = `${prefix}.${slugifyStaffUsername(firstName) || "staff"}${lastFour}`;
  const reservedUsernames = new Set();

  internalUsers.forEach((user) => {
    if (user.id !== linkedUserId && user.username) {
      reservedUsernames.add(user.username.toLowerCase());
    }
  });

  staffRecords.forEach((record) => {
    if (record.id !== staffId && record.username) {
      reservedUsernames.add(String(record.username).toLowerCase());
    }
  });

  if (!reservedUsernames.has(usernameBase.toLowerCase())) {
    return usernameBase;
  }

  let suffix = 2;
  let nextCandidate = `${usernameBase}-${suffix}`;
  while (reservedUsernames.has(nextCandidate.toLowerCase())) {
    suffix += 1;
    nextCandidate = `${usernameBase}-${suffix}`;
  }

  return nextCandidate;
}

function buildStaffTemporaryPassword(value) {
  return `Venezia${getStaffBirthYear(value) || "0000"}`;
}

function syncStaffAccessFields() {
  const existingId = document.getElementById("staffId").value;
  const linkedUserId = document.getElementById("staffLinkedUser").value;
  const allowedBranch = getAllowedBranch();
  const username = generateStaffUsername({
    nombre: document.getElementById("staffNombre").value,
    telefono: document.getElementById("staffTelefono").value,
    sucursal: allowedBranch || document.getElementById("staffSucursal").value,
    staffId: existingId,
    linkedUserId,
  });
  const password = buildStaffTemporaryPassword(staffFechaNacimiento.value);

  staffAccessUsername.value = username;
  staffTemporaryPassword.value = password;
}

async function syncStaffInternalAccess(record) {
  const mappedRole = getStaffRoleFromPosition(record.puesto);
  const existingUser =
    internalUsers.find((user) => user.id === record.linkedUserId) ||
    internalUsers.find((user) => user.username === record.username);
  const internalUserPayload = {
    id: existingUser?.id || record.linkedUserId || crypto.randomUUID(),
    fullName: record.nombre || "",
    username: record.username || "",
    phone: record.telefono || "",
    password: record.password || "",
    role: existingUser?.role || mappedRole,
    branch: record.sucursal || existingUser?.branch || "",
    status: record.estado || existingUser?.status || "Activo",
    permissions:
      Array.isArray(existingUser?.permissions) && existingUser.permissions.length > 0
        ? existingUser.permissions
        : [...(BASE_ROLE_PERMISSIONS[existingUser?.role || mappedRole] || [])],
  };
  const saveResult = await dataService.entities.internalUsers.upsertOne(internalUserPayload, { alertOnFailure: false });
  const nextUser = {
    ...internalUserPayload,
    ...saveResult.record,
    permissions: internalUserPayload.permissions,
  };
  const existingIndex = internalUsers.findIndex((user) => user.id === nextUser.id);

  if (existingIndex >= 0) {
    internalUsers[existingIndex] = nextUser;
  } else {
    internalUsers.unshift(nextUser);
  }

  setInternalUserPermissionOverride(nextUser.id, nextUser.permissions);

  return {
    ...saveResult,
    record: nextUser,
  };
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
  if (normalized === "web") return "Web";
  if (normalized.includes("pagina web") || normalized.includes("página web") || normalized.includes("formulario web")) return "Pagina web";
  if (normalized.includes("whatsapp")) return "WhatsApp";
  if (normalized.includes("asesora")) return "Presencial";
  if (
    normalized.includes("instagram") ||
    normalized.includes("tiktok") ||
    normalized.includes("facebook") ||
    normalized.includes("redes")
  ) {
    return "Redes sociales";
  }
  if (normalized.includes("refer")) return "Referido";
  if (normalized.includes("evento")) return "Evento";
  if (normalized.includes("walk")) return "Walk-in";
  if (normalized.includes("presencial")) return "Presencial";
  return String(value || "").trim();
}

function normalizeLeadChannel(value, origin = "") {
  const normalized = String(value || "").trim().toLowerCase();
  const normalizedOrigin = normalizeLeadOrigin(origin);

  if (!normalized) {
    return normalizedOrigin === "Presencial" || normalizedOrigin === "Walk-in" ? "Presencial" : "";
  }

  if (normalized.includes("whatsapp")) return "WhatsApp";
  if (normalized === "facebook messenger" || normalized === "instagram dm") return "Redes sociales";
  if (normalized.includes("formulario web") || normalized === "web") return "";
  if (
    normalized.includes("instagram") ||
    normalized.includes("tiktok") ||
    normalized.includes("facebook") ||
    normalized.includes("redes")
  ) {
    return "Redes sociales";
  }
  if (normalized === "llamada") return "Llamada";
  if (normalized === "presencial") return "Presencial";
  if (normalized.includes("walk")) return "Presencial";
  return ["WhatsApp", "Presencial", "Llamada", "Redes sociales"].includes(String(value || "").trim())
    ? String(value || "").trim()
    : "";
}

function normalizeProspectState(value, options = {}) {
  const { preserveOperationalState = true } = options;
  const normalized = String(value || "").trim().toLowerCase();

  if (!normalized) return "";
  if (normalized === "prospecto nuevo" || normalized === "nuevo" || normalized === "nuevo prospecto") return "Prospecto nuevo";
  if (normalized === "seguimiento" || normalized === "interesado" || normalized === "inscripción web pendiente") return "Seguimiento";
  if (normalized === "cita agendada") return "Cita agendada";
  if (normalized === "inscrita") return "Inscrita";
  if (normalized === "alta completada") return preserveOperationalState ? "Alta completada" : "Inscrita";
  if (normalized === "no interesado") return "Seguimiento";
  return String(value || "").trim();
}

function normalizeTemperatureValue(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized === "caliente") return "Caliente";
  if (normalized === "tibia") return "Tibia";
  if (normalized === "fría" || normalized === "fria") return "Fría";
  if (normalized === "sin respuesta") return "Sin respuesta";
  return "";
}

function getAutoFollowupDate(baseDate = new Date()) {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + 3);
  return formatDateForInput(nextDate);
}

function shouldAutoAssignFollowup(state) {
  return state === "Prospecto nuevo" || state === "Seguimiento";
}

function syncProspectFollowupField() {
  const estadoField = document.getElementById("estado");
  const followupField = document.getElementById("proximoSeguimiento");
  if (!estadoField || !followupField) {
    return;
  }

  const autoManaged = shouldAutoAssignFollowup(estadoField.value);
  followupField.readOnly = autoManaged;

  if (autoManaged) {
    followupField.value = getAutoFollowupDate(new Date());
  }
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

function formatDisplayDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getProspectFollowupMeta(dateValue) {
  if (!dateValue) {
    return {
      tone: "neutral",
      label: "Sin fecha",
      detail: "Agrega una fecha para priorizar el seguimiento.",
    };
  }

  const today = formatDateForInput(new Date());

  if (dateValue < today) {
    return {
      tone: "late",
      label: "Seguimiento atrasado",
      detail: `Debió atenderse el ${formatDisplayDate(dateValue)}.`,
    };
  }

  if (dateValue === today) {
    return {
      tone: "today",
      label: "Hoy toca seguimiento",
      detail: "Conviene contactarla hoy.",
    };
  }

  return {
    tone: "upcoming",
    label: "Próximo seguimiento",
    detail: formatDisplayDate(dateValue),
  };
}

function getProspectWhatsAppUrl(prospect) {
  const phone = normalizePhone(prospect.telefono);
  return getWhatsAppUrlByPhone(phone);
}

function getWhatsAppUrlByPhone(phone) {
  if (!phone || phone.length < 10) {
    return "";
  }

  const message = encodeURIComponent(
    "Hola, te contacto de Instituto Venezia para dar seguimiento a la información que pediste sobre nuestros cursos. 💜"
  );
  return `https://wa.me/${phone}?text=${message}`;
}

function getProspectPriorityRank(prospect) {
  const normalizedState = normalizeProspectState(prospect.estado, { preserveOperationalState: false });
  const followup = getProspectFollowupMeta(prospect.proximoSeguimiento);
  const temperature = normalizeTemperatureValue(prospect.temperatura);

  if (followup.tone === "late") return 0;
  if (followup.tone === "today") return 1;
  if (temperature === "Caliente") return 2;
  if (normalizedState === "Prospecto nuevo") return 3;
  if (normalizedState === "Seguimiento") return 4;
  if (normalizedState === "Cita agendada") return 5;
  if (normalizedState === "Inscrita") return 6;
  return 7;
}

function getProspectHistorySummary(prospect) {
  return [
    `Nombre: ${prospect.nombre || "-"}`,
    `Fecha de contacto: ${getProspectDate(prospect) || "-"}`,
    `Estado: ${prospect.estado || "-"}`,
    `Temperatura: ${prospect.temperatura || "-"}`,
    `Asesor asignado: ${prospect.asesoraAsignada || "-"}`,
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
      normalized.medio = "";
      changed = true;
    }

    const nextOrigin = normalizeLeadOrigin(normalized.origen);
    if (nextOrigin && nextOrigin !== normalized.origen) {
      normalized.origen = nextOrigin;
      changed = true;
    }

    const nextChannel = normalizeLeadChannel(normalized.medio, normalized.origen);
    if (nextChannel !== normalized.medio) {
      normalized.medio = nextChannel;
      changed = true;
    }

    const nextState = normalizeProspectState(normalized.estado);
    if (nextState && nextState !== normalized.estado) {
      normalized.estado = nextState;
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

    const nextTemperature = normalizeTemperatureValue(normalized.temperatura);
    if (nextTemperature !== normalized.temperatura) {
      normalized.temperatura = nextTemperature;
      changed = true;
    }

    if (shouldAutoAssignFollowup(normalized.estado) && !normalized.proximoSeguimiento) {
      normalized.proximoSeguimiento = getAutoFollowupDate(new Date(`${normalized.fechaContacto}T12:00:00`));
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
  const permissionOverrides = getInternalUserPermissionOverrides();

  internalUsers = internalUsers.map((user) => {
    const storedPermissions = Array.isArray(permissionOverrides[user.id]) ? permissionOverrides[user.id] : null;
    const staffFallbackPermissions = getPermissionFallbackFromStaff(user);
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

    if (storedPermissions && storedPermissions.length > 0) {
      normalized.permissions = [...storedPermissions];
      changed = true;
    } else if (staffFallbackPermissions.length > 0 && (!Array.isArray(normalized.permissions) || normalized.permissions.length === 0)) {
      normalized.permissions = [...staffFallbackPermissions];
      changed = true;
    } else if (!Array.isArray(normalized.permissions) || normalized.permissions.length === 0) {
      normalized.permissions =
        normalized.role === "Director General"
          ? [...ALL_MODULE_PERMISSIONS]
          : [...(BASE_ROLE_PERMISSIONS[normalized.role] || [])];
      changed = true;
    }

    if (normalized.permissions.includes("pagos") && !normalized.permissions.includes("balance")) {
      normalized.permissions = [...new Set(normalized.permissions.concat("balance"))];
      changed = true;
    }

    if (normalized.role === "Director General" && !normalized.permissions.includes("usuarios-accesos")) {
      normalized.permissions = [...new Set(normalized.permissions.concat("usuarios-accesos"))];
      changed = true;
    }

    normalized.phone = normalizePhone(normalized.phone);
    setInternalUserPermissionOverride(normalized.id, normalized.permissions);
    console.debug("[Permisos] Usuario normalizado", {
      id: normalized.id,
      username: normalized.username,
      role: normalized.role,
      storedPermissions,
      staffFallbackPermissions,
      finalPermissions: normalized.permissions,
    });

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
  const estado = normalizeProspectState(formData.get("estado"), { preserveOperationalState: false });
  const isAutoFollowup = shouldAutoAssignFollowup(estado);
  const proximoSeguimiento = isAutoFollowup
    ? getAutoFollowupDate(new Date())
    : String(formData.get("proximoSeguimiento") || existingProspect?.proximoSeguimiento || "");

  return {
    id: existingId || crypto.randomUUID(),
    nombre: formData.get("nombre").trim(),
    telefono: normalizePhone(formData.get("telefono")),
    fechaContacto,
    sucursal: String(formData.get("sucursal") || "").trim(),
    curso: formData.get("curso").trim(),
    origen: normalizeLeadOrigin(formData.get("origen")),
    medio: normalizeLeadChannel(formData.get("medio"), formData.get("origen")),
    informacion: formData.get("informacion"),
    estado,
    proximoSeguimiento,
    asesoraAsignada: String(formData.get("asesoraAsignada") || ""),
    temperatura: normalizeTemperatureValue(formData.get("temperatura")),
    contacto: existingProspect?.contacto || "",
    notas: formData.get("notas").trim(),
    accesoInteres: formData.get("accesoInteres"),
    createdAt: existingProspect?.createdAt || new Date(`${fechaContacto}T12:00:00`).toISOString(),
  };
}

function getAltaFormData() {
  const formData = new FormData(altaForm);
  const telefono = normalizePhone(formData.get("telefono"));
  const allowedBranch = getAllowedBranch();
  const sucursal = allowedBranch || String(formData.get("sucursal") || "").trim();
  const studentCode = String(
    formData.get("studentCode") || generateStudentCode(sucursal, formData.get("fechaInscripcion"))
  ).trim();
  const existingStudentId = String(formData.get("studentId") || "").trim();
  const existingStudent = students.find((student) => student.id === existingStudentId);
  const fechaInscripcion = String(formData.get("fechaInscripcion") || formatDateForInput(new Date())).trim();
  const fechaNacimiento = String(formData.get("fechaNacimiento") || "").trim();
  const portalUser = telefono;
  const portalPassword = buildStudentPortalPassword(fechaNacimiento);
  const asesorInscribio = normalizeAdvisorName(formData.get("asesoraInscribio"));
  const rawObservaciones = String(formData.get("observaciones") || "").trim();
  const metadataSegments = [
    `ID Alumna: ${studentCode}`,
    `Fecha de inscripción: ${fechaInscripcion}`,
    `Día de clases: ${String(formData.get("diaClases") || "").trim() || "-"}`,
    `Correo: ${String(formData.get("correo") || "").trim() || "-"}`,
    `Dirección: ${String(formData.get("direccion") || "").trim() || "-"}`,
    `Fecha de nacimiento: ${fechaNacimiento || "-"}`,
    `Tutor: ${String(formData.get("tutor") || "").trim() || "-"}`,
    `Escolaridad: ${String(formData.get("escolaridad") || "").trim() || "-"}`,
    `Contacto de emergencia: ${String(formData.get("contactoEmergencia") || "").trim() || "-"}`,
    `Asesor que inscribió: ${asesorInscribio || "-"}`,
    `Método de pago: ${String(formData.get("metodoPago") || "").trim() || "-"}`,
    `Tipo de pago: ${String(formData.get("tipoPago") || "").trim() || "-"}`,
    `Cantidad de pago: ${String(formData.get("cantidadPago") || "").trim() || "-"}`,
    `Mensualidad asignada: ${String(formData.get("mensualidad") || "").trim() || "-"}`,
    `Apoyo gobierno: ${String(formData.get("apoyoGobierno") || "").trim() || "-"}`,
    `Documentación: ${String(formData.get("documentos") || "").trim() || "-"}`,
    `Tiene hijos: ${String(formData.get("tieneHijos") || "").trim() || "-"}`,
    `Trabaja actualmente: ${String(formData.get("trabajaActualmente") || "").trim() || "-"}`,
    `Notas médicas: ${String(formData.get("notasMedicas") || "").trim() || "-"}`,
    `Usuario alta: ${asesorInscribio || "-"}`,
    `Usuario Mi Venezia: ${portalUser || "-"}`,
    `Password Mi Venezia: ${portalPassword || "-"}`,
  ];

  return {
    id: existingStudentId || crypto.randomUUID(),
    prospectId: document.getElementById("altaProspectId").value,
    studentCode,
    fechaInscripcion,
    nombre: formData.get("nombre").trim(),
    telefono,
    sucursal,
    curso: formData.get("curso").trim(),
    accesoElegido: formData.get("accesoElegido"),
    horario: formData.get("horario").trim(),
    diaClases: String(formData.get("diaClases") || "").trim(),
    fechaInicio: formData.get("fechaInicio"),
    correo: String(formData.get("correo") || "").trim(),
    direccion: String(formData.get("direccion") || "").trim(),
    fechaNacimiento,
    tutor: String(formData.get("tutor") || "").trim(),
    escolaridad: String(formData.get("escolaridad") || "").trim(),
    contactoEmergencia: String(formData.get("contactoEmergencia") || "").trim(),
    asesoraInscribio: asesorInscribio,
    metodoPago: String(formData.get("metodoPago") || "").trim(),
    tipoPago: String(formData.get("tipoPago") || "").trim(),
    cantidadPago: String(formData.get("cantidadPago") || "").trim(),
    mensualidad: String(formData.get("mensualidad") || "").trim(),
    apoyoGobierno: String(formData.get("apoyoGobierno") || "").trim(),
    documentos: String(formData.get("documentos") || "").trim(),
    tieneHijos: String(formData.get("tieneHijos") || "").trim(),
    trabajaActualmente: String(formData.get("trabajaActualmente") || "").trim(),
    notasMedicas: String(formData.get("notasMedicas") || "").trim(),
    usuarioAlta: asesorInscribio,
    observaciones: [rawObservaciones, ...metadataSegments].filter(Boolean).join(" | "),
    portalUser,
    portalPassword,
    estado: "Activa",
    createdAt: existingStudent?.createdAt || new Date().toISOString(),
  };
}

function getAltaSummaryData(altaData) {
  return {
    studentCode: altaData.studentCode || "-",
    nombre: altaData.nombre || "Sin seleccionar",
    curso: altaData.curso || "-",
    sucursal: altaData.sucursal || "-",
    acceso: altaData.accesoElegido || "-",
    horario: altaData.horario || "-",
    fechaInicio: altaData.fechaInicio || "-",
    metodoPago: altaData.metodoPago || "-",
    cantidadPago: altaData.cantidadPago || "-",
    portalUser: altaData.portalUser || "-",
    portalPassword: altaData.portalPassword || "-",
  };
}

function renderAltaSummary(summary) {
  if (!altaSummaryStudentCode) {
    return;
  }

  altaSummaryStudentCode.textContent = summary.studentCode;
  altaSummaryNombre.textContent = summary.nombre;
  altaSummaryCurso.textContent = summary.curso;
  altaSummarySucursal.textContent = summary.sucursal;
  altaSummaryAcceso.textContent = summary.acceso;
  altaSummaryHorario.textContent = summary.horario;
  altaSummaryFechaInicio.textContent = summary.fechaInicio;
  if (altaSummaryMetodoPago) altaSummaryMetodoPago.textContent = summary.metodoPago;
  if (altaSummaryCantidadPago) altaSummaryCantidadPago.textContent = summary.cantidadPago;
  if (altaSummaryPortalUser) altaSummaryPortalUser.textContent = summary.portalUser;
  if (altaSummaryPortalPassword) altaSummaryPortalPassword.textContent = summary.portalPassword;
}

function renderAltaConfirmation(summary) {
  altaConfirmStudentCode.textContent = summary.studentCode;
  altaConfirmNombre.textContent = summary.nombre;
  altaConfirmCurso.textContent = summary.curso;
  altaConfirmSucursal.textContent = summary.sucursal;
  altaConfirmAcceso.textContent = summary.acceso;
  altaConfirmHorario.textContent = summary.horario;
  altaConfirmFechaInicio.textContent = summary.fechaInicio;
  altaConfirmMetodoPago.textContent = summary.metodoPago;
  altaConfirmCantidadPago.textContent = summary.cantidadPago;
  altaConfirmPortalUser.textContent = summary.portalUser;
  altaConfirmPortalPassword.textContent = summary.portalPassword;
}

function showAltaValidation(message) {
  altaValidationAlert.textContent = message;
  altaValidationAlert.hidden = false;
}

function clearAltaValidation() {
  altaValidationAlert.hidden = true;
  altaValidationAlert.textContent = "";
}

function getAltaValidationErrors(altaData) {
  const errors = [];
  if (!altaData.nombre) errors.push("Nombre completo");
  if (!altaData.telefono) errors.push("Teléfono");
  if (!altaData.sucursal) errors.push("Sucursal");
  if (!altaData.curso) errors.push("Curso");
  if (!altaData.accesoElegido) errors.push("Acceso elegido");
  if (!altaData.horario) errors.push("Horario");
  if (!altaData.fechaInicio) errors.push("Fecha de inicio");
  if (!altaData.fechaNacimiento) errors.push("Fecha de nacimiento");
  if (!altaData.asesoraInscribio) errors.push("Asesor que inscribió");
  if (!altaData.metodoPago) errors.push("Método de pago");
  if (!altaData.tipoPago) errors.push("Pago completo o Apartó lugar");
  if (!altaData.cantidadPago) errors.push("Cantidad de pago");
  if (!altaData.mensualidad) errors.push("Mensualidad asignada");
  if (!altaData.documentos) errors.push("Documentación");
  return errors;
}

function openAltaConfirmation(altaData) {
  pendingAltaConfirmation = altaData;
  const actionLabel = document.getElementById("altaStudentId").value ? "actualizar la alta de" : "dar de alta a";
  altaConfirmMessage.textContent =
    `Vas a ${actionLabel} ${altaData.nombre || "esta alumna"} con folio ${altaData.studentCode || "-"} ` +
    `en ${altaData.curso || "su curso"} ` +
    `(${altaData.sucursal || "sin sucursal"}) con ${altaData.accesoElegido || "acceso pendiente"}, ` +
    `${altaData.metodoPago || "método de pago pendiente"} y pago de ${altaData.cantidadPago || "-"}.`;
  renderAltaConfirmation(getAltaSummaryData(altaData));
  altaConfirmCard.hidden = false;
}

function closeAltaConfirmation() {
  pendingAltaConfirmation = null;
  altaConfirmCard.hidden = true;
}

function syncAltaAutoFields() {
  const telefono = normalizePhone(document.getElementById("altaTelefono").value);
  const fechaNacimiento = document.getElementById("altaFechaNacimiento").value;
  const sucursal = document.getElementById("altaSucursal").value;
  const studentCodeField = document.getElementById("altaStudentCode");
  const fechaInscripcionField = document.getElementById("altaFechaInscripcion");
  const portalUserField = document.getElementById("altaPortalUser");
  const portalPasswordField = document.getElementById("altaPassword");

  if (!fechaInscripcionField.value) {
    fechaInscripcionField.value = formatDateForInput(new Date());
  }
  if (sucursal) {
    const expectedPrefix = sucursal === "Tlaxcala" ? "TLX" : sucursal === "Puebla" ? "PUE" : "ALT";
    if (!studentCodeField.value || !studentCodeField.value.startsWith(`${expectedPrefix}-${fechaInscripcionField.value.slice(2, 4)}-`)) {
      studentCodeField.value = generateStudentCode(sucursal, fechaInscripcionField.value);
    }
  }

  portalUserField.value = telefono;
  portalPasswordField.value = buildStudentPortalPassword(fechaNacimiento);
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function getBirthYear(dateValue) {
  const normalized = String(dateValue || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return "";
  }
  return normalized.slice(0, 4);
}

function normalizeAdvisorName(value) {
  const normalized = String(value || "").trim();
  if (!normalized) {
    return "";
  }
  return normalized.split("|")[0].trim();
}

function buildStudentPortalPassword(dateValue) {
  const birthYear = getBirthYear(dateValue);
  return birthYear ? `Venezia${birthYear}` : "Venezia0000";
}

function generateStudentCode(branch, inscriptionDate = formatDateForInput(new Date())) {
  const normalizedBranch = String(branch || "").trim();
  const prefix = normalizedBranch === "Tlaxcala" ? "TLX" : normalizedBranch === "Puebla" ? "PUE" : "ALT";
  const yearValue = String(inscriptionDate || formatDateForInput(new Date())).slice(2, 4) || String(new Date().getFullYear()).slice(2);
  const codePattern = new RegExp(`^${prefix}-${yearValue}-(\\d{3})$`);
  const studentsInScope = students.filter((student) => {
    if (student.sucursal !== normalizedBranch) {
      return false;
    }
    const baseDate = String(student.fechaInscripcion || student.createdAt || "").trim();
    return baseDate.includes(`20${yearValue}`);
  });
  const existingMaxCode = students.reduce((maxValue, student) => {
    const code = String(student.studentCode || "").trim();
    const match = code.match(codePattern);
    if (!match) {
      return maxValue;
    }
    return Math.max(maxValue, Number(match[1]));
  }, 0);
  const sequence = Math.max(existingMaxCode, studentsInScope.length) + 1;
  return `${prefix}-${yearValue}-${String(sequence).padStart(3, "0")}`;
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

  if (currentAccessMode === "internal") {
    const currentUser = getCurrentInternalUser();
    console.debug("[Permisos] Menú visible", {
      id: currentUser?.id || "",
      username: currentUser?.username || "",
      permissions: currentUser?.permissions || [],
      visibleModules: Array.from(navItems)
        .filter((item) => !item.hidden)
        .map((item) => item.dataset.module),
    });
  }
}

function updateSessionUI() {
  const user = getCurrentInternalUser();
  const inApp = currentAccessMode === "internal" || currentAccessMode === "student";
  const publicMode = !inApp;
  const studentPortalMode = currentAccessMode === "student";

  document.body.classList.toggle("public-mode", publicMode);
  document.body.classList.toggle("student-portal-mode", studentPortalMode);
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
    balanceExpenseBranchField.value = allowedBranch;
    attendanceSucursalFilter.value = allowedBranch;
    balanceBranchFilter.value = allowedBranch;
    financeBranchFilter.value = allowedBranch;
    dashboardBranchFilter.value = allowedBranch;
  }

  document.getElementById("altaSucursal").disabled = branchLocked;
  document.getElementById("financeSucursal").value = branchLocked ? allowedBranch : document.getElementById("financeSucursal").value;
  document.getElementById("financeSucursal").disabled = branchLocked;
  balanceExpenseBranchField.value = branchLocked ? allowedBranch : balanceExpenseBranchField.value;
  balanceExpenseBranchField.disabled = branchLocked;
  document.getElementById("staffSucursal").value = branchLocked ? allowedBranch : document.getElementById("staffSucursal").value;
  document.getElementById("staffSucursal").disabled = branchLocked;
  attendanceSucursalFilter.disabled = branchLocked;
  balanceBranchFilter.disabled = branchLocked;
  financeBranchFilter.disabled = branchLocked;
  dashboardBranchFilter.disabled = branchLocked || !hasInternalAccess("dashboard");
  syncBalanceExpenseResponsible();
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

  if (permissions.includes("pagos") && !permissions.includes("balance")) {
    permissions = permissions.concat("balance");
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
  syncStaffAccessFields();
  const formData = new FormData(staffForm);
  const existingId = document.getElementById("staffId").value;
  const existingRecord = staffRecords.find((record) => record.id === existingId);
  const allowedBranch = getAllowedBranch();
  const username = staffAccessUsername.value.trim();
  const password = staffTemporaryPassword.value.trim();

  return {
    id: existingId || crypto.randomUUID(),
    nombre: String(formData.get("nombre") || "").trim(),
    telefono: normalizePhone(formData.get("telefono")),
    puesto: formData.get("puesto"),
    area: formData.get("area"),
    sucursal: allowedBranch || formData.get("sucursal"),
    fechaIngreso: formData.get("fechaIngreso"),
    fechaNacimiento: String(formData.get("fechaNacimiento") || "").trim(),
    estado: formData.get("estado"),
    linkedUserId: String(formData.get("linkedUserId") || "").trim(),
    username,
    password,
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
    origen: "Web",
    medio: "WhatsApp",
    informacion: "Pendiente de enviar",
    estado: "Prospecto nuevo",
    proximoSeguimiento: getAutoFollowupDate(new Date()),
    asesoraAsignada: "",
    temperatura: "",
    contacto: "",
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
  document.getElementById("proximoSeguimiento").value = "";
  syncProspectFollowupField();
  submitButton.textContent = "Guardar prospecto";
}

function resetAltaForm() {
  altaForm.reset();
  document.getElementById("altaStudentId").value = "";
  document.getElementById("altaProspectId").value = "";
  document.getElementById("altaStudentCode").value = generateStudentCode();
  document.getElementById("altaFechaInscripcion").value = formatDateForInput(new Date());
  altaForm.querySelector('button[type="submit"]').textContent = "Confirmar alta";
  syncAltaAutoFields();
  clearAltaValidation();
  closeAltaConfirmation();
  renderAltaSummary(getAltaSummaryData({}));
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
  document.getElementById("staffLinkedUser").value = "";
  document.getElementById("staffFechaIngreso").value = formatDateForInput(new Date());
  staffSubmitButton.textContent = "Guardar personal";
  syncStaffAccessFields();
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
  return paymentRecords.filter(
    (record) => activeStudentIds.has(record.studentId) && getPaymentRecordMonth(record) === selectedMonth
  );
}

function getDashboardFinanceRecords() {
  return financeRecords.filter(
    (record) => isDateInSelectedMonth(record.fecha) && matchesDashboardBranch(record.sucursal)
  );
}

function normalizeDashboardOrigin(prospect) {
  const origen = normalizeLeadOrigin(prospect.origen);

  if (origen === "Redes sociales") return "Redes sociales";
  if (origen === "Referido") return "Referido";
  if (origen === "Pagina web" || origen === "Web") return "Web";
  if (origen === "WhatsApp") return "WhatsApp directo";
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
  syncStaffAccessFields();
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

function getStaffAccessLabel(record) {
  if (record.username) {
    return record.username;
  }

  const user = internalUsers.find((item) => item.id === record.linkedUserId);
  return user?.username || "-";
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
          <td>${escapeHtml(getStaffAccessLabel(record))}</td>
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
  removeInternalUserPermissionOverride(id);
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
  document.getElementById("staffFechaNacimiento").value = record.fechaNacimiento || "";
  document.getElementById("staffEstado").value = record.estado;
  document.getElementById("staffLinkedUser").value = record.linkedUserId || "";
  staffAccessUsername.value = record.username || "";
  staffTemporaryPassword.value = record.password || "";
  document.getElementById("staffObservaciones").value = record.observaciones || "";
  staffSubmitButton.textContent = "Actualizar personal";
  syncStaffAccessFields();
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
  return base
    .filter((prospect) => {
      const normalizedState = normalizeProspectState(prospect.estado, { preserveOperationalState: false });
      const normalizedTemperature = normalizeTemperatureValue(prospect.temperatura);
      const followup = getProspectFollowupMeta(prospect.proximoSeguimiento);
      const matchesBranch = !activeBranchFilter || prospect.sucursal === activeBranchFilter;
      const matchesTemperature = !activeTemperatureFilter || normalizedTemperature === activeTemperatureFilter;
      const matchesState = !activeStateFilter || normalizedState === activeStateFilter;
      const matchesFollowup = !activeFollowupFilter || followup.tone === activeFollowupFilter;
      const matchesAccess = !activeAccessFilter || prospect.accesoInteres === activeAccessFilter;
      const matchesAdvisor = !activeAdvisorFilter || prospect.asesoraAsignada === activeAdvisorFilter;
      if (
        !matchesBranch ||
        !matchesTemperature ||
        !matchesState ||
        !matchesFollowup ||
        !matchesAccess ||
        !matchesAdvisor
      ) {
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
        normalizedState,
        normalizedTemperature,
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
    })
    .sort((left, right) => {
      const priorityDiff = getProspectPriorityRank(left) - getProspectPriorityRank(right);
      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      const leftDate = left.proximoSeguimiento || "9999-12-31";
      const rightDate = right.proximoSeguimiento || "9999-12-31";
      if (leftDate !== rightDate) {
        return leftDate.localeCompare(rightDate);
      }

      return getProspectDate(right).localeCompare(getProspectDate(left));
    });
}

function renderCrmPriorityStats(filteredProspects) {
  const stats = filteredProspects.reduce(
    (accumulator, prospect) => {
      const state = normalizeProspectState(prospect.estado, { preserveOperationalState: false });
      const followup = getProspectFollowupMeta(prospect.proximoSeguimiento);

      if (state === "Prospecto nuevo") accumulator.newCount += 1;
      if (followup.tone === "today") accumulator.todayCount += 1;
      if (followup.tone === "late") accumulator.lateCount += 1;
      if (state === "Cita agendada") accumulator.scheduledCount += 1;
      if (state === "Inscrita") accumulator.enrolledCount += 1;
      return accumulator;
    },
    { newCount: 0, todayCount: 0, lateCount: 0, scheduledCount: 0, enrolledCount: 0 }
  );

  crmCountNew.textContent = stats.newCount;
  crmCountToday.textContent = stats.todayCount;
  crmCountLate.textContent = stats.lateCount;
  crmCountScheduled.textContent = stats.scheduledCount;
  crmCountEnrolled.textContent = stats.enrolledCount;
}

function renderTable() {
  const filteredProspects = getFilteredProspects();
  renderCrmPriorityStats(filteredProspects);

  tableBody.innerHTML = filteredProspects
    .map((prospect) => {
      const temperature = normalizeTemperatureValue(prospect.temperatura);
      const temperatureMarkup = temperature
        ? `<span class="status-pill status-pill-temperature status-pill-${escapeHtml(getTemperatureTone(temperature))}">${escapeHtml(temperature)}</span>`
        : `<span class="status-pill status-pill-temperature status-pill-default">Sin temperatura</span>`;
      const followup = getProspectFollowupMeta(prospect.proximoSeguimiento);
      const stateLabel = normalizeProspectState(prospect.estado, { preserveOperationalState: false }) || prospect.estado;
      const whatsappUrl = getProspectWhatsAppUrl(prospect);
      const whatsappDisabled = whatsappUrl ? "" : "disabled";
      const whatsappTitle = whatsappUrl
        ? "Abrir conversación en WhatsApp"
        : "La prospecta no tiene un teléfono válido";

      return `
        <tr>
          <td>
            <div class="prospect-primary-cell">
              <strong>${escapeHtml(prospect.nombre)}</strong>
              <small>${escapeHtml(prospect.origen)} | ${escapeHtml(getProspectDate(prospect))}</small>
              <div class="prospect-meta-row">
                ${temperatureMarkup}
                ${prospect.accesoInteres ? `<span class="status-pill prospect-access-pill">${escapeHtml(prospect.accesoInteres)}</span>` : ""}
              </div>
            </div>
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
          <td><span class="status-pill crm-state-pill crm-state-pill-${escapeHtml(stateLabel.toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(stateLabel)}</span></td>
          <td>
            <div class="prospect-followup-cell">
              <span class="status-pill followup-pill followup-pill-${escapeHtml(followup.tone)}">${escapeHtml(followup.label)}</span>
              <small>${escapeHtml(followup.detail || "Sin fecha definida.")}</small>
              <small>Asesor: ${escapeHtml(prospect.asesoraAsignada || "-")}</small>
            </div>
          </td>
          <td>
            <div class="actions-cell actions-cell-prospect">
              <button class="table-action action-whatsapp" type="button" data-action="whatsapp" data-id="${prospect.id}" title="${escapeHtml(whatsappTitle)}" ${whatsappDisabled}>WhatsApp</button>
              <button class="table-action action-schedule" type="button" data-action="schedule" data-id="${prospect.id}">Agendar cita</button>
              <button class="table-action action-enrolled" type="button" data-action="enroll" data-id="${prospect.id}">Marcar como inscrita</button>
              <button class="table-action action-alta" type="button" data-action="alta" data-id="${prospect.id}">Mandar a alta</button>
              <button class="table-action action-history" type="button" data-action="history" data-id="${prospect.id}">Ver historial</button>
              <button class="table-action action-edit" type="button" data-action="edit" data-id="${prospect.id}">Editar</button>
              <button class="table-action action-delete" type="button" data-action="delete" data-id="${prospect.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    })
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
          <td>
            <div class="alta-pending-primary">
              <strong>${escapeHtml(prospect.nombre)}</strong>
              <small>${escapeHtml(prospect.telefono)}</small>
            </div>
          </td>
          <td>${escapeHtml(prospect.telefono)}</td>
          <td>${escapeHtml(prospect.sucursal)}</td>
          <td>
            ${escapeHtml(prospect.curso)}
            <small>${escapeHtml(prospect.origen || "Inscrita desde CRM")}</small>
          </td>
          <td><span class="status-pill prospect-access-pill">${escapeHtml(prospect.accesoInteres || "-")}</span></td>
          <td><button class="table-action action-edit alta-action-button" type="button" data-action="alta" data-id="${prospect.id}">Preparar alta</button></td>
        </tr>
      `
    )
    .join("");

  pendingAltasEmptyState.hidden = pendingAltas.length > 0;
}

function getStudentInscriptionDate(student) {
  return student.fechaInscripcion || (student.createdAt ? String(student.createdAt).slice(0, 10) : "");
}

function getFilteredAltaHistory() {
  return students
    .filter((student) => matchesCurrentBranch(student.sucursal))
    .filter((student) => isDateInMonth(getStudentInscriptionDate(student), selectedAltasMonth))
    .sort((a, b) => {
      const dateA = getStudentInscriptionDate(a) || "0000-00-00";
      const dateB = getStudentInscriptionDate(b) || "0000-00-00";
      if (dateA !== dateB) {
        return dateB.localeCompare(dateA);
      }
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });
}

function renderAltaHistory() {
  const altaHistory = getFilteredAltaHistory();
  const becaCount = altaHistory.filter((student) => student.accesoElegido === "Beca Venezia").length;
  const tlaxcalaCount = altaHistory.filter((student) => student.sucursal === "Tlaxcala").length;
  const pueblaCount = altaHistory.filter((student) => student.sucursal === "Puebla").length;

  altaHistoryTotal.textContent = altaHistory.length;
  altaHistoryBeca.textContent = becaCount;
  altaHistoryTlaxcala.textContent = tlaxcalaCount;
  altaHistoryPuebla.textContent = pueblaCount;

  altaHistoryTableBody.innerHTML = altaHistory
    .map((student) => {
      const inscriptionDate = getStudentInscriptionDate(student);
      return `
        <tr>
          <td><span class="alta-history-code">${escapeHtml(student.studentCode || student.id || "-")}</span></td>
          <td>${escapeHtml(inscriptionDate || "-")}</td>
          <td>
            <div class="alta-history-primary">
              <strong>${escapeHtml(student.nombre || "-")}</strong>
              <small>${escapeHtml(student.telefono || "-")}</small>
            </div>
          </td>
          <td>${escapeHtml(student.sucursal || "-")}</td>
          <td>${escapeHtml(student.curso || "-")}</td>
          <td><span class="status-pill prospect-access-pill">${escapeHtml(student.accesoElegido || "-")}</span></td>
          <td>${escapeHtml(student.horario || "-")}</td>
          <td>${escapeHtml(student.metodoPago || "-")}</td>
          <td>${escapeHtml(student.cantidadPago || "-")}</td>
          <td>${escapeHtml(student.asesoraInscribio || student.usuarioAlta || "-")}</td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-student" data-id="${student.id}">Editar</button>
              <button class="table-action secondary-btn" type="button" data-action="view-student-file" data-id="${student.id}">Ver expediente</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  altaHistoryEmptyState.hidden = altaHistory.length > 0;
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

function loadStudentIntoAlta(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    return;
  }

  document.getElementById("altaStudentId").value = student.id;
  document.getElementById("altaProspectId").value = student.prospectId || "";
  document.getElementById("altaStudentCode").value = student.studentCode || "";
  document.getElementById("altaFechaInscripcion").value = student.fechaInscripcion || formatDateForInput(new Date());
  document.getElementById("altaNombre").value = student.nombre || "";
  document.getElementById("altaTelefono").value = student.telefono || "";
  document.getElementById("altaCorreo").value = student.correo || "";
  document.getElementById("altaDireccion").value = student.direccion || "";
  document.getElementById("altaFechaNacimiento").value = student.fechaNacimiento || "";
  document.getElementById("altaTutor").value = student.tutor || "";
  document.getElementById("altaEscolaridad").value = student.escolaridad || "";
  document.getElementById("altaContactoEmergencia").value = student.contactoEmergencia || "";
  document.getElementById("altaSucursal").value = student.sucursal || "";
  document.getElementById("altaCurso").value = student.curso || "";
  document.getElementById("altaAccesoElegido").value = student.accesoElegido || "";
  document.getElementById("altaHorario").value = student.horario || "";
  document.getElementById("altaFechaInicio").value = student.fechaInicio || "";
  document.getElementById("altaDiaClases").value = student.diaClases || "";
  document.getElementById("altaAsesoraInscribio").value = normalizeAdvisorName(student.asesoraInscribio || student.usuarioAlta);
  document.getElementById("altaMetodoPago").value = student.metodoPago || "";
  document.getElementById("altaTipoPago").value = student.tipoPago || "";
  document.getElementById("altaCantidadPago").value = student.cantidadPago || "";
  document.getElementById("altaMensualidad").value = student.mensualidad || "";
  document.getElementById("altaApoyoGobierno").value = student.apoyoGobierno || "";
  document.getElementById("altaDocumentos").value = student.documentos || "";
  document.getElementById("altaTieneHijos").value = student.tieneHijos || "";
  document.getElementById("altaTrabajaActualmente").value = student.trabajaActualmente || "";
  document.getElementById("altaNotasMedicas").value = student.notasMedicas || "";
  document.getElementById("altaObservaciones").value = student.observaciones || "";

  syncAltaAutoFields();
  altaForm.querySelector('button[type="submit"]').textContent = "Actualizar alta";
  clearAltaValidation();
  closeAltaConfirmation();
  renderAltaSummary(getAltaSummaryData(getAltaFormData()));
  setActiveModule("altas");
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  const filters = [
    {
      element: attendanceSucursalFilter,
      defaultLabel: "Todas",
      options: ["Puebla", "Tlaxcala"],
    },
    {
      element: attendanceCursoFilter,
      defaultLabel: "Todos",
      options: ["Uñas", "Pestañas", "Barbería", "Maquillaje"],
    },
    {
      element: attendanceHorarioFilter,
      defaultLabel: "Todos",
      options: ["9am a 1pm", "2pm a 6pm", "1pm a 5pm"],
    },
    {
      element: attendanceDayFilter,
      defaultLabel: "Todos",
      options: ["Viernes", "Sábado", "Domingo"],
    },
  ];

  filters.forEach(({ element, defaultLabel, options }) => {
    const previousValue = element.value;
    element.innerHTML = [`<option value="">${defaultLabel}</option>`]
      .concat(options.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`))
      .join("");
    if (options.includes(previousValue)) {
      element.value = previousValue;
    }
  });
}

function getAttendanceRecord(studentId, date) {
  return attendanceRecords.find((record) => record.studentId === studentId && record.fecha === date);
}

function getFilteredStudentsForAttendance() {
  return getActiveStudents().filter((student) => {
    const normalizedSearch = activeAttendanceSearch.trim().toLowerCase();
    const searchableText = [
      student.nombre,
      student.portalUser,
      student.telefono,
      student.studentCode,
    ].join(" ").toLowerCase();

    if (normalizedSearch && !searchableText.includes(normalizedSearch)) return false;
    if (attendanceSucursalFilter.value && student.sucursal !== attendanceSucursalFilter.value) return false;
    if (attendanceCursoFilter.value && student.curso !== attendanceCursoFilter.value) return false;
    if (attendanceHorarioFilter.value && student.horario !== attendanceHorarioFilter.value) return false;
    if (attendanceDayFilter.value && student.diaClases !== attendanceDayFilter.value) return false;
    return true;
  });
}

function renderAttendanceOptions(selectedValue) {
  return ATTENDANCE_STATUS_OPTIONS.map((option) => {
    const label = option ? ATTENDANCE_STATUS_LABELS[option] || option : "-";
    return `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
}

function getAttendanceSessionCountForCourse(course) {
  const normalizedCourse = String(course || "").trim().toLowerCase();
  if (normalizedCourse === "barbería" || normalizedCourse === "barberia") {
    return 20;
  }
  if (
    normalizedCourse === "uñas" ||
    normalizedCourse === "unas" ||
    normalizedCourse === "pestañas" ||
    normalizedCourse === "pestanas" ||
    normalizedCourse === "maquillaje"
  ) {
    return 16;
  }
  return DEFAULT_ATTENDANCE_SESSION_COUNT;
}

function getAttendanceSessionCount(studentsList = []) {
  const explicitCourse = attendanceCursoFilter.value;
  if (explicitCourse) {
    return getAttendanceSessionCountForCourse(explicitCourse);
  }

  if (studentsList.length === 0) {
    return DEFAULT_ATTENDANCE_SESSION_COUNT;
  }

  return studentsList.reduce(
    (maxCount, student) => Math.max(maxCount, getAttendanceSessionCountForCourse(student.curso)),
    DEFAULT_ATTENDANCE_SESSION_COUNT
  );
}

function addDaysToDateValue(dateValue, days) {
  const date = new Date(`${dateValue}T12:00:00`);
  date.setDate(date.getDate() + days);
  return formatDateForInput(date);
}

function getAttendanceSessionDates(baseDate, sessionCount = DEFAULT_ATTENDANCE_SESSION_COUNT) {
  return Array.from({ length: sessionCount }, (_, index) => ({
    key: `s${index + 1}`,
    date: addDaysToDateValue(baseDate, index * 7),
  }));
}

function getAttendanceWeekdayIndex(dayLabel) {
  return {
    Viernes: 5,
    Sábado: 6,
    Domingo: 0,
  }[dayLabel] ?? null;
}

function alignDateToSelectedClassDay(dateValue, dayLabel) {
  const weekday = getAttendanceWeekdayIndex(dayLabel);
  if (weekday === null) {
    return dateValue;
  }

  const date = new Date(`${dateValue}T12:00:00`);
  const diff = (weekday - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + diff);
  return formatDateForInput(date);
}

function getAttendanceBaseDate(studentsList) {
  const firstStartDate =
    studentsList
      .map((student) => student.fechaInicio)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))[0] || formatDateForInput(new Date());
  const selectedDay = attendanceDayFilter.value || studentsList[0]?.diaClases || "";
  return alignDateToSelectedClassDay(firstStartDate, selectedDay);
}

function getAttendanceSessionLabel(session) {
  const date = new Date(`${session.date}T12:00:00`);
  const dateLabel = date.toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
  return `${dateLabel} / ${session.key}`;
}

function getLatestPaymentRecordForStudent(studentId) {
  return paymentRecords
    .filter((record) => record.studentId === studentId)
    .sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")))[0] || {};
}

function getAttendanceMeta(record, label) {
  const source = String(record?.observaciones || "");
  const segment = source.split(" | ").find((item) => item.startsWith(`${label}: `));
  return segment ? segment.slice(label.length + 2).trim() : "";
}

function buildAttendanceNotes({ reglamento, reportes, observaciones }) {
  return [
    `Reglamento firmado: ${reglamento || ""}`,
    `Reportes: ${reportes || ""}`,
    `Observaciones: ${observaciones || ""}`,
  ].join(" | ");
}

function getAttendanceNotesValue(record, label) {
  return getAttendanceMeta(record, label) || "";
}

function getAttendanceSummaryFromSelection(studentsList, sessions) {
  const visibleStudentIds = new Set(studentsList.map((student) => student.id));
  const visibleSessionDates = new Set(sessions.map((session) => session.date));
  const visibleRecords = attendanceRecords.filter(
    (record) => visibleStudentIds.has(record.studentId) && visibleSessionDates.has(record.fecha)
  );

  return {
    groupCount: studentsList.length,
    asistencias: visibleRecords.filter((record) => record.estado === "Asistencia").length,
    permisos: visibleRecords.filter((record) => record.estado === "Permiso").length,
    faltas: visibleRecords.filter((record) => record.estado === "Falta").length,
    recuperaciones: visibleRecords.filter((record) => record.estado === "Recuperación").length,
  };
}

function renderAttendanceTable() {
  const studentsList = getFilteredStudentsForAttendance();
  const selectedDate = getAttendanceBaseDate(studentsList);
  attendanceDate.value = selectedDate;
  const sessions = getAttendanceSessionDates(selectedDate, getAttendanceSessionCount(studentsList));

  attendanceTableHead.innerHTML = `
    <tr>
      <th>REGLAMENTO</th>
      <th>#</th>
      <th>Nombre del alumno</th>
      <th>Celular</th>
      <th>PAGO C1</th>
      <th>PAGO C2</th>
      <th>MENS</th>
      <th>1ra M</th>
      <th>2da M</th>
      <th>3ra M</th>
      <th>4ta M</th>
      <th>5ta M</th>
      <th>TRANS O EFEC</th>
      <th>OBSERVA.</th>
      ${sessions.map((session) => `<th>${escapeHtml(getAttendanceSessionLabel(session))}</th>`).join("")}
      <th>Acciones</th>
    </tr>
  `;

  attendanceTableBody.innerHTML = studentsList
    .map((student, index) => {
      const baseRecord = getAttendanceRecord(student.id, selectedDate);
      const sessionRecords = sessions.map((session) => getAttendanceRecord(student.id, session.date)).filter(Boolean);
      const metadataRecord = baseRecord || sessionRecords.find((record) => record.observaciones);
      const payment = getLatestPaymentRecordForStudent(student.id);
      const monthlyPayment5 = courseUsesFifthMonth(student.curso) ? payment.mensualidad5 || "-" : "No aplica";
      return `
        <tr>
          <td>
            <select data-attendance-field="reglamento" data-student-id="${student.id}">
              <option value="">-</option>
              <option value="Sí" ${getAttendanceNotesValue(metadataRecord, "Reglamento firmado") === "Sí" ? "selected" : ""}>Sí</option>
              <option value="No" ${getAttendanceNotesValue(metadataRecord, "Reglamento firmado") === "No" ? "selected" : ""}>No</option>
            </select>
          </td>
          <td>${index + 1}</td>
          <td>
            <div class="attendance-student-cell">
              <strong>${escapeHtml(student.nombre)}</strong>
              <small>${escapeHtml(student.studentCode || student.portalUser || "-")}</small>
            </div>
          </td>
          <td>${escapeHtml(student.telefono || "-")}</td>
          <td>${escapeHtml(payment.certificadoP1 || "-")}</td>
          <td>${escapeHtml(payment.certificadoP2 || "-")}</td>
          <td>${escapeHtml(payment.mensualidadPactada || student.mensualidad || "-")}</td>
          <td>${escapeHtml(payment.mensualidad1 || "-")}</td>
          <td>${escapeHtml(payment.mensualidad2 || "-")}</td>
          <td>${escapeHtml(payment.mensualidad3 || "-")}</td>
          <td>${escapeHtml(payment.mensualidad4 || "-")}</td>
          <td>${escapeHtml(monthlyPayment5)}</td>
          <td>${escapeHtml(payment.metodoPago || "-")}</td>
          <td><input type="text" value="${escapeHtml(getAttendanceNotesValue(metadataRecord, "Observaciones") || "")}" placeholder="Observaciones" data-attendance-field="observaciones" data-student-id="${student.id}" /></td>
          ${sessions
            .map((session) => {
              const record = getAttendanceRecord(student.id, session.date);
              return `<td><select class="attendance-session-select" data-attendance-field="session" data-session-date="${session.date}" data-student-id="${student.id}">${renderAttendanceOptions(record?.estado || "")}</select></td>`;
            })
            .join("")}
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-student" data-id="${student.id}">Editar</button>
              <button class="table-action action-edit" type="button" data-action="save-attendance" data-id="${student.id}">Guardar</button>
              <button class="table-action secondary-btn" type="button" data-action="view-student-file" data-id="${student.id}">Ver expediente</button>
              <button class="table-action secondary-btn" type="button" data-action="view-history" data-id="${student.id}">Ver historial</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  attendanceEmptyState.hidden = studentsList.length > 0;
  updateAttendanceSummary(studentsList, sessions);
}

async function saveAttendanceForStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    alert("No se encontró la alumna vinculada para guardar la asistencia.");
    return;
  }

  const date = attendanceDate.value || formatDateForInput(new Date());
  const sessionFields = Array.from(
    attendanceTableBody.querySelectorAll(`[data-attendance-field="session"][data-student-id="${studentId}"]`)
  );
  const reglamentoField = attendanceTableBody.querySelector(`[data-attendance-field="reglamento"][data-student-id="${studentId}"]`);
  const reportesField = attendanceTableBody.querySelector(`[data-attendance-field="reportes"][data-student-id="${studentId}"]`);
  const observacionesField = attendanceTableBody.querySelector(`[data-attendance-field="observaciones"][data-student-id="${studentId}"]`);
  const firstSelectedSessionDate = sessionFields.find((field) => field.value)?.dataset.sessionDate || date;
  const recordsToSave = sessionFields
    .filter((field) => field.value)
    .map((field) => {
      const sessionDate = field.dataset.sessionDate;
      const existingIndex = attendanceRecords.findIndex((record) => record.studentId === studentId && record.fecha === sessionDate);
      return {
        id: existingIndex >= 0 ? attendanceRecords[existingIndex].id : crypto.randomUUID(),
        studentId,
        fecha: sessionDate,
        estado: field.value,
        observaciones:
          sessionDate === date || sessionDate === firstSelectedSessionDate
            ? buildAttendanceNotes({
                reglamento: reglamentoField?.value || "",
                reportes: reportesField?.value.trim() || "",
                observaciones: observacionesField?.value.trim() || "",
              })
            : attendanceRecords[existingIndex]?.observaciones || "",
        recordedBy: getCurrentInternalUser()?.id || "",
        createdAt:
          existingIndex >= 0
            ? attendanceRecords[existingIndex].createdAt || new Date().toISOString()
            : new Date().toISOString(),
      };
    });

  if (recordsToSave.length === 0) {
    alert("Selecciona al menos una asistencia A, P o F antes de guardar.");
    return;
  }

  const saveResults = [];
  for (const record of recordsToSave) {
    saveResults.push(await saveAttendanceRecord(record));
  }

  if (saveResults.some((result) => !result.synced)) {
    updateAttendanceSummary();
    if (selectedAttendanceStudentId === studentId) {
      renderAttendanceHistory(studentId);
    }
    alert("No se pudo guardar toda la asistencia en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  renderAttendanceTable();
  updateAttendanceSummary();
  if (selectedAttendanceStudentId === studentId) {
    renderAttendanceHistory(studentId);
  }
}

function updateAttendanceSummary(
  studentsList = getFilteredStudentsForAttendance(),
  sessions = getAttendanceSessionDates(
    attendanceDate.value || formatDateForInput(new Date()),
    getAttendanceSessionCount(studentsList)
  )
) {
  const summary = getAttendanceSummaryFromSelection(studentsList, sessions);
  attendanceGroupCount.textContent = summary.groupCount;
  attendanceAsistencias.textContent = summary.asistencias;
  attendanceRetardos.textContent = summary.permisos;
  attendanceFaltas.textContent = summary.faltas;
  attendanceRecuperaciones.textContent = summary.recuperaciones;
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
  const currentMonthRecord = paymentRecords.find(
    (record) => record.studentId === studentId && getPaymentRecordMonth(record) === selectedPaymentsMonth
  );
  if (currentMonthRecord) {
    return currentMonthRecord;
  }

  return (
    paymentRecords.find(
      (record) => record.studentId === studentId && !record.mesPago && getPaymentRecordMonth(record) === selectedPaymentsMonth
    ) || {
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
      cantidadPagada: "",
      reportes: "",
      observaciones: "",
      mesPago: selectedPaymentsMonth,
    }
  );
}

function getPaymentRecordMonth(record) {
  if (record.mesPago) {
    return record.mesPago;
  }

  const baseDate = String(record.updatedAt || record.createdAt || "").slice(0, 10);
  return baseDate ? baseDate.slice(0, 7) : "";
}

function isPaymentRecordInSelectedMonth(record) {
  return getPaymentRecordMonth(record) === selectedPaymentsMonth;
}

function courseUsesFifthMonth(course) {
  return String(course || "").trim().toLowerCase() === "barbería" || String(course || "").trim().toLowerCase() === "barberia";
}

function renderPaymentSelectOptions(selectedValue, options) {
  return options
    .map((option) => {
      const label = option || "Selecciona";
      return `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderPaymentStatusSelect(field, student, payment) {
  const selectedValue = field === "mensualidad5" && !courseUsesFifthMonth(student.curso)
    ? "No aplica"
    : payment[field] || "";
  const disabled = field === "mensualidad5" && !courseUsesFifthMonth(student.curso) ? "disabled" : "";
  return `<select data-payment-field="${field}" data-student-id="${student.id}" ${disabled}>${renderPaymentSelectOptions(selectedValue, PAYMENT_STATUS_OPTIONS)}</select>`;
}

function parsePaymentAmount(value) {
  const normalized = String(value || "").replace(/[$,\s]/g, "");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function getShortBranchLabel(branch) {
  const normalizedBranch = String(branch || "").trim().toLowerCase();
  if (normalizedBranch === "tlaxcala") return "Tlx";
  if (normalizedBranch === "puebla") return "Pue";
  return branch || "-";
}

function getStudentPaymentSchedule(course) {
  const normalizedCourse = String(course || "").trim().toLowerCase();
  const baseSchedule = [
    { label: "Men1", sessionIndex: 0 },
    { label: "Men2", sessionIndex: 3 },
    { label: "Men3", sessionIndex: 7 },
    { label: "Men4", sessionIndex: 11 },
  ];

  if (normalizedCourse === "barbería" || normalizedCourse === "barberia") {
    return baseSchedule.concat({ label: "Men5", sessionIndex: 15 });
  }

  if (["uñas", "unas", "pestañas", "pestanas", "maquillaje"].includes(normalizedCourse)) {
    return baseSchedule;
  }

  return [];
}

function getStudentPortalSessionDates(student) {
  const sessionCount = getAttendanceSessionCountForCourse(student.curso);
  const baseDate = getAttendanceBaseDate([student]);
  return getAttendanceSessionDates(baseDate, sessionCount);
}

function getStudentPaymentScheduleEntries(student) {
  const sessions = getStudentPortalSessionDates(student);

  return getStudentPaymentSchedule(student.curso).map((entry) => {
    const session = sessions[entry.sessionIndex];
    return {
      label: entry.label,
      value: session?.date ? formatDisplayDate(session.date) : "-",
    };
  });
}

function getFilteredStudentsForPayments() {
  const normalizedSearch = activePaymentsSearch.trim().toLowerCase();

  return getActiveStudents().filter((student) => {
    if (!normalizedSearch) {
      return true;
    }

    const searchableText = [
      student.nombre,
      student.portalUser,
      student.telefono,
      student.studentCode,
    ].join(" ").toLowerCase();

    return searchableText.includes(normalizedSearch);
  });
}

function renderPaymentsTable() {
  const studentsList = getFilteredStudentsForPayments();

  paymentsTableBody.innerHTML = studentsList
    .map((student) => {
      const payment = getPaymentRecord(student.id);
      const mensualidadAsignada = payment.mensualidadPactada || student.mensualidad || student.colegiatura || "";
      return `
        <tr>
          <td>
            <div class="payment-student-cell">
              <strong>${escapeHtml(student.nombre)}</strong>
              <small>${escapeHtml(student.studentCode || student.telefono || "-")}</small>
            </div>
          </td>
          <td>${escapeHtml(getShortBranchLabel(student.sucursal))}</td>
          <td>${escapeHtml(student.curso)}</td>
          <td>${escapeHtml(student.horario)}</td>
          <td><input type="text" value="${escapeHtml(mensualidadAsignada)}" data-payment-field="mensualidadPactada" data-student-id="${student.id}" /></td>
          <td>${renderPaymentStatusSelect("certificadoP1", student, payment)}</td>
          <td>${renderPaymentStatusSelect("certificadoP2", student, payment)}</td>
          <td>${renderPaymentStatusSelect("mensualidad1", student, payment)}</td>
          <td>${renderPaymentStatusSelect("mensualidad2", student, payment)}</td>
          <td>${renderPaymentStatusSelect("mensualidad3", student, payment)}</td>
          <td>${renderPaymentStatusSelect("mensualidad4", student, payment)}</td>
          <td>${renderPaymentStatusSelect("mensualidad5", student, payment)}</td>
          <td><select data-payment-field="metodoPago" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.metodoPago, PAYMENT_METHOD_OPTIONS)}</select></td>
          <td><input type="text" value="${escapeHtml(payment.cantidadPagada || "")}" data-payment-field="cantidadPagada" data-student-id="${student.id}" placeholder="$0" /></td>
          <td><input type="text" value="${escapeHtml(payment.reportes)}" data-payment-field="reportes" data-student-id="${student.id}" /></td>
          <td><input type="text" value="${escapeHtml(payment.observaciones)}" data-payment-field="observaciones" data-student-id="${student.id}" /></td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-student" data-id="${student.id}">Editar</button>
              <button class="table-action action-edit" type="button" data-action="save-payment" data-id="${student.id}">Guardar</button>
              <button class="table-action secondary-btn" type="button" data-action="view-student-file" data-id="${student.id}">Ver expediente</button>
            </div>
          </td>
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
    "metodoPago",
    "cantidadPagada",
    "reportes",
    "observaciones",
  ];

  const current = getPaymentRecord(studentId);
  const newRecord = {
    id: current.id || crypto.randomUUID(),
    studentId,
    mesPago: selectedPaymentsMonth,
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
  const studentsById = new Map(getActiveStudents().map((student) => [student.id, student]));
  const validRecords = paymentRecords.filter(
    (record) => activeStudentIds.has(record.studentId) && isPaymentRecordInSelectedMonth(record)
  );
  const mensualidadFields = ["mensualidad1", "mensualidad2", "mensualidad3", "mensualidad4", "mensualidad5"];
  const certificadoFields = ["certificadoP1", "certificadoP2"];
  const paymentFields = certificadoFields.concat(mensualidadFields);

  paymentsRegisteredCount.textContent = validRecords.length;
  paymentsPendingCount.textContent = validRecords.reduce(
    (total, record) => total + paymentFields.filter((field) => record[field] === "Pendiente" || record[field] === "Parcial").length,
    0
  );
  paymentsMensualidadesPaid.textContent = validRecords.reduce(
    (total, record) => total + mensualidadFields.filter((field) => record[field] === "Pagado").length,
    0
  );
  paymentsMonthlyIncome.textContent = formatCurrency(
    validRecords.reduce((total, record) => total + parsePaymentAmount(record.cantidadPagada), 0)
  );
  paymentsTlaxcalaCount.textContent = validRecords.filter((record) => studentsById.get(record.studentId)?.sucursal === "Tlaxcala").length;
  paymentsPueblaCount.textContent = validRecords.filter((record) => studentsById.get(record.studentId)?.sucursal === "Puebla").length;
}

function getBalancePaymentDate(record) {
  const baseDate = String(record.createdAt || record.updatedAt || "").slice(0, 10);
  if (baseDate) {
    return baseDate;
  }
  return record.mesPago ? `${record.mesPago}-01` : "";
}

function matchesBalanceDate(value) {
  return !balanceDateFilter.value || String(value || "").slice(0, 10) === balanceDateFilter.value;
}

function getBalanceIncomeConcept(record) {
  const paidConcepts = BALANCE_PAYMENT_CONCEPT_FIELDS
    .filter(({ key }) => record[key] === "Pagado" || record[key] === "Parcial")
    .map(({ label }) => label);

  if (paidConcepts.length > 0) {
    return paidConcepts.join(", ");
  }

  if (record.mesPago) {
    return `Pago ${record.mesPago}`;
  }

  return "Pago registrado";
}

function getBalanceResponsibleSuggestion(branch) {
  const normalizedBranch = String(branch || "").trim().toLowerCase();
  if (!normalizedBranch) {
    return "";
  }

  const matchingStaff = staffRecords.filter((record) => {
    const recordBranch = String(record.sucursal || "").trim().toLowerCase();
    const position = String(record.puesto || "").trim().toLowerCase();
    const status = String(record.estado || "").trim().toLowerCase();

    return (
      recordBranch === normalizedBranch &&
      status !== "inactivo" &&
      (position === "director de sucursal" ||
        position === "director administrativo de sucursal" ||
        position === "gerente de sucursal")
    );
  });

  const prioritizedRecord =
    matchingStaff.find((record) => String(record.puesto || "").trim().toLowerCase() === "director de sucursal") ||
    matchingStaff.find((record) => String(record.puesto || "").trim().toLowerCase() === "director administrativo de sucursal") ||
    matchingStaff.find((record) => String(record.puesto || "").trim().toLowerCase() === "gerente de sucursal");

  return prioritizedRecord?.nombre || "";
}

function syncBalanceExpenseResponsible({ force = false } = {}) {
  if (!balanceExpenseResponsibleField || !balanceExpenseBranchField) {
    return;
  }

  const suggestedResponsible = getBalanceResponsibleSuggestion(balanceExpenseBranchField.value);
  const previousSuggested = balanceExpenseResponsibleField.dataset.autoFilledValue || "";
  const currentValue = balanceExpenseResponsibleField.value.trim();
  const shouldReplace = force || !currentValue || currentValue === previousSuggested;

  if (shouldReplace) {
    balanceExpenseResponsibleField.value = suggestedResponsible;
  }

  balanceExpenseResponsibleField.dataset.autoFilledValue = suggestedResponsible;
}

function getBalanceIncomeRows() {
  const studentsById = new Map(students.map((student) => [student.id, student]));

  return paymentRecords
    .map((record) => {
      const student = studentsById.get(record.studentId);
      if (!student) {
        return null;
      }

      const fecha = getBalancePaymentDate(record);
      const monto = parsePaymentAmount(record.cantidadPagada);
      if (!monto) {
        return null;
      }

      return {
        id: record.id,
        studentId: record.studentId,
        fecha,
        alumna: student.nombre || "-",
        concepto: getBalanceIncomeConcept(record),
        monto,
        sucursal: student.sucursal || "",
        metodoPago: record.metodoPago || "-",
      };
    })
    .filter(Boolean)
    .filter((record) => matchesCurrentBranch(record.sucursal))
    .filter((record) => !balanceBranchFilter.value || record.sucursal === balanceBranchFilter.value)
    .filter((record) => matchesBalanceDate(record.fecha))
    .sort((a, b) => {
      const dateComparison = String(b.fecha || "").localeCompare(String(a.fecha || ""));
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return String(b.id || "").localeCompare(String(a.id || ""));
    });
}

function getFilteredBalanceExpenses() {
  return balanceExpenses
    .filter((record) => matchesCurrentBranch(record.sucursal))
    .filter((record) => !balanceBranchFilter.value || record.sucursal === balanceBranchFilter.value)
    .filter((record) => matchesBalanceDate(record.fecha))
    .sort((a, b) => {
      const dateComparison = String(b.fecha || "").localeCompare(String(a.fecha || ""));
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });
}

function syncBalanceExpenseTotal() {
  const quantity = Number(document.getElementById("balanceExpenseQuantity").value || 0);
  const unitCost = Number(document.getElementById("balanceExpenseUnitCost").value || 0);
  const total = quantity > 0 && unitCost > 0 ? quantity * unitCost : 0;
  balanceExpenseTotalField.value = total ? String(total.toFixed(2)) : "";
}

function resetBalanceExpenseForm() {
  balanceExpenseForm.reset();
  document.getElementById("balanceExpenseId").value = "";
  balanceExpenseDateField.value = formatDateForInput(new Date());
  balanceExpenseTotalField.value = "";
  if (getAllowedBranch()) {
    balanceExpenseBranchField.value = getAllowedBranch();
  }
  balanceExpenseSubmitButton.textContent = "Guardar egreso";
  syncBalanceExpenseTotal();
  syncBalanceExpenseResponsible({ force: true });
}

function getBalanceExpenseFormData() {
  const formData = new FormData(balanceExpenseForm);
  const existingId = String(formData.get("id") || "").trim();
  const existingRecord = balanceExpenses.find((record) => record.id === existingId);
  const cantidad = Number(formData.get("cantidad") || 0);
  const costoUnitario = Number(formData.get("costoUnitario") || 0);
  const total = Number((cantidad * costoUnitario).toFixed(2));
  const allowedBranch = getAllowedBranch();

  return {
    id: existingId || crypto.randomUUID(),
    fecha: String(formData.get("fecha") || "").trim(),
    sucursal: allowedBranch || String(formData.get("sucursal") || "").trim(),
    nombreGasto: String(formData.get("nombreGasto") || "").trim(),
    cantidad,
    costoUnitario,
    total,
    nota: String(formData.get("nota") || "").trim(),
    responsableGasto: String(formData.get("responsableGasto") || "").trim(),
    createdAt: existingRecord?.createdAt || new Date().toISOString(),
  };
}

function getBalanceExpenseValidationErrors(record) {
  const errors = [];
  if (!record.fecha) errors.push("Fecha");
  if (!record.sucursal) errors.push("Sucursal");
  if (!record.nombreGasto) errors.push("Nombre del gasto");
  if (!(record.cantidad > 0)) errors.push("Cantidad");
  if (!(record.costoUnitario > 0)) errors.push("Costo unitario");
  if (!(record.total > 0)) errors.push("Total");
  if (!record.responsableGasto) errors.push("Responsable del gasto");
  return errors;
}

function saveBalanceExpensesCollection() {
  dataService.entities.balanceExpenses.setAll(balanceExpenses);
}

function renderBalanceIncomeTable() {
  const rows = getBalanceIncomeRows();
  balanceIncomeTableBody.innerHTML = rows
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.fecha || "-")}</td>
          <td>${escapeHtml(record.concepto)}</td>
          <td>${formatCurrency(record.monto)}</td>
          <td>${escapeHtml(record.metodoPago || "-")}</td>
        </tr>
      `
    )
    .join("");
  balanceIncomeEmptyState.hidden = rows.length > 0;
  return rows;
}

function renderBalanceExpensesTable() {
  const rows = getFilteredBalanceExpenses();
  balanceExpenseTableBody.innerHTML = rows
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.fecha || "-")}</td>
          <td>${escapeHtml(record.nombreGasto || "-")}</td>
          <td>${escapeHtml(String(record.cantidad || "-"))}</td>
          <td>${formatCurrency(record.costoUnitario || 0)}</td>
          <td>${formatCurrency(record.total || 0)}</td>
          <td>${escapeHtml(record.responsableGasto || "-")}</td>
          <td>${escapeHtml(record.nota || "-")}</td>
          <td>${escapeHtml(record.sucursal || "-")}</td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-balance-expense" data-id="${record.id}">Editar</button>
              <button class="table-action action-delete" type="button" data-action="delete-balance-expense" data-id="${record.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
  balanceExpenseEmptyState.hidden = rows.length > 0;
  return rows;
}

function updateBalanceSummary() {
  const incomes = getBalanceIncomeRows();
  const expenses = getFilteredBalanceExpenses();
  const incomeTotal = incomes.reduce((sum, record) => sum + Number(record.monto || 0), 0);
  const expenseTotal = expenses.reduce((sum, record) => sum + Number(record.total || 0), 0);
  const cashTotal = incomeTotal - expenseTotal;

  [balanceIncomeTotal, balanceSummaryIncome].filter(Boolean).forEach((element) => {
    element.textContent = formatCurrency(incomeTotal);
  });
  [balanceExpenseTotal, balanceSummaryExpense].filter(Boolean).forEach((element) => {
    element.textContent = formatCurrency(expenseTotal);
  });
  [balanceCashTotal, balanceSummaryCash].filter(Boolean).forEach((element) => {
    element.textContent = formatCurrency(cashTotal);
  });
}

function renderBalanceModule() {
  renderBalanceIncomeTable();
  renderBalanceExpensesTable();
  updateBalanceSummary();
}

function editBalanceExpense(id) {
  const record = balanceExpenses.find((item) => item.id === id);
  if (!record) {
    return;
  }

  document.getElementById("balanceExpenseId").value = record.id;
  balanceExpenseDateField.value = record.fecha || "";
  balanceExpenseBranchField.value = record.sucursal || "";
  document.getElementById("balanceExpenseName").value = record.nombreGasto || "";
  document.getElementById("balanceExpenseQuantity").value = String(record.cantidad || "");
  document.getElementById("balanceExpenseUnitCost").value = String(record.costoUnitario || "");
  balanceExpenseResponsibleField.value = record.responsableGasto || "";
  document.getElementById("balanceExpenseNote").value = record.nota || "";
  balanceExpenseTotalField.value = record.total ? String(Number(record.total).toFixed(2)) : "";
  balanceExpenseResponsibleField.dataset.autoFilledValue = getBalanceResponsibleSuggestion(record.sucursal || "");
  balanceExpenseSubmitButton.textContent = "Actualizar egreso";
  setActiveModule("balance");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteBalanceExpense(id) {
  balanceExpenses = balanceExpenses.filter((record) => record.id !== id);
  saveBalanceExpensesCollection();
  renderBalanceModule();
  if (document.getElementById("balanceExpenseId").value === id) {
    resetBalanceExpenseForm();
  }
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

function getStudentFileBadgeClass(tone) {
  return {
    gold: "student-file-badge-gold",
    green: "student-file-badge-green",
    blue: "student-file-badge-blue",
    red: "student-file-badge-red",
    purple: "student-file-badge-purple",
    greige: "student-file-badge-greige",
  }[tone] || "student-file-badge-greige";
}

function renderStudentFileBadge(value, tone = "greige") {
  return `<span class="student-file-badge ${getStudentFileBadgeClass(tone)}">${escapeHtml(value || "-")}</span>`;
}

function renderStudentFileInfoList(container, items) {
  container.innerHTML = items
    .map((item) => {
      const valueMarkup = item.badge
        ? renderStudentFileBadge(item.value, item.tone)
        : `<span>${escapeHtml(item.value || "-")}</span>`;
      return `
        <div class="info-item ${item.highlight ? "info-item-highlight" : ""}">
          <strong>${escapeHtml(item.label)}</strong>
          ${valueMarkup}
        </div>
      `;
    })
    .join("");
}

function getPaymentTone(value) {
  if (value === "Pagado") return "green";
  if (value === "Parcial") return "gold";
  if (value === "Pendiente") return "red";
  if (value === "No aplica") return "greige";
  return "greige";
}

function getStudentWhatsAppUrl(student) {
  return getWhatsAppUrlByPhone(normalizePhone(student?.telefono));
}

async function copyStudentFileValue(value, button) {
  if (!value || value === "-") {
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
    if (button) {
      const originalLabel = button.textContent;
      button.textContent = "Copiado";
      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1400);
    }
  } catch (error) {
    console.error("No se pudo copiar al portapapeles", error);
  }
}

function closeStudentFile() {
  activeStudentFileId = "";
  studentFileOverlay.hidden = true;
}

function getLatestAttendanceMetadataRecord(studentId) {
  return attendanceRecords
    .filter((record) => record.studentId === studentId && record.observaciones)
    .sort((a, b) => String(b.fecha || "").localeCompare(String(a.fecha || "")))[0] || null;
}

function renderStudentFile(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    closeStudentFile();
    return;
  }

  const payment = getLatestPaymentRecordForStudent(studentId);
  const attendanceHistory = attendanceRecords
    .filter((record) => record.studentId === studentId)
    .sort((a, b) => String(b.fecha || "").localeCompare(String(a.fecha || "")));
  const attendanceMetaRecord = getLatestAttendanceMetadataRecord(studentId);
  const faltas = attendanceHistory.filter((record) => record.estado === "Falta").length;
  const permisos = attendanceHistory.filter((record) => record.estado === "Permiso").length;
  const recuperaciones = attendanceHistory.filter((record) => record.estado === "Recuperación").length;
  const asistencias = attendanceHistory.filter((record) => record.estado === "Asistencia").length;
  const whatsappUrl = getStudentWhatsAppUrl(student);
  const paymentHighlights = [
    payment.certificadoP1,
    payment.certificadoP2,
    payment.mensualidad1,
    payment.mensualidad2,
    payment.mensualidad3,
    payment.mensualidad4,
    courseUsesFifthMonth(student.curso) ? payment.mensualidad5 : "No aplica",
  ];
  const hasPendingPayments = paymentHighlights.some((value) => value === "Pendiente" || value === "Parcial");

  studentFileTitle.textContent = student.nombre || "Ficha de alumna";
  studentFileSummary.innerHTML = `
    <div class="student-file-summary-card student-file-summary-card-primary">
      <span>Alumna</span>
      <strong>${escapeHtml(student.nombre || "-")}</strong>
      <small>${escapeHtml(student.studentCode || "-")}</small>
    </div>
    <div class="student-file-summary-card">
      <span>ID Alumna</span>
      <strong>${escapeHtml(student.studentCode || "-")}</strong>
    </div>
    <div class="student-file-summary-card">
      <span>Curso</span>
      <strong>${escapeHtml(student.curso || "-")}</strong>
    </div>
    <div class="student-file-summary-card">
      <span>Sucursal</span>
      <strong>${escapeHtml(student.sucursal || "-")}</strong>
    </div>
    <div class="student-file-summary-card">
      <span>Horario</span>
      <strong>${escapeHtml(student.horario || "-")}</strong>
    </div>
    <div class="student-file-summary-card">
      <span>Tipo de acceso</span>
      <strong>${escapeHtml(student.accesoElegido || "-")}</strong>
    </div>
  `;
  studentFileQuickActions.innerHTML = `
    <button class="secondary-btn student-file-action" type="button" data-student-file-action="copy-user" ${student.portalUser ? "" : "disabled"}>
      Copiar usuario Mi Venezia
    </button>
    <button class="secondary-btn student-file-action" type="button" data-student-file-action="copy-password" ${student.portalPassword ? "" : "disabled"}>
      Copiar contraseña
    </button>
    <a class="secondary-btn student-file-action" href="${whatsappUrl || "#"}" target="_blank" rel="noopener noreferrer" ${whatsappUrl ? "" : 'aria-disabled="true" tabindex="-1"'}>
      Abrir WhatsApp
    </a>
  `;

  renderStudentFileInfoList(studentFileGeneral, [
    { label: "Fecha de inscripción", value: student.fechaInscripcion || "-" },
    { label: "Nombre completo", value: student.nombre || "-", highlight: true },
    { label: "Teléfono/Whatsapp", value: student.telefono || "-" },
    { label: "Correo electrónico", value: student.correo || "-" },
    { label: "Dirección del alumno o tutor", value: student.direccion || "-" },
    { label: "Fecha de nacimiento", value: student.fechaNacimiento || "-" },
    { label: "Tutor", value: student.tutor || "-" },
    { label: "Escolaridad", value: student.escolaridad || "-" },
    { label: "Contacto de emergencia", value: student.contactoEmergencia || "-" },
  ]);

  renderStudentFileInfoList(studentFileAcademic, [
    { label: "Sucursal", value: student.sucursal || "-", badge: true, tone: "blue" },
    { label: "Curso inscrito", value: student.curso || "-", badge: true, tone: "purple" },
    { label: "Tipo de acceso", value: student.accesoElegido || "-", badge: true, tone: "gold" },
    { label: "Fecha de inicio", value: student.fechaInicio || "-" },
    { label: "Horario elegido", value: student.horario || "-" },
    { label: "Asesor que inscribió", value: student.asesoraInscribio || student.usuarioAlta || "-" },
  ]);

  renderStudentFileInfoList(studentFileAdministrative, [
    { label: "¿Recibe apoyo gobierno?", value: student.apoyoGobierno || "-", badge: true, tone: student.apoyoGobierno === "Sí" ? "gold" : "greige" },
    { label: "¿Tiene hijos?", value: student.tieneHijos || "-", badge: true, tone: student.tieneHijos === "Sí" ? "purple" : "greige" },
    { label: "¿Trabaja actualmente?", value: student.trabajaActualmente || "-", badge: true, tone: student.trabajaActualmente === "Sí" ? "blue" : "greige" },
    { label: "Documentación", value: student.documentos || "-", badge: true, tone: student.documentos === "Completa" ? "green" : student.documentos === "Parcial" ? "gold" : "red" },
    { label: "Notas médicas / alergias", value: student.notasMedicas || "-" },
  ]);

  renderStudentFileInfoList(studentFilePortal, [
    { label: "Usuario Mi Venezia", value: student.portalUser || "-", highlight: true },
    { label: "Contraseña Mi Venezia", value: student.portalPassword || "-", highlight: true },
  ]);

  renderStudentFileInfoList(studentFilePayments, [
    { label: "Mensualidad asignada", value: payment.mensualidadPactada || student.mensualidad || "-", highlight: true },
    { label: "Certificado P1", value: payment.certificadoP1 || "-", badge: true, tone: getPaymentTone(payment.certificadoP1) },
    { label: "Certificado P2", value: payment.certificadoP2 || "-", badge: true, tone: getPaymentTone(payment.certificadoP2) },
    { label: "1ra M", value: payment.mensualidad1 || "-", badge: true, tone: getPaymentTone(payment.mensualidad1) },
    { label: "2da M", value: payment.mensualidad2 || "-", badge: true, tone: getPaymentTone(payment.mensualidad2) },
    { label: "3ra M", value: payment.mensualidad3 || "-", badge: true, tone: getPaymentTone(payment.mensualidad3) },
    { label: "4ta M", value: payment.mensualidad4 || "-", badge: true, tone: getPaymentTone(payment.mensualidad4) },
    { label: "5ta M", value: courseUsesFifthMonth(student.curso) ? payment.mensualidad5 || "-" : "No aplica", badge: true, tone: getPaymentTone(courseUsesFifthMonth(student.curso) ? payment.mensualidad5 : "No aplica") },
    { label: "Método de pago", value: payment.metodoPago || "-", badge: true, tone: "blue" },
    { label: "Cantidad pagada", value: payment.cantidadPagada || "-" },
    { label: "Estado financiero", value: hasPendingPayments ? "Con pendientes" : "Al corriente", badge: true, tone: hasPendingPayments ? "red" : "green" },
    { label: "Reportes", value: payment.reportes || "-" },
    { label: "Observaciones de pago", value: payment.observaciones || "-" },
  ]);

  renderStudentFileInfoList(studentFileAttendanceSummary, [
    { label: "Asistencias", value: String(asistencias), badge: true, tone: "green" },
    { label: "Permisos", value: String(permisos), badge: true, tone: "gold" },
    { label: "Recuperaciones", value: String(recuperaciones), badge: true, tone: "blue" },
    { label: "Faltas", value: String(faltas), badge: true, tone: "red" },
    { label: "Reglamento firmado", value: getAttendanceNotesValue(attendanceMetaRecord, "Reglamento firmado") || "-", badge: true, tone: getAttendanceNotesValue(attendanceMetaRecord, "Reglamento firmado") === "Sí" ? "green" : "greige" },
    { label: "Reportes", value: getAttendanceNotesValue(attendanceMetaRecord, "Reportes") || "-" },
  ]);

  studentFileAttendanceBody.innerHTML = attendanceHistory
    .slice(0, 12)
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.fecha || "-")}</td>
          <td>${escapeHtml(record.estado || "-")}</td>
          <td>${escapeHtml(getAttendanceNotesValue(record, "Observaciones") || record.observaciones || "-")}</td>
        </tr>
      `
    )
    .join("");
  studentFileAttendanceEmptyState.hidden = attendanceHistory.length > 0;

  studentFileNotes.innerHTML = `
    <article class="student-file-note-card">
      <span>Observaciones generales</span>
      <p>${escapeHtml(student.observaciones || "-")}</p>
    </article>
    <article class="student-file-note-card">
      <span>Observaciones de pago</span>
      <p>${escapeHtml(payment.observaciones || "-")}</p>
    </article>
    <article class="student-file-note-card">
      <span>Observaciones de asistencia</span>
      <p>${escapeHtml(getAttendanceNotesValue(attendanceMetaRecord, "Observaciones") || "-")}</p>
    </article>
  `;

  activeStudentFileId = studentId;
  studentFileOverlay.hidden = false;
}

function openStudentFile(studentId) {
  renderStudentFile(studentId);
}

function getStudentPortalLoginMatch(identifier, password) {
  const normalizedIdentifier = String(identifier || "").trim().toLowerCase();
  const normalizedPassword = String(password || "");
  if (!normalizedIdentifier || !normalizedPassword) {
    return null;
  }

  return students.find((student) => {
    const portalUser = String(student.portalUser || "").trim().toLowerCase();
    return portalUser === normalizedIdentifier && String(student.portalPassword || "") === normalizedPassword;
  }) || null;
}

function getStudentPaymentEntries(student) {
  return paymentRecords
    .filter((record) => record.studentId === student.id)
    .map((record) => {
      const statuses = [
        record.certificadoP1,
        record.certificadoP2,
        record.mensualidad1,
        record.mensualidad2,
        record.mensualidad3,
        record.mensualidad4,
        record.mensualidad5,
      ].filter((value) => value && value !== "No aplica");
      const hasPending = statuses.some((value) => value === "Pendiente" || value === "Parcial");
      return {
        id: record.id,
        fecha: getBalancePaymentDate(record) || "-",
        concepto: record.mesPago ? `Pago ${record.mesPago}` : "Pago registrado",
        monto: parsePaymentAmount(record.cantidadPagada),
        estatus: hasPending ? "Con pendientes" : statuses.length > 0 ? "Al corriente" : "Sin detalle",
        metodoPago: record.metodoPago || "-",
      };
    })
    .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));
}

function countStudentRegisteredPayments(student) {
  const payment = getPaymentRecord(student.id);
  return [
    payment.certificadoP1,
    payment.certificadoP2,
    payment.mensualidad1,
    payment.mensualidad2,
    payment.mensualidad3,
    payment.mensualidad4,
    payment.mensualidad5,
  ].filter((value) => value === "Pagado" || value === "Parcial").length;
}

function getStudentPortalWhatsappUrl(student) {
  const branchLabel = student.sucursal ? ` de ${student.sucursal}` : "";
  const message = encodeURIComponent(
    `Hola, soy ${student.nombre || "alumna"} y necesito apoyo con mi cuenta de Mi Venezia${branchLabel}.`
  );
  return `https://wa.me/${WEB_DEFAULT_WHATSAPP_NUMBER}?text=${message}`;
}

function getStudentDirectorWhatsappUrl(student) {
  const studentName = String(student?.nombre || "la alumna").trim();
  const message = encodeURIComponent(
    `Hola directora, soy ${studentName} y tengo una duda sobre mi información en Mi Venezia.`
  );
  return `https://wa.me/522461379504?text=${message}`;
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
  const paymentEntries = getStudentPaymentEntries(student);
  const attendanceHistory = attendanceRecords
    .filter((record) => record.studentId === student.id)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  const faltas = attendanceHistory.filter((record) => record.estado === "Falta").length;
  const permisos = attendanceHistory.filter((record) => record.estado === "Permiso").length;
  const asistencias = attendanceHistory.filter((record) => record.estado === "Asistencia").length;
  const totalClasesPlaneadas = getAttendanceSessionCountForCourse(student.curso);
  const totalClasesRegistradas = attendanceHistory.length;
  const clasesPendientes = Math.max(totalClasesPlaneadas - totalClasesRegistradas, 0);
  const registeredPayments = countStudentRegisteredPayments(student);
  const hasPendingPayments = [
    payment.certificadoP1,
    payment.certificadoP2,
    payment.mensualidad1,
    payment.mensualidad2,
    payment.mensualidad3,
    payment.mensualidad4,
    payment.mensualidad5,
  ].some((value) => value === "Pendiente" || value === "Parcial");

  miVeneziaHeroName.textContent = student.nombre || "Mi Venezia";
  miVeneziaHeroMeta.textContent = `${student.studentCode || "-"} · ${student.sucursal || "-"} · ${student.curso || "-"} · ${student.horario || "-"}`;
  renderInfoList(miVeneziaHeroSummary, [
    { label: "ID Alumna", value: student.studentCode || "-" },
    { label: "Sucursal", value: student.sucursal || "-" },
    { label: "Curso", value: student.curso || "-" },
    { label: "Horario", value: student.horario || "-" },
    { label: "Fecha de alta", value: student.fechaInscripcion || student.createdAt?.slice(0, 10) || "-" },
    { label: "Acceso", value: student.accesoElegido || "-" },
  ]);

  miVeneziaStatCourse.textContent = student.curso || "-";
  miVeneziaStatAttendance.textContent = `${asistencias} de ${totalClasesPlaneadas}`;
  miVeneziaStatPayments.textContent = `${registeredPayments} registrados`;
  miVeneziaStatStatus.textContent = student.estado || "Activa";
  miVeneziaContactButton.href = getStudentDirectorWhatsappUrl(student);

  renderInfoList(miVeneziaPerfil, [
    { label: "Nombre completo", value: student.nombre || "-" },
    { label: "Celular", value: student.telefono || "-" },
    { label: "Sucursal", value: student.sucursal || "-" },
    { label: "Curso", value: student.curso || "-" },
    { label: "Horario", value: student.horario || "-" },
    { label: "ID alumna", value: student.studentCode || "-" },
    { label: "Usuario Mi Venezia", value: student.portalUser || "-" },
  ]);

  renderInfoList(miVeneziaPagos, [
    { label: "Mens. asignada", value: payment.mensualidadPactada || student.mensualidad || "-" },
    { label: "Pagos reg.", value: String(paymentEntries.length) },
    { label: "Estatus", value: hasPendingPayments ? "Con pendientes" : paymentEntries.length ? "Al corriente" : "Sin registros" },
  ]);

  renderInfoList(
    miVeneziaPaymentSchedule,
    getStudentPaymentScheduleEntries(student).length > 0
      ? getStudentPaymentScheduleEntries(student)
      : [{ label: "Calendario", value: "Sin calendario definido para este curso." }]
  );

  renderInfoList(miVeneziaResumenAsistencias, [
    { label: "Total de clases", value: String(totalClasesPlaneadas) },
    { label: "Asistencias registradas", value: String(asistencias) },
    { label: "Faltas", value: String(faltas) },
    { label: "Permisos", value: String(permisos) },
  ]);

  miVeneziaAsistenciasBody.innerHTML = attendanceHistory
    .map(
      (record, index) => `
        <tr>
          <td>S${index + 1}</td>
          <td>${escapeHtml(ATTENDANCE_STATUS_LABELS[record.estado] || record.estado || "-")}</td>
          <td>${escapeHtml(record.fecha || "-")}</td>
        </tr>
      `
    )
    .join("");
  miVeneziaAsistenciasEmptyState.hidden = attendanceHistory.length > 0;

  miVeneziaPagosBody.innerHTML = paymentEntries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.fecha || "-")}</td>
          <td>${escapeHtml(entry.concepto || "-")}</td>
          <td>${formatCurrency(entry.monto || 0)}</td>
          <td>${escapeHtml(entry.estatus || "-")}</td>
        </tr>
      `
    )
    .join("");
  miVeneziaPagosEmptyState.hidden = paymentEntries.length > 0;

  renderInfoList(miVeneziaAvance, [
    { label: "Fecha de alta", value: student.fechaInscripcion || student.createdAt?.slice(0, 10) || "-" },
    { label: "Fecha de inicio", value: student.fechaInicio || "-" },
    { label: "Acceso", value: student.accesoElegido || "-" },
    { label: "Estatus académico", value: student.estado || "Activa" },
    { label: "Clases registradas", value: String(totalClasesRegistradas) },
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
  document.getElementById("origen").value = normalizeLeadOrigin(prospect.origen);
  document.getElementById("medio").value = normalizeLeadChannel(prospect.medio, prospect.origen);
  document.getElementById("informacion").value = prospect.informacion;
  document.getElementById("estado").value = normalizeProspectState(prospect.estado, { preserveOperationalState: false });
  document.getElementById("proximoSeguimiento").value = prospect.proximoSeguimiento || "";
  document.getElementById("asesoraAsignada").value = prospect.asesoraAsignada || "";
  document.getElementById("temperatura").value = normalizeTemperatureValue(prospect.temperatura);
  document.getElementById("notas").value = prospect.notas;
  document.getElementById("accesoInteres").value = prospect.accesoInteres || "";
  syncProspectFollowupField();
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

  const url = getProspectWhatsAppUrl(prospect);
  if (!url) {
    return;
  }

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

  document.getElementById("altaStudentId").value = "";
  document.getElementById("altaProspectId").value = prospect.id;
  document.getElementById("altaNombre").value = prospect.nombre;
  document.getElementById("altaTelefono").value = prospect.telefono;
  document.getElementById("altaSucursal").value = prospect.sucursal;
  document.getElementById("altaCurso").value = prospect.curso;
  document.getElementById("altaAccesoElegido").value = prospect.accesoInteres || "";
  document.getElementById("altaDiaClases").value = "";
  document.getElementById("altaAsesoraInscribio").value = normalizeAdvisorName(prospect.asesoraAsignada);
  altaForm.querySelector('button[type="submit"]').textContent = "Confirmar alta";
  syncAltaAutoFields();
  clearAltaValidation();
  closeAltaConfirmation();
  renderAltaSummary(
    getAltaSummaryData({
      studentCode: document.getElementById("altaStudentCode").value,
      fechaInscripcion: document.getElementById("altaFechaInscripcion").value,
      nombre: prospect.nombre,
      curso: prospect.curso,
      sucursal: prospect.sucursal,
      accesoElegido: prospect.accesoInteres || "",
      horario: document.getElementById("altaHorario").value,
      fechaInicio: document.getElementById("altaFechaInicio").value,
      metodoPago: document.getElementById("altaMetodoPago").value,
      cantidadPago: document.getElementById("altaCantidadPago").value,
      portalUser: document.getElementById("altaPortalUser").value,
      portalPassword: document.getElementById("altaPassword").value,
    })
  );
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
    balance: "Balance",
    finanzas: "Finanzas",
    "usuarios-accesos": "Usuarios y accesos",
    personal: "Personal",
    "mi-venezia": "Mi Venezia",
    "web-venezia": "Web Venezia",
  };

  moduleBadge.textContent = badgeMap[allowedModule] || "Venezia One";
  document.body.classList.toggle(
    "student-portal-active",
    currentAccessMode === "student" && allowedModule === "mi-venezia"
  );
}

function renderAll() {
  applyBranchRestrictionsToUI();
  populateStaffLinkedUsers();
  renderDashboard();
  renderTable();
  renderPendingAltas();
  renderAltaHistory();
  populateAttendanceFilters();
  if (getAllowedBranch()) {
    attendanceSucursalFilter.value = getAllowedBranch();
  }
  renderAttendanceTable();
  updateAttendanceSummary();
  renderPaymentsTable();
  updatePaymentsSummary();
  renderBalanceModule();
  renderFinanceTable();
  updateFinanceSummary();
  renderInternalUsersTable();
  renderStaffTable();
  syncStudentAccessRecords();
  if (activeStudentFileId) {
    renderStudentFile(activeStudentFileId);
  }
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

async function finalizeAltaSubmission(altaData) {
  const isEditingExistingStudent = Boolean(document.getElementById("altaStudentId").value);
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
  alert(isEditingExistingStudent ? "Alta actualizada correctamente." : "Alta guardada correctamente.");
}

altaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const altaData = getAltaFormData();
  const validationErrors = getAltaValidationErrors(altaData);

  renderAltaSummary(getAltaSummaryData(altaData));

  if (validationErrors.length > 0) {
    showAltaValidation(`Completa los campos obligatorios antes de continuar: ${validationErrors.join(", ")}.`);
    closeAltaConfirmation();
    return;
  }

  clearAltaValidation();
  openAltaConfirmation(altaData);
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

  console.debug("[Permisos] Login encontrado", {
    id: user.id,
    username: user.username,
    role: user.role,
    permissionsBeforeSession: user.permissions || [],
  });

  currentInternalUserId = user.id;
  currentAccessMode = "internal";
  publicAccessPanelOpen = false;
  dataService.sessions.setInternal(user.id);
  updateSessionUI();
  renderAll();
  console.debug("[Permisos] Login aplicado", {
    id: user.id,
    username: user.username,
    permissionsAfterSession: getCurrentInternalUser()?.permissions || [],
  });
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
  const internalAccessResult = await syncStaffInternalAccess(staffData);
  staffData.linkedUserId = internalAccessResult.record.id;
  const saveResult = await saveStaffRecord(staffData);
  if (!saveResult.synced) {
    renderStaffTable();
    alert("No se pudo guardar el personal en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  if (!internalAccessResult.synced) {
    renderAll();
    resetStaffForm();
    alert("El personal se guardó, pero la cuenta interna sólo quedó en el respaldo local.");
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
  const login = String(formData.get("telefono") || "").trim();
  const password = String(formData.get("password") || "");
  const student = getStudentPortalLoginMatch(login, password);

  if (!student) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  currentPortalStudentId = student.id;
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

balanceExpenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expenseData = getBalanceExpenseFormData();
  const validationErrors = getBalanceExpenseValidationErrors(expenseData);

  if (validationErrors.length > 0) {
    alert(`Completa los campos obligatorios del egreso: ${validationErrors.join(", ")}.`);
    return;
  }

  const existingIndex = balanceExpenses.findIndex((record) => record.id === expenseData.id);
  if (existingIndex >= 0) {
    balanceExpenses[existingIndex] = expenseData;
  } else {
    balanceExpenses.unshift(expenseData);
  }

  saveBalanceExpensesCollection();
  renderBalanceModule();
  resetBalanceExpenseForm();
});

clearButton.addEventListener("click", resetForm);
internalUserClearButton.addEventListener("click", resetInternalUserForm);
staffClearButton.addEventListener("click", resetStaffForm);
clearAltaButton.addEventListener("click", resetAltaForm);
financeClearButton.addEventListener("click", resetFinanceForm);
balanceExpenseClearButton.addEventListener("click", resetBalanceExpenseForm);
miVeneziaLogoutButton.addEventListener("click", logoutMiVenezia);
internalLogoutButton.addEventListener("click", logoutInternalSession);
internalLoginForm.addEventListener("input", () => {
  internalLoginError.hidden = true;
});

altaConfirmCancelButton.addEventListener("click", closeAltaConfirmation);
altaConfirmProceedButton.addEventListener("click", async () => {
  if (!pendingAltaConfirmation) {
    return;
  }

  altaConfirmProceedButton.disabled = true;
  try {
    await finalizeAltaSubmission(pendingAltaConfirmation);
  } finally {
    altaConfirmProceedButton.disabled = false;
  }
});

altaForm.addEventListener("input", () => {
  syncAltaAutoFields();
  clearAltaValidation();
  closeAltaConfirmation();
  renderAltaSummary(getAltaSummaryData(getAltaFormData()));
});

["balanceExpenseQuantity", "balanceExpenseUnitCost"].forEach((id) => {
  document.getElementById(id).addEventListener("input", syncBalanceExpenseTotal);
});

["staffNombre", "staffTelefono", "staffSucursal", "staffFechaNacimiento"].forEach((id) => {
  document.getElementById(id).addEventListener("input", syncStaffAccessFields);
  document.getElementById(id).addEventListener("change", syncStaffAccessFields);
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

crmBranchFilter.addEventListener("change", (event) => {
  activeBranchFilter = event.target.value;
  renderTable();
});

crmTemperatureFilter.addEventListener("change", (event) => {
  activeTemperatureFilter = event.target.value;
  renderTable();
});

crmStateFilter.addEventListener("change", (event) => {
  activeStateFilter = event.target.value;
  renderTable();
});

crmFollowupFilter.addEventListener("change", (event) => {
  activeFollowupFilter = event.target.value;
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

document.getElementById("estado").addEventListener("change", syncProspectFollowupField);

monthFilter.addEventListener("change", (event) => {
  selectedMonth = event.target.value || getCurrentMonthValue();
  renderDashboard();
  renderTable();
  updateAttendanceSummary();
});

altasMonthFilter.addEventListener("change", (event) => {
  selectedAltasMonth = event.target.value || getCurrentMonthValue();
  renderAltaHistory();
});

dashboardBranchFilter.addEventListener("change", renderDashboard);

attendanceDate.addEventListener("change", renderAttendanceTable);
attendanceSearchInput.addEventListener("input", (event) => {
  activeAttendanceSearch = event.target.value;
  renderAttendanceTable();
});

financeTipo.addEventListener("change", updateFinanceCategories);
financeMonthFilter.addEventListener("change", () => {
  renderFinanceTable();
  updateFinanceSummary();
});

paymentsMonthFilter.addEventListener("change", (event) => {
  selectedPaymentsMonth = event.target.value || getCurrentMonthValue();
  renderPaymentsTable();
  updatePaymentsSummary();
});

paymentsSearchInput.addEventListener("input", (event) => {
  activePaymentsSearch = event.target.value;
  renderPaymentsTable();
});

balanceBranchFilter.addEventListener("change", renderBalanceModule);
balanceDateFilter.addEventListener("change", renderBalanceModule);
balanceExpenseBranchField.addEventListener("change", () => {
  syncBalanceExpenseResponsible();
});

financeBranchFilter.addEventListener("change", () => {
  renderFinanceTable();
  updateFinanceSummary();
});

[attendanceSucursalFilter, attendanceCursoFilter, attendanceHorarioFilter, attendanceDayFilter].forEach((filter) => {
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

altaHistoryTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) {
    return;
  }
  if (actionButton.dataset.action === "view-student-file") {
    openStudentFile(actionButton.dataset.id);
  }
  if (actionButton.dataset.action === "edit-student") {
    loadStudentIntoAlta(actionButton.dataset.id);
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
  if (action === "edit-student") loadStudentIntoAlta(id);
  if (action === "view-student-file") openStudentFile(id);
  if (action === "view-history") renderAttendanceHistory(id);
});

paymentsTableBody.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  if (actionButton.dataset.action === "save-payment") {
    console.log("PAGO GUARDAR CLICKED", {
      studentId: actionButton.dataset.id,
    });
    await savePaymentForStudent(actionButton.dataset.id);
  }

  if (actionButton.dataset.action === "edit-student") {
    loadStudentIntoAlta(actionButton.dataset.id);
  }

  if (actionButton.dataset.action === "view-student-file") {
    openStudentFile(actionButton.dataset.id);
  }
});

studentFileCloseButton.addEventListener("click", closeStudentFile);
studentFileOverlay.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-student-file-action]");
  if (actionButton) {
    if (actionButton.dataset.studentFileAction === "copy-user") {
      copyStudentFileValue(getStudentById(activeStudentFileId)?.portalUser || "", actionButton);
    }
    if (actionButton.dataset.studentFileAction === "copy-password") {
      copyStudentFileValue(getStudentById(activeStudentFileId)?.portalPassword || "", actionButton);
    }
    return;
  }
  if (event.target === studentFileOverlay) {
    closeStudentFile();
  }
});

financeTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  if (action === "edit-finance") editFinanceRecord(id);
  if (action === "delete-finance") deleteFinanceRecord(id);
});

balanceIncomeTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action='view-student-file']");
  if (actionButton) {
    openStudentFile(actionButton.dataset.id);
  }
});

balanceExpenseTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  if (actionButton.dataset.action === "edit-balance-expense") {
    editBalanceExpense(actionButton.dataset.id);
  }
  if (actionButton.dataset.action === "delete-balance-expense") {
    deleteBalanceExpense(actionButton.dataset.id);
  }
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
      module === "balance" ||
      module === "finanzas" ||
      module === "usuarios-accesos" ||
      module === "personal" ||
      module === "mi-venezia" ||
      module === "web-venezia"
    ) {
      setActiveModule(module);
      return;
    }
  });
});

async function initApp() {
  // Supabase-based modules load here first, with local cache fallback.
  internalUsers = await dataService.entities.internalUsers.getAllPrimary(() => []);
  students = await dataService.entities.students.getAllPrimary(() => []);
  attendanceRecords = await dataService.entities.attendance.getAllPrimary(() => []);
  paymentRecords = await dataService.entities.payments.getAllPrimary(() => []);
  balanceExpenses = dataService.entities.balanceExpenses.getAll(() => []);
  financeRecords = await dataService.entities.financialMovements.getAllPrimary(() => []);
  studentAccessRecords = await dataService.entities.studentPortalAccess.getAllPrimary(() => []);
  staffRecords = await dataService.entities.staff.getAllPrimary(() => []);
  prospects = await dataService.entities.prospects.getAllPrimary(() => []);

  await normalizeLegacyProspects();
  await normalizeInternalUsers();
  resetForm();
  resetInternalUserForm();
  resetStaffForm();
  resetAltaForm();
  resetBalanceExpenseForm();
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
