const fs = require("fs");
const path = require("path");

const roots = ["src", "app", "public", "docs"];

const forbidden = [
  "D:/evidence_os_evidence_vault",
  "/mnt/d/evidence_os_evidence_vault",
  "D:/AI/ril-local-ai/outputs",
  "/mnt/d/AI/ril-local-ai/outputs",
  ".safetensors",
  ".gguf",
  "recruiter reply",
  "private resume draft"
];

const allowedPolicyDocs = new Set([
  path.normalize("docs/architecture/evidence-vault-boundary.md"),
  path.normalize("docs/ai/phase06-final-install-summary.md")
]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, files);
    } else {
      files.push(full);
    }
  }

  return files;
}

function isAllowedPolicyReference(file, bad) {
  const normalized = path.normalize(file);

  if (!allowedPolicyDocs.has(normalized)) return false;

  // These docs are allowed to mention paths as policy/reference text only.
  return (
    bad === "D:/evidence_os_evidence_vault" ||
    bad === "/mnt/d/evidence_os_evidence_vault"
  );
}

let ok = true;

for (const root of roots) {
  for (const file of walk(root)) {
    const ext = path.extname(file).toLowerCase();

    if (
      ![
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".json",
        ".md",
        ".mdx",
        ".txt"
      ].includes(ext)
    ) {
      continue;
    }

    const text = fs.readFileSync(file, "utf8");

    for (const bad of forbidden) {
      if (text.includes(bad)) {
        if (isAllowedPolicyReference(file, bad)) {
          console.log("ALLOWED POLICY REFERENCE", bad, "in", file);
          continue;
        }

        console.error("FORBIDDEN", bad, "in", file);
        ok = false;
      }
    }
  }
}

if (ok) console.log("Private boundary check OK");
process.exit(ok ? 0 : 1);
