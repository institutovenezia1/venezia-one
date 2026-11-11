#!/usr/bin/env node
// Pruebas de regresión de Venezia One (capa 2 del blindaje).
//
// Abre el sistema en un navegador real con datos FICTICIOS (fixtures.js) y una
// fecha fija, recorre cada módulo y compara lo que se ve contra la "foto base"
// (baseline.json). Si un cambio en un módulo altera lo que se ve en OTRO
// módulo, la prueba truena y dice exactamente qué módulo cambió y qué líneas.
//
// Uso:
//   node scripts/regression/run.js                      -> compara contra la foto base
//   node scripts/regression/run.js --actualizar=portal-docente
//        -> acepta los cambios SOLO de ese módulo (el que se pidió modificar)
//   node scripts/regression/run.js --actualizar=todos   -> solo con autorización del CEO
//
// Requisitos: Node 18+ y Playwright (`npm i -g playwright` o `npx playwright`).
// Si no hay Chrome instalado, define CHROME_PATH o corre `npx playwright install chromium`.

const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const BASELINE_PATH = path.join(__dirname, "baseline.json");
const fixtures = require("./fixtures.js");

function loadPlaywright() {
  const candidates = ["playwright", "playwright-core"];
  for (const name of candidates) {
    try {
      return require(name);
    } catch (error) {
      try {
        const globalRoot = require("child_process").execSync("npm root -g", { encoding: "utf8" }).trim();
        return require(path.join(globalRoot, name));
      } catch (innerError) {
        // sigue con el siguiente candidato
      }
    }
  }
  console.error("No encontré Playwright. Instálalo con: npm i -g playwright && npx playwright install chromium");
  process.exit(2);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const filePath = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);
    if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

// Módulos internos: clave de setActiveModule -> nombre del módulo en el mapa.
const INTERNAL_MODULES = [
  ["dashboard", "dashboard"],
  ["crm-prospectos", "crm"],
  ["altas", "altas"],
  ["asistencias", "asistencias"],
  ["maestras", "docentes-admin"],
  ["pagos", "pagos"],
  ["balance", "balance"],
  ["finanzas", "finanzas"],
  ["personal", "personal"],
  ["usuarios-accesos", "usuarios"],
  ["web-venezia", "web-venezia"],
];

function normalizeText(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

async function collectSnapshots(browser, baseUrl) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    locale: "es-MX",
    timezoneId: "America/Mexico_City",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error && error.message ? error.message : error)));
  await page.clock.setFixedTime(new Date(fixtures.fixedNow));
  // Sin red externa: Supabase, CDNs y fuentes se bloquean para que el
  // resultado dependa solo del código y de los datos de prueba.
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
  // window.alert/confirm bloquearían la prueba.
  await page.addInitScript(() => {
    window.alert = () => {};
    window.confirm = () => true;
  });

  await page.goto(`${baseUrl}/index.html?portal=interno`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => window.__veneziaInitStarted === true, null, { timeout: 20000 });
  await page.waitForTimeout(1500);

  // Carga los datos ficticios y entra como Dirección.
  await page.evaluate((data) => {
    const replace = (target, items) => {
      target.length = 0;
      items.forEach((item) => target.push(JSON.parse(JSON.stringify(item))));
    };
    replace(internalUsers, data.internalUsers);
    replace(staffRecords, data.staffRecords);
    replace(students, data.students);
    replace(paymentRecords, data.paymentRecords);
    replace(attendanceRecords, data.attendanceRecords);
    replace(prospects, data.prospects);
    replace(financeRecords, data.financeRecords);
    replace(balanceExpenses, data.balanceExpenses);
    // Ninguna escritura debe salir de la prueba.
    if (window.localStorage) {
      window.localStorage.setItem = () => {};
    }
    currentInternalUserId = "u-admin";
    currentAccessMode = "internal";
    updateSessionUI();
    renderAll();
  }, fixtures);

  const snapshots = {};

  for (const [moduleKey, moduleName] of INTERNAL_MODULES) {
    const text = await page.evaluate((key) => {
      setActiveModule(key);
      renderAll();
      const section = moduleSections[key];
      return section ? section.innerText : `(sin sección para ${key})`;
    }, moduleKey);
    snapshots[moduleName] = normalizeText(text);
  }

  // Asistencias: calendario de clases de cada alumna (fechas y número de clase).
  snapshots["asistencias-calendario"] = await page.evaluate(() =>
    students.map((student) => {
      let calendar;
      try {
        calendar = getStudentAttendanceCalendar(student);
      } catch (error) {
        return `${student.id}: ERROR ${error.message}`;
      }
      const list = Array.isArray(calendar) ? calendar : (calendar && (calendar.entries || calendar.sessions || calendar.dates)) || [];
      const compact = list.map((item) => (typeof item === "string" ? item : item.fecha || item.date || item.dateKey || JSON.stringify(item))).join(",");
      return `${student.id} ${student.curso} ${student.diaClases}: ${list.length} clases -> ${compact}`;
    })
  );

  // Altas: catálogo fijo curso -> día -> horario y tipos de acceso.
  snapshots["altas-catalogo"] = await page.evaluate(() => [
    JSON.stringify(ALTA_COURSE_CATALOG.map((course) => ({ curso: course.value, nombre: course.label, horarios: course.schedule }))),
    JSON.stringify(ALTA_ACCESO_OPTIONS),
  ]);

  // Portal docente: una docente de Uñas y una de Barbería (con puesto viejo "miss").
  for (const [userId, label] of [["u-doc-unas", "portal-docente-unas"], ["u-doc-barb", "portal-docente-barberia"]]) {
    const text = await page.evaluate((id) => {
      currentInternalUserId = id;
      currentAccessMode = "teacher";
      updateSessionUI();
      renderAll();
      const parts = [document.getElementById("teacherPortalDashboard").innerText];
      const profile = getTeacherProfileByInternalUser(getCurrentInternalUser());
      parts.push("GRUPOS: " + getTeacherPortalGrupos(profile).map((group) => `${group.label} (${group.alumnas.map((a) => a.nombre).join(" / ")})`).join(" | "));
      return parts.join("\n");
    }, userId);
    snapshots[label] = normalizeText(text);
  }

  // Mi Venezia (portal de alumna dentro del sistema interno).
  snapshots["mi-venezia-legacy"] = normalizeText(
    await page.evaluate(() => {
      currentInternalUserId = "";
      currentAccessMode = "student";
      currentPortalStudentId = "al-01";
      updateSessionUI();
      renderAll();
      const section = document.getElementById("miVeneziaSection");
      return section ? section.innerText : "";
    })
  );

  snapshots["errores-de-pagina"] = errors.map((error) => error.split("\n")[0]);
  await context.close();
  return snapshots;
}

