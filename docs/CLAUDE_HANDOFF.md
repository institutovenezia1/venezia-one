# Transferencia técnica — Venezia One

## Objetivo del producto
Sistema operativo integral para Instituto Venezia: dashboard, CRM, altas, asistencias, pagos, balance, finanzas, maestras, personal, usuarios/accesos, Web Venezia y Mi Venezia.

## Módulos principales
- `dashboard`
- `crm-prospectos`
- `altas`
- `asistencias`
- `pagos`
- `balance`
- `maestras`
- `finanzas`
- `personal`
- `usuarios-accesos`
- `web-venezia`
- `mi-venezia-v2.html`

## Datos
`dataService.js` declara claves `venezia-one-v2-*`. Actualmente Supabase es primario para usuarios internos (`internal_users`), personal (`staff`), prospectos (`prospects`), estudiantes/altas (`students`), asistencias (`attendance_records`), pagos (`student_payments`), ciclos académicos (`student_academic_cycles`), finanzas (`finance_records`) y accesos de Mi Venezia (`student_portal_profiles`). Siguen solo en localStorage: maestras, asistencias/pagos de maestras, balance (gastos), solicitudes y configuración de Web Venezia, y las sesiones (interna y Mi Venezia, vía localStorage/sessionStorage). No asumir migración total.

## Consideraciones delicadas
- Duraciones: cursos estándar 20 sesiones; Barbería 24; existe compatibilidad heredada y una lista autorizada de duración extendida.
- Pagos incluyen mensualidades 1–6, C1, C2, fecha real, método, reportes y observaciones.
- Estados académicos y de baja alimentan Asistencias, Pagos, Altas y expediente.
- Mi Venezia tuvo problemas de pantalla blanca en Android/WebView; hay marcadores, polyfills y panel diagnóstico.
- La clave anon/publicable puede estar en cliente; una `service_role` jamás debe estar allí.

## Últimos cambios confirmados
- Sidebar glass y reordenamiento visual: `33115f4`.
- Duraciones y mensualidad 6: `8a642e0`.
- Duración extendida solo para alumnas autorizadas: `351bc4c`.
- Ciclos académicos/continuidades en Altas y Asistencias: commits de julio de 2026.

## Flujo recomendado con Claude
1. `git status`, `git log -5 --oneline`.
2. Leer `CLAUDE.md`, este archivo y los archivos afectados.
3. Diagnóstico read-only.
4. Plan de micro-cambio.
5. Implementación mínima.
6. `node --check` y prueba visual.
7. Mostrar diff.
8. Commit/push/deploy solo con autorización del usuario.
