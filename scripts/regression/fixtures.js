// Datos de prueba FICTICIOS para las pruebas de regresión de Venezia One.
// No son alumnas reales. Cubren los casos que más se rompen: cada curso,
// cada día de clase, alumnas activas/eliminadas/baja/finalizadas, pagos
// completos, parciales y atrasados, prospectos y personal docente.
// Si agregas un caso aquí, corre `node scripts/regression/run.js --actualizar=todos`
// y explica en el commit por qué cambió la foto base.

const ADMIN_PERMISSIONS = [
  "dashboard", "crm-prospectos", "altas", "asistencias", "maestras", "pagos",
  "balance", "finanzas", "personal", "usuarios-accesos", "web-venezia",
];

const docs = (...names) => names;

module.exports = {
  // Fecha y hora fija de las pruebas (hora de Tlaxcala).
  fixedNow: "2026-11-11T12:00:00-06:00",

  internalUsers: [
    { id: "u-admin", fullName: "DIRECCION PRUEBA", username: "admin.prueba", phone: "2460000001", password: "x", role: "Director General", branch: "Tlaxcala", permissions: ADMIN_PERMISSIONS, status: "Activo" },
    { id: "u-asesora", fullName: "ASESORA PRUEBA", username: "asesora.prueba", phone: "2460000002", password: "x", role: "Asesora", branch: "Tlaxcala", permissions: ["crm-prospectos", "altas"], status: "Activo" },
    { id: "u-doc-unas", fullName: "MARIA PRUEBA UNAS", username: "doc.unas", phone: "2460000003", password: "x", role: "Maestra", branch: "Tlaxcala", permissions: [], status: "Activo" },
    { id: "u-doc-barb", fullName: "LUIS PRUEBA BARBERO", username: "doc.barberia", phone: "2460000004", password: "x", role: "Maestra", branch: "Tlaxcala", permissions: [], status: "Activo" },
  ],

  staffRecords: [
    { id: "st-dir", nombre: "DIRECCION PRUEBA", telefono: "2460000001", puesto: "director administrativo de sucursal", area: "Dirección", sucursal: "Tlaxcala", fechaIngreso: "2026-01-05", estado: "Activo", linkedUserId: "u-admin", contactScheduleScope: "weekend" },
    { id: "st-unas", nombre: "MARIA PRUEBA UNAS", telefono: "2460000003", puesto: "docente de uñas", area: "Académica", sucursal: "Tlaxcala", fechaIngreso: "2026-02-01", estado: "Activo", linkedUserId: "u-doc-unas", username: "doc.unas" },
    { id: "st-barb", nombre: "LUIS PRUEBA BARBERO", telefono: "2460000004", puesto: "miss de barbería", area: "Académica", sucursal: "Tlaxcala", fechaIngreso: "2026-03-01", estado: "Activo", linkedUserId: "u-doc-barb", username: "doc.barberia" },
    { id: "st-ases", nombre: "ASESORA PRUEBA", telefono: "2460000002", puesto: "asesor de ventas", area: "Ventas", sucursal: "Tlaxcala", fechaIngreso: "2026-04-01", estado: "Activo", linkedUserId: "u-asesora" },
  ],

  students: [
    { id: "al-01", nombre: "ANA PRUEBA MARTES", telefono: "2461110001", sucursal: "Tlaxcala", curso: "Uñas", diaClases: "Martes y Miércoles", horario: "9am a 11am", fechaInscripcion: "2026-10-20", fechaInicio: "2026-10-20", accesoElegido: "Platinum", estado: "Activa", mensualidad: "1500", inscripcionPagada: "Sí", cantidadPago: "1000", asesoraInscribio: "ASESORA PRUEBA", documentosEntregados: docs("Reglamento interno", "Contrato de alumno", "CURP"), portalUser: "2461110001" },
    { id: "al-02", nombre: "BETY PRUEBA JUEVES", telefono: "2461110002", sucursal: "Tlaxcala", curso: "Uñas", diaClases: "Jueves", horario: "9am a 1pm", fechaInscripcion: "2026-10-15", fechaInicio: "2026-10-15", accesoElegido: "Oro", estado: "Activa", mensualidad: "1300", inscripcionPagada: "Sí", cantidadPago: "800", documentosEntregados: docs("Reglamento interno", "Contrato de alumno", "Acta de nacimiento", "CURP", "INE", "Comprobante de domicilio", "Comprobante de último grado de estudios") },
    { id: "al-03", nombre: "CARLA PRUEBA SABADO", telefono: "2461110003", sucursal: "Tlaxcala", curso: "Pestañas", diaClases: "Sábado", horario: "2pm a 6pm", fechaInscripcion: "2026-09-05", fechaInicio: "2026-09-05", accesoElegido: "Beca Venezia", estado: "Activa", mensualidad: "1100", inscripcionPagada: "Sí", documentosEntregados: docs("Reglamento interno") },
    { id: "al-04", nombre: "DANIEL PRUEBA VIERNES", telefono: "2461110004", sucursal: "Tlaxcala", curso: "Barbería", diaClases: "Viernes", horario: "12pm a 3pm", fechaInscripcion: "2026-10-16", fechaInicio: "2026-10-16", accesoElegido: "Platinum", estado: "Activa", mensualidad: "1600", inscripcionPagada: "Sí", documentosEntregados: docs() },
    { id: "al-05", nombre: "ERIK PRUEBA DOMINGO", telefono: "2461110005", sucursal: "Tlaxcala", curso: "Barbería", diaClases: "Domingo", horario: "9am a 12pm", fechaInscripcion: "2026-07-05", fechaInicio: "2026-07-05", accesoElegido: "Oro", estado: "Activa", mensualidad: "1600", inscripcionPagada: "Sí", documentosEntregados: docs("Reglamento interno", "Contrato de alumno") },
    { id: "al-06", nombre: "FERNANDA PRUEBA ELIMINADA", telefono: "2461110006", sucursal: "Tlaxcala", curso: "Uñas", diaClases: "Domingo", horario: "9am a 1pm", fechaInscripcion: "2026-10-18", fechaInicio: "2026-10-18", accesoElegido: "Oro", estado: "Eliminada", mensualidad: "1300" },
    { id: "al-07", nombre: "GABY PRUEBA BAJA", telefono: "2461110007", sucursal: "Tlaxcala", curso: "Maquillaje", diaClases: "Sábado", horario: "9am a 1pm", fechaInscripcion: "2026-05-02", fechaInicio: "2026-05-02", accesoElegido: "Plata", estado: "Baja definitiva", mensualidad: "1200" },
    { id: "al-09", nombre: "IRMA PRUEBA ENTRE SEMANA", telefono: "2461110009", sucursal: "Tlaxcala", curso: "Uñas", diaClases: "Entre semana", horario: "9am a 1pm", fechaInscripcion: "2026-08-04", fechaInicio: "2026-08-04", accesoElegido: "Oro", estado: "Activa", mensualidad: "1300", inscripcionPagada: "Sí", documentosEntregados: docs("Reglamento interno", "Contrato de alumno") },
    { id: "al-08", nombre: "HILDA PRUEBA VIERNES TARDE", telefono: "2461110008", sucursal: "Tlaxcala", curso: "Pestañas", diaClases: "Viernes", horario: "2pm a 6pm", fechaInscripcion: "2026-10-16", fechaInicio: "2026-10-16", accesoElegido: "Platinum", estado: "Activa", mensualidad: "1500", inscripcionPagada: "No" },
  ],

  paymentRecords: [
    { id: "pg-01", studentId: "al-01", mensualidadPactada: "1500", mensualidad1: "1500", paymentRealDate: "2026-10-20", metodoPago: "Efectivo", cantidadPagada: "1500" },
    { id: "pg-02", studentId: "al-02", mensualidadPactada: "1300", mensualidad1: "1300", certificadoP1: "500", paymentRealDate: "2026-10-15", metodoPago: "Transferencia" },
    { id: "pg-03", studentId: "al-03", mensualidadPactada: "1100", mensualidad1: "1100", mensualidad2: "1100", paymentRealDate: "2026-10-05", metodoPago: "Efectivo" },
    { id: "pg-05", studentId: "al-05", mensualidadPactada: "1600", mensualidad1: "1600", mensualidad2: "1600", mensualidad3: "800", paymentRealDate: "2026-09-05", metodoPago: "Efectivo" },
  ],

  attendanceRecords: [
    { id: "as-01", studentId: "al-01", fecha: "2026-10-20", estado: "Asistió" },
    { id: "as-02", studentId: "al-01", fecha: "2026-10-21", estado: "Asistió" },
    { id: "as-03", studentId: "al-01", fecha: "2026-10-27", estado: "Falta" },
    { id: "as-04", studentId: "al-02", fecha: "2026-10-15", estado: "Asistió" },
    { id: "as-05", studentId: "al-02", fecha: "2026-10-22", estado: "Asistió" },
    { id: "as-06", studentId: "al-04", fecha: "2026-10-16", estado: "Asistió" },
    { id: "as-07", studentId: "al-05", fecha: "2026-07-05", estado: "Asistió" },
    { id: "as-08", studentId: "al-05", fecha: "2026-07-12", estado: "Asistió" },
    { id: "as-09", studentId: "al-09", fecha: "2026-08-04", estado: "Asistió" },
    { id: "as-10", studentId: "al-09", fecha: "2026-08-05", estado: "Asistió" },
  ],

  prospects: [
    { id: "pr-01", nombre: "PROSPECTO CALIENTE", telefono: "2462220001", fechaContacto: "2026-11-02", sucursal: "Tlaxcala", curso: "Barbería", origen: "Facebook", medio: "WhatsApp", informacion: "Enviada", estado: "Nuevo", temperatura: "Caliente", asesoraAsignada: "ASESORA PRUEBA", accesoInteres: "Platinum", notas: "" },
    { id: "pr-02", nombre: "PROSPECTO PLATA VIEJO", telefono: "2462220002", fechaContacto: "2026-09-10", sucursal: "Tlaxcala", curso: "Uñas", origen: "Instagram", medio: "Llamada", informacion: "Pendiente", estado: "Seguimiento", temperatura: "Tibia", accesoInteres: "Plata", proximoSeguimiento: "2026-11-12", notas: "" },
    { id: "pr-03", nombre: "PROSPECTO INSCRITO", telefono: "2462220003", fechaContacto: "2026-10-01", sucursal: "Tlaxcala", curso: "Uñas", origen: "Recomendación", medio: "Presencial", informacion: "Enviada", estado: "Inscrito", temperatura: "Caliente", accesoInteres: "Oro", fechaInscripcion: "2026-10-15", notas: "" },
  ],

  financeRecords: [
    { id: "fi-01", fecha: "2026-11-03", sucursal: "Tlaxcala", tipo: "Ingreso", categoria: "Mensualidades", concepto: "Mensualidad prueba", monto: 1500, metodoPago: "Efectivo" },
    { id: "fi-02", fecha: "2026-11-04", sucursal: "Tlaxcala", tipo: "Egreso", categoria: "Material", concepto: "Material prueba", monto: 420, metodoPago: "Efectivo" },
  ],

  // Mi Venezia V2 (portal de alumna) lee Supabase directo: estas son filas
  // con el formato de las tablas, para responderle como si fuera Supabase.
  // Fecha de prueba: 11/nov/2026 12:00.
  miVenezia: {
    students: [
      // Pago vencido (Mensualidad 2, 05/nov) y Certificado C1 próximo (12/nov).
      { id: "mv-01", full_name: "LUCIA PRUEBA VENCIDA", phone: "2463330001", password: "1111", branch: "Tlaxcala", course: "Uñas", schedule: "9am a 1pm", start_date: "2026-10-15", access_selected: "Oro", status: "Activa", notes: "Día de clases: Jueves | Mensualidad asignada: 1300 | Género: Mujer | Documentos entregados: Reglamento interno, Contrato de alumno", created_at: "2026-10-10T10:00:00Z" },
      // Al corriente con Certificado C1 próximo (14/nov, en 3 días).
      { id: "mv-02", full_name: "PAOLA PRUEBA PROXIMO", phone: "2463330002", password: "2222", branch: "Tlaxcala", course: "Pestañas", schedule: "2pm a 6pm", start_date: "2026-10-17", access_selected: "Platinum", status: "Activa", notes: "Día de clases: Sábado | Mensualidad asignada: 1500 | Género: Mujer | Documentos entregados: Reglamento interno, Contrato de alumno, Acta de nacimiento, CURP, INE, Comprobante de domicilio, Comprobante de último grado de estudios", created_at: "2026-10-12T10:00:00Z" },
      // Alumno hombre al corriente; siguiente pago (Mensualidad 3, 04/dic) lejano.
      { id: "mv-03", full_name: "RAUL PRUEBA BARBERO", phone: "2463330003", password: "3333", branch: "Tlaxcala", course: "Barbería", schedule: "12pm a 3pm", start_date: "2026-10-16", access_selected: "Platinum", status: "Activa", notes: "Día de clases: Viernes | Mensualidad asignada: 1600 | Género: Hombre", created_at: "2026-10-11T10:00:00Z" },
      { id: "mv-04", full_name: "SARA PRUEBA PAUSA", phone: "2463330004", password: "4444", branch: "Tlaxcala", course: "Uñas", schedule: "9am a 11am", start_date: "2026-10-20", access_selected: "Oro", status: "Baja temporal", notes: "Día de clases: Martes y Miércoles | Mensualidad asignada: 1300 | Género: Mujer", created_at: "2026-10-13T10:00:00Z" },
      { id: "mv-05", full_name: "TANIA PRUEBA BAJA", phone: "2463330005", password: "5555", branch: "Tlaxcala", course: "Uñas", schedule: "9am a 1pm", start_date: "2026-08-02", access_selected: "Oro", status: "Baja definitiva", notes: "Día de clases: Domingo | Mensualidad asignada: 1300 | Género: Mujer", created_at: "2026-08-01T10:00:00Z" },
      { id: "mv-06", full_name: "URSULA PRUEBA FINALIZADA", phone: "2463330006", password: "6666", branch: "Tlaxcala", course: "Pestañas", schedule: "9am a 1pm", start_date: "2026-03-07", access_selected: "Platinum", status: "Curso finalizado", notes: "Día de clases: Sábado | Mensualidad asignada: 1500 | Género: Mujer", created_at: "2026-03-01T10:00:00Z" },
    ],
    student_portal_profiles: [],
    student_payments: [
      { id: "mvp-01", student_id: "mv-01", tuition_amount: "1300", payment_method: "Efectivo", notes: "1ra mensualidad: Pagado | 2da mensualidad: Pendiente | Certificado P1: Pendiente | Fecha real pago: 2026-10-15 | Mes pago: 2026-10 | Cantidad pagada: 1300", updated_at: "2026-10-15T12:00:00Z", created_at: "2026-10-15T12:00:00Z" },
      { id: "mvp-02", student_id: "mv-02", tuition_amount: "1500", payment_method: "Transferencia", notes: "1ra mensualidad: Pagado | 2da mensualidad: Pagado | Certificado P1: Pendiente | Fecha real pago: 2026-11-07 | Mes pago: 2026-11 | Cantidad pagada: 1500", updated_at: "2026-11-07T12:00:00Z", created_at: "2026-10-17T12:00:00Z" },
      { id: "mvp-03", student_id: "mv-03", tuition_amount: "1600", payment_method: "Efectivo", notes: "1ra mensualidad: Pagado | 2da mensualidad: Pagado | Certificado P1: Pagado | Fecha real pago: 2026-11-06 | Mes pago: 2026-11 | Cantidad pagada: 1600", updated_at: "2026-11-06T12:00:00Z", created_at: "2026-10-16T12:00:00Z" },
      { id: "mvp-04", student_id: "mv-04", tuition_amount: "1300", payment_method: "Efectivo", notes: "1ra mensualidad: Pagado | Fecha real pago: 2026-10-20", updated_at: "2026-10-20T12:00:00Z", created_at: "2026-10-20T12:00:00Z" },
      { id: "mvp-06", student_id: "mv-06", tuition_amount: "1500", payment_method: "Efectivo", notes: "1ra mensualidad: Pagado | 2da mensualidad: Pagado | Certificado P1: Pagado | 3ra mensualidad: Pagado | Certificado P2: Pagado | 4ta mensualidad: Pagado | 5ta mensualidad: Pagado", updated_at: "2026-07-01T12:00:00Z", created_at: "2026-03-07T12:00:00Z" },
    ],
    attendance_records: [
      { id: "mva-01", student_id: "mv-01", attendance_date: "2026-10-15", status: "Asistió", notes: "", created_at: "2026-10-15T12:00:00Z" },
      { id: "mva-02", student_id: "mv-01", attendance_date: "2026-10-22", status: "Asistió", notes: "", created_at: "2026-10-22T12:00:00Z" },
      { id: "mva-03", student_id: "mv-01", attendance_date: "2026-10-29", status: "Falta", notes: "Avisó", created_at: "2026-10-29T12:00:00Z" },
      { id: "mva-04", student_id: "mv-02", attendance_date: "2026-10-17", status: "Asistió", notes: "", created_at: "2026-10-17T12:00:00Z" },
      { id: "mva-05", student_id: "mv-03", attendance_date: "2026-10-16", status: "Asistió", notes: "", created_at: "2026-10-16T12:00:00Z" },
    ],
    finance_records: [],
    internal_users: [],
    staff: [],
  },

  balanceExpenses: [
    { id: "ba-01", fecha: "2026-11-05", sucursal: "Tlaxcala", concepto: "Papelería prueba", monto: 150, responsable: "DIRECCION PRUEBA" },
  ],
};