// ---------- Mi Venezia V2 (portal de alumna) ----------
// Lee Supabase directo desde el navegador; aquí se le responde con las filas
// ficticias de fixtures.miVenezia. Se entra con usuario/contraseña reales del
// formulario y se recorre la pantalla de entrada y cada sección.
function answerSupabase(route, tables) {
  const url = new URL(route.request().url());
  const match = url.pathname.match(/\/rest\/v1\/([^/?]+)/);
  const table = match ? match[1] : "";
  let rows = (tables[table] || []).slice();
  for (const [key, value] of url.searchParams.entries()) {
    if (value.startsWith("eq.")) {
      rows = rows.filter((row) => String(row[key]) === value.slice(3));
    }
  }
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(rows) });
}

async function collectMiVeneziaSnapshots(browser, baseUrl) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    locale: "es-MX",
    timezoneId: "America/Mexico_City",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error && error.message ? error.message : error)));
  await page.clock.setFixedTime(new Date(fixtures.fixedNow));
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => {
    if (/supabase\.co\/rest\/v1\//.test(route.request().url())) {
      return answerSupabase(route, fixtures.miVenezia);
    }
    return route.abort();
  });
  await page.goto(`${baseUrl}/mi-venezia-v2.html`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => /Listo/.test((document.getElementById("loginFeedback") || {}).textContent || ""), null, { timeout: 20000 });

  const snapshots = {};
  let secondsAfterNoon = 0;
  for (const row of fixtures.miVenezia.students) {
    // El portal ignora dos intentos de entrada seguidos (< 650 ms); con el
    // reloj congelado se avanza un segundo por alumna (sigue siendo 11/nov 12:00).
    secondsAfterNoon += 1;
    await page.clock.setFixedTime(new Date(new Date(fixtures.fixedNow).getTime() + secondsAfterNoon * 1000));
    await page.fill("#loginUser", row.phone);
    await page.fill("#loginPassword", row.password);
    await page.click("#loginButton");
    await page.waitForFunction(() => !document.getElementById("dashboardView").hidden, null, { timeout: 15000 });
    await page.waitForTimeout(400);
    const views = await page.evaluate(() => {
      const visibleText = () => document.getElementById("dashboardView").innerText;
      const result = { entrada: visibleText() };
      const buttons = Array.from(document.querySelectorAll("#tabsNav [data-tab]"));
      for (const button of buttons) {
        const tab = button.getAttribute("data-tab");
        button.click();
        result[tab] = visibleText();
        const back = document.querySelector("[data-home-action]");
        if (back) back.click();
      }
      return result;
    });
    for (const [view, value] of Object.entries(views)) {
      snapshots[`mi-venezia-${row.id}-${view}`] = normalizeText(value);
    }
    await page.click("#logoutButton");
    await page.waitForTimeout(150);
  }
  snapshots["mi-venezia-errores-de-pagina"] = errors.map((error) => error.split("\n")[0]);
  await context.close();
  return snapshots;
}

