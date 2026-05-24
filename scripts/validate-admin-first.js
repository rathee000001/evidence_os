const fs = require("fs");

const required = [
  "docs/architecture/model-router-policy.md",
  "docs/architecture/tool-router-policy.md",
  "docs/architecture/manual-apply-job-search-policy.md",
  "docs/ai-study/project-by-project-learning-policy.md",
  "src/content/models/model-registry.json",
  "src/content/model-router/model-role-map.json",
  "src/content/project-study/project-study-packet-schema.json",
  "src/content/site/admin-navigation.json"
];

let ok = true;
for (const p of required) {
  if (!fs.existsSync(p)) {
    console.error("MISSING", p);
    ok = false;
  } else {
    console.log("OK", p);
  }
}

process.exit(ok ? 0 : 1);
