const PROSPECTS_STORAGE_KEY = "venezia-one-v2-prospectos";
const STUDENTS_STORAGE_KEY = "venezia-one-v2-altas";
const ATTENDANCE_STORAGE_KEY = "venezia-one-v2-asistencias";
const PAYMENTS_STORAGE_KEY = "venezia-one-v2-pagos";
const TEACHERS_STORAGE_KEY = "venezia-one-v2-maestras";
const TEACHER_ATTENDANCE_STORAGE_KEY = "venezia-one-v2-maestras-asistencias";
const TEACHER_PAYMENTS_STORAGE_KEY = "venezia-one-v2-maestras-pagos";
const FINANCE_STORAGE_KEY = "venezia-one-v2-finanzas";
const STUDENT_ACCESS_STORAGE_KEY = "venezia-one-v2-student-access";
const INTERNAL_USERS_STORAGE_KEY = "venezia-one-v2-internal-users";
const STAFF_STORAGE_KEY = "venezia-one-v2-staff";
const WEB_SETTINGS_STORAGE_KEY = "venezia-one-v2-web-settings";
const MI_VENEZIA_SESSION_KEY = "venezia-one-v2-mi-venezia-session";
const INTERNAL_SESSION_KEY = "venezia-one-v2-internal-session";
const INTERNAL_USER_PERMISSIONS_STORAGE_KEY = "venezia-one-v2-internal-user-permissions";
const dataService = window.VeneziaDataService;
const REGLAMENTO_PDF_PATH = "/images/reglamentooficial-venezia.pdf";
const CONTRATO_ALUMNO_PDF_PATH = "/images/CONTRATO-ALUMNO.pdf";

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
const TEACHER_SPECIALTY_OPTIONS = ["Uñas", "Pestañas", "Maquillaje", "Barbería", "COORD de maestras"];
const TEACHER_SHIFT_OPTIONS = ["Matutino", "Vespertino", "Ambos"];
const TEACHER_ATTENDANCE_STATUS_OPTIONS = ["Asistió", "Falta", "Permiso"];
const TEACHER_OPERATIONAL_STATUS_OPTIONS = ["Activo", "Inactivo"];
const TEACHER_PAYMENT_TYPE = "Por turnos trabajados";
const TEACHER_ELIGIBLE_POSITIONS = new Set([
  "miss de uñas",
  "miss de pestañas",
  "miss de maquillaje",
  "miss de barbería",
  "miss de barberia",
  "coordinadora de maestras",
]);
const TEACHER_ELIGIBLE_POSITION_FRAGMENTS = [
  "miss",
  "maestra",
  "docente",
  "instructora",
  "instructor",
  "coordinadora de maestras",
  "coord de maestras",
  "coord maestras",
];
const DEFAULT_ATTENDANCE_SESSION_COUNT = 16;
const DATA_RESET_VERSION = "2026-04-07-clean-reset";
const BALANCE_PAYMENT_CONCEPT_FIELDS = [
  { key: "certificadoP1", label: "Pago C1", movementLabel: "C1" },
  { key: "certificadoP2", label: "Pago C2", movementLabel: "C2" },
  { key: "mensualidad1", label: "Mensualidad 1", movementLabel: "Mensualidad 1" },
  { key: "mensualidad2", label: "Mensualidad 2", movementLabel: "Mensualidad 2" },
  { key: "mensualidad3", label: "Mensualidad 3", movementLabel: "Mensualidad 3" },
  { key: "mensualidad4", label: "Mensualidad 4", movementLabel: "Mensualidad 4" },
  { key: "mensualidad5", label: "Mensualidad 5", movementLabel: "Mensualidad 5" },
];
const PAYMENT_FINANCE_ELIGIBLE_STATUSES = new Set(["Pagado", "Parcial"]);
const PAYMENT_FINANCE_REFERENCE_PREFIX = "student_payments:";
const STUDENT_PAYMENT_REFERENCE_RULES = [
  { field: "mensualidad1", label: "Men1", sessionIndex: 0 },
  { field: "mensualidad2", label: "Men2", sessionIndex: 3 },
  { field: "certificadoP1", label: "C1", sessionIndex: 4 },
  { field: "mensualidad3", label: "Men3", sessionIndex: 7 },
  { field: "certificadoP2", label: "C2", sessionIndex: 8 },
  { field: "mensualidad4", label: "Men4", sessionIndex: 11 },
  { field: "mensualidad5", label: "Men5", sessionIndex: 15, onlyFifthMonth: true },
];
const ATTENDANCE_PRIORITY_PAYMENT_REFERENCE_FIELDS = new Set([
  "mensualidad1",
  "mensualidad2",
  "certificadoP1",
  "certificadoP2",
]);
const ATTENDANCE_STATUS_LABELS = {
  Asistencia: "A",
  Permiso: "P",
  Falta: "F",
};

const BASE_ROLE_PERMISSIONS = {
  "Director General": ["dashboard", "crm-prospectos", "altas", "asistencias", "maestras", "pagos", "balance", "finanzas", "web-venezia", "mi-venezia"],
  Gerente: ["crm-prospectos", "altas"],
  "Director de sucursal": ["altas", "asistencias", "maestras", "pagos", "balance", "finanzas"],
  Asesora: ["crm-prospectos"],
  Maestra: ["asistencias", "maestras"],
  Alumna: ["mi-venezia"],
};

