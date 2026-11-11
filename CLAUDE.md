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

12. **Blindaje por módulo (petición del CEO, 11/nov/2026): cada cambio se hace SOLO en el módulo que se pidió.** Si para resolverlo hay que tocar otro módulo o algo compartido, DETENTE antes de programar y pregunta al CEO explicando qué se afecta y por qué. Sigue el procedimiento de la sección "Blindaje por módulo".
13. **No subas nada con las pruebas en rojo.** Ver "Blindaje por módulo".

## Blindaje por módulo

Casi todos los módulos internos viven en `app.js`, así que el alcance se revisa **por función**, no por archivo. El mapa función → módulo está en `docs/MODULE_MAP.md` (se genera solo).

Módulos: `dashboard`, `crm`, `altas`, `asistencias`, `docentes-admin`, `pagos`, `balance`, `finanzas`, `personal`, `usuarios`, `web-venezia`, `portal-docente`, `mi-venezia-legacy`, `mi-venezia` (archivos `mi-venezia-v2.*`), `selector-accesos`, `shell` (login/menú), `datos-compartidos` (`dataService.js`, `supabase.js`).

**Antes de programar**
1. Identifica el módulo pedido.
2. Revisa en `docs/MODULE_MAP.md` si las funciones que vas a tocar son propias de ese módulo o compartidas.
3. Si vas a tocar algo compartido o de otro módulo: detente y pregunta al CEO (qué se toca, qué módulos se afectan, alternativa que evite tocarlo).

**Antes de commit (obligatorio)**
```bash
node scripts/check-module-scope.js --modulo=<modulo-pedido>
node scripts/regression/run.js
```
- `check-module-scope` debe salir ✅. Si sale ⚠️ y el CEO ya lo autorizó, córrelo con `--autorizado="motivo"` y menciona la autorización en el commit.
- `regression/run.js` compara lo que se ve en cada módulo (con datos ficticios y fecha fija) contra la foto base `scripts/regression/baseline.json`.
  - Si solo cambió el módulo pedido y el cambio es el esperado: `node scripts/regression/run.js --actualizar=<modulo>` e incluye `baseline.json` en el commit.
  - Si cambió OTRO módulo: es una descompostura. No subas nada; avisa al CEO.
  - `--actualizar=todos` solo con autorización explícita del CEO.
- Requiere Playwright (`npm i -g playwright` + `npx playwright install chromium`, o `CHROME_PATH`). Si no puedes instalarlo, dilo claramente; no lo des por probado.
- Si el parche viene preparado por ZIA, ya trae estas pruebas corridas; aun así corre `check-module-scope` (no necesita instalar nada).
- Después de un cambio grande en `app.js`, regenera el mapa: `node scripts/check-module-scope.js --mapa`.

**Capa 3: link de prueba solo en cambios grandes (decisión del CEO, 11/nov/2026)**
- **Cambios chicos** (textos, estilos, botones, ajustes dentro de un solo módulo con las capas 1 y 2 en verde): directo a `main`.
- **Cambios grandes**: NO van directo a `main`. Súbelos a una rama `claude/...`, pásale al CEO el link de prueba (Preview) de Vercel y espera a que diga "mergea" antes de pasar a `main`. Es cambio grande si cumple cualquiera de estos:
  - Toca la lógica de **Altas, Pagos o Asistencias** (dinero, fechas de clase, estados de alumnas).
  - Toca `dataService.js`, `supabase.js`, tablas o columnas de Supabase.
  - Rediseña un portal o módulo completo (por ejemplo Mi Venezia).
  - `check-module-scope` marcó funciones compartidas (aunque el CEO lo haya autorizado).
- Avisa siempre al CEO: el link de prueba usa la **misma base de datos real**. Ahí solo se revisa; no se guarda, no se da de alta ni se registran pagos.

## Validación mínima
```bash
python3 -m http.server 5173
node --check app.js
node --check dataService.js
node --check supabase.js
```
Verifica login interno, selector de accesos, CRM, Altas, Asistencias, Pagos, Balance, Finanzas y Mi Venezia en escritorio/móvil.
Además, las dos pruebas de "Blindaje por módulo".

## Estado de referencia
- Repo: `institutovenezia1/venezia-one`
- Rama: `main`
- Commit confirmado: `33115f49b0e84701ac1f96a87053b65fb93fe92f`
