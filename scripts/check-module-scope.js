#!/usr/bin/env node
// Verificador de alcance por módulo (capa 1 del blindaje de Venezia One).
//
// Casi todos los módulos internos viven en app.js, así que no basta con saber
// QUÉ ARCHIVO se tocó: este script revisa QUÉ FUNCIONES se tocaron y a qué
// módulo pertenecen, según quién las usa de verdad (mapa calculado del código).
//
// Uso:
//   node scripts/check-module-scope.js --modulo=portal-docente
//   node scripts/check-module-scope.js --modulo=pagos --base=origin/main
//   node scripts/check-module-scope.js --mapa      -> regenera docs/MODULE_MAP.md
//
// Resultado:
//   ✅ si todo lo cambiado pertenece al módulo pedido.
//   ⚠️  y código de salida 1 si toca otro módulo o algo compartido:
//       en ese caso hay que DETENERSE y pedir autorización al CEO.
//   Con --autorizado="motivo" se registra la autorización y sale con 0.
//
// Sin dependencias: solo Node y git.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

const SECTION_MODULES = {
  accessSelectorSection: "selector-accesos",
  dashboardSection: "dashboard",
  crmSection: "crm",
  altasSection: "altas",
  asistenciasSection: "asistencias",
  maestrasSection: "docentes-admin",
  pagosSection: "pagos",
  balanceSection: "balance",
  finanzasSection: "finanzas",
  usersAccessSection: "usuarios",
  personalSection: "personal",
  miVeneziaSection: "mi-venezia-legacy",
  teacherPortalSection: "portal-docente",
  webVeneziaSection: "web-venezia",
};

const MODULE_LABELS = {
  shell: "Estructura general (login, menú, navegación)",
  "selector-accesos": "Selector de accesos",
  dashboard: "Dashboard",
  crm: "CRM Prospectos",
  altas: "Altas",
  asistencias: "Asistencias",
  "docentes-admin": "Docentes (administración)",
  pagos: "Pagos",
  balance: "Balance",
  finanzas: "Finanzas",
  usuarios: "Usuarios y accesos",
  personal: "Personal",
  "mi-venezia-legacy": "Mi Venezia (dentro del sistema interno)",
  "portal-docente": "Portal docente",
  "web-venezia": "Web Venezia",
  "mi-venezia": "Mi Venezia V2 (portal de alumna)",
  "datos-compartidos": "Datos compartidos (Supabase / dataService)",
  infraestructura: "Documentación, reglas y pruebas",
};

// Funciones "de orquesta" que llaman a todos los módulos: no propagan módulo.
const ORCHESTRATORS = new Set([
  "renderAll",
  "setActiveModule",
  "applyBranchRestrictionsToUI",
  "updateSessionUI",
  "initApp",
  "refreshSharedSupabaseState",
]);

function git(args, options = {}) {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], ...options });
  } catch (error) {
    if (options.allowFail) {
      return null;
    }
    throw error;
  }
}

// ---------- Mapa función -> módulos ----------

function splitChunks(source) {
  const lines = source.split("\n");
  const chunks = [];
  let current = null;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const startsBlock = /^[A-Za-z_$(\[]/.test(line) && !/^[}\])]/.test(line);
    if (startsBlock) {
      if (current) chunks.push(current);
      const match =
        line.match(/^(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)/) ||
        line.match(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)/) ||
        line.match(/^class\s+([A-Za-z_$][\w$]*)/);
      current = { name: match ? match[1] : null, start: index + 1, end: index + 1, lines: [line] };
    } else if (current) {
      current.lines.push(line);
      current.end = index + 1;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function mapIdsToModules(html) {
  const idToModule = {};
  let current = "shell";
  for (const line of html.split("\n")) {
    const section = line.match(/^ {8}<section class="module-section[^"]*" id="(\w+)"/);
    if (section) current = SECTION_MODULES[section[1]] || "shell";
    if (/^ {4,6}<\/main>/.test(line)) current = "shell";
    for (const match of line.matchAll(/\bid="([^"]+)"/g)) {
      if (!idToModule[match[1]]) idToModule[match[1]] = current;
    }
  }
  return idToModule;
}

