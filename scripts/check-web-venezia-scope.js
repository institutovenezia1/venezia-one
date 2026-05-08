#!/usr/bin/env node

const { execFileSync } = require("child_process");

const allowedFiles = new Set([
  "web-venezia.css",
  "web-venezia.js",
  "web-venezia-config.js",
  "docs/WEB_VENEZIA_BOUNDARIES.md",
  "scripts/check-web-venezia-scope.js",
  "CODEX.md",
  "images/logo-principal-sinfondo.png",
  "images/hero-sin-tiempo.png",
  "images/barberia.jpg",
  "images/unas.jpg",
  "images/pestanas.jpg",
  "images/testimonio-adriana.jpg",
  "images/testimonio-daniela.jpg",
  "images/testimonio-irving.jpg",
  "images/ubicacion-tx.jpg",
  "images/beca-venezia.jpg",
]);

const allowedPathPrefixes = [
  "images/web-venezia/",
  "assets/images/web-venezia/",
];

const protectedFiles = new Set([
  "index.html",
  "style.css",
  "app.js",
  "dataService.js",
  "supabase.js",
  "mi-venezia-v2.html",
  "mi-venezia-v2.css",
  "mi-venezia-v2.js",
  "mi-venezia-v2-data.js",
  "mi-venezia-v2-config.js",
  "mi-venezia-v2-utils.js",
]);

const protectedPatterns = [
  /(^|\/)(pagos|payments)(\/|[-_.])/i,
  /(^|\/)(altas|students)(\/|[-_.])/i,
  /(^|\/)(balance|finance|finanzas)(\/|[-_.])/i,
  /(^|\/)(asistencias|attendance)(\/|[-_.])/i,
  /(^|\/)(maestras|teachers)(\/|[-_.])/i,
  /(^|\/)(mi-?venezia|student-portal|portal-alumno)(\/|[-_.])/i,
  /(^|\/)(internal|sistema-interno|app-shell|director)(\/|[-_.])/i,
  /(^|\/)(supabase|guardado|save|storage)(\.js|\/|[-_.])/i,
];

const ignoredPatterns = [
  /(^|\/)\.DS_Store$/,
];

function runGit(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" })
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    console.error("No se pudo leer el estado de git para validar el alcance.");
    console.error(error.message || String(error));
    process.exit(2);
  }
}

function normalizePath(filePath) {
  return String(filePath || "").replace(/\\/g, "/").replace(/^\.\//, "");
}

function unique(values) {
  return Array.from(new Set(values.map(normalizePath))).sort();
}

function isIgnored(filePath) {
  return ignoredPatterns.some((pattern) => pattern.test(filePath));
}

function isAllowed(filePath) {
  return allowedFiles.has(filePath) || allowedPathPrefixes.some((prefix) => filePath.startsWith(prefix));
}

function isProtected(filePath) {
  return protectedFiles.has(filePath) || protectedPatterns.some((pattern) => pattern.test(filePath));
}

const changedFiles = unique([
  ...runGit(["diff", "--name-only", "--cached", "--diff-filter=ACMRTUXB"]),
  ...runGit(["diff", "--name-only", "--diff-filter=ACMRTUXB"]),
  ...runGit(["ls-files", "--others", "--exclude-standard"]),
]).filter((filePath) => !isIgnored(filePath));

const outOfScopeFiles = changedFiles.filter((filePath) => !isAllowed(filePath));

if (outOfScopeFiles.length > 0) {
  console.error("Este cambio toca archivos fuera de Web Venezia. Requiere aprobación explícita.");
  console.error("");
  console.error("Archivos fuera de alcance:");
  outOfScopeFiles.forEach((filePath) => {
    const suffix = isProtected(filePath) ? " (protegido)" : "";
    console.error(`- ${filePath}${suffix}`);
  });
  console.error("");
  console.error("Archivos permitidos para una tarea Web Venezia:");
  Array.from(allowedFiles).sort().forEach((filePath) => {
    console.error(`- ${filePath}`);
  });
  allowedPathPrefixes.forEach((prefix) => {
    console.error(`- ${prefix}*`);
  });
  process.exit(1);
}

console.log("Scope OK: los cambios actuales estan limitados a Web Venezia.");
