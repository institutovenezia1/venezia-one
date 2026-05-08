#!/usr/bin/env node

const { execFileSync } = require("child_process");

const allowedFiles = new Set([
  "mi-venezia-v2.html",
  "mi-venezia-v2.css",
  "mi-venezia-v2.js",
  "mi-venezia-v2-data.js",
  "mi-venezia-v2-config.js",
  "mi-venezia-v2-utils.js",
  "docs/MI_VENEZIA_V2_BOUNDARIES.md",
  "CODEX.md",
  "scripts/check-mi-venezia-v2-scope.js",
]);

const protectedFiles = new Set([
  "app.js",
  "dataService.js",
  "index.html",
  "style.css",
]);

const protectedPatterns = [
  /(^|\/)(pagos|payments)(\/|[-_.])/i,
  /(^|\/)(altas|students)(\/|[-_.])/i,
  /(^|\/)(balance|finance|finanzas)(\/|[-_.])/i,
  /(^|\/)(asistencias|attendance)(\/|[-_.])/i,
  /(^|\/)(maestras|teachers)(\/|[-_.])/i,
  /(^|\/)(web-?venezia|web)(\/|[-_.])/i,
  /(^|\/)(internal|sistema-interno|app-shell)(\/|[-_.])/i,
  /(^|\/)supabase(\.js|\/|[-_.])/i,
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
  return allowedFiles.has(filePath);
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
  console.error("Este cambio toca archivos fuera de Mi Venezia V2. Requiere aprobación explícita.");
  console.error("");
  console.error("Archivos fuera de alcance:");
  outOfScopeFiles.forEach((filePath) => {
    const suffix = isProtected(filePath) ? " (protegido)" : "";
    console.error(`- ${filePath}${suffix}`);
  });
  console.error("");
  console.error("Archivos permitidos para una tarea Mi Venezia V2:");
  Array.from(allowedFiles).sort().forEach((filePath) => {
    console.error(`- ${filePath}`);
  });
  process.exit(1);
}

console.log("Scope OK: los cambios actuales estan limitados a Mi Venezia V2.");