function buildModuleMap(appSource, htmlSource) {
  const idToModule = mapIdsToModules(htmlSource);
  const chunks = splitChunks(appSource);
  const names = new Set(chunks.filter((chunk) => chunk.name).map((chunk) => chunk.name));
  const byName = new Map();

  for (const chunk of chunks) {
    const text = chunk.lines.join("\n");
    const code = text.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
    chunk.refs = [...new Set(code.match(/[A-Za-z_$][\w$]*/g) || [])].filter((id) => names.has(id) && id !== chunk.name);
    chunk.direct = new Set();
    for (const match of text.matchAll(/getElementById\(\s*["'`]([^"'`]+)["'`]\s*\)|querySelector(?:All)?\(\s*["'`]#([\w-]+)/g)) {
      const module = idToModule[match[1] || match[2]];
      if (module) chunk.direct.add(module);
    }
    chunk.modules = new Set();
    if (chunk.name) byName.set(chunk.name, chunk);
  }

  // Constantes que solo guardan un elemento del DOM heredan su módulo.
  const elementOwner = new Map();
  for (const chunk of chunks) {
    if (chunk.name && /document\.(getElementById|querySelector)/.test(chunk.lines[0]) && chunk.direct.size === 1) {
      elementOwner.set(chunk.name, [...chunk.direct][0]);
    }
  }
  for (const chunk of chunks) {
    for (const ref of chunk.refs) {
      if (elementOwner.has(ref)) chunk.direct.add(elementOwner.get(ref));
    }
  }

  const modules = new Set(Object.values(SECTION_MODULES).concat(["shell"]));
  for (const module of modules) {
    const queue = chunks.filter((chunk) => chunk.direct.has(module) && !ORCHESTRATORS.has(chunk.name));
    const seen = new Set(queue);
    while (queue.length) {
      const chunk = queue.shift();
      chunk.modules.add(module);
      for (const ref of chunk.refs) {
        const next = byName.get(ref);
        if (next && !seen.has(next) && !ORCHESTRATORS.has(ref)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
  }
  for (const name of ORCHESTRATORS) {
    const chunk = byName.get(name);
    if (chunk) chunk.modules = new Set(["shell"]);
  }

  return { chunks, byName };
}

function describeModules(chunk) {
  if (!chunk) return ["shell"];
  if (chunk.modules.size === 0) return ["sin-clasificar"];
  return [...chunk.modules].sort();
}

function chunkAtLine(chunks, lineNumber) {
  return chunks.find((chunk) => lineNumber >= chunk.start && lineNumber <= chunk.end) || null;
}

// ---------- Cambios contra la base ----------

function resolveBase(requested) {
  const candidates = requested ? [requested] : ["origin/main", "main", "HEAD"];
  for (const candidate of candidates) {
    if (git(["rev-parse", "--verify", "--quiet", candidate], { allowFail: true })) return candidate;
  }
  console.error(`No encontré la base ${requested || "origin/main"} en git.`);
  process.exit(2);
}

function readAtBase(base, file) {
  return git(["show", `${base}:${file}`], { allowFail: true }) || "";
}

function changedFiles(base) {
  const tracked = git(["diff", "--name-only", base]).split("\n").filter(Boolean);
  const untracked = git(["ls-files", "--others", "--exclude-standard"]).split("\n").filter(Boolean);
  return [...new Set(tracked.concat(untracked))].sort();
}

function changedLineRanges(base, file) {
  const diff = git(["diff", "-U0", base, "--", file], { allowFail: true }) || "";
  const hunks = [];
  for (const match of diff.matchAll(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/gm)) {
    hunks.push({
      oldStart: Number(match[1]),
      oldCount: match[2] === undefined ? 1 : Number(match[2]),
      newStart: Number(match[3]),
      newCount: match[4] === undefined ? 1 : Number(match[4]),
    });
  }
  return { hunks, diff };
}

function classifyFile(file) {
  if (file === "app.js" || file === "index.html" || file === "style.css") return null;
  if (file === "docente-portal-content.js") return "portal-docente";
  if (/^mi-venezia-v2/.test(file)) return "mi-venezia";
  if (file === "web-venezia.css") return "web-venezia";
  if (file === "dataService.js" || file === "supabase.js") return "datos-compartidos";
  if (/^(docs\/|scripts\/|CLAUDE\.md$|CODEX\.md$|README)/.test(file)) return "infraestructura";
  if (/^images\//.test(file)) return "infraestructura";
  return "sin-clasificar";
}

function classifyCssSelector(selector) {
  if (/teacher-portal/.test(selector)) return "portal-docente";
  if (/\.mv2-|mi-venezia/.test(selector)) return "mi-venezia-legacy";
  if (/\.web-|#webVenezia/.test(selector)) return "web-venezia";
  if (/alta/i.test(selector)) return "altas";
  if (/payment|pagos/i.test(selector)) return "pagos";
  if (/attendance|asistencia/i.test(selector)) return "asistencias";
  if (/crm|prospect/i.test(selector)) return "crm";
  if (/balance/i.test(selector)) return "balance";
  if (/finance|finanza/i.test(selector)) return "finanzas";
  if (/staff|personal/i.test(selector)) return "personal";
  return "estilos-generales";
}

function analyzeChanges(base) {
  const findings = [];
  const files = changedFiles(base);
  const newApp = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const newHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const oldApp = readAtBase(base, "app.js");
  const oldHtml = readAtBase(base, "index.html");

  for (const file of files) {
    const simple = classifyFile(file);
    if (simple) {
      findings.push({ file, what: "archivo completo", modules: [simple] });
      continue;
    }
    const { hunks, diff } = changedLineRanges(base, file);

    if (file === "app.js") {
      const newMap = buildModuleMap(newApp, newHtml);
      const oldMap = buildModuleMap(oldApp, oldHtml || newHtml);
      const touched = new Map();
      const add = (chunk, map, kind) => {
        const key = chunk && chunk.name ? chunk.name : `(bloque suelto línea ${chunk ? chunk.start : "?"})`;
        const modules = chunk && chunk.name && map.byName.has(chunk.name) ? describeModules(map.byName.get(chunk.name)) : describeModules(chunk);
        const previous = touched.get(key) || { modules: new Set(), kinds: new Set() };
        modules.forEach((module) => previous.modules.add(module));
        previous.kinds.add(kind);
        touched.set(key, previous);
      };
      for (const hunk of hunks) {
        for (let line = hunk.newStart; line < hunk.newStart + hunk.newCount; line += 1) add(chunkAtLine(newMap.chunks, line), newMap, "nuevo/cambiado");
        for (let line = hunk.oldStart; line < hunk.oldStart + hunk.oldCount; line += 1) {
          const oldChunk = chunkAtLine(oldMap.chunks, line);
          // Si la función sigue existiendo, se clasifica con el mapa nuevo.
          const current = oldChunk && oldChunk.name ? newMap.byName.get(oldChunk.name) : null;
          add(current || oldChunk, current ? newMap : oldMap, current ? "nuevo/cambiado" : "eliminado");
        }
      }
      for (const [name, info] of touched) {
        findings.push({ file, what: name, modules: [...info.modules].sort() });
      }
      continue;
    }

    if (file === "index.html") {
      const idToSection = [];
      let current = "shell";
      newHtml.split("\n").forEach((line, index) => {
        const section = line.match(/^ {8}<section class="module-section[^"]*" id="(\w+)"/);
        if (section) current = SECTION_MODULES[section[1]] || "shell";
        idToSection[index + 1] = current;
      });
      const changedText = diff.split("\n").filter((line) => /^[+-][^+-]/.test(line));
      const onlyCacheVersions = changedText.length > 0 && changedText.every((line) => /\?v=/.test(line));
      if (onlyCacheVersions) {
        findings.push({ file, what: "solo versiones ?v= (caché)", modules: ["infraestructura"] });
        continue;
      }
      const sections = new Set();
      for (const hunk of hunks) {
        const lines = hunk.newCount === 0 ? [hunk.newStart] : Array.from({ length: hunk.newCount }, (_, i) => hunk.newStart + i);
        for (const line of lines) {
          const text = newHtml.split("\n")[line - 1] || "";
          sections.add(/\?v=/.test(text) ? "infraestructura" : idToSection[line] || "shell");
        }
      }
      findings.push({ file, what: "HTML", modules: [...sections].sort() });
      continue;
    }

    if (file === "style.css") {
      const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8").split("\n");
      const modules = new Set();
      const selectors = new Set();
      for (const hunk of hunks) {
        // Primero los selectores escritos dentro del propio cambio…
        const own = [];
        for (let line = hunk.newStart; line < hunk.newStart + hunk.newCount; line += 1) {
          const text = css[line - 1] || "";
          if (/\{\s*$/.test(text) && !/^\s*@/.test(text)) own.push(text.replace(/\{\s*$/, "").trim());
        }
        // …y si no hay, el selector de la regla donde cae el cambio.
        if (own.length === 0) {
          let cursor = Math.max(1, hunk.newStart);
          while (cursor > 1 && !/\{\s*$/.test(css[cursor - 1] || "")) cursor -= 1;
          own.push((css[cursor - 1] || "").replace(/\{\s*$/, "").trim() || "(sin selector)");
        }
        own.forEach((selector) => {
          selectors.add(selector);
          modules.add(classifyCssSelector(selector));
        });
      }
      findings.push({ file, what: `estilos: ${[...selectors].slice(0, 6).join(" | ")}`, modules: [...modules].sort() });
      continue;
    }
  }
  return findings;
}

// ---------- Mapa en Markdown ----------

function writeMapDoc() {
  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const { chunks } = buildModuleMap(app, html);
  const named = chunks.filter((chunk) => chunk.name && !/document\.(getElementById|querySelector)/.test(chunk.lines[0]));
  const own = {};
  const shared = [];
  const unclassified = [];
  for (const chunk of named) {
    const modules = describeModules(chunk);
    if (modules[0] === "sin-clasificar") unclassified.push(chunk.name);
    else if (modules.length === 1) (own[modules[0]] = own[modules[0]] || []).push(chunk.name);
    else shared.push({ name: chunk.name, modules });
  }
  shared.sort((a, b) => b.modules.length - a.modules.length || a.name.localeCompare(b.name));
  const lines = [
    "# Mapa de módulos de Venezia One",
    "",
    "> Generado automáticamente con `node scripts/check-module-scope.js --mapa`.",
    "> No lo edites a mano: si cambia el código, vuelve a generarlo.",
    "",
    "Cada función de `app.js` pertenece al módulo (o módulos) que la usan de verdad.",
    "Una función **compartida** afecta a varios módulos: tocarla requiere autorización del CEO.",
    "",
    "## Archivos por módulo",
    "",
    "| Archivo | Módulo |",
    "|---|---|",
    "| `mi-venezia-v2.*` | Mi Venezia V2 (portal de alumna, independiente) |",
    "| `docente-portal-content.js` | Portal docente (temario, actividades, misión) |",
    "| `web-venezia.css` | Web Venezia |",
    "| `dataService.js`, `supabase.js` | Datos compartidos — siempre requiere autorización |",
    "| `app.js`, `index.html`, `style.css` | Varios módulos — se revisa función por función |",
    "",
    "## Funciones propias de cada módulo (cambiarlas solo afecta a ese módulo)",
    "",
  ];
  for (const module of Object.keys(MODULE_LABELS)) {
    if (!own[module]) continue;
    lines.push(`### ${MODULE_LABELS[module]} (\`${module}\`) — ${own[module].length}`, "");
    lines.push(own[module].sort().map((name) => `\`${name}\``).join(", "), "");
  }
  lines.push(`## Funciones compartidas — ${shared.length} (tocar = pedir autorización)`, "");
  lines.push("| Función | Módulos que la usan |", "|---|---|");
  shared.forEach((item) => lines.push(`| \`${item.name}\` | ${item.modules.join(", ")} |`));
  lines.push("", `## Sin clasificar — ${unclassified.length} (se tratan como compartidas)`, "");
  lines.push(unclassified.sort().map((name) => `\`${name}\``).join(", "), "");
  fs.writeFileSync(path.join(ROOT, "docs", "MODULE_MAP.md"), lines.join("\n"));
  console.log(`docs/MODULE_MAP.md actualizado: ${Object.values(own).flat().length} propias, ${shared.length} compartidas, ${unclassified.length} sin clasificar.`);
}

// ---------- Principal ----------

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--mapa")) {
    writeMapDoc();
    return;
  }
  const moduleArg = (args.find((arg) => arg.startsWith("--modulo=")) || "").split("=")[1] || "";
  const baseArg = (args.find((arg) => arg.startsWith("--base=")) || "").split("=")[1] || "";
  const authorized = (args.find((arg) => arg.startsWith("--autorizado=")) || "").replace(/^--autorizado=/, "");
  if (!moduleArg) {
    console.error("Indica el módulo que se pidió cambiar, por ejemplo: --modulo=portal-docente");
    console.error("Módulos: " + Object.keys(MODULE_LABELS).join(", "));
    process.exit(2);
  }
  const allowed = new Set(moduleArg.split(",").map((item) => item.trim()).concat(["infraestructura"]));
  const base = resolveBase(baseArg);
  const findings = analyzeChanges(base);

  if (findings.length === 0) {
    console.log(`No hay cambios contra ${base}.`);
    return;
  }

  const outside = [];
  console.log(`Cambios contra ${base} (módulo pedido: ${moduleArg}):\n`);
  for (const finding of findings) {
    const extra = finding.modules.filter((module) => !allowed.has(module));
    const mark = extra.length === 0 ? "✅" : "⚠️ ";
    console.log(`${mark} ${finding.file} → ${finding.what} [${finding.modules.join(", ")}]`);
    if (extra.length) outside.push({ ...finding, extra });
  }

  if (outside.length === 0) {
    console.log(`\n✅ Todo el cambio está dentro de: ${moduleArg}.`);
    return;
  }

  const affected = [...new Set(outside.flatMap((finding) => finding.extra))];
  console.log(`\n⚠️  ESTE CAMBIO TAMBIÉN TOCA: ${affected.map((module) => MODULE_LABELS[module] || module).join(", ")}.`);
  if (authorized) {
    console.log(`Autorizado por el CEO: ${authorized}`);
    return;
  }
  console.log("DETENTE: explica al CEO qué se afecta y por qué, y espera su autorización.");
  console.log('Cuando autorice, vuelve a correr con --autorizado="motivo".');
  process.exit(1);
}

main();