const BRANCH_LIMITED_ROLES = new Set(["Director de sucursal", "Maestra", "Asesora"]);
const TEACHER_BASE_INTERNAL_MODULES = new Set(["asistencias", "maestras"]);
const INTERNAL_PLATFORM_MODULE_ORDER = [
  "dashboard",
  "crm-prospectos",
  "altas",
  "asistencias",
  "maestras",
  "pagos",
  "balance",
  "finanzas",
  "personal",
  "usuarios-accesos",
];
const TEACHER_ACCESS_ROLE_LABELS = new Set([
  "maestra",
  "miss de unas",
  "miss de pestanas",
  "miss de maquillaje",
  "miss de barberia",
  "coord de maestras",
  "coordinadora de maestras",
]);
const ALL_MODULE_PERMISSIONS = [
  "dashboard",
  "crm-prospectos",
  "altas",
  "asistencias",
  "maestras",
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
const teacherPortalShell = document.getElementById("teacherPortalShell");
const appShell = document.getElementById("appShell");
const sidebarShell = document.querySelector(".sidebar");
const topbarShell = document.querySelector(".topbar");
const mainContentShell = document.querySelector(".main-content");
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
const altaClaveElector = document.getElementById("altaClaveElector");
const altaClaveElectorLabel = document.getElementById("altaClaveElectorLabel");
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
const altaWeekCount = document.getElementById("altaWeekCount");
const altaMonthCount = document.getElementById("altaMonthCount");
const altaActiveTlaxcala = document.getElementById("altaActiveTlaxcala");
const altaActivePuebla = document.getElementById("altaActivePuebla");
const altaActiveTotal = document.getElementById("altaActiveTotal");
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
const dashboardMonthFilter = document.getElementById("dashboardMonthFilter");
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
const accessSelectorName = document.getElementById("accessSelectorName");
const accessSelectorSummary = document.getElementById("accessSelectorSummary");
const accessSelectorCards = document.getElementById("accessSelectorCards");
const accessSelectorLogoutButton = document.getElementById("accessSelectorLogoutButton");

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
const attendanceSummaryGrid = document.getElementById("attendanceSummaryGrid");
const attendanceGroupCount = document.getElementById("attendanceGroupCount");
const attendanceToggleButton = document.getElementById("attendanceToggleButton");
const teacherForm = document.getElementById("teacherForm");
const teacherClearButton = document.getElementById("teacherClearButton");
const teacherSubmitButton = document.getElementById("teacherSubmitButton");
const teacherStaffId = document.getElementById("teacherStaffId");
const teacherPosition = document.getElementById("teacherPosition");
const teacherCoverageSpecialty = document.getElementById("teacherCoverageSpecialty");
const teachersTableBody = document.getElementById("teachersTableBody");
const teachersEmptyState = document.getElementById("teachersEmptyState");
const teacherConfigHelper = document.getElementById("teacherConfigHelper");
const teacherAttendanceForm = document.getElementById("teacherAttendanceForm");
const teacherAttendanceClearButton = document.getElementById("teacherAttendanceClearButton");
const teacherAttendanceSubmitButton = document.getElementById("teacherAttendanceSubmitButton");
const teacherAttendanceHelper = document.getElementById("teacherAttendanceHelper");
const teacherAttendanceDate = document.getElementById("teacherAttendanceDate");
const teacherAttendanceBranch = document.getElementById("teacherAttendanceBranch");
const teacherAttendanceTeacherId = document.getElementById("teacherAttendanceTeacherId");
const teacherAttendanceSpecialty = document.getElementById("teacherAttendanceSpecialty");
const teacherAttendanceShift = document.getElementById("teacherAttendanceShift");
const teacherAttendanceStatus = document.getElementById("teacherAttendanceStatus");
const teacherAttendanceTableBody = document.getElementById("teacherAttendanceTableBody");
const teacherAttendanceEmptyState = document.getElementById("teacherAttendanceEmptyState");
const teacherAttendanceHistoryPanel = document.getElementById("teacherAttendanceHistoryPanel");
const teacherOperationalStatus = document.getElementById("teacherOperationalStatus");
const teacherSummaryBranchFilter = document.getElementById("teacherSummaryBranchFilter");
const teacherSummaryTeacherFilter = document.getElementById("teacherSummaryTeacherFilter");
const teacherSummaryMonthFilter = document.getElementById("teacherSummaryMonthFilter");
const teacherSummaryFortnightFilter = document.getElementById("teacherSummaryFortnightFilter");
const teacherSummaryDateFromFilter = document.getElementById("teacherSummaryDateFromFilter");
const teacherSummaryDateToFilter = document.getElementById("teacherSummaryDateToFilter");
const teacherSummaryTableBody = document.getElementById("teacherSummaryTableBody");
const teacherSummaryEmptyState = document.getElementById("teacherSummaryEmptyState");
const teacherQuincenalSummaryPanel = document.getElementById("teacherQuincenalSummaryPanel");
const teacherCountStat = document.getElementById("teacherCountStat");
const teacherWorkedDaysStat = document.getElementById("teacherWorkedDaysStat");
const teacherIncidentsStat = document.getElementById("teacherIncidentsStat");
const teacherPayrollStat = document.getElementById("teacherPayrollStat");
const teacherPaidStat = document.getElementById("teacherPaidStat");
const teacherPendingStat = document.getElementById("teacherPendingStat");
const teacherPaymentForm = document.getElementById("teacherPaymentForm");
const teacherPaymentClearButton = document.getElementById("teacherPaymentClearButton");
const teacherPaymentSubmitButton = document.getElementById("teacherPaymentSubmitButton");
const teacherPaymentTeacherId = document.getElementById("teacherPaymentTeacherId");
const teacherPaymentBranch = document.getElementById("teacherPaymentBranch");
const teacherPaymentDate = document.getElementById("teacherPaymentDate");
const teacherPaymentMonth = document.getElementById("teacherPaymentMonth");
const teacherPaymentFortnight = document.getElementById("teacherPaymentFortnight");
const teacherPaymentSpecialty = document.getElementById("teacherPaymentSpecialty");
const teacherPaymentShift = document.getElementById("teacherPaymentShift");
const teacherPaymentAmount = document.getElementById("teacherPaymentAmount");
const teacherPaymentAmountHint = document.getElementById("teacherPaymentAmountHint");
const teacherPaymentHelper = document.getElementById("teacherPaymentHelper");
const teacherPaymentsHistoryPanel = document.getElementById("teacherPaymentsHistoryPanel");
const teacherPaymentsTableBody = document.getElementById("teacherPaymentsTableBody");
const teacherPaymentsEmptyState = document.getElementById("teacherPaymentsEmptyState");
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
const paymentsTodayTotal = document.getElementById("paymentsTodayTotal");
const paymentsToggleButton = document.getElementById("paymentsToggleButton");
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

const financeBranchField = document.getElementById("financeSucursal");
const financeCategoria = document.getElementById("financeCategoria");
const financeTipo = document.getElementById("financeTipo");
const financeMonthFilter = document.getElementById("financeMonthFilter");
const financeBranchFilter = document.getElementById("financeBranchFilter");
const financeVisibleMonthFilter = document.getElementById("financeVisibleMonthFilter");
const financeTableBody = document.getElementById("financeTableBody");
const financeEmptyState = document.getElementById("financeEmptyState");
const financeIncomeSummary = document.getElementById("financeIncomeSummary");
const financeExpenseSummary = document.getElementById("financeExpenseSummary");
const financeUtilitySummary = document.getElementById("financeUtilitySummary");
const financeMonthIncomeValue = document.getElementById("financeMonthIncomeValue");
const financeMonthExpenseValue = document.getElementById("financeMonthExpenseValue");
const financeMonthUtilityValue = document.getElementById("financeMonthUtilityValue");
const financeMonthIncomeMeta = document.getElementById("financeMonthIncomeMeta");
const financeMonthExpenseMeta = document.getElementById("financeMonthExpenseMeta");
const financeMonthUtilityMeta = document.getElementById("financeMonthUtilityMeta");
const financeBranchSummary = document.getElementById("financeBranchSummary");
const financeHistoricalMeta = document.getElementById("financeHistoricalMeta");
const financeHistoricalTableBody = document.getElementById("financeHistoricalTableBody");
const financeHistoricalEmptyState = document.getElementById("financeHistoricalEmptyState");
const miVeneziaLoginForm = document.getElementById("miVeneziaLoginForm");
const miVeneziaLoginPanel = document.getElementById("miVeneziaLoginPanel");
const miVeneziaDashboard = document.getElementById("miVeneziaDashboard");
const miVeneziaShell = miVeneziaDashboard?.querySelector(".student-shell") || null;
const miVeneziaRoot = document.getElementById("miVeneziaPortal") || miVeneziaShell || miVeneziaDashboard;
const miVeneziaStudentMain = miVeneziaDashboard?.querySelector(".student-main") || null;
const miVeneziaLogoutButton = document.getElementById("miVeneziaLogoutButton");
const miVeneziaSidebarName = document.getElementById("miVeneziaSidebarName");
const miVeneziaSidebarMeta = document.getElementById("miVeneziaSidebarMeta");
const miVeneziaSidebarStatus = document.getElementById("miVeneziaSidebarStatus");
const miVeneziaViewLabel = document.getElementById("miVeneziaViewLabel");
const miVeneziaPortalBadge = document.getElementById("miVeneziaPortalBadge");
const miVeneziaStudentStatus = document.getElementById("miVeneziaStudentStatus");
const miVeneziaPerfil = document.getElementById("miVeneziaPerfil");
const miVeneziaPagos = document.getElementById("miVeneziaPagos");
const miVeneziaPagosBody = document.getElementById("miVeneziaPagosBody");
const miVeneziaPagosEmptyState = document.getElementById("miVeneziaPagosEmptyState");
const miVeneziaResumenAsistencias = document.getElementById("miVeneziaResumenAsistencias");
const miVeneziaAsistenciasBody = document.getElementById("miVeneziaAsistenciasBody");
const miVeneziaAsistenciasEmptyState = document.getElementById("miVeneziaAsistenciasEmptyState");
const miVeneziaAttendanceToggle = document.getElementById("miVeneziaAttendanceToggle");
const miVeneziaAvance = document.getElementById("miVeneziaAvance");
const miVeneziaPaymentSchedule = document.getElementById("miVeneziaPaymentSchedule");
const miVeneziaHeroName = document.getElementById("miVeneziaHeroName");
const miVeneziaHeroMeta = document.getElementById("miVeneziaHeroMeta");
const miVeneziaHeroSummary = document.getElementById("miVeneziaHeroSummary");
const miVeneziaContactButton = document.getElementById("miVeneziaContactButton");
const miVeneziaWhatsappSupportButton = document.getElementById("miVeneziaWhatsappSupportButton");
const miVeneziaAvatarImage = document.getElementById("miVeneziaAvatarImage");
const miVeneziaAvatarFallback = document.getElementById("miVeneziaAvatarFallback");
const miVeneziaSidebarAvatarImage = document.getElementById("miVeneziaSidebarAvatarImage");
const miVeneziaSidebarAvatarFallback = document.getElementById("miVeneziaSidebarAvatarFallback");
const miVeneziaStatCourse = document.getElementById("miVeneziaStatCourse");
const miVeneziaStatAttendance = document.getElementById("miVeneziaStatAttendance");
const miVeneziaStatPayments = document.getElementById("miVeneziaStatPayments");
const miVeneziaStatStatus = document.getElementById("miVeneziaStatStatus");
const miVeneziaNextAction = document.getElementById("miVeneziaNextAction");
const miVeneziaUpcoming = document.getElementById("miVeneziaUpcoming");
const miVeneziaProgressStatus = document.getElementById("miVeneziaProgressStatus");
const miVeneziaDashboardPaymentSummary = document.getElementById("miVeneziaDashboardPaymentSummary");
const miVeneziaDashboardProgressSummary = document.getElementById("miVeneziaDashboardProgressSummary");
const miVeneziaDashboardAttendanceSummary = document.getElementById("miVeneziaDashboardAttendanceSummary");
const miVeneziaAchievements = document.getElementById("miVeneziaAchievements");
const miVeneziaDocumentsSummary = document.getElementById("miVeneziaDocumentsSummary");
const miVeneziaNoticesPreview = document.getElementById("miVeneziaNoticesPreview");
const miVeneziaClassesList = document.getElementById("miVeneziaClassesList");
const miVeneziaNoticesList = document.getElementById("miVeneziaNoticesList");
const miVeneziaViewButtons = Array.from(document.querySelectorAll("[data-student-view]"));
const miVeneziaViewPages = Array.from(document.querySelectorAll("[data-student-page]"));
const miVeneziaViewJumpButtons = Array.from(document.querySelectorAll("[data-student-view-jump]"));
const miVeneziaReglamentoStatus = document.getElementById("miVeneziaReglamentoStatus");
const miVeneziaReglamentoMeta = document.getElementById("miVeneziaReglamentoMeta");
const miVeneziaViewReglamentoButton = document.getElementById("miVeneziaViewReglamentoButton");
const miVeneziaDownloadReglamentoButton = document.getElementById("miVeneziaDownloadReglamentoButton");
const miVeneziaConfirmReadButton = document.getElementById("miVeneziaConfirmReadButton");
const miVeneziaContratoStatus = document.getElementById("miVeneziaContratoStatus");
const miVeneziaContratoMeta = document.getElementById("miVeneziaContratoMeta");
const miVeneziaViewContratoButton = document.getElementById("miVeneziaViewContratoButton");
const miVeneziaDownloadContratoButton = document.getElementById("miVeneziaDownloadContratoButton");
const miVeneziaConfirmContratoButton = document.getElementById("miVeneziaConfirmContratoButton");
const miVeneziaPasswordForm = document.getElementById("miVeneziaPasswordForm");
const miVeneziaPasswordFeedback = document.getElementById("miVeneziaPasswordFeedback");
const miVeneziaPasswordSubmitButton = document.getElementById("miVeneziaPasswordSubmitButton");
const teacherPortalDashboard = document.getElementById("teacherPortalDashboard");
const teacherPortalLogoutButton = document.getElementById("teacherPortalLogoutButton");
const teacherPortalProfile = document.getElementById("teacherPortalProfile");
const teacherPortalPayrollSummary = document.getElementById("teacherPortalPayrollSummary");
const teacherPortalPayrollRules = document.getElementById("teacherPortalPayrollRules");
const teacherPortalJornadasBody = document.getElementById("teacherPortalJornadasBody");
const teacherPortalJornadasEmptyState = document.getElementById("teacherPortalJornadasEmptyState");
const teacherPortalPayrollBody = document.getElementById("teacherPortalPayrollBody");
const teacherPortalPayrollEmptyState = document.getElementById("teacherPortalPayrollEmptyState");
const teacherPortalHeroName = document.getElementById("teacherPortalHeroName");
const teacherPortalHeroMeta = document.getElementById("teacherPortalHeroMeta");
const teacherPortalHeroSummary = document.getElementById("teacherPortalHeroSummary");
const teacherPortalContactButton = document.getElementById("teacherPortalContactButton");
const teacherPortalStatDays = document.getElementById("teacherPortalStatDays");
const teacherPortalStatShifts = document.getElementById("teacherPortalStatShifts");
const teacherPortalStatIncidents = document.getElementById("teacherPortalStatIncidents");
const teacherPortalStatPayroll = document.getElementById("teacherPortalStatPayroll");
const teacherPortalPeriodInfo = document.getElementById("teacherPortalPeriodInfo");
const teacherPortalPasswordForm = document.getElementById("teacherPortalPasswordForm");
const teacherPortalPasswordFeedback = document.getElementById("teacherPortalPasswordFeedback");
const teacherPortalPasswordSubmitButton = document.getElementById("teacherPortalPasswordSubmitButton");
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

function bindStudentAvatarImage(imageElement) {
  if (!imageElement || imageElement.dataset.avatarBound === "true") {
    return;
  }

  imageElement.addEventListener("load", () => {
    imageElement.hidden = false;
    imageElement.classList.add("is-ready");
  });

  imageElement.addEventListener("error", () => {
    const fallbackSrc = imageElement.dataset.fallbackSrc || "";
    if (fallbackSrc && imageElement.src !== new URL(fallbackSrc, window.location.href).href) {
      imageElement.hidden = true;
      imageElement.classList.remove("is-ready");
      imageElement.src = fallbackSrc;
      imageElement.dataset.currentSrc = fallbackSrc;
      imageElement.dataset.fallbackSrc = "";
      return;
    }

    imageElement.hidden = true;
    imageElement.classList.remove("is-ready");
    imageElement.removeAttribute("src");
    imageElement.dataset.currentSrc = "";
    imageElement.dataset.fallbackSrc = "";
  });

  imageElement.dataset.avatarBound = "true";
}

[miVeneziaAvatarImage, miVeneziaSidebarAvatarImage].forEach(bindStudentAvatarImage);

const moduleSections = {
  "access-selector": document.getElementById("accessSelectorSection"),
  dashboard: document.getElementById("dashboardSection"),
  "crm-prospectos": document.getElementById("crmSection"),
  altas: document.getElementById("altasSection"),
  asistencias: document.getElementById("asistenciasSection"),
  maestras: document.getElementById("maestrasSection"),
  pagos: document.getElementById("pagosSection"),
  balance: document.getElementById("balanceSection"),
  finanzas: document.getElementById("finanzasSection"),
  "usuarios-accesos": document.getElementById("usersAccessSection"),
  personal: document.getElementById("personalSection"),
  "mi-venezia": document.getElementById("miVeneziaSection"),
  "portal-maestras": document.getElementById("teacherPortalSection"),
  "web-venezia": document.getElementById("webVeneziaSection"),
};

function mountTeacherPortalShell() {
  const teacherPortalSection = moduleSections["portal-maestras"];
  if (!teacherPortalShell || !teacherPortalSection) {
    return;
  }

  if (teacherPortalSection.parentElement !== teacherPortalShell) {
    teacherPortalShell.appendChild(teacherPortalSection);
  }
}

const statIngresosDashboard = document.getElementById("statIngresosDashboard");
const statEgresosDashboard = document.getElementById("statEgresosDashboard");
const statBalanceDashboard = document.getElementById("statBalanceDashboard");
const statAnnualUtilityDashboard = document.getElementById("statAnnualUtilityDashboard");
const statTlaxcalaIncomeDashboard = document.getElementById("statTlaxcalaIncomeDashboard");
const statPueblaIncomeDashboard = document.getElementById("statPueblaIncomeDashboard");
const dashboardFinancialAlerts = document.getElementById("dashboardFinancialAlerts");
const dashboardOpenFinanceButton = document.getElementById("dashboardOpenFinanceButton");
const dashboardFinanceComparisonMeta = document.getElementById("dashboardFinanceComparisonMeta");
const dashboardFinanceComparisonChart = document.getElementById("dashboardFinanceComparisonChart");

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
  },
  {
    name: "Pestañas",
    description: "Capacítate en fines de semana y da el primer paso para generar ingresos.",
    statusLabel: "Curso activo y disponible",
    imagePath: "images/pestanas.jpg",
  },
  {
    name: "Barbería",
    description: "Elige el turno que mejor se adapte a ti.",
    statusLabel: "Curso activo y disponible",
    imagePath: "images/barberia.jpg",
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
// Supabase during init; `students` is revalidated against the shared source.
let prospects = dataService.entities.prospects.getAll(() => []);
let students = dataService.entities.students.getAll(() => []);
let attendanceRecords = dataService.entities.attendance.getAll(() => []);
let paymentRecords = dataService.entities.payments.getAll(() => []);
let teacherRecords = dataService.entities.teachers.getAll(() => []);
let teacherAttendanceRecords = dataService.entities.teacherAttendance.getAll(() => []);
let teacherPaymentRecords = dataService.entities.teacherPayments.getAll(() => []);
let balanceExpenses = dataService.entities.balanceExpenses.getAll(() => []);
let financeRecords = dataService.entities.financialMovements.getAll(() => []);
let studentAccessRecords = dataService.entities.studentPortalAccess.getAll(() => []);
let internalUsers = dataService.entities.internalUsers.getAll(() => []);
let staffRecords = dataService.entities.staff.getAll(() => []);
let webSettings = dataService.entities.webSettings.getAll(() => ({
  scholarshipActive: true,
  title: "Beca activa para nuevo ingreso",
  description: "Pregunta por beneficios especiales en inscripción y mensualidades para tu curso.",
  availability: "Consulta disponibilidad vigente",
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
let dashboardSelectedMonth = selectedMonth;
let selectedAttendanceStudentId = "";
let activeAttendanceSearch = "";
let attendanceTableExpanded = false;
let activePaymentsSearch = "";
let paymentsTableExpanded = false;
let activeStudentFileId = "";
let activeAttendanceSessionCount = DEFAULT_ATTENDANCE_SESSION_COUNT;
let currentPortalStudentId = "";
let miVeneziaAttendanceExpanded = false;
let currentMiVeneziaView = "dashboard";
let currentInternalUserId = "";
let currentAccessMode = "logged-out";
let publicAccessPanelOpen = false;
let activeAdvisorFilter = "";
let pendingAltaConfirmation = null;
const SHARED_DATA_REFRESH_INTERVAL_MS = 15000;
let sharedDataRefreshPromise = null;
let lastSharedDataRefreshAt = 0;

monthFilter.value = selectedMonth;
if (altasMonthFilter) {
  altasMonthFilter.value = selectedAltasMonth;
}
paymentsMonthFilter.value = selectedPaymentsMonth;
attendanceDate.value = formatDateForInput(new Date());
financeMonthFilter.value = selectedMonth;
teacherAttendanceDate.value = formatDateForInput(new Date());
teacherSummaryMonthFilter.value = selectedMonth;
if (teacherPaymentDate) {
  teacherPaymentDate.value = formatDateForInput(new Date());
}
if (teacherPaymentMonth) {
  teacherPaymentMonth.value = selectedMonth;
}

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
  const existingRecord = students.find((student) => student.id === record.id);
  const normalizedRecord = {
    ...record,
    createdAt: existingRecord?.createdAt || record.createdAt || new Date().toISOString(),
  };

  console.log('Altas module target table: "students"');
  console.log("ALTA -> students payload", {
    id: normalizedRecord.id,
    full_name: normalizedRecord.nombre || "",
    phone: normalizedRecord.telefono || "",
    branch: normalizedRecord.sucursal || "",
    course: normalizedRecord.curso || "",
    schedule: normalizedRecord.horario || "",
    start_date: normalizedRecord.fechaInicio || null,
    access_selected: normalizedRecord.accesoElegido || "",
    password: normalizedRecord.portalPassword || "",
    status: normalizedRecord.estado || "Activa",
    source_prospect_id: normalizedRecord.prospectId || null,
    notes: normalizedRecord.observaciones || "",
    created_at: normalizedRecord.createdAt || null,
  });
  const result = await dataService.entities.students.upsertOne(normalizedRecord, { alertOnFailure: false });

  if (!result.synced) {
    console.log('Supabase write to "students" failed.');
    console.log('Supabase response for "students" write:', result.response);
    console.error('Supabase error for "students" write:', result.error);
    console.error(
      'Supabase error message for "students" write:',
      result.error?.message || result.error?.details || String(result.error)
    );
    console.warn("Alta write rejected because Supabase could not confirm the shared record.", {
      id: record.id,
      nombre: record.nombre,
    });
  } else {
    students = await dataService.entities.students.getAllPrimary(() => []);
    console.log('Supabase write to "students" succeeded.', {
      id: result.record.id,
    });
    console.log('Supabase response for "students" write:', result.response);
    console.log("ALTA -> students success", {
      id: result.record.id,
    });
  }

  return result;
}

async function refreshSharedSupabaseState({ force = false, render = true } = {}) {
  if (!dataService.supabaseReady) {
    return false;
  }

  const now = Date.now();
  if (!force && sharedDataRefreshPromise) {
    return sharedDataRefreshPromise;
  }

  if (!force && now - lastSharedDataRefreshAt < SHARED_DATA_REFRESH_INTERVAL_MS) {
    return false;
  }

  sharedDataRefreshPromise = (async () => {
    const [
      nextInternalUsers,
      nextStudents,
      nextAttendanceRecords,
      nextPaymentRecords,
      nextFinanceRecords,
      nextStudentAccessRecords,
      nextStaffRecords,
      nextProspects,
    ] = await Promise.all([
      dataService.entities.internalUsers.getAllPrimary(() => []),
      dataService.entities.students.getAllPrimary(() => []),
      dataService.entities.attendance.getAllPrimary(() => []),
      dataService.entities.payments.getAllPrimary(() => []),
      dataService.entities.financialMovements.getAllPrimary(() => []),
      dataService.entities.studentPortalAccess.getAllPrimary(() => []),
      dataService.entities.staff.getAllPrimary(() => []),
      dataService.entities.prospects.getAllPrimary(() => []),
    ]);

    internalUsers = nextInternalUsers;
    students = nextStudents;
    attendanceRecords = nextAttendanceRecords;
    paymentRecords = nextPaymentRecords;
    financeRecords = nextFinanceRecords;
    studentAccessRecords = nextStudentAccessRecords;
    staffRecords = nextStaffRecords;
    prospects = nextProspects;

    await normalizeInternalUsers();
    await reconcilePaymentFinanceRecords();
    lastSharedDataRefreshAt = Date.now();

    if (render) {
      renderAll();
    }

    return true;
  })()
    .catch((error) => {
      console.error("No se pudieron refrescar los datos compartidos desde Supabase.", error);
      return false;
    })
    .finally(() => {
      sharedDataRefreshPromise = null;
    });

  return sharedDataRefreshPromise;
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

async function saveStudentPortalAccessRecord(record) {
  const result = await dataService.entities.studentPortalAccess.upsertOne(record, { alertOnFailure: false });
  const nextRecord = result.record;
  const existingIndex = studentAccessRecords.findIndex((item) => item.id === nextRecord.id);

  if (existingIndex >= 0) {
    studentAccessRecords[existingIndex] = nextRecord;
  } else {
    studentAccessRecords.unshift(nextRecord);
  }

  return result;
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

async function saveInternalUserRecord(record) {
  const result = await dataService.entities.internalUsers.upsertOne(record, { alertOnFailure: false });
  const nextUser = {
    ...record,
    ...result.record,
    permissions: Array.isArray(record.permissions) ? [...record.permissions] : [],
  };
  const existingIndex = internalUsers.findIndex((user) => user.id === nextUser.id);

  if (existingIndex >= 0) {
    internalUsers[existingIndex] = nextUser;
  } else {
    internalUsers.unshift(nextUser);
  }

  setInternalUserPermissionOverride(nextUser.id, nextUser.permissions);

  return {
    ...result,
    record: nextUser,
  };
}

function cloneSerializable(value) {
  return JSON.parse(JSON.stringify(value ?? []));
}

function restoreCollectionFromSnapshot(key, snapshot) {
  const restored = cloneSerializable(snapshot);
  localStorage.setItem(key, JSON.stringify(restored));
  return restored;
}

function getSupabaseClientOrThrow() {
  const client = window.VeneziaSupabase?.client;
  if (!client) {
    throw new Error("No hay conexión disponible con el registro principal.");
  }
  return client;
}

async function validateSupabasePassword({ table, id, passwordField = "password", currentPassword, entityLabel }) {
  const client = getSupabaseClientOrThrow();
  const { data, error } = await client
    .from(table)
    .select(`id, ${passwordField}`)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo validar la contraseña actual en el registro principal de ${entityLabel}.`);
  }

  if (!data) {
    throw new Error(`No se encontró el registro principal de ${entityLabel}.`);
  }

  if (String(data[passwordField] || "") !== String(currentPassword || "")) {
    throw new Error("La contraseña actual no coincide.");
  }
}

function getPasswordChangeValidationError({ currentPassword, newPassword, confirmPassword }) {
  if (!currentPassword) {
    return "Escribe tu contraseña actual.";
  }

  if (!newPassword) {
    return "Escribe una nueva contraseña.";
  }

  if (newPassword.length < 6) {
    return "La nueva contraseña debe tener mínimo 6 caracteres.";
  }

  if (!confirmPassword) {
    return "Confirma la nueva contraseña.";
  }

  if (newPassword !== confirmPassword) {
    return "La nueva contraseña y la confirmación no coinciden.";
  }

  return "";
}

function setPortalPasswordFeedback(element, message = "", tone = "") {
  if (!element) {
    return;
  }

  element.hidden = !message;
  element.textContent = message;
  element.classList.remove("is-error", "is-success", "is-warning");

  if (message && tone) {
    element.classList.add(`is-${tone}`);
  }
}

function resetPortalPasswordForm(form, feedbackElement) {
  if (form) {
    form.reset();
  }
  setPortalPasswordFeedback(feedbackElement);
}

function normalizeInternalLookupValue(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function isTeacherRoleLabel(role) {
  return TEACHER_ACCESS_ROLE_LABELS.has(normalizeInternalLookupValue(role));
}

function getLinkedTeacherStaffRecordForUser(user) {
  if (!user) {
    return null;
  }

  const normalizedUsername = normalizeInternalLookupValue(user.username);
  const normalizedFullName = normalizeInternalLookupValue(user.fullName);
  const normalizedBranch = normalizeInternalLookupValue(user.branch);

  return (
    staffRecords.find(
      (record) => isEligibleTeacherStaffPosition(record.puesto) && record.linkedUserId === user.id
    ) ||
    staffRecords.find(
      (record) =>
        isEligibleTeacherStaffPosition(record.puesto) &&
        normalizedUsername &&
        normalizeInternalLookupValue(getTeacherStaffAccessUsername(record)) === normalizedUsername
    ) ||
    staffRecords.find(
      (record) =>
        isEligibleTeacherStaffPosition(record.puesto) &&
        normalizedFullName &&
        normalizeInternalLookupValue(record.nombre) === normalizedFullName &&
        (!normalizedBranch || normalizeInternalLookupValue(record.sucursal) === normalizedBranch)
    ) ||
    null
  );
}

function getLinkedTeacherConfigForUser(user) {
  if (!user) {
    return null;
  }

  const normalizedUsername = normalizeInternalLookupValue(user.username);
  const normalizedFullName = normalizeInternalLookupValue(user.fullName);
  const normalizedBranch = normalizeInternalLookupValue(user.branch);

  return (
    teacherRecords.find((record) => record.linkedUserId && record.linkedUserId === user.id) ||
    teacherRecords.find(
      (record) =>
        normalizedUsername &&
        normalizeInternalLookupValue(record.legacyUsuario || record.usuario) === normalizedUsername
    ) ||
    teacherRecords.find(
      (record) =>
        normalizedFullName &&
        normalizeInternalLookupValue(
          record.nombreCompleto || record.legacyNombreCompleto || record.nombre || record.teacherName
        ) === normalizedFullName &&
        (!normalizedBranch || normalizeInternalLookupValue(record.sucursal) === normalizedBranch)
    ) ||
    null
  );
}

function isTeacherInternalUser(user) {
  return Boolean(
    user &&
      (isTeacherRoleLabel(user.role) ||
        getLinkedTeacherStaffRecordForUser(user) ||
        getLinkedTeacherConfigForUser(user))
  );
}

function getBasePermissionsForRole(role) {
  if (role === "Director General") {
    return [...ALL_MODULE_PERMISSIONS];
  }

  if (isTeacherRoleLabel(role)) {
    return [...(BASE_ROLE_PERMISSIONS.Maestra || [])];
  }

  return [...(BASE_ROLE_PERMISSIONS[role] || [])];
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
    return ["maestras", "asistencias", "crm-prospectos", "altas"];
  }

  return [];
}

function isCoordinatorTeacherStaff(user = getCurrentInternalUser()) {
  const linkedStaffRecord = getLinkedTeacherStaffRecordForUser(user);
  const normalizedPosition = String(linkedStaffRecord?.puesto || "").trim().toLowerCase();
  return normalizedPosition === "coordinadora de maestras";
}

function canViewTeacherHistoryAndSummary(user = getCurrentInternalUser()) {
  if (!user || user.status !== "Activo") {
    return false;
  }

  return (
    user.role === "Director General" ||
    user.role === "Director de sucursal" ||
    isCoordinatorTeacherStaff(user)
  );
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
  const preservedAllBranchesScope = isAllBranchesScope(existingUser?.branch) ? "Todas" : "";
  const internalUserPayload = {
    id: existingUser?.id || record.linkedUserId || crypto.randomUUID(),
    fullName: record.nombre || "",
    username: record.username || "",
    phone: record.telefono || "",
    password: record.password || "",
    role: existingUser?.role || mappedRole,
    branch: preservedAllBranchesScope || record.sucursal || existingUser?.branch || "",
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

function saveTeachersCollection() {
  dataService.entities.teachers.setAll(teacherRecords);
}

function saveTeacherAttendanceCollection() {
  dataService.entities.teacherAttendance.setAll(teacherAttendanceRecords);
}

function saveTeacherPaymentsCollection() {
  dataService.entities.teacherPayments.setAll(teacherPaymentRecords);
}

function normalizeTeacherSpecialty(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  if (normalized === "unas" || normalized === "una" || normalized === "uñas") return "Uñas";
  if (normalized === "pestanas" || normalized === "pestañas") return "Pestañas";
  if (normalized === "maquillaje") return "Maquillaje";
  if (normalized === "barberia" || normalized === "barbería") return "Barbería";
  if (
    normalized === "coord de maestras" ||
    normalized === "coordinadora de maestras" ||
    normalized === "coord maestras"
  ) {
    return "COORD de maestras";
  }
  return "";
}

function normalizeTeacherCoverageSpecialty(value) {
  return normalizeTeacherSpecialty(value);
}

function normalizeTeacherShift(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  if (normalized === "matutino") return "Matutino";
  if (normalized === "vespertino") return "Vespertino";
  if (normalized === "ambos") return "Ambos";
  return "";
}

function normalizeTeacherAttendanceStatus(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  if (normalized === "asistio" || normalized === "asistió") return "Asistió";
  if (normalized === "falta") return "Falta";
  if (normalized === "permiso") return "Permiso";
  return "";
}

function normalizeTeacherPaymentType(value) {
  return String(value || "").trim() ? TEACHER_PAYMENT_TYPE : TEACHER_PAYMENT_TYPE;
}

function normalizeTeacherOperationalStatus(value) {
  return String(value || "").trim().toLowerCase() === "inactivo" ? "Inactivo" : "Activo";
}

function getTeacherOperationalSpecialty(record) {
  const coverageSpecialty = normalizeTeacherCoverageSpecialty(record?.coberturaEspecialidad);
  const primarySpecialty = normalizeTeacherSpecialty(record?.especialidad);

  if (coverageSpecialty && (!primarySpecialty || primarySpecialty === "COORD de maestras")) {
    return coverageSpecialty;
  }

  return primarySpecialty;
}

function getTeacherCoverageDisplay(record) {
  return normalizeTeacherCoverageSpecialty(record?.coberturaEspecialidad);
}

function getTeacherSpecialtyDisplay(record) {
  const primarySpecialty = normalizeTeacherSpecialty(record?.especialidad);
  const coverageSpecialty = getTeacherCoverageDisplay(record);

  if (!coverageSpecialty) {
    return primarySpecialty || "-";
  }

  return primarySpecialty ? `${primarySpecialty} · Cubre ${coverageSpecialty}` : coverageSpecialty;
}

function normalizeTeacherPosition(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function isEligibleTeacherStaffPosition(position) {
  const normalizedPosition = normalizeTeacherPosition(position);
  if (!normalizedPosition) {
    return false;
  }

  return (
    TEACHER_ELIGIBLE_POSITIONS.has(normalizedPosition) ||
    TEACHER_ELIGIBLE_POSITION_FRAGMENTS.some((fragment) => normalizedPosition.includes(fragment))
  );
}

function getDefaultTeacherSpecialtyFromPosition(position) {
  const normalizedPosition = normalizeTeacherPosition(position);
  if (!normalizedPosition) {
    return "";
  }
  if (normalizedPosition.includes("coord de maestras") || normalizedPosition.includes("coordinadora de maestras")) {
    return "COORD de maestras";
  }
  if (normalizedPosition.includes("barberia") || normalizedPosition.includes("barbería")) return "Barbería";
  if (normalizedPosition.includes("pestanas") || normalizedPosition.includes("pestañas")) return "Pestañas";
  if (normalizedPosition.includes("maquillaje")) return "Maquillaje";
  if (normalizedPosition.includes("unas") || normalizedPosition.includes("uñas")) return "Uñas";
  return "";
}

function getTeacherDisplayName(record) {
  return record?.nombreCompleto || record?.nombre || record?.teacherName || record?.legacyNombreCompleto || "Maestra";
}

function getTeacherConfigTimestamp(record) {
  return String(record?.updatedAt || record?.createdAt || "");
}

function getTeacherStaffAccessUsername(staffRecord) {
  if (staffRecord?.username) {
    return staffRecord.username;
  }

  const linkedUser = internalUsers.find((user) => user.id === staffRecord?.linkedUserId);
  return linkedUser?.username || "";
}

function getTeacherConfigById(id, configs = teacherRecords) {
  return configs.find((record) => record.id === id) || null;
}

function getTeacherConfigByStaffId(staffId, configs = teacherRecords) {
  return configs.find((record) => record.staffId === staffId || record.id === staffId) || null;
}

function getTeacherConfigForStaffRecord(staffRecord, configs = teacherRecords) {
  if (!staffRecord) {
    return null;
  }

  const directMatch = getTeacherConfigByStaffId(staffRecord.id, configs);
  if (directMatch) {
    return directMatch;
  }

  const linkedUserId = String(staffRecord.linkedUserId || "").trim();
  if (linkedUserId) {
    const linkedUserMatch = configs.find((record) => String(record.linkedUserId || "").trim() === linkedUserId);
    if (linkedUserMatch) {
      return linkedUserMatch;
    }
  }

  const normalizedUsername = normalizeInternalLookupValue(getTeacherStaffAccessUsername(staffRecord));
  if (normalizedUsername) {
    const usernameMatch = configs.find(
      (record) => normalizedUsername === normalizeInternalLookupValue(record.legacyUsuario || record.usuario)
    );
    if (usernameMatch) {
      return usernameMatch;
    }
  }

  const normalizedName = normalizeInternalLookupValue(staffRecord.nombre);
  const normalizedBranch = normalizeInternalLookupValue(staffRecord.sucursal);
  return (
    configs.find((record) => {
      const recordName = normalizeInternalLookupValue(
        record.nombreCompleto || record.legacyNombreCompleto || record.nombre || record.teacherName
      );
      const recordBranch = normalizeInternalLookupValue(record.legacySucursal || record.sucursal);
      return (
        normalizedName &&
        recordName === normalizedName &&
        (!normalizedBranch || !recordBranch || recordBranch === normalizedBranch)
      );
    }) || null
  );
}

function getEligibleTeacherStaffRecords() {
  return staffRecords
    .filter(
      (record) =>
        isEligibleTeacherStaffPosition(record.puesto) &&
        matchesCurrentBranch(record.sucursal)
    )
    .sort((left, right) => String(left.nombre || "").localeCompare(String(right.nombre || ""), "es-MX"));
}

function findMatchingStaffForTeacherRecord(record) {
  const explicitStaff =
    staffRecords.find((staffRecord) => staffRecord.id === record.staffId) ||
    staffRecords.find((staffRecord) => staffRecord.id === record.id);
  if (explicitStaff && isEligibleTeacherStaffPosition(explicitStaff.puesto)) {
    return explicitStaff;
  }

  const linkedUserMatch = staffRecords.find(
    (staffRecord) =>
      isEligibleTeacherStaffPosition(staffRecord.puesto) &&
      record.linkedUserId &&
      staffRecord.linkedUserId === record.linkedUserId
  );
  if (linkedUserMatch) {
    return linkedUserMatch;
  }

  const normalizedUsername = String(record.usuario || "").trim().toLowerCase();
  if (normalizedUsername) {
    const usernameMatch = staffRecords.find(
      (staffRecord) =>
        isEligibleTeacherStaffPosition(staffRecord.puesto) &&
        String(getTeacherStaffAccessUsername(staffRecord) || "").trim().toLowerCase() === normalizedUsername
    );
    if (usernameMatch) {
      return usernameMatch;
    }
  }

  const normalizedName = getTeacherDisplayName(record)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
  const normalizedBranch = String(record.sucursal || "").trim().toLowerCase();
  return (
    staffRecords.find((staffRecord) => {
      if (!isEligibleTeacherStaffPosition(staffRecord.puesto)) {
        return false;
      }
      const staffName = String(staffRecord.nombre || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
      const sameBranch =
        !normalizedBranch ||
        String(staffRecord.sucursal || "").trim().toLowerCase() === normalizedBranch;
      return staffName === normalizedName && sameBranch;
    }) || null
  );
}

function buildLegacyTeacherProfile(configRecord) {
  return {
    id: configRecord.id,
    staffId: configRecord.staffId || "",
    linkedUserId: configRecord.linkedUserId || "",
    nombreCompleto: configRecord.legacyNombreCompleto || getTeacherDisplayName(configRecord),
    puesto: configRecord.legacyPuesto || "Registro legado sin enlace",
    sucursal: configRecord.legacySucursal || configRecord.sucursal || "",
    usuario: configRecord.legacyUsuario || configRecord.usuario || "",
    especialidad: normalizeTeacherSpecialty(configRecord.especialidad),
    coberturaEspecialidad: normalizeTeacherCoverageSpecialty(configRecord.coberturaEspecialidad),
    tipoPago: normalizeTeacherPaymentType(configRecord.tipoPago),
    estadoDocente: normalizeTeacherOperationalStatus(configRecord.estadoDocente),
    configuracionOperativa: configRecord.configuracionOperativa || "",
    isConfigured: true,
    source: "legacy",
  };
}

function buildTeacherProfileFromStaff(staffRecord, configRecord = null) {
  const resolvedConfig = configRecord || getTeacherConfigForStaffRecord(staffRecord);
  return {
    id: staffRecord.id,
    staffId: staffRecord.id,
    linkedUserId: staffRecord.linkedUserId || resolvedConfig?.linkedUserId || "",
    nombreCompleto: staffRecord.nombre || "",
    puesto: staffRecord.puesto || "",
    sucursal: staffRecord.sucursal || "",
    usuario: getTeacherStaffAccessUsername(staffRecord),
    especialidad:
      normalizeTeacherSpecialty(resolvedConfig?.especialidad) ||
      getDefaultTeacherSpecialtyFromPosition(staffRecord.puesto),
    coberturaEspecialidad: normalizeTeacherCoverageSpecialty(resolvedConfig?.coberturaEspecialidad),
    tipoPago: normalizeTeacherPaymentType(resolvedConfig?.tipoPago || TEACHER_PAYMENT_TYPE),
    estadoDocente: normalizeTeacherOperationalStatus(
      resolvedConfig?.estadoDocente || staffRecord.estado || "Activo"
    ),
    configuracionOperativa: resolvedConfig?.configuracionOperativa || "",
    isConfigured: Boolean(resolvedConfig),
    source: "staff",
  };
}

function getTeacherProfileById(teacherId, configs = teacherRecords) {
  const staffRecord = staffRecords.find((record) => record.id === teacherId);
  if (staffRecord && isEligibleTeacherStaffPosition(staffRecord.puesto)) {
    return buildTeacherProfileFromStaff(staffRecord, getTeacherConfigForStaffRecord(staffRecord, configs));
  }

  const configRecord = getTeacherConfigById(teacherId, configs);
  if (!configRecord) {
    return null;
  }

  const matchedStaff = staffRecords.find((record) => record.id === configRecord.staffId);
  if (matchedStaff && isEligibleTeacherStaffPosition(matchedStaff.puesto)) {
    return buildTeacherProfileFromStaff(matchedStaff, configRecord);
  }

  return buildLegacyTeacherProfile(configRecord);
}

function normalizeTeacherDataAgainstStaff() {
  const legacyToCanonicalTeacherId = new Map();
  const groupedRecords = new Map();

  teacherRecords.forEach((record) => {
    const matchedStaff = findMatchingStaffForTeacherRecord(record);
    const canonicalId = matchedStaff?.id || record.staffId || record.id;
    legacyToCanonicalTeacherId.set(record.id, canonicalId);
    if (!groupedRecords.has(canonicalId)) {
      groupedRecords.set(canonicalId, []);
    }
    groupedRecords.get(canonicalId).push({ record, matchedStaff });
  });

  const nextTeacherRecords = Array.from(groupedRecords.entries()).map(([canonicalId, entries]) => {
    const latestEntry = [...entries].sort(
      (left, right) => getTeacherConfigTimestamp(right.record).localeCompare(getTeacherConfigTimestamp(left.record))
    )[0];
    const matchedStaff = entries.map((entry) => entry.matchedStaff).find(Boolean) || null;
    const preservedOperationalStatus =
      entries.find((entry) => String(entry.record.estadoDocente || "").trim())?.record?.estadoDocente ||
      latestEntry.record.estadoDocente ||
      latestEntry.record.status ||
      matchedStaff?.estado ||
      "Activo";
    const specialty =
      normalizeTeacherSpecialty(
        latestEntry.record.especialidad ||
          entries.find((entry) => normalizeTeacherSpecialty(entry.record.especialidad))?.record?.especialidad ||
          getDefaultTeacherSpecialtyFromPosition(matchedStaff?.puesto)
      ) || "";

    return {
      id: canonicalId,
      staffId: matchedStaff?.id || latestEntry.record.staffId || "",
      linkedUserId: matchedStaff?.linkedUserId || latestEntry.record.linkedUserId || "",
      especialidad: specialty,
      coberturaEspecialidad: normalizeTeacherCoverageSpecialty(
        latestEntry.record.coberturaEspecialidad ||
          entries.find((entry) => normalizeTeacherCoverageSpecialty(entry.record.coberturaEspecialidad))?.record
            ?.coberturaEspecialidad
      ),
      tipoPago: normalizeTeacherPaymentType(latestEntry.record.tipoPago || TEACHER_PAYMENT_TYPE),
      estadoDocente: normalizeTeacherOperationalStatus(preservedOperationalStatus),
      configuracionOperativa:
        latestEntry.record.configuracionOperativa ||
        latestEntry.record.observacionesOperativas ||
        latestEntry.record.notes ||
        "",
      legacyNombreCompleto: matchedStaff ? "" : getTeacherDisplayName(latestEntry.record),
      legacySucursal: matchedStaff ? "" : latestEntry.record.sucursal || "",
      legacyUsuario: matchedStaff ? "" : latestEntry.record.usuario || "",
      legacyPuesto: matchedStaff ? "" : latestEntry.record.puesto || "",
      createdAt: latestEntry.record.createdAt || new Date().toISOString(),
      updatedAt: latestEntry.record.updatedAt || latestEntry.record.createdAt || new Date().toISOString(),
    };
  });

  const nextTeacherAttendanceRecords = teacherAttendanceRecords.map((record) => {
    const canonicalTeacherId = legacyToCanonicalTeacherId.get(record.teacherId) || record.teacherId;
    const teacherProfile = getTeacherProfileById(canonicalTeacherId, nextTeacherRecords);
    return {
      ...record,
      teacherId: canonicalTeacherId,
      teacherName: teacherProfile?.nombreCompleto || record.teacherName || "",
      sucursal: teacherProfile?.sucursal || record.sucursal || "",
      especialidad: normalizeTeacherSpecialty(teacherProfile?.especialidad || record.especialidad),
      turno: normalizeTeacherShift(record.turno),
      estatus: normalizeTeacherAttendanceStatus(record.estatus),
    };
  });

  const nextTeacherPaymentRecords = teacherPaymentRecords.map((record) => {
    const canonicalTeacherId = legacyToCanonicalTeacherId.get(record.teacherId) || record.teacherId;
    const teacherProfile = getTeacherProfileById(canonicalTeacherId, nextTeacherRecords);
    return {
      ...record,
      teacherId: canonicalTeacherId,
      teacherName: teacherProfile?.nombreCompleto || record.teacherName || "",
      sucursal: teacherProfile?.sucursal || record.sucursal || "",
    };
  });

  const previousTeacherSnapshot = JSON.stringify(teacherRecords);
  const nextTeacherSnapshot = JSON.stringify(nextTeacherRecords);
  const previousAttendanceSnapshot = JSON.stringify(teacherAttendanceRecords);
  const nextAttendanceSnapshot = JSON.stringify(nextTeacherAttendanceRecords);
  const previousPaymentsSnapshot = JSON.stringify(teacherPaymentRecords);
  const nextPaymentsSnapshot = JSON.stringify(nextTeacherPaymentRecords);

  if (previousTeacherSnapshot !== nextTeacherSnapshot) {
    teacherRecords = nextTeacherRecords;
    saveTeachersCollection();
  } else {
    teacherRecords = nextTeacherRecords;
  }

  if (previousAttendanceSnapshot !== nextAttendanceSnapshot) {
    teacherAttendanceRecords = nextTeacherAttendanceRecords;
    saveTeacherAttendanceCollection();
  } else {
    teacherAttendanceRecords = nextTeacherAttendanceRecords;
  }

  if (previousPaymentsSnapshot !== nextPaymentsSnapshot) {
    teacherPaymentRecords = nextTeacherPaymentRecords;
    saveTeacherPaymentsCollection();
  } else {
    teacherPaymentRecords = nextTeacherPaymentRecords;
  }
}

function getTeacherSpecialtyKey(value) {
  const normalized = normalizeTeacherSpecialty(value);
  if (normalized === "Uñas") return "unas";
  if (normalized === "Pestañas") return "pestanas";
  if (normalized === "Maquillaje") return "maquillaje";
  if (normalized === "Barbería") return "barberia";
  return "";
}

function getTeacherShiftPriority(specialty, shift) {
  const normalizedShift = normalizeTeacherShift(shift);
  const specialtyKey = getTeacherSpecialtyKey(specialty);
  if (specialtyKey === "barberia") {
    return {
      Ambos: 3,
      Vespertino: 2,
      Matutino: 1,
    }[normalizedShift] || 0;
  }
  return {
    Ambos: 3,
    Vespertino: 2,
    Matutino: 1,
  }[normalizedShift] || 0;
}

function resolveTeacherShiftForPayroll(specialty, shifts = []) {
  const normalizedShifts = Array.from(new Set(shifts.map((value) => normalizeTeacherShift(value)).filter(Boolean)));

  if (normalizedShifts.length === 0) {
    return "";
  }

  if (normalizedShifts.includes("Ambos")) {
    return "Ambos";
  }

  if (normalizedShifts.includes("Matutino") && normalizedShifts.includes("Vespertino")) {
    return "Ambos";
  }

  return normalizedShifts.sort(
    (left, right) => getTeacherShiftPriority(specialty, right) - getTeacherShiftPriority(specialty, left)
  )[0];
}

function getTeacherEstimatedPay(specialty, shift, status = "Asistió") {
  if (normalizeTeacherAttendanceStatus(status) !== "Asistió") {
    return 0;
  }

  const specialtyKey = getTeacherSpecialtyKey(specialty);
  const normalizedShift = normalizeTeacherShift(shift);

  if (!specialtyKey || !normalizedShift) {
    return 0;
  }

  if (specialtyKey === "barberia") {
    if (normalizedShift === "Matutino") return 500;
    if (normalizedShift === "Vespertino") return 0;
    if (normalizedShift === "Ambos") return 700;
    return 0;
  }

  if (normalizedShift === "Ambos") return 400;
  if (normalizedShift === "Matutino" || normalizedShift === "Vespertino") return 200;
  return 0;
}

function getTeacherAutoPaymentAmountForForm(specialty, shift) {
  const normalizedSpecialty = normalizeTeacherSpecialty(specialty);
  const normalizedShift = normalizeTeacherShift(shift);

  if (!normalizedSpecialty || !normalizedShift) {
    return null;
  }

  if (normalizedSpecialty === "Barbería" && normalizedShift === "Vespertino") {
    return null;
  }

  const amount = getTeacherEstimatedPay(normalizedSpecialty, normalizedShift, "Asistió");
  return amount > 0 ? amount : null;
}

function getTeacherCoveredTurnUnits(shift) {
  return normalizeTeacherShift(shift) === "Ambos" ? 2 : normalizeTeacherShift(shift) ? 1 : 0;
}

function getTeacherAttendanceLogicalKey(record) {
  return `${record.teacherId || ""}::${record.fecha || ""}`;
}

function getVisibleTeacherRecords() {
  return getEligibleTeacherStaffRecords().map((staffRecord) =>
    buildTeacherProfileFromStaff(staffRecord, getTeacherConfigForStaffRecord(staffRecord))
  );
}

function getSelectableTeacherProfiles({ includeInactive = true } = {}) {
  const configuredProfiles = getVisibleTeacherRecords().filter(
    (record) =>
      record.isConfigured &&
      (includeInactive || normalizeTeacherOperationalStatus(record.estadoDocente) === "Activo")
  );
  const legacyProfiles = teacherRecords
    .filter((record) => !record.staffId || !staffRecords.some((staffRecord) => staffRecord.id === record.staffId))
    .map((record) => buildLegacyTeacherProfile(record))
    .filter(
      (record) =>
        includeInactive || normalizeTeacherOperationalStatus(record.estadoDocente) === "Activo"
    );

  return configuredProfiles
    .concat(legacyProfiles)
    .filter((record) => matchesCurrentBranch(record.sucursal))
    .sort((left, right) => getTeacherDisplayName(left).localeCompare(getTeacherDisplayName(right), "es-MX"));
}

function buildTeacherStaffOptions(records, selectedValue, defaultLabel = "Selecciona desde Personal") {
  return [`<option value="">${escapeHtml(defaultLabel)}</option>`]
    .concat(
      records.map((record) => {
        const profile = buildTeacherProfileFromStaff(record, getTeacherConfigForStaffRecord(record));
        const statusLabel = profile.isConfigured ? "Configurada" : "Pendiente";
        return `<option value="${escapeHtml(record.id)}" ${record.id === selectedValue ? "selected" : ""}>${escapeHtml(
          `${record.nombre || "-"} · ${record.puesto || "-"} · ${record.sucursal || "-"} · ${statusLabel}`
        )}</option>`;
      })
    )
    .join("");
}

function buildTeacherSelectOptions(records, selectedValue, defaultLabel = "Selecciona una opcion") {
  return [`<option value="">${escapeHtml(defaultLabel)}</option>`]
    .concat(
      records.map(
        (record) =>
          `<option value="${escapeHtml(record.id)}" ${record.id === selectedValue ? "selected" : ""}>${escapeHtml(
            `${getTeacherDisplayName(record)} · ${record.sucursal || "-"} · ${getTeacherSpecialtyDisplay(record)}${record.source === "legacy" ? " · Legado" : ""}`
          )}</option>`
      )
    )
    .join("");
}

function populateTeacherConfigStaffOptions() {
  const visibleStaff = getEligibleTeacherStaffRecords();
  const previousValue = teacherStaffId.value;
  teacherStaffId.innerHTML = buildTeacherStaffOptions(
    visibleStaff,
    visibleStaff.some((record) => record.id === previousValue) ? previousValue : ""
  );
}

function populateTeacherSelects() {
  const visibleTeachers = getSelectableTeacherProfiles({ includeInactive: true });
  const attendanceBranchValue = teacherAttendanceBranch.value;
  const filteredForAttendance = visibleTeachers.filter(
    (record) => !attendanceBranchValue || record.sucursal === attendanceBranchValue
  );
  const summaryBranchValue = teacherSummaryBranchFilter.value;
  const filteredForSummary = visibleTeachers.filter(
    (record) => !summaryBranchValue || record.sucursal === summaryBranchValue
  );

  const previousAttendanceTeacher = teacherAttendanceTeacherId.value;
  teacherAttendanceTeacherId.innerHTML = buildTeacherSelectOptions(
    filteredForAttendance,
    filteredForAttendance.some((record) => record.id === previousAttendanceTeacher) ? previousAttendanceTeacher : "",
    "Selecciona una opcion"
  );

  const previousSummaryTeacher = teacherSummaryTeacherFilter.value;
  teacherSummaryTeacherFilter.innerHTML = buildTeacherSelectOptions(
    filteredForSummary,
    filteredForSummary.some((record) => record.id === previousSummaryTeacher) ? previousSummaryTeacher : "",
    "Todas"
  );
}

function populateTeacherPaymentSelects() {
  if (!teacherPaymentTeacherId || !teacherPaymentBranch) {
    return;
  }

  const visibleTeachers = getSelectableTeacherProfiles({ includeInactive: true });
  const paymentBranchValue = teacherPaymentBranch.value;
  const filteredForPayments = visibleTeachers.filter(
    (record) => !paymentBranchValue || record.sucursal === paymentBranchValue
  );
  const previousPaymentTeacher = teacherPaymentTeacherId.value;

  teacherPaymentTeacherId.innerHTML = buildTeacherSelectOptions(
    filteredForPayments,
    filteredForPayments.some((record) => record.id === previousPaymentTeacher) ? previousPaymentTeacher : "",
    "Selecciona una opcion"
  );
}

function getTeacherPeriodRange(monthValue, fortnight) {
  if (!monthValue || !fortnight) {
    return { from: "", to: "" };
  }

  const [year, month] = String(monthValue).split("-").map(Number);
  if (!year || !month) {
    return { from: "", to: "" };
  }

  const lastDay = new Date(year, month, 0).getDate();
  if (String(fortnight) === "1") {
    return {
      from: `${monthValue}-01`,
      to: `${monthValue}-15`,
    };
  }

  return {
    from: `${monthValue}-16`,
    to: `${monthValue}-${String(lastDay).padStart(2, "0")}`,
  };
}

function buildTeacherPaymentPeriodLabel(monthValue, fortnight) {
  const range = getTeacherPeriodRange(monthValue, fortnight);
  if (!range.from || !range.to) {
    return "";
  }

  const monthLabel = new Date(`${range.from}T12:00:00`).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });

  return String(fortnight) === "1"
    ? `${monthLabel} · 1 al 15`
    : `${monthLabel} · 16 al ${range.to.slice(-2)}`;
}

function getTeacherFormData() {
  const formData = new FormData(teacherForm);
  const selectedStaffId = String(formData.get("staffId") || "").trim();
  const selectedStaff = staffRecords.find((record) => record.id === selectedStaffId);
  const existingRecord = selectedStaff ? getTeacherConfigForStaffRecord(selectedStaff) : null;

  if (!selectedStaff) {
    return null;
  }

  return {
    id: selectedStaff.id,
    staffId: selectedStaff.id,
    linkedUserId: selectedStaff.linkedUserId || existingRecord?.linkedUserId || "",
    especialidad:
      normalizeTeacherSpecialty(formData.get("especialidad")) ||
      getDefaultTeacherSpecialtyFromPosition(selectedStaff.puesto),
    coberturaEspecialidad: normalizeTeacherCoverageSpecialty(formData.get("coberturaEspecialidad")),
    tipoPago: normalizeTeacherPaymentType(formData.get("tipoPago")),
    estadoDocente: normalizeTeacherOperationalStatus(formData.get("estadoDocente")),
    configuracionOperativa: String(formData.get("configuracionOperativa") || "").trim(),
    createdAt: existingRecord?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    legacyNombreCompleto: "",
    legacySucursal: "",
    legacyUsuario: "",
    legacyPuesto: "",
  };
}

function getTeacherAttendanceFormData() {
  const formData = new FormData(teacherAttendanceForm);
  const selectedTeacher = getTeacherProfileById(String(formData.get("maestraId") || "").trim());
  const existingId = document.getElementById("teacherAttendanceId").value;
  const existingRecord = teacherAttendanceRecords.find((record) => record.id === existingId);
  const existingLogicalRecord = teacherAttendanceRecords.find(
    (record) =>
      record.teacherId === String(formData.get("maestraId") || "").trim() &&
      record.fecha === String(formData.get("fecha") || "").trim()
  );
  const allowedBranch = getAllowedBranch();

  return {
    id: existingLogicalRecord?.id || existingRecord?.id || existingId || crypto.randomUUID(),
    teacherId: selectedTeacher?.id || "",
    teacherName: selectedTeacher?.nombreCompleto || "",
    fecha: String(formData.get("fecha") || "").trim(),
    sucursal: allowedBranch || selectedTeacher?.sucursal || String(formData.get("sucursal") || "").trim(),
    especialidad: getTeacherOperationalSpecialty(selectedTeacher) || normalizeTeacherSpecialty(formData.get("especialidad")),
    turno: normalizeTeacherShift(formData.get("turno")),
    estatus: normalizeTeacherAttendanceStatus(formData.get("estatus")),
    observacion: String(formData.get("observacion") || "").trim(),
    recordedBy: getCurrentInternalUser()?.id || "",
    createdAt: existingLogicalRecord?.createdAt || existingRecord?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function getTeacherPaymentFormData() {
  if (!teacherPaymentForm) {
    return null;
  }

  const formData = new FormData(teacherPaymentForm);
  const teacherId = String(formData.get("maestraId") || "").trim();
  const selectedTeacher = getTeacherProfileById(teacherId);
  const existingId = document.getElementById("teacherPaymentId").value;
  const existingRecord = teacherPaymentRecords.find((record) => record.id === existingId);
  const allowedBranch = getAllowedBranch();
  const periodMonth = String(formData.get("periodoMes") || "").trim();
  const fortnight = String(formData.get("quincena") || "").trim();
  const periodRange = getTeacherPeriodRange(periodMonth, fortnight);

  return {
    id: existingRecord?.id || existingId || crypto.randomUUID(),
    teacherId: selectedTeacher?.id || teacherId,
    teacherName: selectedTeacher?.nombreCompleto || existingRecord?.teacherName || "",
    sucursal: allowedBranch || selectedTeacher?.sucursal || String(formData.get("sucursal") || "").trim(),
    especialidadOperativa:
      normalizeTeacherSpecialty(formData.get("especialidadOperativa")) ||
      getTeacherOperationalSpecialty(selectedTeacher) ||
      existingRecord?.especialidadOperativa ||
      "",
    turno: normalizeTeacherShift(formData.get("turno")) || existingRecord?.turno || "",
    fechaPago: String(formData.get("fechaPago") || "").trim(),
    periodMonth,
    fortnight,
    periodLabel: buildTeacherPaymentPeriodLabel(periodMonth, fortnight),
    periodFrom: periodRange.from,
    periodTo: periodRange.to,
    montoPagado: Number(formData.get("montoPagado") || 0),
    metodoPago: String(formData.get("metodoPago") || "").trim(),
    nota: String(formData.get("nota") || "").trim(),
    recordedBy: getCurrentInternalUser()?.id || "",
    createdAt: existingRecord?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function saveTeacherRecord(record) {
  const matchedStaff = staffRecords.find((item) => item.id === record.staffId || item.id === record.id) || null;
  const existingRecord =
    (matchedStaff ? getTeacherConfigForStaffRecord(matchedStaff) : null) ||
    getTeacherConfigByStaffId(record.staffId || record.id) ||
    getTeacherConfigById(record.id);
  const normalizedName = normalizeInternalLookupValue(
    record.legacyNombreCompleto || record.nombreCompleto || record.nombre || record.teacherName
  );
  const normalizedBranch = normalizeInternalLookupValue(record.legacySucursal || record.sucursal);

  const nextRecord = {
    ...existingRecord,
    ...record,
    id: matchedStaff?.id || record.staffId || record.id || existingRecord?.id || crypto.randomUUID(),
    staffId: matchedStaff?.id || record.staffId || record.id || existingRecord?.staffId || "",
    linkedUserId: record.linkedUserId || existingRecord?.linkedUserId || matchedStaff?.linkedUserId || "",
    estadoDocente: normalizeTeacherOperationalStatus(record.estadoDocente || existingRecord?.estadoDocente || "Activo"),
    createdAt: existingRecord?.createdAt || record.createdAt || new Date().toISOString(),
    updatedAt: record.updatedAt || new Date().toISOString(),
  };

  teacherRecords = teacherRecords.filter(
    (item) =>
      item.id !== nextRecord.id &&
      item.staffId !== nextRecord.staffId &&
      !(nextRecord.linkedUserId && item.linkedUserId === nextRecord.linkedUserId) &&
      !(
        normalizedName &&
        normalizeInternalLookupValue(
          item.legacyNombreCompleto || item.nombreCompleto || item.nombre || item.teacherName
        ) === normalizedName &&
        (!normalizedBranch ||
          !normalizeInternalLookupValue(item.legacySucursal || item.sucursal) ||
          normalizeInternalLookupValue(item.legacySucursal || item.sucursal) === normalizedBranch)
      )
  );
  teacherRecords.unshift(nextRecord);
  saveTeachersCollection();
  return {
    record: nextRecord,
    synced: true,
  };
}

function saveTeacherAttendanceRecord(record) {
  const teacherProfile = getTeacherProfileById(record.teacherId);
  const nextRecord = {
    ...record,
    teacherName: teacherProfile?.nombreCompleto || record.teacherName || "",
    sucursal: teacherProfile?.sucursal || record.sucursal || "",
    especialidad: normalizeTeacherSpecialty(teacherProfile?.especialidad || record.especialidad),
    turno: normalizeTeacherShift(record.turno),
    estatus: normalizeTeacherAttendanceStatus(record.estatus),
  };

  teacherAttendanceRecords = teacherAttendanceRecords.filter(
    (item) =>
      item.id !== nextRecord.id &&
      !(
        item.teacherId === nextRecord.teacherId &&
        item.fecha === nextRecord.fecha
      )
  );
  teacherAttendanceRecords.unshift(nextRecord);
  saveTeacherAttendanceCollection();
  return nextRecord;
}

function saveTeacherPaymentRecord(record) {
  const teacherProfile = getTeacherProfileById(record.teacherId);
  const nextRecord = {
    ...record,
    teacherName: teacherProfile?.nombreCompleto || record.teacherName || "",
    sucursal: teacherProfile?.sucursal || record.sucursal || "",
    especialidadOperativa:
      normalizeTeacherSpecialty(record.especialidadOperativa) ||
      getTeacherOperationalSpecialty(teacherProfile) ||
      "",
    turno: normalizeTeacherShift(record.turno),
  };

  teacherPaymentRecords = teacherPaymentRecords.filter((item) => item.id !== nextRecord.id);
  teacherPaymentRecords.unshift(nextRecord);
  saveTeacherPaymentsCollection();
  return nextRecord;
}

function getLatestTeacherObservation(records = []) {
  return (
    [...records]
      .sort((left, right) =>
        String(right.updatedAt || right.createdAt || "").localeCompare(String(left.updatedAt || left.createdAt || ""))
      )
      .find((record) => String(record.observacion || "").trim())?.observacion || ""
  );
}

function consolidateTeacherAttendanceGroup(records = []) {
  if (records.length === 0) {
    return null;
  }

  const latestRecord = [...records].sort((left, right) =>
    String(right.updatedAt || right.createdAt || "").localeCompare(String(left.updatedAt || left.createdAt || ""))
  )[0];
  const teacher = getTeacherProfileById(latestRecord.teacherId);
  const specialty = normalizeTeacherSpecialty(
    latestRecord.especialidad || teacher?.especialidad || records.find((record) => record.especialidad)?.especialidad
  );
  const attendedRecords = records.filter(
    (record) => normalizeTeacherAttendanceStatus(record.estatus) === "Asistió"
  );
  let status = "Falta";

  if (attendedRecords.length > 0) {
    status = "Asistió";
  } else if (records.some((record) => normalizeTeacherAttendanceStatus(record.estatus) === "Permiso")) {
    status = "Permiso";
  }

  const shift = resolveTeacherShiftForPayroll(
    specialty,
    (attendedRecords.length > 0 ? attendedRecords : records).map((record) => record.turno)
  );
  const estimatedPay = getTeacherEstimatedPay(specialty, shift, status);

  return {
    id: getTeacherAttendanceLogicalKey(latestRecord),
    rawIds: records.map((record) => record.id),
    duplicateCount: records.length,
    teacherId: latestRecord.teacherId || "",
    teacherName: latestRecord.teacherName || getTeacherDisplayName(teacher),
    fecha: latestRecord.fecha || "",
    sucursal: latestRecord.sucursal || teacher?.sucursal || "",
    especialidad: specialty,
    turno: shift,
    estatus: status,
    observacion: getLatestTeacherObservation(records),
    estimatedPay,
  };
}

function getConsolidatedTeacherAttendanceEntries(sourceRecords = teacherAttendanceRecords) {
  const groupedRecords = sourceRecords.reduce((accumulator, record) => {
    const teacherId = record.teacherId || "";
    const fecha = record.fecha || "";
    if (!teacherId || !fecha) {
      return accumulator;
    }
    const key = `${teacherId}::${fecha}`;
    if (!accumulator.has(key)) {
      accumulator.set(key, []);
    }
    accumulator.get(key).push(record);
    return accumulator;
  }, new Map());

  return Array.from(groupedRecords.values())
    .map((records) => consolidateTeacherAttendanceGroup(records))
    .filter(Boolean)
    .sort((left, right) => {
      const dateCompare = String(right.fecha || "").localeCompare(String(left.fecha || ""));
      if (dateCompare !== 0) {
        return dateCompare;
      }
      return String(left.teacherName || "").localeCompare(String(right.teacherName || ""), "es-MX");
    });
}

function getTeacherSummaryRange() {
  const dateFrom = teacherSummaryDateFromFilter?.value || "";
  const dateTo = teacherSummaryDateToFilter?.value || "";

  if (dateFrom || dateTo) {
    return {
      from: dateFrom || "",
      to: dateTo || "",
    };
  }

  const monthValue = teacherSummaryMonthFilter.value || selectedMonth;
  if (!monthValue) {
    return { from: "", to: "" };
  }

  const [year, month] = monthValue.split("-");
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  const fortnight = teacherSummaryFortnightFilter.value;

  if (fortnight === "1") {
    return {
      from: `${monthValue}-01`,
      to: `${monthValue}-15`,
    };
  }

  if (fortnight === "2") {
    return {
      from: `${monthValue}-16`,
      to: `${monthValue}-${String(lastDay).padStart(2, "0")}`,
    };
  }

  return {
    from: `${monthValue}-01`,
    to: `${monthValue}-${String(lastDay).padStart(2, "0")}`,
  };
}

function isTeacherDateWithinRange(dateValue, range) {
  if (!dateValue) {
    return false;
  }
  if (range.from && dateValue < range.from) {
    return false;
  }
  if (range.to && dateValue > range.to) {
    return false;
  }
  return true;
}

function getFilteredTeacherSummaryEntries() {
  const range = getTeacherSummaryRange();
  return getConsolidatedTeacherAttendanceEntries().filter((entry) => {
    if (!matchesCurrentBranch(entry.sucursal)) {
      return false;
    }
    if (teacherSummaryBranchFilter.value && entry.sucursal !== teacherSummaryBranchFilter.value) {
      return false;
    }
    if (teacherSummaryTeacherFilter.value && entry.teacherId !== teacherSummaryTeacherFilter.value) {
      return false;
    }
    return isTeacherDateWithinRange(entry.fecha, range);
  });
}

function doesTeacherPaymentMatchRange(record, range) {
  const paymentRange = {
    from: String(record.periodFrom || "").trim(),
    to: String(record.periodTo || "").trim(),
  };

  if (!range.from && !range.to) {
    return true;
  }

  if (!paymentRange.from || !paymentRange.to) {
    return false;
  }

  const effectiveFrom = range.from || paymentRange.from;
  const effectiveTo = range.to || paymentRange.to;
  return paymentRange.from <= effectiveTo && paymentRange.to >= effectiveFrom;
}

function getFilteredTeacherPaymentRecords() {
  const range = getTeacherSummaryRange();
  return teacherPaymentRecords
    .filter((record) => matchesCurrentBranch(record.sucursal))
    .filter((record) => !teacherSummaryBranchFilter.value || record.sucursal === teacherSummaryBranchFilter.value)
    .filter((record) => !teacherSummaryTeacherFilter.value || record.teacherId === teacherSummaryTeacherFilter.value)
    .filter((record) => doesTeacherPaymentMatchRange(record, range))
    .sort((left, right) => {
      const dateCompare = String(right.fechaPago || "").localeCompare(String(left.fechaPago || ""));
      if (dateCompare !== 0) {
        return dateCompare;
      }
      return String(left.teacherName || "").localeCompare(String(right.teacherName || ""), "es-MX");
    });
}

function getTeacherPaymentTotalsByTeacherId(records = getFilteredTeacherPaymentRecords()) {
  return records.reduce((accumulator, record) => {
    const teacherKey = record.teacherId || "";
    if (!teacherKey) {
      return accumulator;
    }

    accumulator.set(teacherKey, (accumulator.get(teacherKey) || 0) + Number(record.montoPagado || 0));
    return accumulator;
  }, new Map());
}

function getTeacherSummaryRows() {
  const summaryMap = getFilteredTeacherSummaryEntries().reduce((accumulator, entry) => {
    const key = entry.teacherId || entry.teacherName;
    if (!accumulator.has(key)) {
      accumulator.set(key, {
        teacherId: entry.teacherId,
        teacherName: entry.teacherName,
        sucursal: entry.sucursal,
        especialidad: entry.especialidad,
        diasLaborados: 0,
        turnosCubiertos: 0,
        turnosMatutinos: 0,
        turnosVespertinos: 0,
        turnosAmbos: 0,
        turnosSinMontoAutomatico: 0,
        totalEstimado: 0,
      });
    }

    const row = accumulator.get(key);
    row.sucursal = row.sucursal || entry.sucursal;
    row.especialidad = row.especialidad || entry.especialidad;

    if (entry.estatus === "Asistió") {
      row.diasLaborados += 1;
      row.turnosCubiertos += getTeacherCoveredTurnUnits(entry.turno);
      if (entry.turno === "Matutino") row.turnosMatutinos += 1;
      if (entry.turno === "Vespertino") row.turnosVespertinos += 1;
      if (entry.turno === "Ambos") row.turnosAmbos += 1;
      if (Number(entry.estimatedPay || 0) === 0) {
        row.turnosSinMontoAutomatico += getTeacherCoveredTurnUnits(entry.turno);
      }
      row.totalEstimado += entry.estimatedPay;
    }

    return accumulator;
  }, new Map());

  return Array.from(summaryMap.values()).sort((left, right) => {
    const payCompare = right.totalEstimado - left.totalEstimado;
    if (payCompare !== 0) {
      return payCompare;
    }
    return String(left.teacherName || "").localeCompare(String(right.teacherName || ""), "es-MX");
  });
}

function updateTeacherAttendanceHelper() {
  const teacherId = teacherAttendanceTeacherId.value;
  const dateValue = teacherAttendanceDate.value;

  if (!teacherId || !dateValue) {
    teacherAttendanceHelper.textContent =
      "Sólo aparecen docentes configuradas desde Personal. Si ya existe una fecha, el registro se actualiza.";
    return;
  }

  const duplicates = teacherAttendanceRecords.filter(
    (record) => record.teacherId === teacherId && record.fecha === dateValue
  );

  if (duplicates.length > 1) {
    teacherAttendanceHelper.textContent =
      "Se detectaron registros viejos duplicados para esa fecha. Al guardar se consolidarán en un solo registro seguro.";
    return;
  }

  if (duplicates.length === 1) {
    teacherAttendanceHelper.textContent =
      "Ya existe una asistencia para esa maestra y fecha. Guardar actualizará el registro existente.";
    return;
  }

  teacherAttendanceHelper.textContent =
    "Si ya existe un registro para la misma maestra y fecha, se actualizará el registro existente.";
}

function syncTeacherConfigFields() {
  const selectedStaff = staffRecords.find((record) => record.id === teacherStaffId.value);
  const existingConfig = selectedStaff ? getTeacherConfigForStaffRecord(selectedStaff) : null;

  if (!selectedStaff) {
    document.getElementById("teacherId").value = "";
    document.getElementById("teacherLinkedUserId").value = "";
    document.getElementById("teacherFullName").value = "";
    teacherPosition.value = "";
    document.getElementById("teacherBranch").value = getAllowedBranch() || "";
    document.getElementById("teacherUsername").value = "";
    document.getElementById("teacherSpecialty").value = "";
    teacherCoverageSpecialty.value = "";
    document.getElementById("teacherPaymentType").value = TEACHER_PAYMENT_TYPE;
    teacherOperationalStatus.value = "Activo";
    document.getElementById("teacherOperationalNotes").value = "";
    teacherSubmitButton.textContent = "Guardar configuración";
    teacherConfigHelper.textContent =
      "La identidad base se administra desde Personal. Aquí sólo configuras datos docentes y operativos.";
    return;
  }

  document.getElementById("teacherId").value = existingConfig?.id || "";
  document.getElementById("teacherLinkedUserId").value = selectedStaff.linkedUserId || existingConfig?.linkedUserId || "";
  document.getElementById("teacherFullName").value = selectedStaff.nombre || "";
  teacherPosition.value = selectedStaff.puesto || "";
  document.getElementById("teacherBranch").value = selectedStaff.sucursal || "";
  document.getElementById("teacherUsername").value = getTeacherStaffAccessUsername(selectedStaff);
  document.getElementById("teacherSpecialty").value =
    normalizeTeacherSpecialty(existingConfig?.especialidad) ||
    getDefaultTeacherSpecialtyFromPosition(selectedStaff.puesto) ||
    "";
  teacherCoverageSpecialty.value = normalizeTeacherCoverageSpecialty(existingConfig?.coberturaEspecialidad) || "";
  document.getElementById("teacherPaymentType").value = TEACHER_PAYMENT_TYPE;
  teacherOperationalStatus.value = normalizeTeacherOperationalStatus(
    existingConfig?.estadoDocente || selectedStaff.estado || "Activo"
  );
  document.getElementById("teacherOperationalNotes").value = existingConfig?.configuracionOperativa || "";
  teacherSubmitButton.textContent = existingConfig ? "Actualizar configuración" : "Guardar configuración";
  teacherConfigHelper.textContent = existingConfig
    ? "Esta docente ya está enlazada con Personal. Aquí sólo ajustas especialidad, estatus y operación."
    : "Se creará sólo la configuración docente. Nombre, sucursal y acceso interno seguirán viniendo desde Personal.";
}

function syncTeacherAttendanceFields() {
  const selectedTeacher = getTeacherProfileById(teacherAttendanceTeacherId.value);
  const allowedBranch = getAllowedBranch();

  if (selectedTeacher) {
    teacherAttendanceBranch.value = allowedBranch || selectedTeacher.sucursal || teacherAttendanceBranch.value;
    teacherAttendanceSpecialty.value = getTeacherOperationalSpecialty(selectedTeacher) || "";
  } else {
    teacherAttendanceSpecialty.value = "";
  }

  updateTeacherAttendanceHelper();
}

function syncTeacherPaymentFields() {
  if (
    !teacherPaymentTeacherId ||
    !teacherPaymentBranch ||
    !teacherPaymentMonth ||
    !teacherPaymentFortnight ||
    !teacherPaymentSpecialty ||
    !teacherPaymentShift
  ) {
    return;
  }

  const selectedTeacher = getTeacherProfileById(teacherPaymentTeacherId.value);
  const allowedBranch = getAllowedBranch();
  const operationalSpecialty = getTeacherOperationalSpecialty(selectedTeacher);

  if (selectedTeacher) {
    teacherPaymentBranch.value = allowedBranch || selectedTeacher.sucursal || teacherPaymentBranch.value;
    if (!teacherPaymentSpecialty.value) {
      teacherPaymentSpecialty.value = operationalSpecialty || "";
    }
  } else if (!teacherPaymentTeacherId.value) {
    teacherPaymentSpecialty.value = "";
    teacherPaymentShift.value = "";
  }

  populateTeacherPaymentSelects();

  const periodLabel = buildTeacherPaymentPeriodLabel(teacherPaymentMonth.value, teacherPaymentFortnight.value);
  const autoAmount = getTeacherAutoPaymentAmountForForm(teacherPaymentSpecialty.value, teacherPaymentShift.value);
  const specialtyLabel = operationalSpecialty || teacherPaymentSpecialty.value || "";
  const autoAmountLabel =
    autoAmount === null
      ? specialtyLabel && normalizeTeacherSpecialty(specialtyLabel) === "Barbería" && normalizeTeacherShift(teacherPaymentShift.value) === "Vespertino"
        ? " En Barbería vespertino no se autocompleta monto; queda editable para captura manual."
        : ""
      : ` Monto sugerido automático: ${formatCurrency(autoAmount)}.`;

  teacherPaymentHelper.textContent = periodLabel
    ? `El pago real quedará ligado al periodo ${periodLabel}. La nómina estimada sigue calculándose aparte con jornadas válidas.${autoAmountLabel}`
    : `Registra aquí pagos reales ya entregados. La nómina estimada se sigue calculando aparte con jornadas y turnos.${autoAmountLabel}`;

  if (teacherPaymentAmountHint) {
    teacherPaymentAmountHint.textContent =
      autoAmount === null &&
      normalizeTeacherSpecialty(teacherPaymentSpecialty.value) === "Barbería" &&
      normalizeTeacherShift(teacherPaymentShift.value) === "Vespertino"
        ? "Barbería vespertino no tiene monto automático. Puedes capturarlo manualmente."
        : "Calculado automáticamente según especialidad y turno. Puedes ajustarlo manualmente si hay una excepción.";
  }
}

function applyTeacherPaymentAutoAmount({ force = false } = {}) {
  if (!teacherPaymentSpecialty || !teacherPaymentShift || !teacherPaymentAmount) {
    return;
  }

  const autoAmount = getTeacherAutoPaymentAmountForForm(teacherPaymentSpecialty.value, teacherPaymentShift.value);

  if (autoAmount === null) {
    if (force) {
      teacherPaymentAmount.value = "";
    }
    return;
  }

  if (force || !String(teacherPaymentAmount.value || "").trim()) {
    teacherPaymentAmount.value = String(autoAmount);
  }
}

function resetTeacherForm() {
  teacherForm.reset();
  document.getElementById("teacherId").value = "";
  document.getElementById("teacherLinkedUserId").value = "";
  teacherCoverageSpecialty.value = "";
  document.getElementById("teacherPaymentType").value = TEACHER_PAYMENT_TYPE;
  teacherOperationalStatus.value = "Activo";
  populateTeacherConfigStaffOptions();
  syncTeacherConfigFields();
  teacherSubmitButton.textContent = "Guardar configuración";
}

function resetTeacherAttendanceForm() {
  const allowedBranch = getAllowedBranch();
  teacherAttendanceForm.reset();
  document.getElementById("teacherAttendanceId").value = "";
  teacherAttendanceDate.value = formatDateForInput(new Date());
  teacherAttendanceBranch.value = allowedBranch || "";
  populateTeacherSelects();
  teacherAttendanceSubmitButton.textContent = "Guardar asistencia";
  syncTeacherAttendanceFields();
}

function resetTeacherPaymentForm() {
  if (!teacherPaymentForm || !teacherPaymentDate || !teacherPaymentMonth || !teacherPaymentFortnight || !teacherPaymentBranch || !teacherPaymentSpecialty || !teacherPaymentShift || !teacherPaymentAmount || !teacherPaymentSubmitButton) {
    return;
  }

  const allowedBranch = getAllowedBranch();
  teacherPaymentForm.reset();
  document.getElementById("teacherPaymentId").value = "";
  teacherPaymentDate.value = formatDateForInput(new Date());
  teacherPaymentMonth.value = teacherSummaryMonthFilter.value || getCurrentMonthValue();
  teacherPaymentFortnight.value = teacherSummaryFortnightFilter.value || "";
  teacherPaymentBranch.value = allowedBranch || "";
  teacherPaymentSpecialty.value = "";
  teacherPaymentShift.value = "";
  teacherPaymentAmount.value = "";
  populateTeacherPaymentSelects();
  teacherPaymentSubmitButton.textContent = "Guardar pago";
  syncTeacherPaymentFields();
}

function renderTeachersTable() {
  const visibleTeachers = getVisibleTeacherRecords();

  teachersTableBody.innerHTML = visibleTeachers
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(getTeacherDisplayName(record))}</td>
          <td>${escapeHtml(record.puesto || "-")}</td>
          <td>${escapeHtml(record.sucursal || "-")}</td>
          <td>${escapeHtml(record.usuario || "-")}</td>
          <td>${escapeHtml(record.especialidad || "-")}</td>
          <td>${escapeHtml(getTeacherCoverageDisplay(record) || "-")}</td>
          <td>${escapeHtml(record.tipoPago || TEACHER_PAYMENT_TYPE)}</td>
          <td><span class="status-pill">${escapeHtml(record.isConfigured ? record.estadoDocente : "Pendiente")}</span></td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-teacher" data-id="${record.id}">${record.isConfigured ? "Editar" : "Configurar"}</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  teachersEmptyState.hidden = visibleTeachers.length > 0;
}

function renderTeacherAttendanceTable() {
  const entries = getConsolidatedTeacherAttendanceEntries().filter((entry) => matchesCurrentBranch(entry.sucursal));

  teacherAttendanceTableBody.innerHTML = entries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.fecha || "-")}</td>
          <td>${escapeHtml(entry.teacherName || "-")}</td>
          <td>${escapeHtml(entry.sucursal || "-")}</td>
          <td>${escapeHtml(entry.especialidad || "-")}</td>
          <td>${escapeHtml(entry.turno || "-")}</td>
          <td>${escapeHtml(entry.estatus || "-")}${entry.duplicateCount > 1 ? ` <small>(${entry.duplicateCount} registros)</small>` : ""}</td>
          <td>${formatCurrency(entry.estimatedPay || 0)}</td>
          <td>${escapeHtml(entry.observacion || "-")}</td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-teacher-attendance" data-teacher-id="${entry.teacherId}" data-date="${entry.fecha}">Editar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  teacherAttendanceEmptyState.hidden = entries.length > 0;
}

function renderTeacherPaymentsTable() {
  if (!teacherPaymentsTableBody || !teacherPaymentsEmptyState) {
    return;
  }

  const paymentRows = getFilteredTeacherPaymentRecords();

  teacherPaymentsTableBody.innerHTML = paymentRows
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(formatDisplayDate(record.fechaPago) || "-")}</td>
          <td>${escapeHtml(record.teacherName || "-")}</td>
          <td>${escapeHtml(record.sucursal || "-")}</td>
          <td>${escapeHtml(record.periodLabel || "-")}</td>
          <td>${formatCurrency(record.montoPagado || 0)}</td>
          <td>${escapeHtml(record.metodoPago || "-")}</td>
          <td>${escapeHtml(record.nota || "-")}</td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-teacher-payment" data-id="${record.id}">Editar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  teacherPaymentsEmptyState.hidden = paymentRows.length > 0;
}

function renderTeacherSummaryTable() {
  const summaryRows = getTeacherSummaryRows();

  teacherSummaryTableBody.innerHTML = summaryRows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.teacherName || "-")}</td>
          <td>${escapeHtml(row.sucursal || "-")}</td>
          <td>${escapeHtml(row.especialidad || "-")}</td>
          <td>${escapeHtml(String(row.diasLaborados))}</td>
          <td>${escapeHtml(String(row.turnosCubiertos))}</td>
          <td>${escapeHtml(
            `Mat ${row.turnosMatutinos} · Ves ${row.turnosVespertinos} · Ambos ${row.turnosAmbos}${
              row.turnosSinMontoAutomatico ? ` · Sin auto ${row.turnosSinMontoAutomatico}` : ""
            }`
          )}</td>
          <td>${formatCurrency(row.totalEstimado || 0)}</td>
        </tr>
      `
    )
    .join("");

  teacherSummaryEmptyState.hidden = summaryRows.length > 0;
}

function updateTeacherModuleStats() {
  return;
}

function renderTeachersModule() {
  const canViewRestrictedTeacherPanels = canViewTeacherHistoryAndSummary();
  normalizeTeacherDataAgainstStaff();
  populateTeacherConfigStaffOptions();
  populateTeacherSelects();
  syncTeacherConfigFields();
  syncTeacherAttendanceFields();
  if (teacherPaymentForm) {
    populateTeacherPaymentSelects();
    syncTeacherPaymentFields();
  }
  if (teacherAttendanceHistoryPanel) {
    teacherAttendanceHistoryPanel.hidden = !canViewRestrictedTeacherPanels;
  }
  if (teacherPaymentsHistoryPanel) {
    teacherPaymentsHistoryPanel.hidden = !canViewRestrictedTeacherPanels;
  }
  if (teacherQuincenalSummaryPanel) {
    teacherQuincenalSummaryPanel.hidden = !canViewRestrictedTeacherPanels;
  }
  renderTeachersTable();
  if (canViewRestrictedTeacherPanels) {
    renderTeacherAttendanceTable();
    renderTeacherSummaryTable();
    if (teacherPaymentsHistoryPanel) {
      renderTeacherPaymentsTable();
    }
  } else {
    teacherAttendanceTableBody.innerHTML = "";
    teacherSummaryTableBody.innerHTML = "";
    teacherAttendanceEmptyState.hidden = false;
    teacherSummaryEmptyState.hidden = false;
    if (teacherPaymentsTableBody) {
      teacherPaymentsTableBody.innerHTML = "";
    }
    if (teacherPaymentsEmptyState) {
      teacherPaymentsEmptyState.hidden = false;
    }
    updateTeacherModuleStats();
  }
}

function editTeacherRecord(id) {
  const record = getTeacherProfileById(id);
  if (!record) {
    return;
  }

  teacherStaffId.value = record.staffId || record.id;
  syncTeacherConfigFields();
  document.getElementById("teacherSpecialty").value = record.especialidad || "";
  teacherCoverageSpecialty.value = getTeacherCoverageDisplay(record) || "";
  document.getElementById("teacherPaymentType").value = record.tipoPago || TEACHER_PAYMENT_TYPE;
  teacherOperationalStatus.value = normalizeTeacherOperationalStatus(record.estadoDocente);
  document.getElementById("teacherOperationalNotes").value = record.configuracionOperativa || "";
  teacherSubmitButton.textContent = "Actualizar configuración";
  setActiveModule("maestras");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function editTeacherAttendanceRecord(teacherId, dateValue) {
  const entry = getConsolidatedTeacherAttendanceEntries().find(
    (record) => record.teacherId === teacherId && record.fecha === dateValue
  );

  if (!entry) {
    return;
  }

  document.getElementById("teacherAttendanceId").value = entry.rawIds[0] || "";
  teacherAttendanceDate.value = entry.fecha || "";
  teacherAttendanceBranch.value = entry.sucursal || "";
  populateTeacherSelects();
  teacherAttendanceTeacherId.value = entry.teacherId || "";
  teacherAttendanceSpecialty.value = entry.especialidad || "";
  teacherAttendanceShift.value = entry.turno || "";
  teacherAttendanceStatus.value = entry.estatus || "";
  document.getElementById("teacherAttendanceObservation").value = entry.observacion || "";
  teacherAttendanceSubmitButton.textContent = "Actualizar asistencia";
  updateTeacherAttendanceHelper();
  setActiveModule("maestras");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function editTeacherPaymentRecord(paymentId) {
  if (!teacherPaymentForm || !teacherPaymentBranch || !teacherPaymentTeacherId || !teacherPaymentDate || !teacherPaymentMonth || !teacherPaymentFortnight || !teacherPaymentSpecialty || !teacherPaymentShift || !teacherPaymentSubmitButton) {
    return;
  }

  const record = teacherPaymentRecords.find((item) => item.id === paymentId);
  if (!record) {
    return;
  }

  document.getElementById("teacherPaymentId").value = record.id;
  teacherPaymentBranch.value = record.sucursal || "";
  populateTeacherPaymentSelects();
  teacherPaymentTeacherId.value = record.teacherId || "";
  teacherPaymentDate.value = record.fechaPago || "";
  teacherPaymentMonth.value = record.periodMonth || "";
  teacherPaymentFortnight.value = record.fortnight || "";
  teacherPaymentSpecialty.value = normalizeTeacherSpecialty(record.especialidadOperativa) || "";
  teacherPaymentShift.value = normalizeTeacherShift(record.turno) || "";
  document.getElementById("teacherPaymentAmount").value = record.montoPagado || "";
  document.getElementById("teacherPaymentMethod").value = record.metodoPago || "";
  document.getElementById("teacherPaymentNote").value = record.nota || "";
  teacherPaymentSubmitButton.textContent = "Actualizar pago";
  syncTeacherPaymentFields();
  setActiveModule("maestras");
  window.scrollTo({ top: 0, behavior: "smooth" });
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

function getCurrentMexicoDateValue(date = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Mexico_City",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date);
    const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    if (byType.year && byType.month && byType.day) {
      return `${byType.year}-${byType.month}-${byType.day}`;
    }
  } catch (error) {
    console.warn("No se pudo calcular la fecha local de Mexico para Balance.", error);
  }

  return formatDateForInput(date);
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

function formatDisplayDateTime(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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

    if (Array.isArray(normalized.permissions) && normalized.permissions.length > 0) {
      normalized.permissions = [...new Set(normalized.permissions)];
    } else if (storedPermissions && storedPermissions.length > 0) {
      normalized.permissions = [...storedPermissions];
      changed = true;
    } else if (staffFallbackPermissions.length > 0 && (!Array.isArray(normalized.permissions) || normalized.permissions.length === 0)) {
      normalized.permissions = [...staffFallbackPermissions];
      changed = true;
    } else if (!Array.isArray(normalized.permissions) || normalized.permissions.length === 0) {
      normalized.permissions = getBasePermissionsForRole(normalized.role);
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

    if ((["Director General", "Director de sucursal"].includes(normalized.role) || isTeacherInternalUser(normalized)) && !normalized.permissions.includes("maestras")) {
      normalized.permissions = [...new Set(normalized.permissions.concat("maestras"))];
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
  const fechaInicio = String(
    formData.get("fechaInicio") || formData.get("fechaInscripcion") || formatDateForInput(new Date())
  ).trim();
  const studentCode = String(
    formData.get("studentCode") || generateStudentCode(sucursal, fechaInicio)
  ).trim();
  const existingStudentId = String(formData.get("studentId") || "").trim();
  const existingStudent = students.find((student) => student.id === existingStudentId);
  const fechaNacimiento = String(formData.get("fechaNacimiento") || "").trim();
  const portalUser = telefono;
  const portalPassword = buildStudentPortalPassword(fechaNacimiento);
  const asesorInscribio = normalizeAdvisorName(formData.get("asesoraInscribio"));
  const rawObservaciones = String(formData.get("observaciones") || "").trim();
  const metadataSegments = [
    `ID Alumna: ${studentCode}`,
    `Fecha de inicio: ${fechaInicio}`,
    `Día de clases: ${String(formData.get("diaClases") || "").trim() || "-"}`,
    `Correo: ${String(formData.get("correo") || "").trim() || "-"}`,
    `Dirección: ${String(formData.get("direccion") || "").trim() || "-"}`,
    `Fecha de nacimiento: ${fechaNacimiento || "-"}`,
    `Tutor: ${String(formData.get("tutor") || "").trim() || "-"}`,
    `Clave de elector: ${String(formData.get("claveElector") || "").trim() || "-"}`,
    `Escolaridad: ${String(formData.get("escolaridad") || "").trim() || "-"}`,
    `Contacto de emergencia: ${String(formData.get("contactoEmergencia") || "").trim() || "-"}`,
    `Asesor que inscribió: ${asesorInscribio || "-"}`,
    `Método de pago: ${String(formData.get("metodoPago") || "").trim() || "-"}`,
    `Tipo de pago: ${String(formData.get("tipoPago") || "").trim() || "-"}`,
    `Cantidad de pago de inscripción: ${String(formData.get("cantidadPago") || "").trim() || "-"}`,
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
    fechaInscripcion: fechaInicio,
    nombre: formData.get("nombre").trim(),
    telefono,
    sucursal,
    curso: formData.get("curso").trim(),
    accesoElegido: formData.get("accesoElegido"),
    horario: formData.get("horario").trim(),
    diaClases: String(formData.get("diaClases") || "").trim(),
    fechaInicio,
    correo: String(formData.get("correo") || "").trim(),
    direccion: String(formData.get("direccion") || "").trim(),
    fechaNacimiento,
    tutor: String(formData.get("tutor") || "").trim(),
    claveElector: String(formData.get("claveElector") || "").trim(),
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
    lecturaReglamento: existingStudent?.lecturaReglamento || false,
    fechaLecturaReglamento: existingStudent?.fechaLecturaReglamento || "",
    lecturaContrato: existingStudent?.lecturaContrato || false,
    fechaLecturaContrato: existingStudent?.fechaLecturaContrato || "",
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
  if (!altaData.cantidadPago) errors.push("Cantidad de pago de inscripción");
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
    `${altaData.metodoPago || "método de pago pendiente"} y cantidad de pago de inscripción de ${altaData.cantidadPago || "-"}.`;
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
  const fechaInicioField = document.getElementById("altaFechaInscripcion");
  const hiddenFechaInicioField = document.getElementById("altaFechaInicio");
  const portalUserField = document.getElementById("altaPortalUser");
  const portalPasswordField = document.getElementById("altaPassword");

  if (!fechaInicioField.value) {
    fechaInicioField.value = formatDateForInput(new Date());
  }
  hiddenFechaInicioField.value = fechaInicioField.value;
  if (sucursal) {
    const expectedPrefix = sucursal === "Tlaxcala" ? "TLX" : sucursal === "Puebla" ? "PUE" : "ALT";
    if (!studentCodeField.value || !studentCodeField.value.startsWith(`${expectedPrefix}-${fechaInicioField.value.slice(2, 4)}-`)) {
      studentCodeField.value = generateStudentCode(sucursal, fechaInicioField.value);
    }
  }

  portalUserField.value = telefono;
  portalPasswordField.value = buildStudentPortalPassword(fechaNacimiento);
  updateAltaElectorFieldLabel();
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

function getAgeFromBirthDate(dateValue) {
  const normalized = String(dateValue || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return null;
  }

  const birthDate = new Date(`${normalized}T12:00:00`);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

function isStudentMinorByBirthDate(dateValue) {
  const age = getAgeFromBirthDate(dateValue);
  return age === null ? false : age < 18;
}

function updateAltaElectorFieldLabel() {
  if (!altaClaveElectorLabel) {
    return;
  }

  const birthDate = document.getElementById("altaFechaNacimiento")?.value || "";
  const tutorName = document.getElementById("altaTutor")?.value || "";
  const isMinor = isStudentMinorByBirthDate(birthDate);
  const usesTutor = isMinor && String(tutorName).trim();

  altaClaveElectorLabel.textContent = usesTutor
    ? "Clave de elector del tutor"
    : isMinor
      ? "Clave de elector (alumna o tutor)"
      : "Clave de elector de la alumna";
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

function getStudentStartDateValue(student) {
  const createdAt = String(student?.createdAt || "").trim();
  return String(student?.fechaInicio || student?.fechaInscripcion || (createdAt ? createdAt.slice(0, 10) : "")).trim();
}

function getLocalDateValueFromTimestamp(value) {
  const normalizedValue = String(value || "").trim();
  if (!normalizedValue) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    return normalizedValue;
  }

  const parsedDate = new Date(normalizedValue);
  if (!Number.isNaN(parsedDate.getTime())) {
    return getCurrentMexicoDateValue(parsedDate);
  }

  const fallbackDate = normalizedValue.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(fallbackDate) ? fallbackDate : "";
}

function getStudentAltaCreatedDate(student) {
  return getLocalDateValueFromTimestamp(student?.createdAt);
}

function isAllBranchesScope(branch) {
  return String(branch || "").trim().toLowerCase() === "todas";
}

function isStudentDeleted(student) {
  return String(student?.estado || "").trim().toLowerCase() === "eliminada";
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
    const baseDate = getStudentStartDateValue(student);
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

function hasModuleAccessForUser(user, module) {
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

function hasInternalAccess(module) {
  return hasModuleAccessForUser(getCurrentInternalUser(), module);
}

function isRoleBranchLimited() {
  const user = getCurrentInternalUser();
  return Boolean(user && (BRANCH_LIMITED_ROLES.has(user.role) || isTeacherInternalUser(user)));
}

function getAllowedBranch() {
  const user = getCurrentInternalUser();
  if (!user || !isRoleBranchLimited()) {
    return "";
  }
  return isAllBranchesScope(user.branch) ? "" : user.branch;
}

function matchesCurrentBranch(branch) {
  const allowedBranch = getAllowedBranch();
  return !allowedBranch || branch === allowedBranch;
}

function getUserInternalPlatformModules(user) {
  if (!user || user.status !== "Activo") {
    return [];
  }

  return INTERNAL_PLATFORM_MODULE_ORDER.filter(
    (module) => hasModuleAccessForUser(user, module)
  );
}

function getMixedAdministrativeModules(user) {
  return getUserInternalPlatformModules(user).filter((module) => !TEACHER_BASE_INTERNAL_MODULES.has(module));
}

function shouldShowAccessSelector(user) {
  if (!user || user.status !== "Activo") {
    return false;
  }

  const hasTeacherAccess = isTeacherInternalUser(user);
  if (hasTeacherAccess && getMixedAdministrativeModules(user).length === 0) {
    return false;
  }

  return getPlatformAccessCards(user).length > 1;
}

function shouldForceTeacherPortalAccess(user) {
  return Boolean(user && isTeacherInternalUser(user) && !shouldShowAccessSelector(user));
}

function getPlatformAccessCards(user = getCurrentInternalUser()) {
  const cardMap = {
    dashboard: {
      title: "Dashboard",
      description: "Consulta el resumen operativo general y los indicadores activos.",
      eyebrow: "Sistema interno",
    },
    "crm-prospectos": {
      title: "CRM Prospectos",
      description: "Da seguimiento comercial, agenda y estatus de prospectas.",
      eyebrow: "Sistema interno",
    },
    altas: {
      title: "Altas",
      description: "Captura y actualiza expedientes de nuevas alumnas.",
      eyebrow: "Sistema interno",
    },
    asistencias: {
      title: "Asistencias",
      description: "Registra y revisa asistencias académicas de alumnas.",
      eyebrow: "Sistema interno",
    },
    maestras: {
      title: "Maestras",
      description: "Administra configuración docente y asistencias laborales.",
      eyebrow: "Sistema interno",
    },
    pagos: {
      title: "Pagos",
      description: "Consulta y actualiza pagos, mensualidades y pendientes.",
      eyebrow: "Sistema interno",
    },
    balance: {
      title: "Balance",
      description: "Revisa ingresos, egresos y saldos operativos.",
      eyebrow: "Sistema interno",
    },
    finanzas: {
      title: "Finanzas",
      description: "Gestiona movimientos financieros y su seguimiento.",
      eyebrow: "Sistema interno",
    },
    personal: {
      title: "Personal",
      description: "Consulta y actualiza registros del equipo interno.",
      eyebrow: "Sistema interno",
    },
    "usuarios-accesos": {
      title: "Usuarios y accesos",
      description: "Administra cuentas, permisos y accesos internos.",
      eyebrow: "Sistema interno",
    },
    "portal-maestras": {
      title: "Portal de Maestra",
      description: "Entra a tu portal docente para revisar jornadas y nómina estimada.",
      eyebrow: "Portal docente",
    },
  };

  const cards = getUserInternalPlatformModules(user).map((module) => ({
    module,
    ...cardMap[module],
  }));

  if (isTeacherInternalUser(user)) {
    cards.push({
      module: "portal-maestras",
      ...cardMap["portal-maestras"],
    });
  }

  return cards;
}

function renderAccessSelector() {
  const user = getCurrentInternalUser();
  if (!accessSelectorCards || !accessSelectorName || !accessSelectorSummary) {
    return;
  }

  if (!user || currentAccessMode !== "access-selector") {
    accessSelectorCards.innerHTML = "";
    return;
  }

  const cards = getPlatformAccessCards(user);
  accessSelectorName.textContent = user.fullName || "Venezia One";
  accessSelectorSummary.textContent =
    cards.length > 0
      ? "Selecciona la plataforma a la que deseas ingresar según la tarea que vas a realizar."
      : "Tu usuario no tiene plataformas disponibles para esta sesión.";

  accessSelectorCards.innerHTML = cards
    .map(
      (card) => `
        <button class="access-selector-card" type="button" data-platform-module="${card.module}">
          <span class="access-selector-card-eyebrow">${escapeHtml(card.eyebrow || "Acceso")}</span>
          <strong>${escapeHtml(card.title || card.module)}</strong>
          <p>${escapeHtml(card.description || "Abrir acceso disponible.")}</p>
        </button>
      `
    )
    .join("");
}

function enterSelectedPlatform(module) {
  const user = getCurrentInternalUser();
  if (!user) {
    return;
  }

  if (module === "portal-maestras") {
    currentAccessMode = "teacher";
    publicAccessPanelOpen = false;
    updateSessionUI();
    renderAll();
    setActiveModule("portal-maestras");
    return;
  }

  if (!hasInternalAccess(module)) {
    alert("No tienes permiso para acceder a esta plataforma.");
    return;
  }

  currentAccessMode = "internal";
  publicAccessPanelOpen = false;
  updateSessionUI();
  renderAll();
  setActiveModule(module);
}

function getDefaultModuleForCurrentContext() {
  if (currentAccessMode === "student") {
    return "mi-venezia";
  }

  if (currentAccessMode === "teacher") {
    return "portal-maestras";
  }

  if (currentAccessMode === "access-selector") {
    return "access-selector";
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
      currentAccessMode === "teacher"
        ? false
        : currentAccessMode === "student"
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
  mountTeacherPortalShell();
  if (currentAccessMode !== "student" && shouldForceTeacherPortalAccess(user) && currentAccessMode !== "teacher") {
    console.info("[Portal Maestras] Corrigiendo modo de acceso a teacher", {
      username: user?.username || "",
      role: user?.role || "",
      previousMode: currentAccessMode,
    });
    currentAccessMode = "teacher";
  }
  const selectorMode = currentAccessMode === "access-selector";
  const inApp =
    currentAccessMode === "internal" ||
    currentAccessMode === "student" ||
    currentAccessMode === "teacher" ||
    selectorMode;
  const publicMode = !inApp;
  const studentPortalMode = currentAccessMode === "student";
  const teacherPortalMode = currentAccessMode === "teacher";

  document.body.classList.toggle("public-mode", publicMode);
  document.body.classList.toggle("student-portal-mode", studentPortalMode);
  document.body.classList.toggle("teacher-portal-mode", teacherPortalMode);
  document.body.classList.toggle("access-selector-mode", selectorMode);
  loginShell.hidden = inApp || !publicAccessPanelOpen;
  teacherPortalShell.hidden = !teacherPortalMode;
  appShell.hidden = teacherPortalMode;
  loginShell.style.display = inApp || !publicAccessPanelOpen ? "none" : "grid";
  teacherPortalShell.style.display = teacherPortalMode ? "block" : "none";
  appShell.style.display = teacherPortalMode ? "none" : "grid";

  if (sidebarShell) {
    sidebarShell.hidden = teacherPortalMode || selectorMode;
    sidebarShell.style.display = teacherPortalMode || selectorMode ? "none" : "";
  }

  if (topbarShell) {
    topbarShell.hidden = teacherPortalMode || selectorMode;
    topbarShell.style.display = teacherPortalMode || selectorMode ? "none" : "";
  }

  if (mainContentShell) {
    mainContentShell.dataset.portalMode = selectorMode
      ? "selector"
      : teacherPortalMode
        ? "teacher"
        : studentPortalMode
          ? "student"
          : "admin";
  }

  Object.entries(moduleSections).forEach(([key, section]) => {
    if (!section) {
      return;
    }
    const shouldHideForTeacher = teacherPortalMode && key !== "portal-maestras";
    const shouldHideForSelector = selectorMode && key !== "access-selector";
    section.hidden = shouldHideForTeacher || shouldHideForSelector;
    section.style.display = shouldHideForTeacher || shouldHideForSelector ? "none" : "";
  });

  if (currentAccessMode === "internal" && user) {
    userBadge.hidden = false;
    userBadge.textContent = `${user.fullName} | ${user.role}${user.branch && user.branch !== "Todas" ? ` | ${user.branch}` : ""}`;
    internalLogoutButton.hidden = false;
    internalLoginError.hidden = true;
  } else if (currentAccessMode === "student") {
    userBadge.hidden = false;
    userBadge.textContent = "Mi Venezia | Estudiante";
    internalLogoutButton.hidden = false;
    internalLoginError.hidden = true;
  } else if (currentAccessMode === "teacher" && user) {
    userBadge.hidden = false;
    userBadge.textContent = `Portal Maestras | ${user.fullName || "Maestra"}`;
    internalLogoutButton.hidden = false;
    internalLoginError.hidden = true;
  } else if (selectorMode && user) {
    userBadge.hidden = true;
    internalLogoutButton.hidden = false;
    internalLoginError.hidden = true;
  } else {
    userBadge.hidden = true;
    internalLogoutButton.hidden = true;
  }

  applyRoleToSidebar();
}

function openPublicAccessPanel() {
  activeModule = "web-venezia";
  currentAccessMode = "logged-out";
  publicAccessPanelOpen = true;
  internalLoginForm.reset();
  internalLoginError.hidden = true;
  updateSessionUI();
}

async function restoreInternalAccessFromSavedSession() {
  internalUsers = await dataService.entities.internalUsers.getAllPrimary(() => []);
  await normalizeInternalUsers();

  const user = getCurrentInternalUser();
  if (!currentInternalUserId || !user || user.status !== "Activo") {
    currentInternalUserId = "";
    dataService.sessions.clearInternal();
    return false;
  }

  const teacherMode = isTeacherInternalUser(user);
  console.info("[Portal Maestras] Restaurando sesión", {
    username: user.username,
    role: user.role,
    teacherMode,
  });
  activeModule = "web-venezia";
  currentAccessMode = shouldShowAccessSelector(user)
    ? "access-selector"
    : teacherMode
      ? "teacher"
      : "internal";
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
  populateFinancialEntryBranchFields();
  const allowedBranch = getAllowedBranch();
  const branchLocked = Boolean(allowedBranch);

  if (branchLocked) {
    document.getElementById("altaSucursal").value = allowedBranch;
    document.getElementById("teacherBranch").value = allowedBranch;
    teacherAttendanceBranch.value = allowedBranch;
    if (teacherPaymentBranch) {
      teacherPaymentBranch.value = allowedBranch;
    }
    teacherSummaryBranchFilter.value = allowedBranch;
    financeBranchField.value = allowedBranch;
    balanceExpenseBranchField.value = allowedBranch;
    attendanceSucursalFilter.value = allowedBranch;
    balanceBranchFilter.value = allowedBranch;
    financeBranchFilter.value = allowedBranch;
    dashboardBranchFilter.value = allowedBranch;
  }

  document.getElementById("altaSucursal").disabled = branchLocked;
  document.getElementById("teacherBranch").disabled = branchLocked;
  teacherAttendanceBranch.disabled = branchLocked;
  if (teacherPaymentBranch) {
    teacherPaymentBranch.disabled = branchLocked;
  }
  financeBranchField.value = branchLocked ? allowedBranch : financeBranchField.value;
  financeBranchField.disabled = branchLocked;
  balanceExpenseBranchField.value = branchLocked ? allowedBranch : balanceExpenseBranchField.value;
  balanceExpenseBranchField.disabled = branchLocked;
  document.getElementById("staffSucursal").value = branchLocked ? allowedBranch : document.getElementById("staffSucursal").value;
  document.getElementById("staffSucursal").disabled = branchLocked;
  attendanceSucursalFilter.disabled = branchLocked;
  teacherSummaryBranchFilter.disabled = branchLocked;
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
  teacherPortalDashboard.hidden = true;
  resetPortalPasswordForm(miVeneziaPasswordForm, miVeneziaPasswordFeedback);
  resetPortalPasswordForm(teacherPortalPasswordForm, teacherPortalPasswordFeedback);
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
    return !isStudentDeleted(student) && (!prospect || prospect.estado === "Alta completada" || prospect.estado === "Inscrita");
  });
  const operationalStudentIds = new Set(allOperationalStudents.map((student) => student.id));

  if (studentAccessRecords.some((record) => !operationalStudentIds.has(record.studentId))) {
    changed = true;
  }

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
  const sucursal = String(allowedBranch || formData.get("sucursal") || "").trim();

  if (!isValidSystemBranch(sucursal)) {
    alert("Selecciona una sucursal valida del sistema para registrar el movimiento financiero.");
    return null;
  }

  return {
    id: existingId || crypto.randomUUID(),
    fecha: formData.get("fecha"),
    sucursal,
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
      <p class="web-course-availability-title">${escapeHtml(course.availabilityTitle || "Detalle del curso")}</p>
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
  return;
}

function isEligiblePaymentStatus(value) {
  return PAYMENT_FINANCE_ELIGIBLE_STATUSES.has(String(value || "").trim());
}

function getPaidPaymentConcepts(record) {
  return BALANCE_PAYMENT_CONCEPT_FIELDS.filter(({ key }) => isEligiblePaymentStatus(record[key]));
}

function isRealPaidPaymentRecord(record) {
  return Boolean(record?.id) && parsePaymentAmount(record?.cantidadPagada) > 0 && getPaidPaymentConcepts(record).length > 0;
}

function getPaymentMovementConceptLabels(record) {
  return getPaidPaymentConcepts(record).map(({ movementLabel, label }) => movementLabel || label);
}

function getStoredPaymentRealDate(record) {
  const value = String(record?.paymentRealDate || "").slice(0, 10);
  return value || "";
}

function getLegacyPaymentRealDateFallback(record) {
  const createdDate = String(record?.createdAt || "").slice(0, 10);
  if (createdDate) {
    return createdDate;
  }
  return record?.mesPago ? `${record.mesPago}-01` : "";
}

function resolvePaymentRealDate(currentRecord, nextRecord) {
  const currentRealDate = getStoredPaymentRealDate(currentRecord);
  if (!isRealPaidPaymentRecord(nextRecord)) {
    return currentRealDate;
  }

  if (currentRealDate) {
    return currentRealDate;
  }

  if (!isRealPaidPaymentRecord(currentRecord)) {
    return formatDateForInput(new Date());
  }

  return getLegacyPaymentRealDateFallback(currentRecord || nextRecord);
}

function normalizePaymentMovementConcept(value) {
  return String(value || "").trim();
}

function isAccumulatedPaymentConcept(value) {
  return normalizePaymentMovementConcept(value).includes(",");
}

function getSafeStoredPaymentConcept(record) {
  const directValue = normalizePaymentMovementConcept(record?.paymentMovementConcept || record?.paymentConcept);
  if (directValue) {
    return directValue;
  }

  const conceptValue = normalizePaymentMovementConcept(record?.concepto);
  if (conceptValue && !isAccumulatedPaymentConcept(conceptValue)) {
    return conceptValue;
  }

  return "";
}

function getChangedPaymentMovementConcepts(currentRecord, nextRecord) {
  return BALANCE_PAYMENT_CONCEPT_FIELDS
    .filter(({ key }) => {
      const previousStatus = String(currentRecord?.[key] || "").trim();
      const nextStatus = String(nextRecord?.[key] || "").trim();
      return isEligiblePaymentStatus(nextStatus) && previousStatus !== nextStatus;
    })
    .map(({ movementLabel, label }) => movementLabel || label);
}

function resolvePaymentMovementConcept(currentRecord, nextRecord, existingFinanceRecord = null) {
  const changedConcepts = getChangedPaymentMovementConcepts(currentRecord, nextRecord);
  if (changedConcepts.length > 0) {
    return changedConcepts.join(" + ");
  }

  const storedConcept =
    getSafeStoredPaymentConcept(existingFinanceRecord) ||
    normalizePaymentMovementConcept(currentRecord?.paymentMovementConcept);
  if (storedConcept) {
    return storedConcept;
  }

  const nextConcepts = getPaymentMovementConceptLabels(nextRecord);
  if (nextConcepts.length === 1) {
    return nextConcepts[0];
  }

  return "Pago registrado";
}

function getBalancePaymentConceptDisplay(record) {
  const storedConcept = getSafeStoredPaymentConcept(record);
  if (storedConcept) {
    return storedConcept;
  }

  const category = normalizePaymentMovementConcept(record?.categoria);
  if (category === "Colegiatura" || category === "Certificado P1" || category === "Certificado P2") {
    return "Pago registrado";
  }

  return category || "Pago registrado";
}

function buildPaymentFinanceReference(paymentId) {
  return paymentId ? `${PAYMENT_FINANCE_REFERENCE_PREFIX}${paymentId}` : "";
}

function getLinkedPaymentFinanceRecords(paymentId, records = financeRecords) {
  if (!paymentId) {
    return [];
  }

  return records
    .filter((record) => record.relatedPaymentId === paymentId)
    .sort((left, right) => {
      const dateComparison = String(left.createdAt || "").localeCompare(String(right.createdAt || ""));
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return String(left.id || "").localeCompare(String(right.id || ""));
    });
}

function getPaymentEffectiveDate(record) {
  const storedRealDate = getStoredPaymentRealDate(record);
  if (storedRealDate) {
    return storedRealDate;
  }

  return getLegacyPaymentRealDateFallback(record);
}

function getPaymentFinanceCategory(record) {
  if (isEligiblePaymentStatus(record.certificadoP1)) {
    return "Certificado P1";
  }

  if (isEligiblePaymentStatus(record.certificadoP2)) {
    return "Certificado P2";
  }

  if ([
    record.mensualidad1,
    record.mensualidad2,
    record.mensualidad3,
    record.mensualidad4,
    record.mensualidad5,
  ].some(isEligiblePaymentStatus)) {
    return "Colegiatura";
  }

  return "Otro ingreso";
}

function buildPaymentFinanceRecord(paymentRecord, student, existingFinanceRecord = null) {
  const paymentConcept = resolvePaymentMovementConcept(paymentRecord, paymentRecord, existingFinanceRecord);

  return {
    id: existingFinanceRecord?.id || crypto.randomUUID(),
    fecha: existingFinanceRecord?.fecha || getPaymentEffectiveDate(paymentRecord),
    sucursal: student.sucursal || "",
    tipo: "Ingreso",
    categoria: getPaymentFinanceCategory(paymentRecord),
    concepto: paymentConcept,
    paymentConcept,
    alumna: student.nombre || "",
    monto: parsePaymentAmount(paymentRecord.cantidadPagada),
    metodoPago: paymentRecord.metodoPago || "-",
    usuario: student.usuarioAlta || student.inscribio || "",
    observaciones: paymentRecord.observaciones || "",
    createdAt:
      existingFinanceRecord?.createdAt ||
      paymentRecord.updatedAt ||
      paymentRecord.createdAt ||
      new Date().toISOString(),
    reference: buildPaymentFinanceReference(paymentRecord.id),
    relatedStudentId: paymentRecord.studentId || "",
    relatedPaymentId: paymentRecord.id,
  };
}

function isSamePaymentFinanceRecord(currentRecord, nextRecord) {
  return (
    String(currentRecord?.fecha || "") === String(nextRecord?.fecha || "") &&
    String(currentRecord?.sucursal || "") === String(nextRecord?.sucursal || "") &&
    String(currentRecord?.tipo || "") === String(nextRecord?.tipo || "") &&
    String(currentRecord?.categoria || "") === String(nextRecord?.categoria || "") &&
    String(currentRecord?.concepto || "") === String(nextRecord?.concepto || "") &&
    Number(currentRecord?.monto || 0) === Number(nextRecord?.monto || 0) &&
    String(currentRecord?.metodoPago || "") === String(nextRecord?.metodoPago || "") &&
    String(currentRecord?.usuario || "") === String(nextRecord?.usuario || "") &&
    String(currentRecord?.observaciones || "") === String(nextRecord?.observaciones || "") &&
    String(currentRecord?.paymentConcept || "") === String(nextRecord?.paymentConcept || "") &&
    String(currentRecord?.alumna || "") === String(nextRecord?.alumna || "") &&
    String(currentRecord?.reference || "") === String(nextRecord?.reference || "") &&
    String(currentRecord?.relatedStudentId || "") === String(nextRecord?.relatedStudentId || "") &&
    String(currentRecord?.relatedPaymentId || "") === String(nextRecord?.relatedPaymentId || "")
  );
}

async function deleteLinkedPaymentFinanceRecords(paymentId) {
  const linkedRecords = getLinkedPaymentFinanceRecords(paymentId);
  let synced = true;

  for (const record of linkedRecords) {
    const deleteResult = await dataService.entities.financialMovements.deleteOne(record.id, { alertOnFailure: false });
    financeRecords = deleteResult.records;
    if (!deleteResult.synced) {
      synced = false;
      break;
    }
  }

  return {
    synced,
    deletedCount: linkedRecords.length,
  };
}

async function syncPaymentFinanceRecord(paymentRecord, { student: providedStudent = null } = {}) {
  const linkedRecords = getLinkedPaymentFinanceRecords(paymentRecord?.id);
  const canonicalRecord = linkedRecords[0] || null;
  const student = providedStudent || getStudentById(paymentRecord?.studentId);
  const isEligible = isRealPaidPaymentRecord(paymentRecord) && Boolean(student);

  if (!isEligible) {
    if (linkedRecords.length === 0) {
      return {
        synced: true,
        deleted: false,
      };
    }

    const deleteResult = await deleteLinkedPaymentFinanceRecords(paymentRecord.id);
    return {
      synced: deleteResult.synced,
      deleted: deleteResult.deletedCount > 0,
    };
  }

  const nextRecord = buildPaymentFinanceRecord(paymentRecord, student, canonicalRecord);
  if (!canonicalRecord || !isSamePaymentFinanceRecord(canonicalRecord, nextRecord)) {
    const saveResult = await saveFinanceRecord(nextRecord);
    if (!saveResult.synced) {
      return saveResult;
    }
  }

  let duplicatesRemoved = 0;
  for (const duplicateRecord of linkedRecords.slice(1)) {
    const deleteResult = await dataService.entities.financialMovements.deleteOne(duplicateRecord.id, { alertOnFailure: false });
    financeRecords = deleteResult.records;
    if (!deleteResult.synced) {
      return {
        synced: false,
        error: deleteResult.error,
      };
    }
    duplicatesRemoved += 1;
  }

  return {
    synced: true,
    record: nextRecord,
    duplicatesRemoved,
  };
}

function mapLinkedPaymentFinanceRecord(record) {
  return {
    ...record,
    sourceType: "payment",
    sourceRecordId: record.relatedPaymentId || record.id,
    sourceStudentId: record.relatedStudentId || "",
  };
}

function getDerivedFinanceIncomeRecords(linkedPaymentIds = new Set()) {
  const studentsById = new Map(students.map((student) => [student.id, student]));

  return paymentRecords
    .map((record) => {
      const student = studentsById.get(record.studentId);
      if (!student || linkedPaymentIds.has(record.id) || !isRealPaidPaymentRecord(record)) {
        return null;
      }

      return {
        id: `payment:${record.id}`,
        sourceType: "payment",
        sourceRecordId: record.id,
        sourceStudentId: record.studentId,
        fecha: getPaymentEffectiveDate(record),
        sucursal: student.sucursal || "",
        tipo: "Ingreso",
        categoria: getPaymentFinanceCategory(record),
        concepto: resolvePaymentMovementConcept(record, record, null),
        paymentConcept: normalizePaymentMovementConcept(record.paymentMovementConcept),
        alumna: student.nombre || "",
        monto: parsePaymentAmount(record.cantidadPagada),
        metodoPago: record.metodoPago || "-",
        usuario: student.usuarioAlta || student.inscribio || "",
        observaciones: record.observaciones || "",
        createdAt: record.createdAt || record.updatedAt || "",
        updatedAt: record.updatedAt || record.createdAt || "",
      };
    })
    .filter(Boolean);
}

function getDerivedFinanceExpenseRecords() {
  return balanceExpenses
    .map((record) => {
      const monto = Number(record.total || 0);
      if (!record.fecha || !(monto > 0)) {
        return null;
      }

      return {
        id: `balance-expense:${record.id}`,
        sourceType: "balance-expense",
        sourceRecordId: record.id,
        fecha: record.fecha,
        sucursal: record.sucursal || "",
        tipo: "Egreso",
        categoria: "Otro egreso",
        concepto: record.nombreGasto || "Egreso manual",
        monto,
        metodoPago: "N/A",
        usuario: record.responsableGasto || "",
        observaciones: record.nota || "",
        cantidad: Number(record.cantidad || 0),
        costoUnitario: Number(record.costoUnitario || 0),
        nombreGasto: record.nombreGasto || "",
        responsableGasto: record.responsableGasto || "",
        createdAt: record.createdAt || "",
      };
    })
    .filter(Boolean);
}

function getCentralFinanceRecords() {
  const linkedPaymentFinanceRecords = financeRecords
    .filter((record) => record.relatedPaymentId)
    .map(mapLinkedPaymentFinanceRecord);
  const linkedPaymentIds = new Set(
    linkedPaymentFinanceRecords
      .map((record) => record.sourceRecordId)
      .filter(Boolean)
  );
  const nativeFinanceRecords = financeRecords.filter(
    (record) =>
      !record.relatedPaymentId &&
      record.sourceType !== "payment" &&
      record.sourceType !== "balance-expense" &&
      !String(record.id || "").startsWith("payment:") &&
      !String(record.id || "").startsWith("balance-expense:")
  );

  return nativeFinanceRecords.concat(
    linkedPaymentFinanceRecords,
    getDerivedFinanceIncomeRecords(linkedPaymentIds),
    getDerivedFinanceExpenseRecords()
  );
}

function auditPaymentFinanceLinks({
  payments = paymentRecords,
  finance = financeRecords,
} = {}) {
  const paymentsById = new Map(payments.map((record) => [record.id, record]));
  const linkedFinanceByPaymentId = new Map();

  finance
    .filter((record) => record.relatedPaymentId)
    .forEach((record) => {
      const bucket = linkedFinanceByPaymentId.get(record.relatedPaymentId) || [];
      bucket.push(record);
      linkedFinanceByPaymentId.set(record.relatedPaymentId, bucket);
    });

  const missingLinkedFinance = payments.filter(
    (record) => isRealPaidPaymentRecord(record) && (linkedFinanceByPaymentId.get(record.id) || []).length === 0
  );
  const duplicateLinkedFinance = Array.from(linkedFinanceByPaymentId.entries())
    .filter(([, records]) => records.length > 1)
    .map(([paymentId, records]) => ({
      paymentId,
      records,
    }));
  const orphanLinkedFinance = finance.filter(
    (record) => record.relatedPaymentId && !paymentsById.has(record.relatedPaymentId)
  );
  const missingStoredPaymentDate = payments.filter(
    (record) => isRealPaidPaymentRecord(record) && !getStoredPaymentRealDate(record)
  );
  const ineligibleLinkedFinance = finance
    .filter((record) => {
      if (!record.relatedPaymentId) {
        return false;
      }
      const paymentRecord = paymentsById.get(record.relatedPaymentId);
      return paymentRecord && !isRealPaidPaymentRecord(paymentRecord);
    })
    .map((record) => ({
      financeRecord: record,
      paymentRecord: paymentsById.get(record.relatedPaymentId),
    }));

  return {
    missingLinkedFinance,
    duplicateLinkedFinance,
    orphanLinkedFinance,
    missingStoredPaymentDate,
    ineligibleLinkedFinance,
  };
}

function logPaymentFinanceAudit(findings = auditPaymentFinanceLinks()) {
  if (
    findings.missingLinkedFinance.length === 0 &&
    findings.duplicateLinkedFinance.length === 0 &&
    findings.orphanLinkedFinance.length === 0 &&
    findings.missingStoredPaymentDate.length === 0 &&
    findings.ineligibleLinkedFinance.length === 0
  ) {
    return findings;
  }

  console.warn("Payment/finance audit findings", {
    missingLinkedFinance: findings.missingLinkedFinance.map((record) => ({
      paymentId: record.id,
      studentId: record.studentId,
      amount: parsePaymentAmount(record.cantidadPagada),
      paymentDate: getPaymentEffectiveDate(record),
    })),
    duplicateLinkedFinance: findings.duplicateLinkedFinance.map(({ paymentId, records }) => ({
      paymentId,
      financeRecordIds: records.map((record) => record.id),
    })),
    orphanLinkedFinance: findings.orphanLinkedFinance.map((record) => ({
      financeRecordId: record.id,
      paymentId: record.relatedPaymentId,
    })),
    missingStoredPaymentDate: findings.missingStoredPaymentDate.map((record) => ({
      paymentId: record.id,
      studentId: record.studentId,
      fallbackDate: getLegacyPaymentRealDateFallback(record),
    })),
    ineligibleLinkedFinance: findings.ineligibleLinkedFinance.map(({ financeRecord, paymentRecord }) => ({
      financeRecordId: financeRecord.id,
      paymentId: financeRecord.relatedPaymentId,
      studentId: paymentRecord?.studentId || "",
    })),
  });

  return findings;
}

async function reconcilePaymentFinanceRecords() {
  const findings = auditPaymentFinanceLinks();
  const studentsById = new Map(students.map((student) => [student.id, student]));

  for (const record of findings.missingLinkedFinance) {
    const syncResult = await syncPaymentFinanceRecord(record, {
      student: studentsById.get(record.studentId) || null,
    });
    if (!syncResult.synced) {
      console.error("No se pudo reconciliar el pago con finanzas.", {
        paymentId: record.id,
        error: syncResult.error,
      });
      break;
    }
  }

  for (const finding of findings.ineligibleLinkedFinance) {
    const paymentRecord = finding.paymentRecord;
    if (!paymentRecord) {
      continue;
    }
    const syncResult = await syncPaymentFinanceRecord(paymentRecord, {
      student: studentsById.get(paymentRecord.studentId) || null,
    });
    if (!syncResult.synced) {
      console.error("No se pudo limpiar el ingreso financiero inconsistente.", {
        paymentId: paymentRecord.id,
        error: syncResult.error,
      });
      break;
    }
  }

  return logPaymentFinanceAudit();
}

function getFinanceRecordsForScope({
  records = getCentralFinanceRecords(),
  scope = "month",
  date = formatDateForInput(new Date()),
  month = selectedMonth,
  from = "",
  to = "",
  branch = "",
  respectCurrentBranch = true,
} = {}) {
  const anchorDate = date || formatDateForInput(new Date());
  const getWeekRange = (dateValue) => {
    const value = dateValue || formatDateForInput(new Date());
    const baseDate = new Date(`${value}T12:00:00`);
    if (Number.isNaN(baseDate.getTime())) {
      return {
        from: value,
        to: value,
      };
    }

    const day = baseDate.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const start = new Date(baseDate);
    start.setDate(baseDate.getDate() + diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      from: formatDateForInput(start),
      to: formatDateForInput(end),
    };
  };
  const weekRange = getWeekRange(anchorDate);

  return records.filter((record) => {
    const recordDate = String(record?.fecha || "").slice(0, 10);
    if (!recordDate) {
      return false;
    }

    if (respectCurrentBranch && !matchesCurrentBranch(record.sucursal)) {
      return false;
    }

    if (branch && record.sucursal !== branch) {
      return false;
    }

    if (scope === "day") {
      return recordDate === anchorDate;
    }

    if (scope === "week") {
      return recordDate >= weekRange.from && recordDate <= weekRange.to;
    }

    if (scope === "range") {
      if (from && recordDate < from) {
        return false;
      }
      if (to && recordDate > to) {
        return false;
      }
      return true;
    }

    if (scope === "month") {
      return month ? isDateInMonth(recordDate, month) : true;
    }

    return true;
  });
}

function summarizeFinancialRecords(records, metadata = {}) {
  const safeRecords = Array.isArray(records) ? records : [];
  const ingresos = safeRecords
    .filter((record) => record.tipo === "Ingreso")
    .reduce((sum, record) => sum + Number(record.monto || 0), 0);
  const egresos = safeRecords
    .filter((record) => record.tipo === "Egreso")
    .reduce((sum, record) => sum + Number(record.monto || 0), 0);
  const utilidad = ingresos - egresos;

  return {
    ...metadata,
    ingresos,
    egresos,
    utilidad,
    balance: utilidad,
    movimientos: safeRecords.length,
  };
}

function getCurrentFinanceYearRange(dateValue = getCurrentMexicoDateValue()) {
  const anchorDate = dateValue || getCurrentMexicoDateValue();
  const year = String(anchorDate || "").slice(0, 4) || String(new Date().getFullYear());

  return {
    year,
    from: `${year}-01-01`,
    to: anchorDate,
  };
}

function getExecutiveFinanceSnapshot({
  branch = "",
  records = getCentralFinanceRecords(),
  date = getCurrentMexicoDateValue(),
  respectCurrentBranch = true,
  displayMonth = "",
  historyMonth = "",
} = {}) {
  const anchorDate = date || getCurrentMexicoDateValue();
  const anchorMonth = String(anchorDate || getCurrentMexicoDateValue()).slice(0, 7);
  const windowMonth = displayMonth || anchorMonth;
  const selectedHistoryMonth = historyMonth || anchorMonth;
  const sourceRecords = Array.isArray(records) ? records : getCentralFinanceRecords();
  const currentMonthRecords = getFinanceRecordsForScope({
    records: sourceRecords,
    scope: "month",
    month: windowMonth,
    branch,
    respectCurrentBranch,
  });
  const historyMonthRecords = getFinanceRecordsForScope({
    records: sourceRecords,
    scope: "month",
    month: selectedHistoryMonth,
    branch,
    respectCurrentBranch,
  });
  const currentSummary = buildFinanceSummary(currentMonthRecords, {
    allRecords: sourceRecords,
    month: windowMonth,
    date: anchorDate,
    branch,
    respectCurrentBranch,
  });
  const historySummary = buildFinanceSummary(historyMonthRecords, {
    allRecords: sourceRecords,
    month: selectedHistoryMonth,
    date: anchorDate,
    branch,
    respectCurrentBranch,
  });
  const yearRange = getCurrentFinanceYearRange(anchorDate);
  const yearRecords = getFinanceRecordsForScope({
    records: sourceRecords,
    scope: "range",
    from: yearRange.from,
    to: yearRange.to,
    branch,
    respectCurrentBranch,
  });

  return {
    anchorDate,
    anchorMonth,
    windowMonth,
    historyMonth: selectedHistoryMonth,
    windows: currentSummary.windows,
    year: summarizeFinancialRecords(yearRecords, {
      key: yearRange.year,
      label: yearRange.year,
      from: yearRange.from,
      to: yearRange.to,
    }),
    monthlyHistory: historySummary.monthlyHistory,
    byBranch: historySummary.byBranch,
    alerts: currentSummary.alerts,
  };
}

function buildFinanceSummary(
  records,
  {
    allRecords = getCentralFinanceRecords(),
    month = selectedMonth,
    date = formatDateForInput(new Date()),
    branch = "",
    respectCurrentBranch = true,
    branchOrder = DASHBOARD_BRANCHES,
  } = {}
) {
  const anchorDate = date || formatDateForInput(new Date());
  const sourceRecords = Array.isArray(allRecords) ? allRecords : [];
  const monthRecords = Array.isArray(records)
    ? records
    : getFinanceRecordsForScope({ records: sourceRecords, scope: "month", month, branch, respectCurrentBranch });

  const buildPeriodSummary = (periodRecords, metadata = {}) => {
    const ingresos = periodRecords
      .filter((record) => record.tipo === "Ingreso")
      .reduce((sum, record) => sum + Number(record.monto || 0), 0);
    const egresos = periodRecords
      .filter((record) => record.tipo === "Egreso")
      .reduce((sum, record) => sum + Number(record.monto || 0), 0);
    const utilidad = ingresos - egresos;

    return {
      ...metadata,
      ingresos,
      egresos,
      utilidad,
      balance: utilidad,
      movimientos: periodRecords.length,
    };
  };
  const formatMonthLabel = (monthValue, short = false) => {
    if (!monthValue) {
      return "-";
    }

    const monthDate = new Date(`${monthValue}-01T12:00:00`);
    if (Number.isNaN(monthDate.getTime())) {
      return monthValue;
    }

    return monthDate.toLocaleDateString("es-MX", {
      month: short ? "short" : "long",
      year: "numeric",
    });
  };
  const getWeekRange = (dateValue) => {
    const baseDate = new Date(`${dateValue}T12:00:00`);
    if (Number.isNaN(baseDate.getTime())) {
      return {
        key: dateValue,
        from: dateValue,
        to: dateValue,
        label: dateValue,
      };
    }

    const day = baseDate.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const start = new Date(baseDate);
    start.setDate(baseDate.getDate() + diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const from = formatDateForInput(start);
    const to = formatDateForInput(end);
    return {
      key: `${from}_${to}`,
      from,
      to,
      label: `${formatDisplayDate(from)} - ${formatDisplayDate(to)}`,
    };
  };

  const dayRecords = getFinanceRecordsForScope({
    records: sourceRecords,
    scope: "day",
    date: anchorDate,
    branch,
    respectCurrentBranch,
  });
  const weekRange = getWeekRange(anchorDate);
  const weekRecords = getFinanceRecordsForScope({
    records: sourceRecords,
    scope: "week",
    date: anchorDate,
    branch,
    respectCurrentBranch,
  });
  const accumulatedRecords = getFinanceRecordsForScope({
    records: sourceRecords,
    scope: "accumulated",
    branch,
    respectCurrentBranch,
  });

  const daySummary = buildPeriodSummary(dayRecords, {
    key: anchorDate,
    label: formatDisplayDate(anchorDate),
    from: anchorDate,
    to: anchorDate,
  });
  const weekSummary = buildPeriodSummary(weekRecords, weekRange);
  const monthSummary = buildPeriodSummary(monthRecords, {
    key: month,
    label: formatMonthLabel(month),
  });
  const accumulatedSummary = buildPeriodSummary(accumulatedRecords, {
    key: "accumulated",
    label: "Acumulado",
  });

  const branchNames = (branch ? [branch] : branchOrder.concat(accumulatedRecords.map((record) => record.sucursal)))
    .filter(Boolean)
    .filter((value, index, list) => list.indexOf(value) === index);

  const byBranch = branchNames.map((branchName) => ({
    branch: branchName,
    day: buildPeriodSummary(
      getFinanceRecordsForScope({
        records: sourceRecords,
        scope: "day",
        date: anchorDate,
        branch: branchName,
        respectCurrentBranch,
      }),
      {
        key: anchorDate,
        label: formatDisplayDate(anchorDate),
        from: anchorDate,
        to: anchorDate,
      }
    ),
    week: buildPeriodSummary(
      getFinanceRecordsForScope({
        records: sourceRecords,
        scope: "week",
        date: anchorDate,
        branch: branchName,
        respectCurrentBranch,
      }),
      weekRange
    ),
    month: buildPeriodSummary(
      getFinanceRecordsForScope({
        records: sourceRecords,
        scope: "month",
        month,
        branch: branchName,
        respectCurrentBranch,
      }),
      {
        key: month,
        label: formatMonthLabel(month),
      }
    ),
    accumulated: buildPeriodSummary(
      getFinanceRecordsForScope({
        records: sourceRecords,
        scope: "accumulated",
        branch: branchName,
        respectCurrentBranch,
      }),
      {
        key: "accumulated",
        label: "Acumulado",
      }
    ),
  }));

  const monthlyHistoryMap = accumulatedRecords.reduce((map, record) => {
    const recordMonth = String(record.fecha || "").slice(0, 7);
    if (!recordMonth) {
      return map;
    }

    const bucket = map.get(recordMonth) || [];
    bucket.push(record);
    map.set(recordMonth, bucket);
    return map;
  }, new Map());
  const monthlyHistoryRows = [...monthlyHistoryMap.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([recordMonth, monthBucket]) =>
      buildPeriodSummary(monthBucket, {
        month: recordMonth,
        key: recordMonth,
        label: formatMonthLabel(recordMonth, true),
      })
    );
  const anchorYear = String(month || anchorDate).slice(0, 4);
  const currentYearRows = monthlyHistoryRows.filter((row) => row.month?.startsWith(`${anchorYear}-`));
  const yearTotals = currentYearRows.reduce(
    (totals, row) => ({
      ingresos: totals.ingresos + row.ingresos,
      egresos: totals.egresos + row.egresos,
      utilidad: totals.utilidad + row.utilidad,
      balance: totals.balance + row.balance,
      movimientos: totals.movimientos + row.movimientos,
    }),
    {
      year: anchorYear,
      ingresos: 0,
      egresos: 0,
      utilidad: 0,
      balance: 0,
      movimientos: 0,
    }
  );
  const averagesDivisor = currentYearRows.length || 1;
  const averages = {
    ingresos: yearTotals.ingresos / averagesDivisor,
    egresos: yearTotals.egresos / averagesDivisor,
    utilidad: yearTotals.utilidad / averagesDivisor,
    balance: yearTotals.balance / averagesDivisor,
    movimientos: yearTotals.movimientos / averagesDivisor,
  };

  const alerts = [];
  if (monthSummary.movimientos === 0) {
    alerts.push({
      tone: "neutral",
      title: "Sin movimientos del mes",
      detail: "No hay registros financieros en el mes seleccionado.",
    });
  } else {
    if (monthSummary.utilidad < 0) {
      alerts.push({
        tone: "danger",
        title: "Utilidad mensual negativa",
        detail: `El mes actual lleva ${formatCurrency(monthSummary.utilidad)} de utilidad.`,
      });
    }

    if (monthSummary.ingresos > 0 && monthSummary.egresos >= monthSummary.ingresos * 0.8) {
      alerts.push({
        tone: "warning",
        title: "Egresos altos frente a ingresos",
        detail: "Los egresos ya consumen 80% o más de los ingresos del mes.",
      });
    }

    const branchesWithNegativeUtility = byBranch.filter((item) => item.month.utilidad < 0);
    branchesWithNegativeUtility.forEach((item) => {
      alerts.push({
        tone: "warning",
        title: `${item.branch} con presión financiera`,
        detail: `La utilidad mensual de ${item.branch} va en ${formatCurrency(item.month.utilidad)}.`,
      });
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      tone: "positive",
      title: "Sin alertas críticas",
      detail: "La operación financiera del mes se mantiene estable con los registros actuales.",
    });
  }

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      currency: "MXN",
      anchorDate,
      anchorMonth: month,
      branchFilter: branch,
      totalRecords: monthRecords.length,
      accumulatedRecords: accumulatedRecords.length,
    },
    totals: {
      ingresos: monthSummary.ingresos,
      egresos: monthSummary.egresos,
      utilidad: monthSummary.utilidad,
      balance: monthSummary.balance,
      movimientos: monthSummary.movimientos,
    },
    windows: {
      day: daySummary,
      week: weekSummary,
      month: monthSummary,
      accumulated: accumulatedSummary,
    },
    byBranch,
    monthlyHistory: {
      rows: monthlyHistoryRows,
      yearTotals,
      averages,
    },
    alerts,
  };
}

function matchesDashboardBranch(branch) {
  return matchesCurrentBranch(branch) && (!dashboardBranchFilter.value || branch === dashboardBranchFilter.value);
}

function getValidSystemBranches() {
  const allowedBranch = String(getAllowedBranch() || "").trim();
  const branchOptions = [
    ...new Set(
      [
        ...prospects.map((record) => record.sucursal),
        ...students.map((record) => record.sucursal),
        ...staffRecords.map((record) => record.sucursal),
      ]
        .map((value) => String(value || "").trim())
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));

  if (allowedBranch && !branchOptions.includes(allowedBranch)) {
    branchOptions.unshift(allowedBranch);
  }

  return branchOptions;
}

function isValidSystemBranch(branch) {
  return getValidSystemBranches().includes(String(branch || "").trim());
}

function populateFinancialEntryBranchFields() {
  const branchOptions = getValidSystemBranches();
  [financeBranchField, balanceExpenseBranchField].filter(Boolean).forEach((field) => {
    populateSelectWithValues(field, branchOptions, "Selecciona una opcion");
  });
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
  return getFinanceRecordsForScope({
    month: selectedMonth,
    branch: dashboardBranchFilter.value,
  });
}

function populateDashboardBranchFilter() {
  const branchOptions = [
    ...new Set(
      [
        ...prospects.map((record) => record.sucursal),
        ...students.map((record) => record.sucursal),
        ...financeRecords.map((record) => record.sucursal),
        ...staffRecords.map((record) => record.sucursal),
      ]
        .map((value) => String(value || "").trim())
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));

  populateSelectWithValues(dashboardBranchFilter, branchOptions, "Todas");
}

function populateDashboardMonthFilter() {
  if (!dashboardMonthFilter) {
    return;
  }

  const baseMonth = dashboardSelectedMonth || getCurrentMexicoDateValue().slice(0, 7);
  const baseYear = String(baseMonth || getCurrentMexicoDateValue().slice(0, 7)).slice(0, 4) || String(new Date().getFullYear());
  const monthLabels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  dashboardMonthFilter.innerHTML = monthLabels
    .map(
      (label, index) =>
        `<option value="${baseYear}-${String(index + 1).padStart(2, "0")}">${label} ${baseYear}</option>`
    )
    .join("");
  dashboardMonthFilter.value = baseMonth;
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
  populateDashboardBranchFilter();
  populateDashboardMonthFilter();
  const financeSnapshot = getExecutiveFinanceSnapshot({
    branch: dashboardBranchFilter.value,
    displayMonth: dashboardSelectedMonth,
  });

  statIngresosDashboard.textContent = formatCurrency(financeSnapshot.windows.month.ingresos);
  statEgresosDashboard.textContent = formatCurrency(financeSnapshot.windows.month.egresos);
  statBalanceDashboard.textContent = formatCurrency(financeSnapshot.windows.month.utilidad);
  if (statAnnualUtilityDashboard) {
    statAnnualUtilityDashboard.textContent = formatCurrency(financeSnapshot.year.utilidad);
  }

  renderDashboardFinanceComparison(financeSnapshot);
}

function renderDashboardFinanceComparison(financeSnapshot) {
  if (!dashboardFinanceComparisonChart) {
    return;
  }

  const periods = [
    {
      key: "week",
      label: "Semana",
      summary: financeSnapshot.windows.week,
      range: financeSnapshot.windows.week.label,
    },
    {
      key: "month",
      label: "Mes",
      summary: financeSnapshot.windows.month,
      range: financeSnapshot.windows.month.label,
    },
    {
      key: "year",
      label: "Año",
      summary: financeSnapshot.year,
      range: `${formatDisplayDate(financeSnapshot.year.from)} - ${formatDisplayDate(financeSnapshot.year.to)}`,
    },
  ];
  const series = [
    { key: "ingresos", label: "Ingresos", className: "income" },
    { key: "egresos", label: "Egresos", className: "expense" },
    { key: "utilidad", label: "Utilidad", className: "utility" },
  ];
  const maxValue = Math.max(
    1,
    ...periods.flatMap((period) => series.map((item) => Math.abs(Number(period.summary[item.key] || 0))))
  );

  dashboardFinanceComparisonChart.innerHTML = periods
    .map(
      (period) => `
        <article class="dashboard-comparison-group">
          <header class="dashboard-comparison-group-header">
            <div>
              <p class="eyebrow">Comparativo</p>
              <h4>${escapeHtml(period.label)}</h4>
            </div>
            <small>${escapeHtml(period.range || "-")}</small>
          </header>
          <div class="dashboard-comparison-bars">
            ${series
              .map((item) => {
                const rawValue = Number(period.summary[item.key] || 0);
                const height = Math.max((Math.abs(rawValue) / maxValue) * 100, rawValue === 0 ? 0 : 12);
                const negativeClass = rawValue < 0 ? " is-negative" : "";

                return `
                  <article class="dashboard-comparison-bar">
                    <span class="dashboard-comparison-amount">${escapeHtml(formatCurrency(rawValue))}</span>
                    <div class="dashboard-comparison-bar-track${negativeClass}">
                      <div
                        class="dashboard-comparison-bar-fill dashboard-comparison-bar-${escapeHtml(item.className)}${negativeClass}"
                        style="height: ${height.toFixed(2)}%;"
                      ></div>
                    </div>
                    <strong>${escapeHtml(item.label)}</strong>
                  </article>
                `;
              })
              .join("")}
          </div>
        </article>
      `
    )
    .join("");

  if (dashboardFinanceComparisonMeta) {
    dashboardFinanceComparisonMeta.textContent = `Corte al ${formatDisplayDate(
      financeSnapshot.anchorDate
    )} con semana actual, mes ${financeSnapshot.windows.month.label} y acumulado anual.`;
  }
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
  return getStudentStartDateValue(student);
}

function getCurrentWeekRange(dateValue = getCurrentMexicoDateValue()) {
  const baseDate = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(baseDate.getTime())) {
    return {
      from: dateValue,
      to: dateValue,
    };
  }

  const day = baseDate.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(baseDate);
  start.setDate(baseDate.getDate() + diffToMonday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    from: formatDateForInput(start),
    to: formatDateForInput(end),
  };
}

function getFilteredAltaHistory() {
  return students
    .filter((student) => matchesCurrentBranch(student.sucursal) && !isStudentDeleted(student))
    .sort((a, b) => {
      const dateA = getStudentAltaCreatedDate(a) || "0000-00-00";
      const dateB = getStudentAltaCreatedDate(b) || "0000-00-00";
      if (dateA !== dateB) {
        return dateB.localeCompare(dateA);
      }
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });
}

function getCurrentWeekAltaHistory(dateValue = getCurrentMexicoDateValue()) {
  const currentWeek = getCurrentWeekRange(dateValue);
  return getFilteredAltaHistory().filter((student) => {
    const altaCreatedDate = getStudentAltaCreatedDate(student);
    return altaCreatedDate && altaCreatedDate >= currentWeek.from && altaCreatedDate <= currentWeek.to;
  });
}

function getActiveStudentBranchSummary() {
  const activeStudents = students.filter((student) => !isStudentDeleted(student));
  const tlaxcalaCount = activeStudents.filter(
    (student) => normalizeInternalLookupValue(student.sucursal) === "tlaxcala"
  ).length;
  const pueblaCount = activeStudents.filter(
    (student) => normalizeInternalLookupValue(student.sucursal) === "puebla"
  ).length;

  return {
    tlaxcalaCount,
    pueblaCount,
    totalCount: activeStudents.length,
  };
}

function renderAltaHistory() {
  const altaHistory = getFilteredAltaHistory();
  const today = getCurrentMexicoDateValue();
  const currentWeekAltas = getCurrentWeekAltaHistory(today);
  const weekCount = currentWeekAltas.length;
  const monthCount = altaHistory.filter((student) => isDateInMonth(getStudentAltaCreatedDate(student), today.slice(0, 7))).length;

  if (altaWeekCount) {
    altaWeekCount.textContent = weekCount;
  }
  if (altaMonthCount) {
    altaMonthCount.textContent = monthCount;
  }

  altaHistoryTableBody.innerHTML = currentWeekAltas
    .map((student) => {
      const altaCreatedDate = getStudentAltaCreatedDate(student);
      return `
        <tr>
          <td><span class="alta-history-code">${escapeHtml(student.studentCode || student.id || "-")}</span></td>
          <td>${escapeHtml(altaCreatedDate || "-")}</td>
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
              <button class="table-action action-delete" type="button" data-action="delete-student" data-id="${student.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  altaHistoryEmptyState.hidden = currentWeekAltas.length > 0;
}

function getActiveStudents() {
  return students.filter((student) => {
    const prospect = prospects.find((item) => item.id === student.prospectId);
    return (
      matchesCurrentBranch(student.sucursal) &&
      !isStudentDeleted(student) &&
      (!prospect || prospect.estado === "Alta completada" || prospect.estado === "Inscrita")
    );
  });
}

function getStudentById(studentId) {
  return students.find((student) => student.id === studentId);
}

function getStudentReglamentoStatus(student) {
  const fechaConfirmacion = String(student?.fechaLecturaReglamento || "").trim();
  return {
    confirmado: Boolean(student?.lecturaReglamento || fechaConfirmacion),
    fechaConfirmacion,
  };
}

function getStudentContratoStatus(student) {
  const fechaConfirmacion = String(student?.fechaLecturaContrato || "").trim();
  return {
    confirmado: Boolean(student?.lecturaContrato || fechaConfirmacion),
    fechaConfirmacion,
  };
}

function getStudentDocumentBadge(student) {
  const reglamento = getStudentReglamentoStatus(student);
  const contrato = getStudentContratoStatus(student);

  if (reglamento.confirmado && contrato.confirmado) {
    return "Ambos";
  }

  if (reglamento.confirmado) {
    return "Reg";
  }

  if (contrato.confirmado) {
    return "Cont";
  }

  return "—";
}

function getStudentAttendanceBaseDate(student, history = []) {
  const explicitStartDate = getStudentStartDateValue(student);
  const fallbackStartDate =
    history
      .map((record) => String(record.fecha || "").trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))[0] || "";
  const sourceDate = explicitStartDate || fallbackStartDate;

  if (!sourceDate) {
    return "";
  }

  return alignDateToSelectedClassDay(sourceDate, student?.diaClases || "");
}

function getStudentAttendanceSessionDates(student) {
  if (!student) {
    return [];
  }

  return getStudentAttendanceSessionGroups(student).flatMap((group) =>
    group.slots.map((slot, slotIndex) => ({
      key: slot.key,
      index: group.index,
      date: slot.date,
      classLabel: slot.classLabel,
      weekNumber: group.index + 1,
      weekdayLabel: slot.fullLabel,
      shortLabel: slot.shortLabel,
      slotIndex,
    }))
  );
}

function getStudentAttendanceCalendar(student) {
  if (!student) {
    return [];
  }

  const weekdayStudent = isWeekdayStudent(student);
  const history = attendanceRecords
    .filter((record) => record.studentId === student.id)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const recordsByDate = new Map();
  history.forEach((record) => {
    if (!recordsByDate.has(record.fecha)) {
      recordsByDate.set(record.fecha, record);
    }
  });

  return getStudentAttendanceSessionDates(student).map((session, index) => {
    const record = recordsByDate.get(session.date) || null;

    return {
      classLabel: session.classLabel || `S${index + 1}`,
      date: session.date,
      weekNumber: session.weekNumber || index + 1,
      weekdayLabel: session.weekdayLabel || "",
      shortLabel: session.shortLabel || "",
      isWeekdayStudent: weekdayStudent,
      resultLabel: record ? ATTENDANCE_STATUS_LABELS[record.estado] || record.estado || "-" : "Pendiente",
      record,
    };
  });
}

function loadStudentIntoAlta(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    return;
  }

  const startDate = getStudentStartDateValue(student) || formatDateForInput(new Date());

  document.getElementById("altaStudentId").value = student.id;
  document.getElementById("altaProspectId").value = student.prospectId || "";
  document.getElementById("altaStudentCode").value = student.studentCode || "";
  document.getElementById("altaFechaInscripcion").value = startDate;
  document.getElementById("altaNombre").value = student.nombre || "";
  document.getElementById("altaTelefono").value = student.telefono || "";
  document.getElementById("altaCorreo").value = student.correo || "";
  document.getElementById("altaDireccion").value = student.direccion || "";
  document.getElementById("altaFechaNacimiento").value = student.fechaNacimiento || "";
  document.getElementById("altaTutor").value = student.tutor || "";
  document.getElementById("altaClaveElector").value = student.claveElector || "";
  document.getElementById("altaEscolaridad").value = student.escolaridad || "";
  document.getElementById("altaContactoEmergencia").value = student.contactoEmergencia || "";
  document.getElementById("altaSucursal").value = student.sucursal || "";
  document.getElementById("altaCurso").value = student.curso || "";
  document.getElementById("altaAccesoElegido").value = student.accesoElegido || "";
  document.getElementById("altaHorario").value = student.horario || "";
  document.getElementById("altaFechaInicio").value = startDate;
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
      options: ["9am a 1pm", "9am a 11am", "12pm a 2pm", "2pm a 6pm", "3pm a 5pm", "1pm a 5pm"],
    },
    {
      element: attendanceDayFilter,
      defaultLabel: "Todos",
      options: ["Entre semana", "Viernes", "Sábado", "Domingo"],
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

function getAttendanceScopedStudents() {
  return getActiveStudents().filter((student) => {
    if (attendanceSucursalFilter.value && student.sucursal !== attendanceSucursalFilter.value) {
      return false;
    }
    return true;
  });
}

function getAttendanceCourseSummaryItems(studentsList = getAttendanceScopedStudents()) {
  const preferredOrder = ["Uñas", "Pestañas", "Barbería", "Maquillaje"];
  const countsByCourse = studentsList.reduce((accumulator, student) => {
    const course = String(student.curso || "").trim();
    if (!course) {
      return accumulator;
    }
    accumulator.set(course, (accumulator.get(course) || 0) + 1);
    return accumulator;
  }, new Map());

  const dynamicCourses = Array.from(countsByCourse.keys()).filter((course) => !preferredOrder.includes(course));
  return preferredOrder
    .concat(dynamicCourses.sort((left, right) => left.localeCompare(right)))
    .filter((course, index, collection) => collection.indexOf(course) === index)
    .filter((course) => (countsByCourse.get(course) || 0) > 0)
    .map((course) => ({
      course,
      count: countsByCourse.get(course) || 0,
    }));
}

function getFilteredStudentsForAttendance() {
  return getAttendanceScopedStudents().filter((student) => {
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
    if (
      attendanceDayFilter.value &&
      normalizeAttendanceDayLabel(student.diaClases) !== normalizeAttendanceDayLabel(attendanceDayFilter.value)
    ) {
      return false;
    }
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

const WEEKDAY_ATTENDANCE_DAYS = [
  { key: "tue", shortLabel: "Mar", fullLabel: "Martes", weekdayIndex: 2, dayOffset: 0 },
  { key: "wed", shortLabel: "Mie", fullLabel: "Miércoles", weekdayIndex: 3, dayOffset: 1 },
  { key: "thu", shortLabel: "Jue", fullLabel: "Jueves", weekdayIndex: 4, dayOffset: 2 },
];

function normalizeAttendanceDayLabel(dayLabel) {
  const normalized = String(dayLabel || "").trim().toLowerCase();
  if (!normalized) {
    return "";
  }

  if (normalized === "viernes") return "Viernes";
  if (normalized === "sábado" || normalized === "sabado") return "Sábado";
  if (normalized === "domingo") return "Domingo";
  if (
    normalized === "entre semana" ||
    normalized === "entresemana" ||
    normalized === "martes a jueves" ||
    normalized === "martes-jueves" ||
    normalized === "martes a jueves (3 dias)"
  ) {
    return "Entre semana";
  }

  return String(dayLabel || "").trim();
}

function isWeekdayAttendanceDay(dayLabel) {
  return normalizeAttendanceDayLabel(dayLabel) === "Entre semana";
}

function isWeekdayStudent(student) {
  return isWeekdayAttendanceDay(student?.diaClases);
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
    "Entre semana": 2,
  }[normalizeAttendanceDayLabel(dayLabel)] ?? null;
}

function alignDateToSelectedClassDay(dateValue, dayLabel) {
  const normalizedDay = normalizeAttendanceDayLabel(dayLabel);
  const weekday = getAttendanceWeekdayIndex(normalizedDay);
  if (weekday === null) {
    return dateValue;
  }

  const date = new Date(`${dateValue}T12:00:00`);
  if (normalizedDay === "Entre semana") {
    const currentDay = date.getDay();
    if (currentDay >= 2 && currentDay <= 4) {
      date.setDate(date.getDate() - (currentDay - 2));
      return formatDateForInput(date);
    }
  }
  const diff = (weekday - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + diff);
  return formatDateForInput(date);
}

function getAttendanceBaseDate(studentsList) {
  const firstStartDate =
    studentsList
      .map((student) => getStudentStartDateValue(student))
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

function getAttendanceColumnLabel(columnIndex, studentsList = []) {
  const hasWeekdayStudents = studentsList.some((student) => isWeekdayStudent(student));
  return hasWeekdayStudents ? `Semana ${columnIndex + 1}` : `Clase ${columnIndex + 1}`;
}

function getAttendanceColumnDefinitions(studentsList = []) {
  const sessionCount = getAttendanceSessionCount(studentsList);
  return Array.from({ length: sessionCount }, (_, index) => ({
    key: `s${index + 1}`,
    index,
    label: getAttendanceColumnLabel(index, studentsList),
  }));
}

function getAttendanceSessionGroups(baseDate, sessionCount = DEFAULT_ATTENDANCE_SESSION_COUNT, dayLabel = "") {
  const normalizedDay = normalizeAttendanceDayLabel(dayLabel);

  if (isWeekdayAttendanceDay(normalizedDay)) {
    return Array.from({ length: sessionCount }, (_, index) => ({
      key: `w${index + 1}`,
      index,
      label: `Semana ${index + 1}`,
      classLabel: `Semana ${index + 1}`,
      slots: WEEKDAY_ATTENDANCE_DAYS.map((weekday) => ({
        key: `w${index + 1}-${weekday.key}`,
        date: addDaysToDateValue(baseDate, index * 7 + weekday.dayOffset),
        shortLabel: weekday.shortLabel,
        fullLabel: weekday.fullLabel,
        classLabel: `Semana ${index + 1} · ${weekday.fullLabel}`,
        weekNumber: index + 1,
      })),
    }));
  }

  return getAttendanceSessionDates(baseDate, sessionCount).map((session, index) => ({
    key: session.key,
    index,
    label: `Clase ${index + 1}`,
    classLabel: `Clase ${index + 1}`,
    slots: [
      {
        key: session.key,
        date: session.date,
        shortLabel: `C${index + 1}`,
        fullLabel: normalizedDay || `Clase ${index + 1}`,
        classLabel: `Clase ${index + 1}`,
        weekNumber: index + 1,
      },
    ],
  }));
}

function getStudentAttendanceSessionGroups(student) {
  if (!student) {
    return [];
  }

  const history = attendanceRecords
    .filter((record) => record.studentId === student.id)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const baseDate = getStudentAttendanceBaseDate(student, history);

  if (!baseDate) {
    return [];
  }

  return getAttendanceSessionGroups(baseDate, getAttendanceSessionCountForCourse(student.curso), student?.diaClases || "");
}

function getStudentAttendanceReferenceSessions(student) {
  return getStudentAttendanceSessionGroups(student).map((group) => ({
    key: group.key,
    date: group.slots[0]?.date || "",
    classLabel: group.label,
  }));
}

function getVisibleAttendanceKeysFromSelection(studentsList = []) {
  return studentsList.reduce((visibleKeys, student) => {
    getStudentAttendanceSessionDates(student).forEach((session) => {
      visibleKeys.add(`${student.id}::${session.date}`);
    });
    return visibleKeys;
  }, new Set());
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

function getAttendanceSummaryFromSelection(studentsList) {
  const visibleKeys = getVisibleAttendanceKeysFromSelection(studentsList);
  const visibleRecords = attendanceRecords.filter(
    (record) => visibleKeys.has(`${record.studentId}::${record.fecha}`)
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
  const visibleStudents = attendanceTableExpanded ? studentsList : studentsList.slice(0, 3);
  const selectedDate = getAttendanceBaseDate(studentsList);
  attendanceDate.value = selectedDate;
  const sessionColumns = getAttendanceColumnDefinitions(visibleStudents);

  attendanceTableHead.innerHTML = `
    <tr>
      <th>#</th>
      <th>DOC</th>
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
      ${sessionColumns
        .map((column) => {
          const paymentReferenceRule = getPaymentReferenceRuleBySessionIndex(column.index);
          if (!paymentReferenceRule) {
            return `<th>${escapeHtml(column.label)}</th>`;
          }

          const isPriority = ATTENDANCE_PRIORITY_PAYMENT_REFERENCE_FIELDS.has(paymentReferenceRule.field);
          const toneClass = getAttendancePaymentReferenceToneClass(paymentReferenceRule);
          return `
            <th class="attendance-payment-column ${toneClass}${isPriority ? " attendance-payment-column-priority" : ""}">
              <div class="attendance-payment-column-heading">
                <span>${escapeHtml(column.label)}</span>
                <small class="attendance-payment-badge${isPriority ? " is-priority" : ""}">${escapeHtml(getPaymentReferenceShortLabel(paymentReferenceRule))}</small>
              </div>
            </th>
          `;
        })
        .join("")}
      <th>Acciones</th>
    </tr>
  `;

  attendanceTableBody.innerHTML = visibleStudents
    .map((student, index) => {
      const studentSessionGroups = getStudentAttendanceSessionGroups(student);
      const studentReferenceSessions = getStudentAttendanceReferenceSessions(student);
      const metadataRecord = getLatestAttendanceMetadataRecord(student.id);
      const payment = getLatestPaymentRecordForStudent(student.id);
      const monthlyPayment5 = courseUsesFifthMonth(student.curso) ? payment.mensualidad5 || "-" : "No aplica";
      const documentBadge = getStudentDocumentBadge(student);
      return `
        <tr>
          <td>${index + 1}</td>
          <td><span class="status-pill attendance-doc-pill">${escapeHtml(documentBadge)}</span></td>
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
          ${sessionColumns
            .map((column) => {
              const sessionGroup = studentSessionGroups[column.index];
              if (!sessionGroup) {
                return `<td class="attendance-session-empty">-</td>`;
              }

              const paymentReference = getAttendancePaymentReferenceBySessionIndex(column.index, student, studentReferenceSessions);
              const paymentCellClass = paymentReference
                ? ` class="attendance-payment-cell ${paymentReference.toneClass}${paymentReference.isPriority ? " attendance-payment-cell-priority" : ""}"`
                : "";
              const sessionCellClass = `attendance-session-cell${paymentReference ? ` attendance-session-cell-payment ${paymentReference.toneClass}` : ""}${paymentReference?.isPriority ? " attendance-session-cell-payment-priority" : ""}`;
              return `
                <td${paymentCellClass}>
                  <div class="${sessionCellClass}">
                    <div class="attendance-session-meta">
                      <small class="attendance-session-date">${escapeHtml(sessionGroup.label)}</small>
                      ${paymentReference
                        ? `<span class="attendance-payment-badge${paymentReference.isPriority ? " is-priority" : ""}">${escapeHtml(paymentReference.shortLabel)}</span>`
                        : ""}
                    </div>
                    <div class="attendance-session-slot-list">
                      ${sessionGroup.slots
                        .map((slot) => {
                          const record = getAttendanceRecord(student.id, slot.date);
                          const title = [
                            `${slot.classLabel} · ${formatDisplayDate(slot.date) || slot.date}`,
                            paymentReference ? `Referencia ${paymentReference.shortLabel}` : "",
                          ]
                            .filter(Boolean)
                            .join(" · ");
                          return `
                            <div class="attendance-session-slot-item">
                              <small class="attendance-session-slot-label">${escapeHtml(slot.fullLabel)}</small>
                              <small class="attendance-session-date">${escapeHtml(formatDisplayDate(slot.date) || "-")}</small>
                              <select
                                class="attendance-session-select"
                                data-attendance-field="session"
                                data-session-date="${slot.date}"
                                data-student-id="${student.id}"
                                title="${escapeHtml(title)}"
                              >${renderAttendanceOptions(record?.estado || "")}</select>
                            </div>
                          `;
                        })
                        .join("")}
                    </div>
                  </div>
                </td>
              `;
            })
            .join("")}
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-student" data-id="${student.id}">Editar</button>
              <button class="table-action action-edit" type="button" data-action="save-attendance" data-id="${student.id}">Guardar</button>
              <button class="table-action secondary-btn" type="button" data-action="view-student-file" data-id="${student.id}">Ver expediente</button>
              <button class="table-action secondary-btn" type="button" data-action="view-history" data-id="${student.id}">Ver historial</button>
              <button class="table-action action-delete" type="button" data-action="delete-attendance" data-id="${student.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  attendanceEmptyState.hidden = visibleStudents.length > 0;
  if (attendanceToggleButton) {
    attendanceToggleButton.hidden = studentsList.length <= 3;
    attendanceToggleButton.textContent = attendanceTableExpanded ? "Ver menos" : "Ver mas";
  }
  updateAttendanceSummary(studentsList);
}

async function saveAttendanceForStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    alert("No se encontró la alumna vinculada para guardar la asistencia.");
    return;
  }

  const studentSessions = getStudentAttendanceSessionDates(student);
  const date = studentSessions[0]?.date || attendanceDate.value || formatDateForInput(new Date());
  const sessionFields = Array.from(
    attendanceTableBody.querySelectorAll(`[data-attendance-field="session"][data-student-id="${studentId}"]`)
  );
  const reportesField = attendanceTableBody.querySelector(`[data-attendance-field="reportes"][data-student-id="${studentId}"]`);
  const observacionesField = attendanceTableBody.querySelector(`[data-attendance-field="observaciones"][data-student-id="${studentId}"]`);
  const automaticReglamentoStatus = getStudentReglamentoStatus(student).confirmado ? "Sí" : "No";
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
                reglamento: automaticReglamentoStatus,
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

function updateAttendanceSummary(studentsList = getFilteredStudentsForAttendance()) {
  const scopedStudents = getAttendanceScopedStudents();
  const courseCounts = getAttendanceCourseSummaryItems(scopedStudents);

  if (attendanceSummaryGrid) {
    attendanceSummaryGrid.innerHTML = [
      ...courseCounts.map(
        (entry) => `
          <article class="stat-card">
            <p>${escapeHtml(entry.course)}</p>
            <strong>${entry.count}</strong>
          </article>
        `
      ),
      `
        <article class="stat-card">
          <p>Total de alumnas</p>
          <strong id="attendanceGroupCount">${scopedStudents.length}</strong>
        </article>
      `,
    ].join("");
  } else if (attendanceGroupCount) {
    attendanceGroupCount.textContent = scopedStudents.length;
  }
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
      paymentMovementConcept: "",
      paymentRealDate: "",
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

function getStudentPaymentReferenceRule(field) {
  return STUDENT_PAYMENT_REFERENCE_RULES.find((rule) => rule.field === field) || null;
}

function getPaymentReferenceRuleBySessionIndex(sessionIndex) {
  return STUDENT_PAYMENT_REFERENCE_RULES.find((rule) => rule.sessionIndex === sessionIndex) || null;
}

function getPaymentReferenceShortLabel(reference) {
  return String(reference?.label || "").trim().toUpperCase();
}

function getAttendancePaymentReferenceToneClass(reference) {
  const shortLabel = getPaymentReferenceShortLabel(reference);

  if (shortLabel === "MEN1") return "attendance-payment-tone-men1";
  if (shortLabel === "MEN2") return "attendance-payment-tone-men2";
  if (shortLabel === "MEN3") return "attendance-payment-tone-men3";
  if (shortLabel === "MEN4") return "attendance-payment-tone-men4";
  if (shortLabel === "MEN5") return "attendance-payment-tone-men5";
  if (shortLabel === "C1" || shortLabel === "C2") return "attendance-payment-tone-certificate";
  return "";
}

function buildAttendancePaymentReferenceEntry(rule, student, sessions = getStudentAttendanceReferenceSessions(student)) {
  if (!rule) {
    return null;
  }

  if (rule.onlyFifthMonth && !courseUsesFifthMonth(student?.curso)) {
    return null;
  }

  const session = sessions[rule.sessionIndex];
  if (!session) {
    return null;
  }

  return {
    ...rule,
    shortLabel: getPaymentReferenceShortLabel(rule),
    toneClass: getAttendancePaymentReferenceToneClass(rule),
    isPriority: ATTENDANCE_PRIORITY_PAYMENT_REFERENCE_FIELDS.has(rule.field),
    value: formatDisplayDate(session.date) || session.date || "-",
  };
}

function getAttendancePaymentReferenceBySessionIndex(sessionIndex, student, sessions = getStudentAttendanceReferenceSessions(student)) {
  return buildAttendancePaymentReferenceEntry(getPaymentReferenceRuleBySessionIndex(sessionIndex), student, sessions);
}

function buildStudentPaymentReferenceEntry(rule, student, sessions = getStudentAttendanceReferenceSessions(student)) {
  if (!rule) {
    return null;
  }

  if (rule.onlyFifthMonth && !courseUsesFifthMonth(student?.curso)) {
    return {
      ...rule,
      value: "No aplica",
    };
  }

  const session = sessions[rule.sessionIndex];
  return {
    ...rule,
    value: session?.date ? formatDisplayDate(session.date) : "-",
  };
}

function getStudentPaymentReferenceByField(field, student, sessions = getStudentAttendanceReferenceSessions(student)) {
  return buildStudentPaymentReferenceEntry(getStudentPaymentReferenceRule(field), student, sessions);
}

function getStudentPaymentScheduleEntries(student) {
  const sessions = getStudentPortalSessionDates(student);

  return STUDENT_PAYMENT_REFERENCE_RULES
    .filter((rule) => !rule.onlyFifthMonth || courseUsesFifthMonth(student?.curso))
    .map((rule) => buildStudentPaymentReferenceEntry(rule, student, sessions))
    .filter(Boolean)
    .map((entry) => ({
      label: entry.label,
      value: entry.value,
    }));
}

function renderPaymentStatusSelect(field, student, payment, sessions = getStudentAttendanceReferenceSessions(student)) {
  const selectedValue = field === "mensualidad5" && !courseUsesFifthMonth(student.curso)
    ? "No aplica"
    : payment[field] || "";
  const disabled = field === "mensualidad5" && !courseUsesFifthMonth(student.curso) ? "disabled" : "";
  const reference = getStudentPaymentReferenceByField(field, student, sessions);
  const referenceLabel = reference?.value || "-";
  const title = reference ? `${reference.label}: ${reference.value}` : "";
  return `
    <div class="payment-status-cell" ${title ? `title="${escapeHtml(title)}"` : ""}>
      <small class="payment-reference-date">${escapeHtml(referenceLabel)}</small>
      <select data-payment-field="${field}" data-student-id="${student.id}" ${disabled}>${renderPaymentSelectOptions(selectedValue, PAYMENT_STATUS_OPTIONS)}</select>
    </div>
  `;
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

function getStudentPortalSessionDates(student) {
  return getStudentAttendanceReferenceSessions(student);
}

function getLatestPaymentSortKey(student) {
  const latestPayment = getLatestPaymentRecordForStudent(student.id);
  const effectiveDate = getPaymentEffectiveDate(latestPayment);
  const updatedAt = String(latestPayment.updatedAt || latestPayment.createdAt || "");
  const fallbackDate = getStudentInscriptionDate(student) || "";
  return {
    date: effectiveDate || updatedAt.slice(0, 10) || fallbackDate || "0000-00-00",
    updatedAt: updatedAt || String(student.createdAt || ""),
  };
}

function getFilteredStudentsForPayments() {
  const normalizedSearch = activePaymentsSearch.trim().toLowerCase();

  return getActiveStudents()
    .filter((student) => {
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
    })
    .sort((left, right) => {
      const leftSortKey = getLatestPaymentSortKey(left);
      const rightSortKey = getLatestPaymentSortKey(right);

      if (leftSortKey.date !== rightSortKey.date) {
        return rightSortKey.date.localeCompare(leftSortKey.date);
      }

      return String(rightSortKey.updatedAt || "").localeCompare(String(leftSortKey.updatedAt || ""));
    });
}

function renderPaymentsTable() {
  const studentsList = getFilteredStudentsForPayments();
  const visibleStudents = activePaymentsSearch.trim() || paymentsTableExpanded
    ? studentsList
    : studentsList.slice(0, 3);

  paymentsTableBody.innerHTML = visibleStudents
    .map((student) => {
      const payment = getPaymentRecord(student.id);
      const studentSessions = getStudentAttendanceReferenceSessions(student);
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
          <td>${renderPaymentStatusSelect("certificadoP1", student, payment, studentSessions)}</td>
          <td>${renderPaymentStatusSelect("certificadoP2", student, payment, studentSessions)}</td>
          <td>${renderPaymentStatusSelect("mensualidad1", student, payment, studentSessions)}</td>
          <td>${renderPaymentStatusSelect("mensualidad2", student, payment, studentSessions)}</td>
          <td>${renderPaymentStatusSelect("mensualidad3", student, payment, studentSessions)}</td>
          <td>${renderPaymentStatusSelect("mensualidad4", student, payment, studentSessions)}</td>
          <td>${renderPaymentStatusSelect("mensualidad5", student, payment, studentSessions)}</td>
          <td><select data-payment-field="metodoPago" data-student-id="${student.id}">${renderPaymentSelectOptions(payment.metodoPago, PAYMENT_METHOD_OPTIONS)}</select></td>
          <td><input type="text" value="${escapeHtml(payment.cantidadPagada || "")}" data-payment-field="cantidadPagada" data-student-id="${student.id}" placeholder="$0" /></td>
          <td><input type="text" value="${escapeHtml(payment.reportes)}" data-payment-field="reportes" data-student-id="${student.id}" /></td>
          <td><input type="text" value="${escapeHtml(payment.observaciones)}" data-payment-field="observaciones" data-student-id="${student.id}" /></td>
          <td>
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-student" data-id="${student.id}">Editar</button>
              <button class="table-action action-edit" type="button" data-action="save-payment" data-id="${student.id}">Guardar</button>
              <button class="table-action secondary-btn" type="button" data-action="view-student-file" data-id="${student.id}">Ver expediente</button>
              <button class="table-action action-delete" type="button" data-action="delete-payment" data-id="${student.id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  paymentsEmptyState.hidden = visibleStudents.length > 0;
  if (paymentsToggleButton) {
    const shouldShowToggle = !activePaymentsSearch.trim() && studentsList.length > 3;
    paymentsToggleButton.hidden = !shouldShowToggle;
    paymentsToggleButton.textContent = paymentsTableExpanded ? "Ver menos" : "Ver mas";
  }
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

  const existingFinanceRecord = getLinkedPaymentFinanceRecords(current.id || newRecord.id)[0] || null;
  newRecord.paymentMovementConcept = resolvePaymentMovementConcept(current, { ...current, ...newRecord }, existingFinanceRecord);
  newRecord.paymentRealDate = resolvePaymentRealDate(current, { ...current, ...newRecord });

  const saveResult = await savePaymentRecord({ ...current, ...newRecord });
  if (!saveResult.synced) {
    renderBalanceModule();
    renderFinanceTable();
    updateFinanceSummary();
    updatePaymentsSummary();
    renderDashboard();
    alert("No se pudo guardar el pago en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  const financeSyncResult = await syncPaymentFinanceRecord(saveResult.record, { student });
  if (!financeSyncResult.synced) {
    renderPaymentsTable();
    renderBalanceModule();
    renderFinanceTable();
    updateFinanceSummary();
    updatePaymentsSummary();
    renderDashboard();
    alert("El pago se guardó, pero no se pudo sincronizar su ingreso financiero en Supabase.");
    return;
  }

  renderPaymentsTable();
  renderBalanceModule();
  renderFinanceTable();
  updateFinanceSummary();
  updatePaymentsSummary();
  renderDashboard();
}

function updatePaymentsSummary() {
  const activeStudentIds = new Set(getActiveStudents().map((student) => student.id));
  const today = getCurrentMexicoDateValue();
  const todayTotal = paymentRecords
    .filter((record) => activeStudentIds.has(record.studentId))
    .filter((record) => isRealPaidPaymentRecord(record))
    .filter((record) => getPaymentEffectiveDate(record) === today)
    .reduce((total, record) => total + parsePaymentAmount(record.cantidadPagada), 0);

  if (paymentsTodayTotal) {
    paymentsTodayTotal.textContent = formatCurrency(todayTotal);
  }
  if (paymentsRegisteredCount) {
    paymentsRegisteredCount.textContent = "0";
  }
  if (paymentsPendingCount) {
    paymentsPendingCount.textContent = "0";
  }
  if (paymentsMensualidadesPaid) {
    paymentsMensualidadesPaid.textContent = "0";
  }
  if (paymentsMonthlyIncome) {
    paymentsMonthlyIncome.textContent = formatCurrency(0);
  }
  if (paymentsTlaxcalaCount) {
    paymentsTlaxcalaCount.textContent = "0";
  }
  if (paymentsPueblaCount) {
    paymentsPueblaCount.textContent = "0";
  }
}

function getBalancePaymentDate(record) {
  return getPaymentEffectiveDate(record);
}

function matchesBalanceDate(value) {
  return !balanceDateFilter.value || String(value || "").slice(0, 10) === balanceDateFilter.value;
}

function getBalanceIncomeConcept(record) {
  const paidConcepts = getPaidPaymentConcepts(record).map(({ label }) => label);

  if (paidConcepts.length > 0) {
    return paidConcepts.join(", ");
  }

  if (record.mesPago) {
    return `Pago ${record.mesPago}`;
  }

  return "Pago registrado";
}

function isEligibleBalanceResponsiblePosition(position) {
  const normalizedPosition = String(position || "").trim().toLowerCase();
  return (
    normalizedPosition === "director de sucursal" ||
    normalizedPosition === "director administrativo de sucursal" ||
    normalizedPosition === "gerente de sucursal"
  );
}

function getBalanceResponsibleCandidates(branch) {
  const normalizedBranch = String(branch || "").trim().toLowerCase();
  if (!normalizedBranch) {
    return [];
  }

  const getPriority = (position) => {
    const normalizedPosition = String(position || "").trim().toLowerCase();
    if (normalizedPosition === "director de sucursal") return 0;
    if (normalizedPosition === "director administrativo de sucursal") return 1;
    if (normalizedPosition === "gerente de sucursal") return 2;
    return 99;
  };

  return staffRecords
    .filter((record) => {
      const recordBranch = String(record.sucursal || "").trim().toLowerCase();
      const status = String(record.estado || "").trim().toLowerCase();

      return (
        recordBranch === normalizedBranch &&
        status !== "inactivo" &&
        isEligibleBalanceResponsiblePosition(record.puesto) &&
        String(record.nombre || "").trim()
      );
    })
    .sort((left, right) => {
      const priorityDifference = getPriority(left.puesto) - getPriority(right.puesto);
      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return String(left.nombre || "").localeCompare(String(right.nombre || ""), "es-MX");
    });
}

function populateBalanceExpenseResponsibleOptions(selectedValue = "") {
  if (!balanceExpenseResponsibleField || !balanceExpenseBranchField) {
    return;
  }

  const normalizedSelectedValue = String(selectedValue || "").trim();
  const options = [`<option value="">Selecciona una opcion</option>`];
  const optionNames = new Set();

  getBalanceResponsibleCandidates(balanceExpenseBranchField.value).forEach((record) => {
    const name = String(record.nombre || "").trim();
    const normalizedName = name.toLowerCase();
    if (!name || optionNames.has(normalizedName)) {
      return;
    }

    optionNames.add(normalizedName);
    options.push(`<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`);
  });

  if (normalizedSelectedValue && !optionNames.has(normalizedSelectedValue.toLowerCase())) {
    options.push(`<option value="${escapeHtml(normalizedSelectedValue)}">${escapeHtml(normalizedSelectedValue)}</option>`);
  }

  balanceExpenseResponsibleField.innerHTML = options.join("");
  balanceExpenseResponsibleField.value = normalizedSelectedValue;
}

function getBalanceResponsibleSuggestion(branch) {
  return getBalanceResponsibleCandidates(branch)[0]?.nombre || "";
}

function syncBalanceExpenseResponsible({ force = false, selectedValue = "" } = {}) {
  if (!balanceExpenseResponsibleField || !balanceExpenseBranchField) {
    return;
  }

  const suggestedResponsible = getBalanceResponsibleSuggestion(balanceExpenseBranchField.value);
  const previousSuggested = balanceExpenseResponsibleField.dataset.autoFilledValue || "";
  const currentValue = String(selectedValue || balanceExpenseResponsibleField.value || "").trim();
  const shouldReplace = force || !currentValue || currentValue === previousSuggested;
  const nextValue = shouldReplace ? suggestedResponsible : currentValue;

  populateBalanceExpenseResponsibleOptions(nextValue);

  balanceExpenseResponsibleField.dataset.autoFilledValue = suggestedResponsible;
}

function getBalanceIncomeRows() {
  const studentsById = new Map(students.map((student) => [student.id, student]));

  return getCentralFinanceRecords()
    .filter((record) => record.sourceType === "payment" && record.tipo === "Ingreso")
    .filter(Boolean)
    .filter((record) => matchesCurrentBranch(record.sucursal))
    .filter((record) => !balanceBranchFilter.value || record.sucursal === balanceBranchFilter.value)
    .filter((record) => matchesBalanceDate(record.fecha))
    .map((record) => ({
      id: record.sourceRecordId || record.id,
      studentId: record.sourceStudentId || "",
      fecha: record.fecha,
      alumna: studentsById.get(record.sourceStudentId)?.nombre || record.alumna || "-",
      concepto: getBalancePaymentConceptDisplay(record),
      monto: Number(record.monto || 0),
      sucursal: record.sucursal || "",
      metodoPago: record.metodoPago || "-",
    }))
    .sort((a, b) => {
      const dateComparison = String(b.fecha || "").localeCompare(String(a.fecha || ""));
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return String(b.id || "").localeCompare(String(a.id || ""));
    });
}

function getFilteredBalanceExpenses() {
  return getCentralFinanceRecords()
    .filter((record) => record.sourceType === "balance-expense" && record.tipo === "Egreso")
    .filter((record) => matchesCurrentBranch(record.sucursal))
    .filter((record) => !balanceBranchFilter.value || record.sucursal === balanceBranchFilter.value)
    .filter((record) => matchesBalanceDate(record.fecha))
    .map((record) => ({
      id: record.sourceRecordId || record.id,
      fecha: record.fecha,
      nombreGasto: record.nombreGasto || record.concepto || "",
      cantidad: Number(record.cantidad || 0),
      costoUnitario: Number(record.costoUnitario || 0),
      total: Number(record.monto || 0),
      responsableGasto: record.responsableGasto || record.usuario || "",
      nota: record.observaciones || "",
      sucursal: record.sucursal || "",
      createdAt: record.createdAt || "",
    }))
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

function syncBalanceDailyView() {
  if (!balanceDateFilter) {
    return "";
  }

  const todayInMexico = getCurrentMexicoDateValue();
  balanceDateFilter.value = todayInMexico;
  balanceDateFilter.disabled = true;
  balanceDateFilter.title = "Balance muestra automaticamente la fecha actual de Mexico.";
  return todayInMexico;
}

function resetBalanceExpenseForm() {
  balanceExpenseForm.reset();
  document.getElementById("balanceExpenseId").value = "";
  balanceExpenseDateField.value = getCurrentMexicoDateValue();
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
  const sucursal = allowedBranch || String(formData.get("sucursal") || "").trim();

  if (!isValidSystemBranch(sucursal)) {
    alert("Selecciona una sucursal valida del sistema para registrar el egreso.");
    return null;
  }

  return {
    id: existingId || crypto.randomUUID(),
    fecha: String(formData.get("fecha") || "").trim(),
    sucursal,
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
          <td>${escapeHtml(record.alumna || "-")}</td>
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
  syncBalanceDailyView();
  syncBalanceExpenseResponsible();
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
  document.getElementById("balanceExpenseNote").value = record.nota || "";
  balanceExpenseTotalField.value = record.total ? String(Number(record.total).toFixed(2)) : "";
  syncBalanceExpenseResponsible({ selectedValue: record.responsableGasto || "" });
  balanceExpenseSubmitButton.textContent = "Actualizar egreso";
  setActiveModule("balance");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteBalanceExpense(id) {
  balanceExpenses = balanceExpenses.filter((record) => record.id !== id);
  saveBalanceExpensesCollection();
  renderBalanceModule();
  renderFinanceTable();
  updateFinanceSummary();
  renderDashboard();
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
  return getFinanceRecordsForScope({
    month: financeMonthFilter.value || selectedMonth,
    branch: financeBranchFilter.value,
  });
}

function populateFinanceBranchFilter() {
  const branchOptions = [
    ...new Set(
      [
        ...prospects.map((record) => record.sucursal),
        ...students.map((record) => record.sucursal),
        ...financeRecords.map((record) => record.sucursal),
        ...staffRecords.map((record) => record.sucursal),
      ]
        .map((value) => String(value || "").trim())
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));

  populateSelectWithValues(financeBranchFilter, branchOptions, "Todas");
}

function populateFinanceVisibleMonthFilter() {
  if (!financeVisibleMonthFilter || !financeMonthFilter) {
    return;
  }

  const baseMonth = financeMonthFilter.value || selectedMonth || getCurrentMonthValue();
  const baseYear = String(baseMonth || getCurrentMonthValue()).slice(0, 4) || String(new Date().getFullYear());
  const monthLabels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const currentValue = financeMonthFilter.value || `${baseYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  financeVisibleMonthFilter.innerHTML = monthLabels
    .map(
      (label, index) =>
        `<option value="${baseYear}-${String(index + 1).padStart(2, "0")}">${label}</option>`
    )
    .join("");
  financeVisibleMonthFilter.value = currentValue;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(amount || 0);
}

function renderFinanceTable() {
  populateFinanceBranchFilter();
  populateFinanceVisibleMonthFilter();
  const records = getFilteredFinanceRecords().sort((a, b) => b.fecha.localeCompare(a.fecha));

  financeTableBody.innerHTML = records
    .map((record) => {
      const isDerivedRecord = record.sourceType === "payment" || record.sourceType === "balance-expense";
      const actionsMarkup = isDerivedRecord
        ? `<span class="table-muted-note">${record.sourceType === "payment" ? "Gestiona en Pagos" : "Gestiona en Balance"}</span>`
        : `
            <div class="actions-cell">
              <button class="table-action action-edit" type="button" data-action="edit-finance" data-id="${record.id}">Editar</button>
              <button class="table-action action-delete" type="button" data-action="delete-finance" data-id="${record.id}">Eliminar</button>
            </div>
          `;
      return `
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
          <td>${actionsMarkup}</td>
        </tr>
      `
    })
    .join("");

  financeEmptyState.hidden = records.length > 0;
}

function updateFinanceSummary() {
  populateFinanceBranchFilter();
  populateFinanceVisibleMonthFilter();
  const historyMonth = financeMonthFilter.value || selectedMonth || getCurrentMexicoDateValue().slice(0, 7);
  const summary = getExecutiveFinanceSnapshot({
    branch: financeBranchFilter.value,
    historyMonth,
  });
  const buildExecutiveItems = (periodSummary) => [
    { label: "Ingresos", value: formatCurrency(periodSummary.ingresos) },
    { label: "Egresos", value: formatCurrency(periodSummary.egresos) },
    { label: "Utilidad", value: formatCurrency(periodSummary.utilidad) },
  ];

  if (financeMonthIncomeValue) {
    financeMonthIncomeValue.textContent = formatCurrency(summary.windows.day.utilidad);
  }
  if (financeMonthExpenseValue) {
    financeMonthExpenseValue.textContent = formatCurrency(summary.windows.week.utilidad);
  }
  if (financeMonthUtilityValue) {
    financeMonthUtilityValue.textContent = formatCurrency(summary.windows.month.utilidad);
  }
  if (financeMonthIncomeMeta) {
    financeMonthIncomeMeta.textContent = `Fecha ${formatDisplayDate(summary.anchorDate)}`;
  }
  if (financeMonthExpenseMeta) {
    financeMonthExpenseMeta.textContent = `Semana ${summary.windows.week.label}`;
  }
  if (financeMonthUtilityMeta) {
    financeMonthUtilityMeta.textContent = `Mes ${summary.windows.month.label}`;
  }

  renderInfoList(financeIncomeSummary, buildExecutiveItems(summary.windows.day));
  renderInfoList(financeExpenseSummary, buildExecutiveItems(summary.windows.week));
  renderInfoList(financeUtilitySummary, buildExecutiveItems(summary.windows.month));

  financeBranchSummary.innerHTML = summary.byBranch.length
    ? summary.byBranch
        .map(
          (item) => `
            <article class="finance-branch-card">
              <header>
                <p class="eyebrow">Sucursal</p>
                <h4>${escapeHtml(item.branch)}</h4>
              </header>
              <div class="finance-branch-metrics">
                <div><strong>Ing. día</strong><span>${formatCurrency(item.day.ingresos)}</span></div>
                <div><strong>Ing. semana</strong><span>${formatCurrency(item.week.ingresos)}</span></div>
                <div><strong>Ing. mes</strong><span>${formatCurrency(item.month.ingresos)}</span></div>
                <div><strong>Egr. día</strong><span>${formatCurrency(item.day.egresos)}</span></div>
                <div><strong>Egr. semana</strong><span>${formatCurrency(item.week.egresos)}</span></div>
                <div><strong>Egr. mes</strong><span>${formatCurrency(item.month.egresos)}</span></div>
                <div><strong>Utilidad mes</strong><span>${formatCurrency(item.month.utilidad)}</span></div>
                <div><strong>Utilidad acum.</strong><span>${formatCurrency(item.accumulated.utilidad)}</span></div>
              </div>
            </article>
          `
        )
        .join("")
    : `<p class="empty-state">No hay datos suficientes para construir el resumen por sucursal.</p>`;

  renderInfoList(financeHistoricalMeta, [
    { label: `Total acumulado ${summary.monthlyHistory.yearTotals.year}`, value: formatCurrency(summary.monthlyHistory.yearTotals.utilidad) },
    { label: "Prom. ingresos", value: formatCurrency(summary.monthlyHistory.averages.ingresos) },
    { label: "Prom. egresos", value: formatCurrency(summary.monthlyHistory.averages.egresos) },
    { label: "Prom. utilidad", value: formatCurrency(summary.monthlyHistory.averages.utilidad) },
  ]);

  financeHistoricalTableBody.innerHTML = summary.monthlyHistory.rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.label)}</td>
          <td>${formatCurrency(row.ingresos)}</td>
          <td>${formatCurrency(row.egresos)}</td>
          <td>${formatCurrency(row.utilidad)}</td>
        </tr>
      `
    )
    .join("");
  financeHistoricalEmptyState.hidden = summary.monthlyHistory.rows.length > 0;
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
    { label: "Fecha de inicio", value: getStudentStartDateValue(student) || "-" },
    { label: "Nombre completo", value: student.nombre || "-", highlight: true },
    { label: "Teléfono/Whatsapp", value: student.telefono || "-" },
    { label: "Correo electrónico", value: student.correo || "-" },
    { label: "Dirección del alumno o tutor", value: student.direccion || "-" },
    { label: "Fecha de nacimiento", value: student.fechaNacimiento || "-" },
    { label: "Tutor", value: student.tutor || "-" },
    { label: "Clave de elector", value: student.claveElector || "-" },
    { label: "Escolaridad", value: student.escolaridad || "-" },
    { label: "Contacto de emergencia", value: student.contactoEmergencia || "-" },
  ]);

  renderStudentFileInfoList(studentFileAcademic, [
    { label: "Sucursal", value: student.sucursal || "-", badge: true, tone: "blue" },
    { label: "Curso inscrito", value: student.curso || "-", badge: true, tone: "purple" },
    { label: "Tipo de acceso", value: student.accesoElegido || "-", badge: true, tone: "gold" },
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
    if (isStudentDeleted(student)) {
      return false;
    }
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
    `Hola, soy ${student.nombre || "estudiante"} y necesito apoyo con mi cuenta de Mi Venezia${branchLabel}.`
  );
  return `https://wa.me/${WEB_DEFAULT_WHATSAPP_NUMBER}?text=${message}`;
}

function getStudentDirectorWhatsappUrl(student) {
  const studentName = String(student?.nombre || "el estudiante").trim();
  const message = encodeURIComponent(
    `Hola directora, soy ${studentName} y tengo una duda sobre mi información en Mi Venezia.`
  );
  return `https://wa.me/522461379504?text=${message}`;
}

function isStudentPaymentPendingStatus(value) {
  return value === "Pendiente" || value === "Parcial";
}

function getMiVeneziaPaymentOverview(
  student,
  payment,
  paymentEntries,
  latestPayment = {},
  sessions = getStudentPortalSessionDates(student)
) {
  const references = STUDENT_PAYMENT_REFERENCE_RULES
    .filter((rule) => !rule.onlyFifthMonth || courseUsesFifthMonth(student?.curso))
    .map((rule) => {
      const reference = buildStudentPaymentReferenceEntry(rule, student, sessions);
      return {
        field: rule.field,
        shortLabel: getPaymentReferenceShortLabel(rule) || String(rule.label || "").trim().toUpperCase(),
        date: reference?.value || "-",
        status: String(payment?.[rule.field] || "").trim(),
      };
    });

  const pendingReferences = references.filter((entry) => isStudentPaymentPendingStatus(entry.status));
  const unresolvedReferences = references.filter((entry) => entry.status !== "Pagado" && entry.status !== "No aplica");
  const upcomingReference = pendingReferences[0] || unresolvedReferences[0] || null;
  const monthlyReferences = references.filter((entry) => entry.field.startsWith("mensualidad"));
  const monthlyCompleted = monthlyReferences.filter((entry) => entry.status === "Pagado" || entry.status === "Parcial").length;
  const numericPendingCount = Number.parseInt(String(payment?.pagosPendientes || "").trim(), 10);
  const pendingCount = Number.isFinite(numericPendingCount) ? numericPendingCount : pendingReferences.length;
  const registeredReferenceCount = references.filter((entry) => entry.status).length;
  const hasRegisteredPayments = paymentEntries.length > 0 || registeredReferenceCount > 0;

  let statusLabel = "Por confirmar";
  let statusTone = "gold";

  if (pendingReferences.length > 0 || pendingCount > 0) {
    const visiblePendingCount = pendingCount || pendingReferences.length;
    statusLabel = visiblePendingCount === 1 ? "1 pendiente" : `${visiblePendingCount} pendientes`;
    statusTone = "red";
  } else if (hasRegisteredPayments) {
    statusLabel = "Al corriente";
    statusTone = "green";
  } else if (upcomingReference) {
    statusLabel = "Programado";
    statusTone = "blue";
  }

  return {
    references,
    pendingReferences,
    upcomingReference,
    statusLabel,
    statusTone,
    mensualidadPactada: payment?.mensualidadPactada || student?.mensualidad || student?.colegiatura || "-",
    metodoPago: payment?.metodoPago || latestPayment?.metodoPago || student?.metodoPago || "-",
    observaciones: payment?.observaciones || latestPayment?.observaciones || "-",
    pendingSummary: String(payment?.pagosPendientes || "").trim() || String(pendingCount || 0),
    monthlyProgress: `${monthlyCompleted} de ${monthlyReferences.length || 0}`,
    certificateOneStatus: String(payment?.certificadoP1 || "").trim() || "-",
    certificateTwoStatus: String(payment?.certificadoP2 || "").trim() || "-",
    nextPaymentText: upcomingReference
      ? `${upcomingReference.shortLabel} · ${upcomingReference.date}`
      : hasRegisteredPayments
        ? "Sin pendiente visible"
        : "Por confirmar",
  };
}

function getMiVeneziaAttendanceOverview(student, attendanceHistory, attendanceCalendar) {
  const faltas = attendanceHistory.filter((record) => record.estado === "Falta").length;
  const permisos = attendanceHistory.filter((record) => record.estado === "Permiso").length;
  const recuperaciones = attendanceHistory.filter((record) => record.estado === "Recuperación").length;
  const asistencias = attendanceHistory.filter((record) => record.estado === "Asistencia").length;
  const totalClases = attendanceCalendar.length || getAttendanceSessionCountForCourse(student?.curso);
  const clasesRegistradas = attendanceCalendar.filter((entry) => entry.record).length;
  const clasesTomadas = asistencias + recuperaciones;
  const clasesPendientes = Math.max(totalClases - clasesRegistradas, 0);
  const completionRate = totalClases > 0 ? Math.round((clasesTomadas / totalClases) * 100) : 0;
  const today = formatDateForInput(new Date());
  const latestRegistered = attendanceCalendar.filter((entry) => entry.record).slice(-1)[0] || null;
  const nextClass =
    attendanceCalendar.find((entry) => !entry.record && entry.date >= today) ||
    attendanceCalendar.find((entry) => !entry.record) ||
    null;

  let messageTitle = "Tu curso acaba de comenzar";
  let messageCopy = "Tus clases, pagos y documentos aparecerán aquí conforme avances.";
  let toneClass = "is-neutral";

  if (faltas > 0) {
    messageTitle = "Te faltan clases por recuperar";
    messageCopy = `Tienes ${faltas} falta${faltas === 1 ? "" : "s"} registrada${faltas === 1 ? "" : "s"}. Mantente al tanto de tus próximas clases.`;
    toneClass = "is-warm";
  } else if (completionRate >= 80) {
    messageTitle = "¡Vas muy bien!";
    messageCopy = `Has completado ${clasesTomadas} de ${totalClases} clases y mantienes un buen ritmo en tu curso.`;
    toneClass = "is-good";
  } else if (completionRate >= 45) {
    messageTitle = "Vas al corriente";
    messageCopy = `Llevas ${clasesTomadas} clases tomadas y tu avance sigue en buena ruta.`;
    toneClass = "is-good";
  } else if (clasesTomadas > 0 || permisos > 0) {
    messageTitle = "Estás avanzando bien";
    messageCopy = "Mantente al tanto de tu calendario para cuidar tu progreso y evitar pendientes.";
    toneClass = "is-neutral";
  }

  return {
    asistencias,
    faltas,
    permisos,
    recuperaciones,
    totalClases,
    clasesRegistradas,
    clasesTomadas,
    clasesPendientes,
    completionRate,
    latestRegistered,
    nextClass,
    messageTitle,
    messageCopy,
    toneClass,
  };
}

function getMiVeneziaDocumentsOverview(student) {
  const reglamento = getStudentReglamentoStatus(student);
  const contrato = getStudentContratoStatus(student);
  const pendingCount = [!reglamento.confirmado, !contrato.confirmado].filter(Boolean).length;

  let summaryLabel = "Todo confirmado";
  if (pendingCount === 2) {
    summaryLabel = "2 pendientes";
  } else if (pendingCount === 1) {
    summaryLabel = "1 pendiente";
  }

  return {
    reglamento,
    contrato,
    pendingCount,
    summaryLabel,
  };
}

function getMiVeneziaNextAction(student, context) {
  const { documents, payments, attendance } = context;

  if (!documents.reglamento.confirmado) {
    return {
      eyebrow: "Documentos",
      badge: "REG pendiente",
      title: "Tu siguiente paso: confirmar reglamento",
      copy: "Lee y confirma el reglamento interno para mantener tu expediente administrativo al corriente.",
      meta: "Una vez confirmado, quedará visible en tu portal.",
      toneClass: "is-gold",
    };
  }

  if (!documents.contrato.confirmado) {
    return {
      eyebrow: "Documentos",
      badge: "CONT pendiente",
      title: "Tu siguiente paso: confirmar contrato",
      copy: "Revisa y confirma tu contrato de inscripción para completar tu documentación oficial.",
      meta: "Si necesitas apoyo, puedes contactar al equipo desde este portal.",
      toneClass: "is-gold",
    };
  }

  if (payments.pendingReferences.length > 0) {
    const nextPending = payments.pendingReferences[0];
    return {
      eyebrow: "Pagos",
      badge: nextPending.shortLabel,
      title: `Tu siguiente paso: pagar ${nextPending.shortLabel}`,
      copy: `Tu referencia ${nextPending.shortLabel} aparece con estatus pendiente y está programada para ${nextPending.date}.`,
      meta: "Mantener tus pagos al día te ayuda a seguir al corriente en tu proceso.",
      toneClass: "is-rose",
    };
  }

  if (attendance.nextClass) {
    return {
      eyebrow: "Asistencia",
      badge: attendance.nextClass.classLabel,
      title: "Tu siguiente paso: asistir a tu próxima clase",
      copy: `Tu siguiente sesión programada es el ${formatDisplayDate(attendance.nextClass.date) || attendance.nextClass.date}.`,
      meta: `${student?.horario || "-"} · ${student?.sucursal || "-"}`,
      toneClass: "is-blue",
    };
  }

  return {
    eyebrow: "Estado",
    badge: "Al corriente",
    title: "Vas muy bien en Mi Venezia",
    copy: "Tu información principal está ordenada y tu portal muestra un avance saludable en tu proceso académico.",
    meta: "Sigue consultando tu calendario para anticipar clases y fechas de pago.",
    toneClass: "is-green",
  };
}

function renderMiVeneziaActionCard(container, action) {
  if (!container) {
    return;
  }

  container.className = `mi-venezia-action-card ${action?.toneClass || ""}`.trim();
  container.innerHTML = `
    <span class="mi-venezia-action-eyebrow">${escapeHtml(action?.eyebrow || "Acción")}</span>
    <div class="mi-venezia-action-body">
      <span class="mi-venezia-action-badge">${escapeHtml(action?.badge || "-")}</span>
      <strong class="mi-venezia-action-title">${escapeHtml(action?.title || "Sin acción disponible")}</strong>
      <p class="mi-venezia-action-copy">${escapeHtml(action?.copy || "Tu próxima acción aparecerá aquí.")}</p>
      <small class="mi-venezia-action-meta">${escapeHtml(action?.meta || "")}</small>
    </div>
  `;
}

function renderMiVeneziaUpcomingSummary(container, items = []) {
  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <article class="mi-venezia-upcoming-item">
          <span class="mi-venezia-upcoming-label">${escapeHtml(item.label || "-")}</span>
          <strong class="mi-venezia-upcoming-value">${escapeHtml(item.value || "-")}</strong>
          <small class="mi-venezia-upcoming-meta">${escapeHtml(item.meta || "")}</small>
        </article>
      `
    )
    .join("");
}

function renderMiVeneziaDocumentsSummary(container, documents) {
  if (!container) {
    return;
  }

  const buildCard = (code, title, confirmed) => `
    <article class="mi-venezia-document-mini-card ${confirmed ? "is-confirmed" : "is-pending"}">
      <span class="mi-venezia-document-mini-code">${escapeHtml(code)}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${confirmed ? "Confirmado" : "Pendiente"}</small>
    </article>
  `;

  container.innerHTML = `
    <article class="mi-venezia-document-mini-card mi-venezia-document-mini-card-wide ${documents.pendingCount === 0 ? "is-confirmed" : "is-pending"}">
      <span class="mi-venezia-document-mini-code">Estado</span>
      <strong>${escapeHtml(documents.summaryLabel)}</strong>
      <small>${documents.pendingCount === 0 ? "Tu expediente digital está en orden." : "Revisa y confirma tus documentos oficiales."}</small>
    </article>
    ${buildCard("REG", "Reglamento", documents.reglamento.confirmado)}
    ${buildCard("CONT", "Contrato", documents.contrato.confirmado)}
  `;
}

function getMiVeneziaSafeText(value, fallback = "Sin información disponible por ahora.") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

const COMMON_FEMALE_PORTAL_THEME_NAMES = [
  "maria",
  "guadalupe",
  "laura",
  "ana",
  "sofia",
  "fernanda",
  "karla",
  "diana",
  "paola",
  "alejandra",
  "valeria",
  "ximena",
  "isabel",
  "jessica",
  "monica",
  "adriana",
  "yuritsi",
  "ysela",
  "isela",
];

const COMMON_MALE_PORTAL_THEME_NAMES = [
  "jose",
  "juan",
  "carlos",
  "luis",
  "miguel",
  "ismael",
  "moises",
  "diego",
  "alejandro",
  "fernando",
  "eduardo",
  "daniel",
  "antonio",
  "manuel",
  "javier",
];

const PORTAL_THEME_CLASSNAMES = {
  purple: "theme-purple",
  gold: "theme-gold",
  neutral: "theme-neutral",
};

const PORTAL_THEME_AVATAR_SOURCES = {
  purple: {
    primary: "images/avatar-student-female.png",
    fallback: "",
  },
  gold: {
    primary: "images/avatar-student-male.png",
    fallback: "",
  },
  neutral: {
    primary: "",
    fallback: "",
  },
};

function normalizePortalThemeName(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getFirstNormalizedNameToken(fullName) {
  return normalizePortalThemeName(fullName).split(" ").find(Boolean) || "";
}

function getSuggestedPortalThemeFromName(fullName) {
  const firstName = getFirstNormalizedNameToken(fullName);

  if (COMMON_FEMALE_PORTAL_THEME_NAMES.includes(firstName)) {
    return "purple";
  }

  if (COMMON_MALE_PORTAL_THEME_NAMES.includes(firstName)) {
    return "gold";
  }

  return "neutral";
}

function toStudentPortalNameCase(value) {
  const normalized = String(value ?? "").trim().replace(/\s+/g, " ");
  if (!normalized) {
    return "";
  }

  return normalized
    .split(" ")
    .map((part) => {
      const token = String(part || "").trim();
      if (!token) {
        return "";
      }
      return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
    })
    .filter(Boolean)
    .join(" ");
}

function getStudentPortalAvatarFallback(fullName) {
  const formattedName = toStudentPortalNameCase(fullName);
  if (!formattedName) {
    return "V";
  }

  const initials = formattedName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "V";
}

function getStudentAvatarDisplay(student) {
  const fullName = typeof student === "string" ? student : student?.nombre || "";
  const themeKey = getSuggestedPortalThemeFromName(fullName);
  const source = PORTAL_THEME_AVATAR_SOURCES[themeKey] || PORTAL_THEME_AVATAR_SOURCES.neutral;

  return {
    themeKey,
    src: source.primary || "",
    fallbackSrc: source.fallback || "",
    fallbackText: getStudentPortalAvatarFallback(fullName),
  };
}

function applyStudentAvatarDisplay(imageElement, fallbackElement, display) {
  if (fallbackElement) {
    fallbackElement.textContent = display?.fallbackText || "V";
  }

  if (!imageElement) {
    return;
  }

  const nextSrc = display?.src || "";
  const nextFallbackSrc = display?.fallbackSrc || "";

  if (!nextSrc) {
    imageElement.hidden = true;
    imageElement.classList.remove("is-ready");
    imageElement.removeAttribute("src");
    imageElement.dataset.currentSrc = "";
    imageElement.dataset.fallbackSrc = "";
    return;
  }

  if (imageElement.dataset.currentSrc === nextSrc) {
    imageElement.dataset.fallbackSrc = nextFallbackSrc;
    return;
  }

  imageElement.hidden = true;
  imageElement.classList.remove("is-ready");
  imageElement.dataset.currentSrc = nextSrc;
  imageElement.dataset.fallbackSrc = nextFallbackSrc;
  imageElement.src = nextSrc;
}

function getPortalThemeBadgeTone(themeKey) {
  return themeKey === "purple" ? "is-purple" : "is-gold";
}

function applyMiVeneziaPortalTheme(fullName) {
  const themeKey = getSuggestedPortalThemeFromName(fullName);
  const themeClassName = PORTAL_THEME_CLASSNAMES[themeKey] || PORTAL_THEME_CLASSNAMES.neutral;

  if (miVeneziaShell) {
    miVeneziaShell.classList.remove("theme-purple", "theme-gold", "theme-neutral");
    miVeneziaShell.classList.add(themeClassName);
    miVeneziaShell.dataset.portalTheme = themeKey;
  }

  if (themeKey) {
    document.body.dataset.studentPortalTheme = themeKey;
  } else {
    delete document.body.dataset.studentPortalTheme;
  }

  if (miVeneziaViewLabel) {
    miVeneziaViewLabel.className = `student-badge ${getPortalThemeBadgeTone(themeKey)}`.trim();
  }

  if (miVeneziaPortalBadge) {
    miVeneziaPortalBadge.className = `student-badge ${getPortalThemeBadgeTone(themeKey)}`.trim();
  }

  return {
    key: themeKey,
    className: themeClassName,
  };
}

function getMiVeneziaViewLabel(view) {
  return {
    dashboard: "Inicio",
    profile: "Perfil",
    payments: "Pagos",
    classes: "Clases",
    attendance: "Asistencias",
    documents: "Documentos",
    notices: "Avisos",
    certification: "Certificación",
    support: "Soporte",
  }[view] || "Inicio";
}

function getMiVeneziaStudentStatusSummary(student, context) {
  const { documents, payments, attendance } = context;

  if (documents.pendingCount > 0) {
    return {
      label: "Documentación pendiente",
      tone: "is-gold",
      detail: documents.pendingCount === 1
        ? "Tienes 1 documento pendiente por confirmar."
        : `Tienes ${documents.pendingCount} documentos pendientes por confirmar.`,
    };
  }

  if (payments.pendingReferences.length > 0 || Number.parseInt(payments.pendingSummary, 10) > 0) {
    return {
      label: "Pago pendiente",
      tone: "is-red",
      detail: `Revisa tu siguiente referencia: ${payments.nextPaymentText}.`,
    };
  }

  if (attendance.clasesTomadas > 0) {
    return {
      label: "En progreso",
      tone: "is-blue",
      detail: `Has completado ${attendance.clasesTomadas} de ${attendance.totalClases} clases.`,
    };
  }

  return {
    label: "Estudiante activo",
    tone: "is-green",
    detail: "Tu portal está listo y seguirá actualizándose conforme avances.",
  };
}

function getMiVeneziaAchievements(context) {
  const { documents, payments, attendance } = context;
  const achievements = [];

  if (attendance.clasesTomadas >= 1) {
    achievements.push({
      title: "Primera clase tomada",
      detail: "Ya comenzaste tu recorrido académico.",
      tone: "is-blue",
    });
  }

  if (payments.statusLabel === "Al corriente") {
    achievements.push({
      title: "Pago al corriente",
      detail: "Tu registro de pagos aparece al día.",
      tone: "is-green",
    });
  }

  if (documents.pendingCount === 0) {
    achievements.push({
      title: "Documentos completos",
      detail: "Tu expediente digital está confirmado.",
      tone: "is-gold",
    });
  }

  if (attendance.asistencias + attendance.recuperaciones >= 4) {
    achievements.push({
      title: "4 asistencias completadas",
      detail: "Tu constancia ya refleja continuidad.",
      tone: "is-purple",
    });
  }

  if (attendance.completionRate >= 50) {
    achievements.push({
      title: "50% de avance",
      detail: "Ya recorriste una parte importante de tu curso.",
      tone: "is-gold",
    });
  }

  return achievements;
}

function getMiVeneziaNoticeItems(student, context) {
  const { documents, payments, attendance } = context;
  const notices = [];

  if (documents.pendingCount > 0) {
    notices.push({
      title: "Documentación pendiente",
      copy: documents.pendingCount === 1
        ? "Confirma tu documento pendiente para mantener tu portal al día."
        : "Confirma tus documentos pendientes para mantener tu portal al día.",
      tone: "is-gold",
    });
  }

  if (payments.pendingReferences.length > 0) {
    notices.push({
      title: "Próximo pago por revisar",
      copy: `Tu siguiente referencia es ${payments.nextPaymentText}.`,
      tone: "is-red",
    });
  }

  if (attendance.nextClass) {
    notices.push({
      title: "Próxima clase programada",
      copy: `${attendance.nextClass.classLabel} · ${formatDisplayDate(attendance.nextClass.date) || attendance.nextClass.date} · ${getMiVeneziaSafeText(student?.horario, "Horario por confirmar")}`,
      tone: "is-blue",
    });
  }

  return notices.slice(0, 3);
}

function renderMiVeneziaStatusCard(container, summary) {
  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="student-status-card">
      <span class="student-badge ${escapeHtml(summary?.tone || "is-neutral")}">${escapeHtml(summary?.label || "Estudiante activo")}</span>
      <p class="student-card-meta">${escapeHtml(summary?.detail || "Tu portal está listo.")}</p>
    </div>
  `;
}

function renderMiVeneziaAchievements(container, achievements = []) {
  if (!container) {
    return;
  }

  if (achievements.length === 0) {
    container.innerHTML = `
      <article class="student-achievement is-neutral">
        <strong>Tu actividad aparecerá aquí</strong>
        <p>Conforme avances en tu portal, verás logros calculados con tu información actual.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = achievements
    .map(
      (achievement) => `
        <article class="student-achievement ${escapeHtml(achievement.tone || "is-neutral")}">
          <strong>${escapeHtml(achievement.title || "Logro")}</strong>
          <p>${escapeHtml(achievement.detail || "Tu avance se reflejará aquí.")}</p>
        </article>
      `
    )
    .join("");
}

function renderMiVeneziaNotices(container, notices = [], emptyMessage = "No tienes avisos pendientes por ahora.") {
  if (!container) {
    return;
  }

  if (notices.length === 0) {
    container.innerHTML = `<p class="student-empty-copy">${escapeHtml(emptyMessage)}</p>`;
    return;
  }

  container.innerHTML = notices
    .map(
      (notice) => `
        <article class="student-notice ${escapeHtml(notice.tone || "is-neutral")}">
          <strong>${escapeHtml(notice.title || "Aviso")}</strong>
          <p>${escapeHtml(notice.copy || "Estamos preparando esta información.")}</p>
        </article>
      `
    )
    .join("");
}

function getMiVeneziaAttendanceWeekGroups(attendanceCalendar = []) {
  const groups = [];
  const groupsByWeek = new Map();

  attendanceCalendar.forEach((entry, index) => {
    const weekNumber = entry.weekNumber || index + 1;
    if (!groupsByWeek.has(weekNumber)) {
      const group = {
        weekNumber,
        label: `Semana ${weekNumber}`,
        entries: [],
      };
      groupsByWeek.set(weekNumber, group);
      groups.push(group);
    }
    groupsByWeek.get(weekNumber).entries.push(entry);
  });

  return groups;
}

function renderMiVeneziaClasses(container, student, attendanceCalendar = [], attendanceOverview = {}) {
  if (!container) {
    return;
  }

  if (attendanceCalendar.length === 0) {
    container.innerHTML = `<p class="student-empty-copy">Tu calendario se actualizará pronto.</p>`;
    return;
  }

  const nextClassId = attendanceOverview.nextClass?.date || "";

  if (isWeekdayStudent(student)) {
    container.innerHTML = getMiVeneziaAttendanceWeekGroups(attendanceCalendar)
      .map(
        (group) => `
          <section class="student-week-group">
            <header class="student-week-group-header">
              <span class="student-class-label">${escapeHtml(group.label)}</span>
              <strong>${escapeHtml(`${group.entries.length} clase${group.entries.length === 1 ? "" : "s"}`)}</strong>
            </header>
            <div class="student-week-group-list">
              ${group.entries
                .map((entry) => {
                  const isNext = entry.date === nextClassId && entry.resultLabel === "Pendiente";
                  return `
                    <article class="student-class-item ${isNext ? "is-next" : ""}">
                      <div>
                        <span class="student-class-label">${escapeHtml(group.label)}</span>
                        <strong>${escapeHtml(entry.weekdayLabel || entry.classLabel || "Clase")}</strong>
                        <p>${escapeHtml(formatDisplayDate(entry.date) || entry.date || "Por confirmar")} · ${escapeHtml(getMiVeneziaSafeText(student?.horario, "Horario por confirmar"))}</p>
                      </div>
                      <span class="student-badge ${entry.resultLabel === "Pendiente" ? "is-neutral" : "is-blue"}">${escapeHtml(entry.resultLabel || "Pendiente")}</span>
                    </article>
                  `;
                })
                .join("")}
            </div>
          </section>
        `
      )
      .join("");
    return;
  }

  container.innerHTML = attendanceCalendar
    .map((entry) => {
      const isNext = entry.date === nextClassId && entry.resultLabel === "Pendiente";
      return `
        <article class="student-class-item ${isNext ? "is-next" : ""}">
          <div>
            <span class="student-class-label">${escapeHtml(entry.classLabel || "Clase")}</span>
            <strong>${escapeHtml(formatDisplayDate(entry.date) || entry.date || "Por confirmar")}</strong>
            <p>${escapeHtml(getMiVeneziaSafeText(student?.curso, "Curso por confirmar"))} · ${escapeHtml(getMiVeneziaSafeText(student?.horario, "Horario por confirmar"))}</p>
          </div>
          <span class="student-badge ${entry.resultLabel === "Pendiente" ? "is-neutral" : "is-blue"}">${escapeHtml(entry.resultLabel || "Pendiente")}</span>
        </article>
      `;
    })
    .join("");
}

function buildMiVeneziaAttendanceTableRows(student, attendanceCalendar = [], expanded = false) {
  if (isWeekdayStudent(student)) {
    const weekGroups = getMiVeneziaAttendanceWeekGroups(attendanceCalendar);
    const visibleWeekGroups = expanded ? weekGroups : weekGroups.slice(0, 2);

    return {
      rows: visibleWeekGroups
        .map(
          (group) => `
            <tr class="mi-venezia-week-row">
              <td colspan="3">${escapeHtml(group.label)}</td>
            </tr>
            ${group.entries
              .map(
                (entry) => `
                  <tr>
                    <td>${escapeHtml(entry.weekdayLabel || entry.classLabel || "Clase")}</td>
                    <td>${escapeHtml(entry.resultLabel || "Pendiente")}</td>
                    <td>${escapeHtml(formatDisplayDate(entry.date) || entry.date || "-")}</td>
                  </tr>
                `
              )
              .join("")}
          `
        )
        .join(""),
      shouldShowToggle: weekGroups.length > 2,
    };
  }

  const visibleAttendanceEntries = expanded ? attendanceCalendar : attendanceCalendar.slice(0, 4);
  return {
    rows: visibleAttendanceEntries
      .map(
        (entry) => `
          <tr>
            <td>${escapeHtml(entry.classLabel)}</td>
            <td>${escapeHtml(entry.resultLabel)}</td>
            <td>${escapeHtml(entry.date || "-")}</td>
          </tr>
        `
      )
      .join(""),
    shouldShowToggle: attendanceCalendar.length > 4,
  };
}

function setMiVeneziaView(view) {
  const allowedViews = new Set([
    "dashboard",
    "profile",
    "payments",
    "classes",
    "attendance",
    "documents",
    "notices",
    "certification",
    "support",
  ]);

  currentMiVeneziaView = allowedViews.has(view) ? view : "dashboard";
}

function resetMiVeneziaScrollPosition() {
  requestAnimationFrame(() => {
    if (mainContentShell && typeof mainContentShell.scrollTo === "function") {
      mainContentShell.scrollTo(0, 0);
    }
    if (miVeneziaStudentMain && typeof miVeneziaStudentMain.scrollTo === "function") {
      miVeneziaStudentMain.scrollTo(0, 0);
    }
    if (miVeneziaDashboard) {
      miVeneziaDashboard.scrollTop = 0;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function renderMiVeneziaViewState() {
  miVeneziaViewButtons.forEach((button) => {
    const isActive = button.dataset.studentView === currentMiVeneziaView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  miVeneziaViewPages.forEach((page) => {
    const isActive = page.dataset.studentPage === currentMiVeneziaView;
    page.classList.toggle("is-active", isActive);
    page.hidden = !isActive;
    page.setAttribute("aria-hidden", isActive ? "false" : "true");
    page.style.display = isActive ? "grid" : "none";
  });

  if (miVeneziaViewLabel) {
    miVeneziaViewLabel.textContent = getMiVeneziaViewLabel(currentMiVeneziaView);
  }

  resetMiVeneziaScrollPosition();
}

function openMiVeneziaView(view) {
  setMiVeneziaView(view);
  renderMiVeneziaViewState();
}

function renderMiVeneziaReglamento(student) {
  const { confirmado, fechaConfirmacion } = getStudentReglamentoStatus(student);

  if (miVeneziaViewReglamentoButton) {
    miVeneziaViewReglamentoButton.href = REGLAMENTO_PDF_PATH;
  }

  if (miVeneziaDownloadReglamentoButton) {
    miVeneziaDownloadReglamentoButton.href = REGLAMENTO_PDF_PATH;
  }

  if (miVeneziaReglamentoStatus) {
    miVeneziaReglamentoStatus.textContent = confirmado ? "Lectura confirmada" : "Lectura pendiente";
    miVeneziaReglamentoStatus.className = confirmado
      ? "status-pill mi-venezia-reglamento-status is-confirmed"
      : "status-pill status-pill-default mi-venezia-reglamento-status";
  }

  renderInfoList(miVeneziaReglamentoMeta, [
    { label: "Documento", value: "Reglamento Interno del Instituto Venezia" },
    { label: "Estado", value: confirmado ? "Reglamento leído" : "Pendiente de confirmación" },
    {
      label: "Fecha de lectura",
      value: fechaConfirmacion ? formatDisplayDateTime(fechaConfirmacion) : "Aún sin confirmar",
    },
  ]);

  if (miVeneziaConfirmReadButton) {
    miVeneziaConfirmReadButton.disabled = confirmado;
    miVeneziaConfirmReadButton.textContent = confirmado ? "Reglamento leído" : "Confirmo lectura";
  }
}

function renderMiVeneziaContrato(student) {
  const { confirmado, fechaConfirmacion } = getStudentContratoStatus(student);

  if (miVeneziaViewContratoButton) {
    miVeneziaViewContratoButton.href = CONTRATO_ALUMNO_PDF_PATH;
  }

  if (miVeneziaDownloadContratoButton) {
    miVeneziaDownloadContratoButton.href = CONTRATO_ALUMNO_PDF_PATH;
  }

  if (miVeneziaContratoStatus) {
    miVeneziaContratoStatus.textContent = confirmado ? "Lectura confirmada" : "Lectura pendiente";
    miVeneziaContratoStatus.className = confirmado
      ? "status-pill mi-venezia-reglamento-status is-confirmed"
      : "status-pill status-pill-default mi-venezia-reglamento-status";
  }

  renderInfoList(miVeneziaContratoMeta, [
    { label: "Documento", value: "Contrato de inscripción" },
    { label: "Estado", value: confirmado ? "Contrato leído" : "Pendiente de confirmación" },
    {
      label: "Fecha de lectura",
      value: fechaConfirmacion ? formatDisplayDateTime(fechaConfirmacion) : "Aún sin confirmar",
    },
  ]);

  if (miVeneziaConfirmContratoButton) {
    miVeneziaConfirmContratoButton.disabled = confirmado;
    miVeneziaConfirmContratoButton.textContent = confirmado ? "Contrato leído" : "Confirmo lectura";
  }
}

function renderMiVeneziaDocuments(student) {
  renderMiVeneziaReglamento(student);
  renderMiVeneziaContrato(student);
}

async function handleMiVeneziaReglamentoConfirmation() {
  const student = getStudentById(currentPortalStudentId);
  if (!student) {
    return;
  }

  const { confirmado } = getStudentReglamentoStatus(student);
  if (confirmado) {
    renderMiVeneziaReglamento(student);
    return;
  }

  if (miVeneziaConfirmReadButton) {
    miVeneziaConfirmReadButton.disabled = true;
    miVeneziaConfirmReadButton.textContent = "Guardando...";
  }

  const updatedStudent = {
    ...student,
    lecturaReglamento: true,
    fechaLecturaReglamento: new Date().toISOString(),
  };
  const saveResult = await saveStudentRecord(updatedStudent);

  renderMiVeneziaDashboard();

  if (!saveResult.synced) {
    alert("No se pudo confirmar la lectura del reglamento en el registro central.");
    return;
  }

  alert("La lectura del reglamento quedó confirmada.");
}

async function handleMiVeneziaContratoConfirmation() {
  const student = getStudentById(currentPortalStudentId);
  if (!student) {
    return;
  }

  const { confirmado } = getStudentContratoStatus(student);
  if (confirmado) {
    renderMiVeneziaContrato(student);
    return;
  }

  if (miVeneziaConfirmContratoButton) {
    miVeneziaConfirmContratoButton.disabled = true;
    miVeneziaConfirmContratoButton.textContent = "Guardando...";
  }

  const updatedStudent = {
    ...student,
    lecturaContrato: true,
    fechaLecturaContrato: new Date().toISOString(),
  };
  const saveResult = await saveStudentRecord(updatedStudent);

  renderMiVeneziaDashboard();

  if (!saveResult.synced) {
    alert("No se pudo confirmar la lectura del contrato en el registro central.");
    return;
  }

  alert("La lectura del contrato quedó confirmada.");
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
        <small>Sujeto a disponibilidad real según temporada y sucursal.</small>
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
  if (!student || isStudentDeleted(student)) {
    applyMiVeneziaPortalTheme("");
    const emptyAvatarDisplay = getStudentAvatarDisplay("");
    applyStudentAvatarDisplay(miVeneziaAvatarImage, miVeneziaAvatarFallback, emptyAvatarDisplay);
    applyStudentAvatarDisplay(miVeneziaSidebarAvatarImage, miVeneziaSidebarAvatarFallback, emptyAvatarDisplay);
    dataService.sessions.clearStudent();
    currentPortalStudentId = "";
    miVeneziaAttendanceExpanded = false;
    currentMiVeneziaView = "dashboard";
    miVeneziaLoginPanel.hidden = false;
    miVeneziaDashboard.hidden = true;
    return;
  }

  const payment = getPaymentRecord(student.id);
  const latestPayment = getLatestPaymentRecordForStudent(student.id);
  const paymentEntries = getStudentPaymentEntries(student);
  const attendanceHistory = attendanceRecords
    .filter((record) => record.studentId === student.id)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const attendanceCalendar = getStudentAttendanceCalendar(student);
  const paymentOverview = getMiVeneziaPaymentOverview(student, payment, paymentEntries, latestPayment);
  const attendanceOverview = getMiVeneziaAttendanceOverview(student, attendanceHistory, attendanceCalendar);
  const documentsOverview = getMiVeneziaDocumentsOverview(student);
  const statusSummary = getMiVeneziaStudentStatusSummary(student, {
    documents: documentsOverview,
    payments: paymentOverview,
    attendance: attendanceOverview,
  });
  const achievements = getMiVeneziaAchievements({
    documents: documentsOverview,
    payments: paymentOverview,
    attendance: attendanceOverview,
  });
  const notices = getMiVeneziaNoticeItems(student, {
    documents: documentsOverview,
    payments: paymentOverview,
    attendance: attendanceOverview,
  });
  const supportWhatsappUrl = getStudentPortalWhatsappUrl(student);
  const scheduleEntries = getStudentPaymentScheduleEntries(student);
  const profileSummary = [
    { label: "Nombre", value: getMiVeneziaSafeText(student.nombre) },
    { label: "Curso", value: getMiVeneziaSafeText(student.curso) },
    { label: "Plantel", value: getMiVeneziaSafeText(student.sucursal) },
    { label: "Horario", value: getMiVeneziaSafeText(student.horario) },
    { label: "Nivel / acceso", value: getMiVeneziaSafeText(student.accesoElegido, "Sin información disponible por ahora.") },
    { label: "Estado", value: statusSummary.label },
    { label: "Inicio", value: getMiVeneziaSafeText(formatDisplayDate(getStudentStartDateValue(student)), "Sin información disponible por ahora.") },
    { label: "Usuario Mi Venezia", value: getMiVeneziaSafeText(student.portalUser) },
  ];
  const monthlyAmount = parsePaymentAmount(paymentOverview.mensualidadPactada);
  const monthlyAmountLabel = monthlyAmount > 0
    ? formatCurrency(monthlyAmount)
    : getMiVeneziaSafeText(paymentOverview.mensualidadPactada);
  const attendancePercent = attendanceOverview.totalClases > 0
    ? `${attendanceOverview.completionRate}%`
    : "Sin información disponible por ahora.";
  const studentDisplayName = toStudentPortalNameCase(student.nombre);
  applyMiVeneziaPortalTheme(student.nombre);
  const avatarDisplay = getStudentAvatarDisplay(student);
  applyStudentAvatarDisplay(miVeneziaAvatarImage, miVeneziaAvatarFallback, avatarDisplay);
  applyStudentAvatarDisplay(miVeneziaSidebarAvatarImage, miVeneziaSidebarAvatarFallback, avatarDisplay);
  const nextClassMetaParts = [
    attendanceOverview.nextClass?.classLabel || "",
    student.curso || "",
    student.horario || "",
    student.maestra || student.maestro || student.docente || "",
  ].filter(Boolean);

  miVeneziaHeroName.textContent = `Hola, ${studentDisplayName || getMiVeneziaSafeText(student.nombre, "Estudiante")}`;
  miVeneziaHeroMeta.textContent = "Tu portal académico personalizado";
  renderInfoList(miVeneziaHeroSummary, [
    { label: "Curso", value: getMiVeneziaSafeText(student.curso) },
    { label: "Plantel", value: getMiVeneziaSafeText(student.sucursal) },
    { label: "Nivel / acceso", value: getMiVeneziaSafeText(student.accesoElegido) },
    { label: "Horario", value: getMiVeneziaSafeText(student.horario) },
  ]);

  if (miVeneziaSidebarName) {
    miVeneziaSidebarName.textContent = studentDisplayName || "Estudiante";
  }
  if (miVeneziaSidebarMeta) {
    miVeneziaSidebarMeta.textContent = `${getMiVeneziaSafeText(student.curso)} · ${getMiVeneziaSafeText(student.sucursal)} · ${getMiVeneziaSafeText(student.horario)}`;
  }
  if (miVeneziaSidebarStatus) {
    miVeneziaSidebarStatus.className = `student-badge ${statusSummary.tone}`.trim();
    miVeneziaSidebarStatus.textContent = statusSummary.label;
  }

  miVeneziaStatCourse.textContent = getMiVeneziaSafeText(student.curso, "-");
  miVeneziaStatAttendance.textContent = `${attendanceOverview.completionRate}%`;
  miVeneziaStatPayments.textContent = paymentOverview.nextPaymentText;
  miVeneziaStatStatus.textContent = statusSummary.label;
  miVeneziaContactButton.href = supportWhatsappUrl;
  if (miVeneziaWhatsappSupportButton) {
    miVeneziaWhatsappSupportButton.href = supportWhatsappUrl;
  }

  renderMiVeneziaStatusCard(miVeneziaStudentStatus, statusSummary);
  renderMiVeneziaDocuments(student);
  renderMiVeneziaDocumentsSummary(miVeneziaDocumentsSummary, documentsOverview);
  renderMiVeneziaUpcomingSummary(miVeneziaUpcoming, [
    {
      label: "Próxima clase",
      value: attendanceOverview.nextClass
        ? `${formatDisplayDate(attendanceOverview.nextClass.date) || attendanceOverview.nextClass.date} · ${getMiVeneziaSafeText(student.horario, "Horario por confirmar")}`
        : "Tu calendario se actualizará pronto.",
      meta: attendanceOverview.nextClass
        ? nextClassMetaParts.join(" · ")
        : "Tu calendario se actualizará pronto.",
    },
  ]);
  renderMiVeneziaActionCard(
    miVeneziaNextAction,
    getMiVeneziaNextAction(student, {
      documents: documentsOverview,
      payments: paymentOverview,
      attendance: attendanceOverview,
    })
  );

  renderStudentFileInfoList(miVeneziaDashboardPaymentSummary, [
    { label: "Próximo pago", value: paymentOverview.nextPaymentText, highlight: true },
    { label: "Monto", value: monthlyAmountLabel },
    { label: "Fecha límite", value: paymentOverview.upcomingReference?.date || "Estamos preparando esta información." },
    { label: "Estado", value: paymentOverview.statusLabel, badge: true, tone: paymentOverview.statusTone },
  ]);

  renderStudentFileInfoList(miVeneziaDashboardProgressSummary, [
    { label: "Clase actual", value: attendanceOverview.latestRegistered?.classLabel || attendanceOverview.nextClass?.classLabel || "Sin información disponible por ahora." },
    { label: "Total de clases", value: String(attendanceOverview.totalClases || 0) },
    { label: "Porcentaje", value: `${attendanceOverview.completionRate}%`, highlight: true },
  ]);

  renderStudentFileInfoList(miVeneziaDashboardAttendanceSummary, [
    { label: "Clases asistidas", value: String(attendanceOverview.asistencias + attendanceOverview.recuperaciones), badge: true, tone: "green" },
    { label: "Faltas", value: String(attendanceOverview.faltas), badge: true, tone: "red" },
    { label: "Asistencia", value: attendancePercent, highlight: true },
  ]);

  renderMiVeneziaAchievements(miVeneziaAchievements, achievements);
  renderMiVeneziaNotices(miVeneziaNoticesPreview, notices, "No tienes avisos pendientes por ahora.");
  renderMiVeneziaNotices(miVeneziaNoticesList, notices, "No tienes avisos pendientes por ahora.");
  renderMiVeneziaClasses(miVeneziaClassesList, student, attendanceCalendar, attendanceOverview);

  renderInfoList(miVeneziaPerfil, profileSummary);

  renderStudentFileInfoList(miVeneziaPagos, [
    { label: "Resumen actual", value: paymentOverview.statusLabel, badge: true, tone: paymentOverview.statusTone },
    { label: "Próximo pago", value: paymentOverview.nextPaymentText, highlight: true },
    { label: "Monto de referencia", value: monthlyAmountLabel },
    { label: "Método de pago", value: getMiVeneziaSafeText(paymentOverview.metodoPago), badge: true, tone: "blue" },
    { label: "Estado", value: paymentOverview.statusLabel, badge: true, tone: paymentOverview.statusTone },
    { label: "Pagos pendientes", value: paymentOverview.pendingSummary },
    { label: "Mensualidades", value: paymentOverview.monthlyProgress },
    { label: "C1", value: paymentOverview.certificateOneStatus, badge: true, tone: getPaymentTone(paymentOverview.certificateOneStatus) },
    { label: "C2", value: paymentOverview.certificateTwoStatus, badge: true, tone: getPaymentTone(paymentOverview.certificateTwoStatus) },
    { label: "Observaciones", value: getMiVeneziaSafeText(paymentOverview.observaciones, "Sin información disponible por ahora.") },
  ]);

  renderInfoList(
    miVeneziaPaymentSchedule,
    scheduleEntries.length > 0
      ? scheduleEntries
      : [{ label: "Calendario", value: "Tu calendario se actualizará pronto." }]
  );

  renderStudentFileInfoList(miVeneziaResumenAsistencias, [
    { label: "Asistencias", value: String(attendanceOverview.asistencias + attendanceOverview.recuperaciones), badge: true, tone: "green" },
    { label: "Faltas", value: String(attendanceOverview.faltas), badge: true, tone: "red" },
    { label: "Porcentaje", value: attendancePercent, highlight: true },
    { label: "Permisos", value: String(attendanceOverview.permisos), badge: true, tone: "gold" },
    {
      label: "Último registro",
      value: attendanceOverview.latestRegistered
        ? `${attendanceOverview.latestRegistered.classLabel} · ${attendanceOverview.latestRegistered.resultLabel}`
        : "Sin información disponible por ahora.",
    },
  ]);

  const attendanceTableState = buildMiVeneziaAttendanceTableRows(
    student,
    attendanceCalendar,
    miVeneziaAttendanceExpanded
  );
  miVeneziaAsistenciasBody.innerHTML = attendanceTableState.rows;
  miVeneziaAsistenciasEmptyState.hidden = attendanceCalendar.length > 0;
  if (miVeneziaAttendanceToggle) {
    miVeneziaAttendanceToggle.hidden = !attendanceTableState.shouldShowToggle;
    miVeneziaAttendanceToggle.textContent = miVeneziaAttendanceExpanded ? "Ver menos" : "Ver más";
  }

  miVeneziaPagosBody.innerHTML = paymentEntries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.fecha || "-")}</td>
          <td>${escapeHtml(entry.concepto || "-")}</td>
          <td>${entry.monto > 0 ? formatCurrency(entry.monto) : "Sin información disponible por ahora."}</td>
          <td>${escapeHtml(entry.estatus || "-")}</td>
        </tr>
      `
    )
    .join("");
  miVeneziaPagosEmptyState.hidden = paymentEntries.length > 0;
  miVeneziaProgressStatus.className = `mi-venezia-progress-status ${attendanceOverview.toneClass}`.trim();
  miVeneziaProgressStatus.innerHTML = `
    <div class="mi-venezia-progress-meter" aria-hidden="true">
      <span class="mi-venezia-progress-meter-fill" style="width: ${Math.max(0, Math.min(attendanceOverview.completionRate, 100))}%;"></span>
    </div>
    <strong>${escapeHtml(attendanceOverview.messageTitle)}</strong>
    <p>${escapeHtml(attendanceOverview.messageCopy || "Vas avanzando en tu formación. Cada clase suma a tu futuro profesional.")}</p>
  `;

  miVeneziaLoginPanel.hidden = true;
  miVeneziaDashboard.hidden = false;
  renderMiVeneziaViewState();
  resetMiVeneziaScrollPosition();
  dataService.sessions.setStudent(student.id);
}

function logoutMiVenezia() {
  currentPortalStudentId = "";
  miVeneziaAttendanceExpanded = false;
  currentMiVeneziaView = "dashboard";
  miVeneziaLoginForm.reset();
  miVeneziaLoginPanel.hidden = false;
  miVeneziaDashboard.hidden = true;
  dataService.sessions.clearStudent();
  resetPortalPasswordForm(miVeneziaPasswordForm, miVeneziaPasswordFeedback);
}

async function handleMiVeneziaPasswordChange(event) {
  event.preventDefault();

  if (!currentPortalStudentId) {
    return;
  }

  const formData = new FormData(miVeneziaPasswordForm);
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const validationError = getPasswordChangeValidationError({
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (validationError) {
    setPortalPasswordFeedback(miVeneziaPasswordFeedback, validationError, "error");
    return;
  }

  const originalButtonLabel = miVeneziaPasswordSubmitButton.textContent;
  miVeneziaPasswordSubmitButton.disabled = true;
  miVeneziaPasswordSubmitButton.textContent = "Guardando...";
  setPortalPasswordFeedback(miVeneziaPasswordFeedback);

  try {
    await validateSupabasePassword({
      table: "students",
      id: currentPortalStudentId,
      passwordField: "password",
      currentPassword,
      entityLabel: "el estudiante",
    });

    students = await dataService.entities.students.getAllPrimary(() => []);
    studentAccessRecords = await dataService.entities.studentPortalAccess.getAllPrimary(() => []);

    const latestStudent = getStudentById(currentPortalStudentId);
    if (!latestStudent) {
      throw new Error("No se encontró tu registro actual de Mi Venezia.");
    }

    const studentSnapshot = cloneSerializable(students);
    const studentAccessSnapshot = cloneSerializable(studentAccessRecords);
    const studentSaveResult = await saveStudentRecord({
      ...latestStudent,
      portalPassword: newPassword,
    });

    if (!studentSaveResult.synced) {
      students = restoreCollectionFromSnapshot(dataService.keys.students, studentSnapshot);
      throw new Error("No se pudo guardar la nueva contraseña en el registro principal de estudiantes.");
    }

    let accessWarning = "";
    const existingAccessRecord = studentAccessRecords.find((record) => record.studentId === latestStudent.id);
    const accessRecordPayload = {
      id: existingAccessRecord?.id || crypto.randomUUID(),
      studentId: latestStudent.id,
      telefono: normalizePhone(latestStudent.telefono),
      password: newPassword,
      notes: existingAccessRecord?.notes || "",
      createdAt: existingAccessRecord?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const accessSaveResult = await saveStudentPortalAccessRecord(accessRecordPayload);

    if (!accessSaveResult.synced) {
      studentAccessRecords = restoreCollectionFromSnapshot(
        dataService.keys.studentPortalAccess,
        studentAccessSnapshot
      );
      accessWarning =
        " La contraseña principal sí quedó actualizada; el espejo interno de acceso no se pudo refrescar.";
    }

    renderMiVeneziaDashboard();
    resetPortalPasswordForm(miVeneziaPasswordForm, miVeneziaPasswordFeedback);
    setPortalPasswordFeedback(
      miVeneziaPasswordFeedback,
      `Tu contraseña quedó actualizada.${accessWarning}`,
      accessWarning ? "warning" : "success"
    );
  } catch (error) {
    setPortalPasswordFeedback(
      miVeneziaPasswordFeedback,
      error?.message || "No se pudo actualizar la contraseña.",
      "error"
    );
  } finally {
    miVeneziaPasswordSubmitButton.disabled = false;
    miVeneziaPasswordSubmitButton.textContent = originalButtonLabel;
  }
}

async function handleTeacherPortalPasswordChange(event) {
  event.preventDefault();

  const currentUserId = currentInternalUserId;
  if (!currentUserId || currentAccessMode !== "teacher") {
    return;
  }

  const formData = new FormData(teacherPortalPasswordForm);
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const validationError = getPasswordChangeValidationError({
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (validationError) {
    setPortalPasswordFeedback(teacherPortalPasswordFeedback, validationError, "error");
    return;
  }

  const originalButtonLabel = teacherPortalPasswordSubmitButton.textContent;
  teacherPortalPasswordSubmitButton.disabled = true;
  teacherPortalPasswordSubmitButton.textContent = "Guardando...";
  setPortalPasswordFeedback(teacherPortalPasswordFeedback);

  try {
    await validateSupabasePassword({
      table: "internal_users",
      id: currentUserId,
      passwordField: "password",
      currentPassword,
      entityLabel: "la maestra",
    });

    internalUsers = await dataService.entities.internalUsers.getAllPrimary(() => []);
    staffRecords = await dataService.entities.staff.getAllPrimary(() => []);
    await normalizeInternalUsers();

    const latestUser = internalUsers.find((user) => user.id === currentUserId);
    if (!latestUser) {
      throw new Error("No se encontró tu registro principal de acceso.");
    }

    const internalUsersSnapshot = cloneSerializable(internalUsers);
    const staffSnapshot = cloneSerializable(staffRecords);
    const internalUserSaveResult = await saveInternalUserRecord({
      ...latestUser,
      password: newPassword,
    });

    if (!internalUserSaveResult.synced) {
      internalUsers = restoreCollectionFromSnapshot(dataService.keys.internalUsers, internalUsersSnapshot);
      throw new Error("No se pudo guardar la nueva contraseña en el registro principal de maestras.");
    }

    let staffWarning = "";
    const linkedStaffRecord =
      staffRecords.find((record) => record.linkedUserId === latestUser.id) ||
      staffRecords.find((record) => record.username && record.username === latestUser.username) ||
      null;

    if (linkedStaffRecord) {
      const staffSaveResult = await saveStaffRecord({
        ...linkedStaffRecord,
        password: newPassword,
      });

      if (!staffSaveResult.synced) {
        staffRecords = restoreCollectionFromSnapshot(dataService.keys.staff, staffSnapshot);
        staffWarning =
          " La cuenta principal sí quedó actualizada; no se pudo reflejar el cambio en Personal.";
      }
    }

    renderTeacherPortalDashboard();
    resetPortalPasswordForm(teacherPortalPasswordForm, teacherPortalPasswordFeedback);
    setPortalPasswordFeedback(
      teacherPortalPasswordFeedback,
      `Tu contraseña quedó actualizada.${staffWarning}`,
      staffWarning ? "warning" : "success"
    );
  } catch (error) {
    setPortalPasswordFeedback(
      teacherPortalPasswordFeedback,
      error?.message || "No se pudo actualizar la contraseña.",
      "error"
    );
  } finally {
    teacherPortalPasswordSubmitButton.disabled = false;
    teacherPortalPasswordSubmitButton.textContent = originalButtonLabel;
  }
}

function getTeacherProfileByInternalUser(user = getCurrentInternalUser()) {
  if (!user) {
    return null;
  }

  const linkedStaff = getLinkedTeacherStaffRecordForUser(user);

  if (linkedStaff) {
    return getTeacherProfileById(linkedStaff.id);
  }

  const linkedConfig = getLinkedTeacherConfigForUser(user);

  return linkedConfig ? getTeacherProfileById(linkedConfig.id) : null;
}

function getTeacherPortalCurrentRange() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const lastDay = new Date(year, month, 0).getDate();

  return {
    from: `${year}-${String(month).padStart(2, "0")}-${day <= 15 ? "01" : "16"}`,
    to: `${year}-${String(month).padStart(2, "0")}-${String(day <= 15 ? 15 : lastDay).padStart(2, "0")}`,
    label: day <= 15 ? "Quincena actual · 1 al 15" : `Quincena actual · 16 al ${lastDay}`,
  };
}

function getTeacherPortalEntries(profile) {
  if (!profile) {
    return [];
  }

  return getConsolidatedTeacherAttendanceEntries()
    .filter((entry) => entry.teacherId === profile.id)
    .sort((left, right) => String(right.fecha || "").localeCompare(String(left.fecha || "")));
}

function getTeacherPortalPayrollEntries(profile, range = getTeacherPortalCurrentRange()) {
  return getTeacherPortalEntries(profile).filter(
    (entry) => isTeacherDateWithinRange(entry.fecha, range) && entry.estatus === "Asistió"
  );
}

function getTeacherPortalPaymentDates(range = getTeacherPortalCurrentRange()) {
  if (!range?.from || !range?.to) {
    return [];
  }

  const [year, month] = range.to.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  const monthLabel = new Date(`${range.to}T12:00:00`).toLocaleDateString("es-MX", {
    month: "long",
  });

  return [
    { label: "Pago quincena 1", value: `15 de ${monthLabel}` },
    { label: "Pago quincena 2", value: `${lastDay} de ${monthLabel}` },
  ];
}

function getTeacherPortalRuleCards(profile) {
  const specialty = getTeacherOperationalSpecialty(profile);
  if (specialty === "Barbería") {
    return [
      { label: "Matutino", value: "$500 por fecha válida" },
      { label: "Vespertino", value: "Sin monto automático" },
      { label: "Ambos", value: "$700 por fecha válida" },
      { label: "Blindaje", value: "Se consolida una sola vez por fecha" },
    ];
  }

  if (specialty === "COORD de maestras") {
    return [
      { label: "Tabulador", value: "Sin monto automático asignado" },
      { label: "Periodo", value: "Se muestran jornadas reales" },
      { label: "Blindaje", value: "Consolidado por fecha" },
      { label: "Monto actual", value: "$0 hasta definir tabulador" },
    ];
  }

  return [
    { label: "Matutino", value: "$200 por turno válido" },
    { label: "Vespertino", value: "$200 por turno válido" },
    { label: "Ambos", value: "$400 por fecha válida" },
    { label: "Blindaje", value: "Consolidado por fecha" },
  ];
}

function getTeacherDirectorWhatsappUrl(profile) {
  const teacherName = String(profile?.nombreCompleto || "la maestra").trim();
  const branchLabel = profile?.sucursal ? ` de ${profile.sucursal}` : "";
  const message = encodeURIComponent(
    `Hola Dirección, soy ${teacherName}${branchLabel} y tengo una duda sobre mi portal de maestras.`
  );
  return `https://wa.me/522461379504?text=${message}`;
}

function renderTeacherPortalDashboard() {
  const user = getCurrentInternalUser();
  const linkedStaff = getLinkedTeacherStaffRecordForUser(user);
  const linkedConfig = getLinkedTeacherConfigForUser(user);
  const profile = getTeacherProfileByInternalUser(user);

  console.info("[Portal Maestras] Render", {
    username: user?.username || "",
    role: user?.role || "",
    currentAccessMode,
    teacherMode: isTeacherInternalUser(user),
    linkedStaffId: linkedStaff?.id || "",
    linkedConfigId: linkedConfig?.id || "",
    profileFound: Boolean(profile),
  });

  if (!user || currentAccessMode !== "teacher") {
    teacherPortalDashboard.hidden = true;
    return;
  }

  if (!profile) {
    teacherPortalHeroName.textContent = user.fullName || "Mi Portal Docente";
    teacherPortalHeroMeta.textContent = "Tu usuario está activo, pero aún no tiene un perfil docente enlazado en Personal/Maestras.";
    renderInfoList(teacherPortalHeroSummary, [
      { label: "Usuario", value: user.username || "-" },
      { label: "Sucursal", value: user.branch || "-" },
      { label: "Rol", value: user.role || "-" },
    ]);
    renderInfoList(teacherPortalProfile, [
      { label: "Estado", value: "Pendiente de enlace" },
      { label: "Acción", value: "Solicita a Dirección que vincule tu perfil docente." },
    ]);
    renderInfoList(teacherPortalPayrollSummary, [
      { label: "Periodo", value: getTeacherPortalCurrentRange().label },
      { label: "Nómina", value: "$0" },
      { label: "Estatus", value: "Sin configuración" },
    ]);
    renderInfoList(teacherPortalPayrollRules, [
      { label: "Portal", value: "Pendiente de enlace" },
    ]);
    renderInfoList(teacherPortalPeriodInfo, [
      { label: "Periodo actual", value: getTeacherPortalCurrentRange().label },
    ]);
    teacherPortalJornadasBody.innerHTML = "";
    teacherPortalPayrollBody.innerHTML = "";
    teacherPortalJornadasEmptyState.hidden = false;
    teacherPortalPayrollEmptyState.hidden = false;
    teacherPortalStatDays.textContent = "0";
    teacherPortalStatShifts.textContent = "0";
    teacherPortalStatIncidents.textContent = "0";
    teacherPortalStatPayroll.textContent = formatCurrency(0);
    teacherPortalContactButton.href = getTeacherDirectorWhatsappUrl({ nombreCompleto: user.fullName, sucursal: user.branch });
    teacherPortalDashboard.hidden = false;
    return;
  }

  const allEntries = getTeacherPortalEntries(profile);
  const period = getTeacherPortalCurrentRange();
  const payrollEntries = getTeacherPortalPayrollEntries(profile, period);
  const periodEntries = allEntries.filter((entry) => isTeacherDateWithinRange(entry.fecha, period));
  const incidents = periodEntries.filter((entry) => entry.estatus === "Falta" || entry.estatus === "Permiso");
  const totalDays = payrollEntries.length;
  const totalShifts = payrollEntries.reduce((sum, entry) => sum + getTeacherCoveredTurnUnits(entry.turno), 0);
  const totalPayroll = payrollEntries.reduce((sum, entry) => sum + Number(entry.estimatedPay || 0), 0);
  const statusLabel = profile.estadoDocente || user.status || "Activo";
  const operationalSpecialty = getTeacherOperationalSpecialty(profile);
  const coverageSpecialty = getTeacherCoverageDisplay(profile);
  const paymentDates = getTeacherPortalPaymentDates(period);

  teacherPortalHeroName.textContent = profile.nombreCompleto || user.fullName || "Mi Portal Docente";
  teacherPortalHeroMeta.textContent = `${profile.sucursal || "-"} · ${profile.puesto || "-"} · ${getTeacherSpecialtyDisplay(profile)}`;
  renderInfoList(teacherPortalHeroSummary, [
    { label: "Sucursal", value: profile.sucursal || "-" },
    { label: "Especialidad", value: profile.especialidad || "-" },
    { label: "Cobertura", value: coverageSpecialty || "Sin cobertura adicional" },
    { label: "Puesto", value: profile.puesto || "-" },
    { label: "Periodo", value: period.label },
  ]);

  teacherPortalStatDays.textContent = String(totalDays);
  teacherPortalStatShifts.textContent = String(totalShifts);
  teacherPortalStatIncidents.textContent = String(incidents.length);
  teacherPortalStatPayroll.textContent = formatCurrency(totalPayroll);
  teacherPortalContactButton.href = getTeacherDirectorWhatsappUrl(profile);

  renderInfoList(teacherPortalProfile, [
    { label: "Nombre completo", value: profile.nombreCompleto || "-" },
    { label: "Sucursal", value: profile.sucursal || "-" },
    { label: "Especialidad docente", value: profile.especialidad || "-" },
    { label: "Cubre especialidad", value: coverageSpecialty || "Sin cobertura adicional" },
    { label: "Especialidad operativa", value: operationalSpecialty || "-" },
    { label: "Puesto", value: profile.puesto || "-" },
    { label: "Estatus", value: statusLabel || "-" },
    { label: "Usuario", value: profile.usuario || user.username || "-" },
  ]);

  renderInfoList(teacherPortalPayrollSummary, [
    { label: "Periodo", value: period.label },
    { label: "Turnos válidos", value: String(totalShifts) },
    { label: "Especialidad pagada", value: operationalSpecialty || "-" },
    { label: "Total estimado", value: formatCurrency(totalPayroll) },
  ]);

  renderInfoList(teacherPortalPayrollRules, getTeacherPortalRuleCards(profile));
  renderInfoList(teacherPortalPeriodInfo, [
    { label: "Desde", value: period.from || "-" },
    { label: "Hasta", value: period.to || "-" },
    ...paymentDates,
    { label: "Días válidos", value: String(totalDays) },
    { label: "Monto actual", value: formatCurrency(totalPayroll) },
  ]);

  teacherPortalJornadasBody.innerHTML = allEntries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.fecha || "-")}</td>
          <td>${escapeHtml(entry.turno || "-")}</td>
          <td>${escapeHtml(entry.estatus || "-")}</td>
          <td>${escapeHtml(entry.observacion || "-")}</td>
        </tr>
      `
    )
    .join("");
  teacherPortalJornadasEmptyState.hidden = allEntries.length > 0;

  teacherPortalPayrollBody.innerHTML = payrollEntries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.fecha || "-")}</td>
          <td>${escapeHtml(entry.turno || "-")}</td>
          <td>${escapeHtml(entry.estatus || "-")}</td>
          <td>${formatCurrency(entry.estimatedPay || 0)}</td>
        </tr>
      `
    )
    .join("");
  teacherPortalPayrollEmptyState.hidden = payrollEntries.length > 0;

  teacherPortalDashboard.hidden = false;
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
  if (String(id || "").startsWith("payment:") || String(id || "").startsWith("balance-expense:")) {
    alert("Este movimiento proviene de Pagos o Balance. Modíficalo desde su módulo de origen.");
    return;
  }

  dataService.entities.financialMovements.deleteOne(id, { alertOnFailure: false }).then((deleteResult) => {
    financeRecords = deleteResult.records;
    if (!deleteResult.synced) {
      alert("No se pudo eliminar el movimiento en Supabase.");
    }
    renderFinanceTable();
    updateFinanceSummary();
    renderBalanceModule();
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

async function deleteStudentRecord(id) {
  const student = getStudentById(id);
  if (!student) {
    return;
  }

  const startDate = getStudentStartDateValue(student);
  const confirmed = window.confirm(
    `Vas a eliminar a ${student.nombre || "esta alumna"} del módulo Altas.\n\n` +
      "Esta acción puede afectar expediente, pagos, asistencias, acceso Mi Venezia y datos relacionados.\n" +
      "Para preservar consistencia, la alumna se marcará como eliminada y dejará de aparecer en módulos activos, " +
      "pero el historial relacionado no se borrará físicamente.\n\n¿Deseas continuar?"
  );
  if (!confirmed) {
    return;
  }

  const saveResult = await saveStudentRecord({
    ...student,
    fechaInscripcion: startDate,
    fechaInicio: startDate,
    estado: "Eliminada",
    deletedAt: new Date().toISOString(),
    deletedBy: getCurrentInternalUser()?.id || "",
  });

  if (!saveResult.synced) {
    alert("No se pudo marcar la alumna como eliminada en el registro central.");
    return;
  }

  syncStudentAccessRecords();
  if (document.getElementById("altaStudentId").value === id) {
    resetAltaForm();
  }
  if (currentPortalStudentId === id) {
    dataService.sessions.clearStudent();
    currentPortalStudentId = "";
  }
  renderAll();
  alert("La alumna quedó marcada como eliminada y se ocultó de los módulos activos.");
}

function getVisibleAttendanceRecordsForStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    return [];
  }

  const visibleDates = new Set(getStudentAttendanceSessionDates(student).map((session) => session.date));
  return attendanceRecords.filter((record) => record.studentId === studentId && visibleDates.has(record.fecha));
}

async function deleteAttendanceForStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    return;
  }

  const recordsToDelete = getVisibleAttendanceRecordsForStudent(studentId);
  if (recordsToDelete.length === 0) {
    alert("No hay asistencias visibles para eliminar en el periodo seleccionado.");
    return;
  }

  const confirmed = window.confirm(
    `Se eliminarán ${recordsToDelete.length} registro(s) de asistencia de ${student.nombre || "esta alumna"} ` +
      "del calendario individual visible de la alumna.\n\n¿Deseas continuar?"
  );
  if (!confirmed) {
    return;
  }

  let synced = true;
  for (const record of recordsToDelete) {
    const deleteResult = await dataService.entities.attendance.deleteOne(record.id, { alertOnFailure: false });
    attendanceRecords = deleteResult.synced
      ? await dataService.entities.attendance.getAllPrimary(() => [])
      : deleteResult.records;
    if (!deleteResult.synced) {
      synced = false;
      break;
    }
  }

  renderAttendanceTable();
  updateAttendanceSummary();
  if (selectedAttendanceStudentId === studentId) {
    renderAttendanceHistory(studentId);
  }
  if (activeStudentFileId === studentId) {
    renderStudentFile(studentId);
  }

  if (!synced) {
    alert("No se pudo eliminar toda la asistencia en Supabase.");
  }
}

async function deletePaymentForStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) {
    return;
  }

  const payment = getPaymentRecord(studentId);
  if (!payment.id) {
    alert("No hay un registro de pago guardado para el periodo seleccionado.");
    return;
  }

  const confirmed = window.confirm(
    `Se eliminará el registro de pago de ${student.nombre || "esta alumna"} para el periodo ${selectedPaymentsMonth}.\n\n¿Deseas continuar?`
  );
  if (!confirmed) {
    return;
  }

  const deleteResult = await dataService.entities.payments.deleteOne(payment.id, { alertOnFailure: false });
  paymentRecords = deleteResult.synced
    ? await dataService.entities.payments.getAllPrimary(() => [])
    : deleteResult.records;

  let financeDeleteSynced = true;
  if (deleteResult.synced) {
    const financeDeleteResult = await deleteLinkedPaymentFinanceRecords(payment.id);
    financeDeleteSynced = financeDeleteResult.synced;
  }

  renderPaymentsTable();
  renderBalanceModule();
  renderFinanceTable();
  updateFinanceSummary();
  updatePaymentsSummary();
  renderDashboard();
  if (activeStudentFileId === studentId) {
    renderStudentFile(studentId);
  }

  if (!deleteResult.synced) {
    alert("No se pudo eliminar el pago en Supabase.");
  } else if (!financeDeleteSynced) {
    alert("El pago se eliminó, pero no se pudo limpiar su ingreso financiero relacionado.");
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
  document.getElementById("altaClaveElector").value = "";
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
      fechaInicio: document.getElementById("altaFechaInscripcion").value,
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
  const previousModule = activeModule;
  const currentUser = getCurrentInternalUser();
  if (currentAccessMode !== "student" && shouldForceTeacherPortalAccess(currentUser) && currentAccessMode !== "teacher") {
    console.info("[Portal Maestras] Forzando modo teacher al activar módulo", {
      username: currentUser?.username || "",
      role: currentUser?.role || "",
      requestedModule: module,
      previousMode: currentAccessMode,
    });
    currentAccessMode = "teacher";
  }

  const allowedModule =
    currentAccessMode === "student"
      ? "mi-venezia"
      : currentAccessMode === "teacher"
        ? "portal-maestras"
      : currentAccessMode === "access-selector"
        ? "access-selector"
      : currentAccessMode === "internal"
        ? hasInternalAccess(module)
          ? module
          : getDefaultModuleForCurrentContext()
        : "web-venezia";

  activeModule = allowedModule;
  if (allowedModule === "asistencias" && previousModule !== "asistencias") {
    attendanceTableExpanded = false;
    renderAttendanceTable();
  }
  if (allowedModule === "pagos" && previousModule !== "pagos") {
    paymentsTableExpanded = false;
    renderPaymentsTable();
  }

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
    maestras: "Maestras",
    pagos: "Pagos",
    balance: "Balance",
    finanzas: "Finanzas",
    "usuarios-accesos": "Usuarios y accesos",
    personal: "Personal",
    "mi-venezia": "Mi Venezia",
    "portal-maestras": "Portal Maestras",
    "access-selector": "Selección de acceso",
    "web-venezia": "Web Venezia",
  };

  moduleBadge.textContent = badgeMap[allowedModule] || "Venezia One";
  document.body.classList.toggle(
    "student-portal-active",
    currentAccessMode === "student" && allowedModule === "mi-venezia"
  );
  document.body.classList.toggle(
    "teacher-portal-active",
    currentAccessMode === "teacher" && allowedModule === "portal-maestras"
  );

  if (currentAccessMode === "teacher" || allowedModule === "portal-maestras") {
    console.info("[Portal Maestras] Activando sección", {
      requestedModule: module,
      allowedModule,
      currentAccessMode,
      sectionActive: moduleSections["portal-maestras"]?.classList.contains("active") || false,
    });
  }
}

function renderAll() {
  applyBranchRestrictionsToUI();
  renderAccessSelector();
  populateStaffLinkedUsers();
  renderDashboard();
  renderTable();
  renderPendingAltas();
  renderAltaHistory();
  populateAttendanceFilters();
  renderTeachersModule();
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
  renderTeacherPortalDashboard();
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
    alert("No se pudo guardar la alta en el registro central. No se aplicó el cambio.");
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
  await refreshSharedSupabaseState({ force: true, render: false });
  syncStudentAccessRecords();
  renderAll();
  resetAltaForm();
  alert(isEditingExistingStudent ? "Alta actualizada correctamente." : "Alta guardada correctamente.");
}

altaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await refreshSharedSupabaseState({ force: true, render: false });
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

  const teacherMode = isTeacherInternalUser(user);
  console.info("[Portal Maestras] Login encontrado", {
    username: user.username,
    role: user.role,
    teacherMode,
    linkedStaffId: getLinkedTeacherStaffRecordForUser(user)?.id || "",
    linkedConfigId: getLinkedTeacherConfigForUser(user)?.id || "",
  });

  activeModule = "web-venezia";
  currentInternalUserId = user.id;
  currentAccessMode = shouldShowAccessSelector(user)
    ? "access-selector"
    : teacherMode
      ? "teacher"
      : "internal";
  publicAccessPanelOpen = false;
  dataService.sessions.setInternal(user.id);
  updateSessionUI();
  renderAll();
  console.debug("[Permisos] Login aplicado", {
    id: user.id,
    username: user.username,
    permissionsAfterSession: getCurrentInternalUser()?.permissions || [],
  });
  const targetModule = getDefaultModuleForCurrentContext();
  console.info("[Portal Maestras] Redirección post-login", {
    username: user.username,
    role: user.role,
    teacherMode,
    targetModule,
  });
  setActiveModule(targetModule);
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

teacherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const teacherData = getTeacherFormData();
  const selectedStaff = staffRecords.find((record) => record.id === teacherStaffId.value) || null;
  const isEditingExistingTeacher = Boolean(selectedStaff && getTeacherConfigForStaffRecord(selectedStaff));

  if (!teacherData || !teacherData.staffId || !teacherData.especialidad) {
    alert("Selecciona a una persona desde Personal y define la especialidad docente.");
    return;
  }

  await saveTeacherRecord(teacherData);
  renderAll();
  resetTeacherForm();
  alert(isEditingExistingTeacher ? "Configuración docente actualizada correctamente." : "Configuración docente guardada correctamente.");
});

teacherAttendanceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const attendanceData = getTeacherAttendanceFormData();
  const isUpdatingExistingRecord = teacherAttendanceRecords.some(
    (record) =>
      record.id === attendanceData.id ||
      (record.teacherId === attendanceData.teacherId && record.fecha === attendanceData.fecha)
  );

  if (!attendanceData.teacherId || !attendanceData.fecha || !attendanceData.turno || !attendanceData.estatus) {
    alert("Completa fecha, maestra, turno y estatus para guardar la asistencia laboral.");
    return;
  }

  saveTeacherAttendanceRecord(attendanceData);
  renderTeachersModule();
  resetTeacherAttendanceForm();
  alert(
    isUpdatingExistingRecord
      ? "La asistencia laboral se actualizó sobre la fecha existente."
      : "La asistencia laboral se guardó correctamente."
  );
});

if (teacherPaymentForm) {
  teacherPaymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const paymentData = getTeacherPaymentFormData();
    if (!paymentData) {
      return;
    }

    const isUpdatingExistingPayment = teacherPaymentRecords.some((record) => record.id === paymentData.id);

    if (
      !paymentData.teacherId ||
      !paymentData.sucursal ||
      !paymentData.especialidadOperativa ||
      !paymentData.turno ||
      !paymentData.fechaPago ||
      !paymentData.periodMonth ||
      !paymentData.fortnight ||
      !Number.isFinite(paymentData.montoPagado) ||
      paymentData.montoPagado <= 0 ||
      !paymentData.metodoPago
    ) {
      alert("Completa maestra, sucursal, especialidad operativa, turno, fecha, periodo, quincena, monto y método de pago para registrar el pago real.");
      return;
    }

    saveTeacherPaymentRecord(paymentData);
    renderTeachersModule();
    resetTeacherPaymentForm();
    alert(isUpdatingExistingPayment ? "El pago real se actualizó correctamente." : "El pago real se guardó correctamente.");
  });
}

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
  miVeneziaAttendanceExpanded = false;
  currentMiVeneziaView = "dashboard";
  resetPortalPasswordForm(miVeneziaPasswordForm, miVeneziaPasswordFeedback);
  renderMiVeneziaDashboard();
  miVeneziaLoginForm.reset();
});

function handleMiVeneziaViewNavigation(event) {
  if (!miVeneziaRoot) {
    return;
  }

  const trigger = event.target.closest("[data-student-view], [data-student-view-jump]");
  if (!trigger || !miVeneziaRoot.contains(trigger)) {
    return;
  }

  const view = trigger.dataset.studentView || trigger.dataset.studentViewJump || "";
  if (!view) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  openMiVeneziaView(view);
  if (typeof trigger.blur === "function") {
    trigger.blur();
  }
}

if (miVeneziaRoot && !miVeneziaRoot.dataset.viewDelegationBound) {
  miVeneziaRoot.addEventListener("click", handleMiVeneziaViewNavigation);
  miVeneziaRoot.dataset.viewDelegationBound = "true";
}

miVeneziaConfirmReadButton.addEventListener("click", () => {
  handleMiVeneziaReglamentoConfirmation();
});

miVeneziaConfirmContratoButton.addEventListener("click", () => {
  handleMiVeneziaContratoConfirmation();
});

if (miVeneziaAttendanceToggle) {
  miVeneziaAttendanceToggle.addEventListener("click", () => {
    miVeneziaAttendanceExpanded = !miVeneziaAttendanceExpanded;
    renderMiVeneziaDashboard();
  });
}

miVeneziaPasswordForm.addEventListener("submit", handleMiVeneziaPasswordChange);
teacherPortalPasswordForm.addEventListener("submit", handleTeacherPortalPasswordChange);

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
    button.addEventListener("click", async () => {
      if (await restoreInternalAccessFromSavedSession()) {
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
  if (!financeData) {
    return;
  }
  const saveResult = await saveFinanceRecord(financeData);
  if (!saveResult.synced) {
    renderFinanceTable();
    updateFinanceSummary();
    renderBalanceModule();
    renderDashboard();
    alert("No se pudo guardar el movimiento en Supabase. Se conservó sólo en el respaldo local.");
    return;
  }

  renderFinanceTable();
  updateFinanceSummary();
  renderBalanceModule();
  renderDashboard();
  resetFinanceForm();
});

balanceExpenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expenseData = getBalanceExpenseFormData();
  if (!expenseData) {
    return;
  }
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
  renderFinanceTable();
  updateFinanceSummary();
  renderDashboard();
  resetBalanceExpenseForm();
});

clearButton.addEventListener("click", resetForm);
internalUserClearButton.addEventListener("click", resetInternalUserForm);
staffClearButton.addEventListener("click", resetStaffForm);
teacherClearButton.addEventListener("click", resetTeacherForm);
teacherAttendanceClearButton.addEventListener("click", resetTeacherAttendanceForm);
if (teacherPaymentClearButton) {
  teacherPaymentClearButton.addEventListener("click", resetTeacherPaymentForm);
}
clearAltaButton.addEventListener("click", resetAltaForm);
financeClearButton.addEventListener("click", resetFinanceForm);
balanceExpenseClearButton.addEventListener("click", resetBalanceExpenseForm);
miVeneziaLogoutButton.addEventListener("click", logoutMiVenezia);
teacherPortalLogoutButton.addEventListener("click", logoutInternalSession);
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

teacherStaffId.addEventListener("change", syncTeacherConfigFields);

["teacherAttendanceDate", "teacherAttendanceTeacherId"].forEach((id) => {
  document.getElementById(id).addEventListener("change", syncTeacherAttendanceFields);
});

teacherAttendanceBranch.addEventListener("change", () => {
  populateTeacherSelects();
  syncTeacherAttendanceFields();
});

if (teacherPaymentBranch) {
  teacherPaymentBranch.addEventListener("change", () => {
    populateTeacherPaymentSelects();
    syncTeacherPaymentFields();
    applyTeacherPaymentAutoAmount();
  });
}

if (teacherPaymentTeacherId && teacherPaymentSpecialty) {
  teacherPaymentTeacherId.addEventListener("change", () => {
    const selectedTeacher = getTeacherProfileById(teacherPaymentTeacherId.value);
    teacherPaymentSpecialty.value = getTeacherOperationalSpecialty(selectedTeacher) || "";
    syncTeacherPaymentFields();
    applyTeacherPaymentAutoAmount({ force: true });
  });
}

["teacherPaymentMonth", "teacherPaymentFortnight"].forEach((id) => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("change", syncTeacherPaymentFields);
  }
});

["teacherPaymentSpecialty", "teacherPaymentShift"].forEach((id) => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("change", () => {
      applyTeacherPaymentAutoAmount({ force: true });
      syncTeacherPaymentFields();
    });
  }
});

teacherSummaryBranchFilter.addEventListener("change", renderTeachersModule);
teacherSummaryTeacherFilter.addEventListener("change", renderTeachersModule);
teacherSummaryMonthFilter.addEventListener("change", renderTeachersModule);
teacherSummaryFortnightFilter.addEventListener("change", renderTeachersModule);
if (teacherSummaryDateFromFilter) {
  teacherSummaryDateFromFilter.addEventListener("change", renderTeachersModule);
}
if (teacherSummaryDateToFilter) {
  teacherSummaryDateToFilter.addEventListener("change", renderTeachersModule);
}

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

if (altasMonthFilter) {
  altasMonthFilter.addEventListener("change", (event) => {
    selectedAltasMonth = event.target.value || getCurrentMonthValue();
    renderAltaHistory();
  });
}

dashboardBranchFilter.addEventListener("change", renderDashboard);

if (dashboardMonthFilter) {
  dashboardMonthFilter.addEventListener("change", (event) => {
    dashboardSelectedMonth = event.target.value || getCurrentMonthValue();
    renderDashboard();
  });
}

attendanceDate.addEventListener("change", renderAttendanceTable);
attendanceSearchInput.addEventListener("input", (event) => {
  activeAttendanceSearch = event.target.value;
  renderAttendanceTable();
});

if (attendanceToggleButton) {
  attendanceToggleButton.addEventListener("click", () => {
    attendanceTableExpanded = !attendanceTableExpanded;
    renderAttendanceTable();
  });
}

financeTipo.addEventListener("change", updateFinanceCategories);
financeMonthFilter.addEventListener("change", () => {
  populateFinanceVisibleMonthFilter();
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

if (paymentsToggleButton) {
  paymentsToggleButton.addEventListener("click", () => {
    paymentsTableExpanded = !paymentsTableExpanded;
    renderPaymentsTable();
  });
}

balanceBranchFilter.addEventListener("change", renderBalanceModule);
balanceDateFilter.addEventListener("change", renderBalanceModule);
balanceExpenseBranchField.addEventListener("change", () => {
  syncBalanceExpenseResponsible();
});

financeBranchFilter.addEventListener("change", () => {
  renderFinanceTable();
  updateFinanceSummary();
});

if (financeVisibleMonthFilter) {
  financeVisibleMonthFilter.addEventListener("change", (event) => {
    if (!financeMonthFilter) {
      return;
    }

    financeMonthFilter.value = event.target.value || selectedMonth;
    renderFinanceTable();
    updateFinanceSummary();
  });
}

if (dashboardOpenFinanceButton) {
  dashboardOpenFinanceButton.addEventListener("click", () => {
    setActiveModule("finanzas");
  });
}

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

altaHistoryTableBody.addEventListener("click", async (event) => {
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
  if (actionButton.dataset.action === "delete-student") {
    await deleteStudentRecord(actionButton.dataset.id);
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
  if (action === "delete-attendance") {
    await deleteAttendanceForStudent(id);
  }
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

  if (actionButton.dataset.action === "delete-payment") {
    await deletePaymentForStudent(actionButton.dataset.id);
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

teachersTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action='edit-teacher']");
  if (!actionButton) {
    return;
  }

  editTeacherRecord(actionButton.dataset.id);
});

teacherAttendanceTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action='edit-teacher-attendance']");
  if (!actionButton) {
    return;
  }

  editTeacherAttendanceRecord(actionButton.dataset.teacherId, actionButton.dataset.date);
});

if (teacherPaymentsTableBody) {
  teacherPaymentsTableBody.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action='edit-teacher-payment']");
    if (!actionButton) {
      return;
    }

    editTeacherPaymentRecord(actionButton.dataset.id);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const module = item.dataset.module;

    if (currentAccessMode === "access-selector") {
      return;
    }

    if (currentAccessMode === "student" && module !== "mi-venezia") {
      return;
    }

    if (currentAccessMode === "teacher" && module !== "portal-maestras") {
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
      module === "maestras" ||
      module === "pagos" ||
      module === "balance" ||
      module === "finanzas" ||
      module === "usuarios-accesos" ||
      module === "personal" ||
      module === "mi-venezia" ||
      module === "portal-maestras" ||
      module === "web-venezia"
    ) {
      setActiveModule(module);
      return;
    }
  });
});

if (accessSelectorCards) {
  accessSelectorCards.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-platform-module]");
    if (!actionButton) {
      return;
    }

    enterSelectedPlatform(actionButton.dataset.platformModule);
  });
}

if (accessSelectorLogoutButton) {
  accessSelectorLogoutButton.addEventListener("click", logoutInternalSession);
}

window.addEventListener("focus", () => {
  void refreshSharedSupabaseState();
});

window.addEventListener("pageshow", () => {
  void refreshSharedSupabaseState({ force: true });
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    void refreshSharedSupabaseState();
  }
});

async function initApp() {
  await refreshSharedSupabaseState({ force: true, render: false });
  teacherRecords = dataService.entities.teachers.getAll(() => []);
  teacherAttendanceRecords = dataService.entities.teacherAttendance.getAll(() => []);
  teacherPaymentRecords = dataService.entities.teacherPayments.getAll(() => []);
  balanceExpenses = dataService.entities.balanceExpenses.getAll(() => []);

  await normalizeLegacyProspects();
  mountTeacherPortalShell();
  resetForm();
  resetInternalUserForm();
  resetStaffForm();
  resetTeacherForm();
  resetTeacherAttendanceForm();
  resetTeacherPaymentForm();
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
