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
