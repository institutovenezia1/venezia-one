# Web Venezia Boundaries

Web Venezia is the public commercial landing for Instituto Venezia inside Venezia One. It contains the public hero, brand header, public Mi Venezia link, internal access entry, course slider, promotional sections, testimonials, location content, lead form, WhatsApp links, and public commercial assets.

This boundary protects operational modules from visual or commercial landing changes.

## Current Location

Web Venezia is currently mixed into shared files:

- `index.html`
  - Public access/login shell: `#loginShell`
  - Public landing module: `#webVeneziaSection`
  - Public Mi Venezia links that must keep `href="/mi-venezia-v2.html"`
  - Public internal access buttons: `#publicInternalAccessButton` and `#footerInternalAccessButton`
- `style.css`
  - Public landing styles using selectors such as `.web-*`, `.hero-slider*`, `.web-sales-*`, `.web-course-*`, `.web-testimonial-*`, `.web-location-*`, `.web-floating-whatsapp`, and `body.public-mode`
  - Responsive Web Venezia rules inside shared media queries
- `app.js`
  - Web constants such as `WEB_DEFAULT_WHATSAPP_NUMBER` and `WEB_DEFAULT_COURSES`
  - Web DOM references such as `webLeadForm`, `webCoursesGrid`, `webScholarshipCard`, `heroSlider`, and public access buttons
  - Web lead form payload and submit flow
  - Web course rendering, scholarship rendering, WhatsApp links, hero slider, and public internal access handlers

These files are shared and protected for future Web Venezia work unless the user explicitly approves touching the exact section.

## Preferred Future Module-Owned Files

New Web Venezia work should move toward module-owned files when safe:

- `web-venezia.css`
- `web-venezia.js`
- `web-venezia-config.js`
- `images/web-venezia/*`
- `assets/images/web-venezia/*`

Do not migrate existing shared code unless the user asks for that migration and approves the touched shared files.

## Current Web Assets

The current public landing uses these image assets:

- `images/logo-principal-sinfondo.png`
- `images/hero-sin-tiempo.png`
- `images/barberia.jpg`
- `images/unas.jpg`
- `images/pestanas.jpg`
- `images/testimonio-adriana.jpg`
- `images/testimonio-daniela.jpg`
- `images/testimonio-irving.jpg`
- `images/ubicacion-tx.jpg`
- `images/beca-venezia.jpg`

New public landing images should go under `images/web-venezia/` or `assets/images/web-venezia/` to avoid mixing with operational assets.

## Protected Files And Modules

Web Venezia tasks must not modify these files without explicit approval:

- `index.html`
- `style.css`
- `app.js`
- `dataService.js`
- `supabase.js`
- `mi-venezia-v2.html`
- `mi-venezia-v2.css`
- `mi-venezia-v2.js`
- `mi-venezia-v2-data.js`
- `mi-venezia-v2-config.js`
- `mi-venezia-v2-utils.js`

These product areas are protected from Web Venezia work:

- Mi Venezia V2
- Legacy Mi Venezia student portal
- Altas
- Pagos
- Balance
- Asistencias
- Maestras
- Finanzas
- Internal users and internal system
- Supabase access, save logic, date logic, and financial logic

## Allowed Changes Without Extra Approval

For a Web Venezia-only task, changes are limited to:

- `web-venezia.css`
- `web-venezia.js`
- `web-venezia-config.js`
- `images/web-venezia/*`
- `assets/images/web-venezia/*`
- Current Web Venezia image assets listed above
- `docs/WEB_VENEZIA_BOUNDARIES.md`
- `scripts/check-web-venezia-scope.js`
- `CODEX.md` only for Web Venezia rules

## Changes That Require Explicit Approval

Ask the user before touching:

- Any section of `index.html`
- Any selector or media query in `style.css`
- Any function, constant, event handler, or data flow in `app.js`
- Any Supabase, CRM, prospect, payment, balance, attendance, finance, internal access, or student portal logic
- Any Mi Venezia V2 file

When approval is needed, describe the exact file, exact section, reason, and risk.

## Button Validation

Public Mi Venezia must remain a direct link to:

```text
/mi-venezia-v2.html
```

It must not use `setActiveModule`, `miVeneziaSection`, `renderMiVeneziaDashboard`, or the legacy Mi Venezia flow.

Public internal access must keep using the current internal access buttons:

- `#publicInternalAccessButton`
- `#footerInternalAccessButton`

Those buttons are handled by the existing internal access flow in `app.js`. Do not change that flow without explicit approval.

## Commit Checklist

Before committing a Web Venezia task:

1. Run `node scripts/check-web-venezia-scope.js`.
2. Confirm no Mi Venezia V2 files changed.
3. Confirm no Pagos, Balance, Altas, Asistencias, Maestras, Finanzas, Supabase, or data service files changed.
4. Confirm public Mi Venezia links still point to `/mi-venezia-v2.html`.
5. Confirm public internal access button IDs are still `publicInternalAccessButton` and `footerInternalAccessButton`.
6. Document any explicitly approved exception in the final response.
