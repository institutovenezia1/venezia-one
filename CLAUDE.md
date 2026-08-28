# Venezia One — instrucciones para Claude

Lee primero `docs/CLAUDE_HANDOFF.md` antes de proponer o ejecutar cambios.

## Propósito
Venezia One es el sistema central de operaciones del Instituto de Belleza Venezia. La única sucursal activa es **Tlaxcala**.

## Arquitectura
- HTML, CSS y JavaScript sin framework.
- `index.html`: entrada principal.
- `app.js`: interfaz y lógica de negocio.
- `dataService.js`: persistencia y adaptación de datos.
- `supabase.js`: cliente Supabase.
- `style.css`: estilos.
- Vercel despliega desde `main`.
- Supabase es primario para `internal_users`, `staff`, `prospects`, `students`, `attendance_records` (asistencias), `student_payments` (pagos), `student_academic_cycles` (ciclos académicos), `finance_records` (finanzas) y `student_portal_profiles` (accesos Mi Venezia).
- `localStorage` sigue siendo caché/respaldo de esas entidades y almacenamiento primario para las no migradas: maestras, asistencias/pagos de maestras, balance (gastos), solicitudes y configuración de Web Venezia, y sesiones (interna y Mi Venezia).

## Reglas obligatorias
1. Inspecciona el flujo completo antes de modificarlo y explica el diagnóstico con archivos y funciones.
2. Trabaja en micro-pasos; evita reescrituras completas o migraciones de framework sin autorización.
3. No elimines compatibilidad con `localStorage` ni cambies el modelo híbrido sin migración aprobada.
4. No cambies campos, estados, claves o tablas sin rastrear todos sus consumidores.
5. Conserva compatibilidad con Safari, Android y WebView. No retires polyfills o diagnóstico de arranque sin pruebas.
6. Nunca expongas secretos, service-role keys, tokens ni credenciales.
7. No mezcles este repositorio con Landing Page Venezia 3.0; se comunican mediante Supabase.
8. No reincorpores Puebla. La operación vigente es Tlaxcala.
9. Antes de commit/push/deploy de cambios sensibles, muestra diagnóstico, alcance y pruebas.
10. Si código y documentación difieren, `main` es la fuente técnica de verdad; actualiza la documentación.
11. **Si modificas `app.js`, `style.css`, `mi-venezia-v2.css` o `mi-venezia-v2.js`, actualiza también el parámetro `?v=` con el que ese archivo se carga en `index.html` (o `mi-venezia-v2.html`).** Sin ese cambio, los navegadores que ya visitaron el sitio siguen sirviendo la versión vieja desde caché y el deploy parece "no reflejarse" aunque el código en `main` ya sea el correcto. Usa un valor único y descriptivo, por ejemplo `?v=20260828-horarios-dias-clase`.

## Validación mínima
```bash
python3 -m http.server 5173
node --check app.js
node --check dataService.js
node --check supabase.js
```
Verifica login interno, selector de accesos, CRM, Altas, Asistencias, Pagos, Balance, Finanzas y Mi Venezia en escritorio/móvil.

## Estado de referencia
- Repo: `institutovenezia1/venezia-one`
- Rama: `main`
- Commit confirmado: `33115f49b0e84701ac1f96a87053b65fb93fe92f`
