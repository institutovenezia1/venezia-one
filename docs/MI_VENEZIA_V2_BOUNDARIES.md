# Mi Venezia V2 Boundaries

Mi Venezia V2 is an independent student portal. Changes requested for this portal must stay inside its own files unless the user explicitly approves touching shared Venezia One code.

## Module-Owned Files

Normal Mi Venezia V2 changes are limited to:

- `mi-venezia-v2.html`
- `mi-venezia-v2.css`
- `mi-venezia-v2.js`
- `mi-venezia-v2-data.js`
- `mi-venezia-v2-config.js`
- `mi-venezia-v2-utils.js`

Boundary, rule, and scope-check maintenance may also touch:

- `docs/MI_VENEZIA_V2_BOUNDARIES.md`
- `CODEX.md`
- `scripts/check-mi-venezia-v2-scope.js`

## Protected Files And Modules

Mi Venezia V2 tasks must not modify these shared files without explicit approval:

- `app.js`
- `dataService.js`
- `index.html`
- `style.css`
- Supabase schema, data, or table mappings

These product areas are protected from Mi Venezia V2 work:

- Altas
- Pagos
- Balance
- Asistencias
- Maestras
- Web Venezia
- Internal users and internal app shell
- Shared data services, date helpers, and rendering utilities

## Dependency Rule

Mi Venezia V2 must not depend on the legacy internal app runtime. It should not import or call:

- `app.js`
- `dataService.js`
- `renderMiVeneziaDashboard`
- `setActiveModule`
- `webVeneziaSection`
- `miVeneziaSection`
- `appShell`

If Mi Venezia V2 needs data, keep the access logic inside Mi Venezia V2-owned files, or request explicit approval before changing shared services.

## If A Shared Change Is Needed

Before changing any protected file:

1. Explain why Mi Venezia V2 cannot solve the issue inside its own boundary.
2. Name every protected file that would be touched.
3. Describe the risk to Altas, Pagos, Balance, Asistencias, Maestras, Web Venezia, and the internal system.
4. Wait for explicit user approval.
5. Keep the shared change minimal and verify the affected shared module.

## Commit Checklist

Before committing a Mi Venezia V2 task:

1. Run `node scripts/check-mi-venezia-v2-scope.js`.
2. Confirm `mi-venezia-v2.html` does not load `app.js`.
3. Confirm `mi-venezia-v2.js` does not call legacy internal portal functions.
4. Confirm no protected files are staged.
5. Document any explicitly approved exception in the final response.
