import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const scanDirs = ["app", "src", "docs", "public", "scripts"]
  .map((dir) => path.join(root, dir))
  .filter((dir) => fs.existsSync(dir));

const forbiddenExtensions = new Set([
  ".pdf",
  ".docx",
  ".xlsx",
  ".xls",
  ".csv",
  ".twb",
  ".twbx",
  ".hyper",
  ".zip",
  ".7z",
  ".rar",
  ".safetensors",
  ".gguf",
  ".pt",
  ".pth",
  ".ckpt",
  ".onnx",
  ".bin"
]);

const forbiddenText = [
  "D:\\evidence_os_evidence_vault",
  "D:/evidence_os_evidence_vault",
  "/mnt/d/evidence_os_evidence_vault",
  "raw OCR",
  "Gemma draft",
  "recruiter reply",
  "private evidence",
  "private-held raw"
];

const allowedFiles = new Set([
  path.normalize("docs/evidence-vault-tree.txt"),
  path.normalize("docs/repository-safety-rules.md")
]);

const issues: string[] = [];

function walk(dir: string): string[] {
  const results: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }

  return results;
}

for (const dir of scanDirs) {
  for (const file of walk(dir)) {
    const relative = path.normalize(path.relative(root, file));
    const extension = path.extname(file).toLowerCase();

    if (allowedFiles.has(relative)) {
      continue;
    }

    if (forbiddenExtensions.has(extension)) {
      issues.push(`${relative}: forbidden raw/private file extension ${extension}`);
      continue;
    }

    const readableExtensions = new Set([
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".md",
      ".txt",
      ".css",
      ".html"
    ]);

    if (readableExtensions.has(extension)) {
      const raw = fs.readFileSync(file, "utf8");
      for (const term of forbiddenText) {
        if (raw.includes(term)) {
          issues.push(`${relative}: forbidden text pattern "${term}"`);
        }
      }
    }
  }
}

if (issues.length > 0) {
  console.error("\nEvidenceOS private leak check failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("EvidenceOS private leak check passed.");