function diffLines(before = [], after = []) {
  const removed = before.filter((line) => !after.includes(line));
  const added = after.filter((line) => !before.includes(line));
  const reordered = removed.length === 0 && added.length === 0 && before.join("\n") !== after.join("\n");
  return { removed, added, reordered };
}

async function main() {
  const updateArg = (process.argv.find((arg) => arg.startsWith("--actualizar=")) || "").split("=")[1] || "";
  const toUpdate = new Set(updateArg ? updateArg.split(",").map((item) => item.trim()).filter(Boolean) : []);

  const { chromium } = loadPlaywright();
  const executablePath =
    process.env.CHROME_PATH || ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find((candidate) => fs.existsSync(candidate));
  const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
  const server = await startServer();
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  let current;
  try {
    current = await collectSnapshots(browser, baseUrl);
    Object.assign(current, await collectMiVeneziaSnapshots(browser, baseUrl));
  } finally {
    await browser.close();
    server.close();
  }

  const baseline = fs.existsSync(BASELINE_PATH) ? JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8")) : {};
  const changed = [];

  for (const name of Object.keys(current)) {
    if (JSON.stringify(baseline[name]) !== JSON.stringify(current[name])) {
      changed.push(name);
    }
  }
  for (const name of Object.keys(baseline)) {
    if (!(name in current)) {
      changed.push(name);
    }
  }

  const pageErrors = current["errores-de-pagina"].concat(current["mi-venezia-errores-de-pagina"] || []);
  if (pageErrors.length > 0) {
    console.log("\n❌ ERRORES DE JAVASCRIPT EN LA PÁGINA:");
    pageErrors.forEach((error) => console.log("   - " + error));
  }

  if (toUpdate.size > 0) {
    const next = { ...baseline };
    const accepted = [];
    // "mi-venezia" (portal de alumna V2) no incluye "mi-venezia-legacy" (portal dentro del sistema interno).
    const isAuthorized = (name) =>
      toUpdate.has("todos") ||
      [...toUpdate].some(
        (module) => name === module || (name.startsWith(module + "-") && !(module === "mi-venezia" && name.startsWith("mi-venezia-legacy")))
      );
    for (const name of Object.keys(current)) {
      if (isAuthorized(name)) {
        next[name] = current[name];
        accepted.push(name);
      }
    }
    // Vistas que ya no existen (una sección que se quitó) también se dan de
    // baja de la foto base, pero solo dentro del módulo autorizado.
    for (const name of Object.keys(baseline)) {
      if (!(name in current) && isAuthorized(name)) {
        delete next[name];
        accepted.push(name);
      }
    }
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(next, null, 2) + "\n");
    console.log(`Foto base actualizada para: ${accepted.join(", ") || "(ninguno)"}`);
    const stillChanged = changed.filter((name) => !accepted.includes(name));
    if (stillChanged.length > 0) {
      console.log(`\n⚠️  OJO: también cambiaron módulos que NO autorizaste: ${stillChanged.join(", ")}`);
      console.log("   No se actualizó su foto base. Revisa el cambio o pide autorización al CEO.");
      process.exit(1);
    }
    process.exit(pageErrors.length > 0 ? 1 : 0);
  }

  if (changed.length === 0 && pageErrors.length === 0) {
    const groups = [...new Set(Object.keys(current).map((name) => (name.startsWith("mi-venezia-") && name !== "mi-venezia-legacy" ? "mi-venezia" : name)))];
    console.log(`✅ Todo igual que la foto base (${Object.keys(current).length} revisiones: ${groups.join(", ")}).`);
    process.exit(0);
  }

  console.log(`\n❌ CAMBIARON ${changed.length} MÓDULO(S) respecto a la foto base:\n`);
  for (const name of changed) {
    const { removed, added, reordered } = diffLines(baseline[name], current[name]);
    console.log(`■ ${name}`);
    if (reordered) console.log("   (mismo contenido, distinto orden)");
    removed.slice(0, 12).forEach((line) => console.log("   - antes: " + line.slice(0, 160)));
    added.slice(0, 12).forEach((line) => console.log("   + ahora: " + line.slice(0, 160)));
    if (removed.length > 12 || added.length > 12) console.log(`   … (${removed.length} líneas quitadas, ${added.length} agregadas)`);
    console.log("");
  }
  console.log("Si el cambio es el que se pidió para ESE módulo, acéptalo con:");
  console.log(`   node scripts/regression/run.js --actualizar=<modulo>`);
  console.log("Si cambió un módulo que no se pidió tocar: DETENTE y avisa al CEO antes de continuar.");
  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
