# Codex Project Rules

## Cambios En Mi Venezia V2

Cuando el usuario solicite cambios en Mi Venezia V2, Codex debe modificar solo archivos propios de Mi Venezia V2:

- `mi-venezia-v2.html`
- `mi-venezia-v2.css`
- `mi-venezia-v2.js`
- `mi-venezia-v2-data.js`
- `mi-venezia-v2-config.js`
- `mi-venezia-v2-utils.js`

Tambien puede mantener la documentacion y guardas de frontera del modulo:

- `docs/MI_VENEZIA_V2_BOUNDARIES.md`
- `CODEX.md`
- `scripts/check-mi-venezia-v2-scope.js`

No debe tocar `app.js`, `dataService.js`, `index.html`, `style.css`, Supabase, ni modulos compartidos de Altas, Pagos, Balance, Asistencias, Maestras, Web Venezia o sistema interno, salvo aprobacion explicita del usuario.

Antes de hacer commit para una tarea de Mi Venezia V2, ejecutar:

```bash
node scripts/check-mi-venezia-v2-scope.js
```

Si el cambio necesita tocar un archivo protegido, Codex debe explicar por que no puede resolverse dentro de Mi Venezia V2 y esperar aprobacion explicita.

## Cambios En Web Venezia

Cuando el usuario solicite cambios en Web Venezia, Codex debe modificar solo archivos o assets propios de la landing publica:

- `web-venezia.css`
- `web-venezia.js`
- `web-venezia-config.js`
- `images/web-venezia/*`
- `assets/images/web-venezia/*`
- assets publicos de Web Venezia ya documentados en `docs/WEB_VENEZIA_BOUNDARIES.md`

Tambien puede mantener la documentacion y guardas de frontera del modulo:

- `docs/WEB_VENEZIA_BOUNDARIES.md`
- `CODEX.md`
- `scripts/check-web-venezia-scope.js`

No debe tocar Mi Venezia V2, Portal viejo Mi Venezia, Pagos, Balance, Altas, Asistencias, Maestras, Finanzas, `dataService.js`, logica de Supabase, logica financiera, logica de guardado, logica de fechas ni sistema interno, salvo aprobacion explicita del usuario.

`index.html`, `style.css` y `app.js` son archivos compartidos. Si una tarea de Web Venezia requiere tocar cualquiera de ellos, Codex debe explicar exactamente que seccion tocara, por que es necesario, que riesgo tiene para otros modulos y esperar aprobacion explicita antes de editar.

El boton publico `Mi Venezia` debe seguir apuntando a `/mi-venezia-v2.html`. No debe regresar al portal viejo, usar `setActiveModule`, depender de `miVeneziaSection` ni abrir el flujo viejo.

El boton publico `Acceso interno` debe conservar el flujo interno existente salvo aprobacion explicita.

Antes de hacer commit para una tarea de Web Venezia, ejecutar:

```bash
node scripts/check-web-venezia-scope.js
```
