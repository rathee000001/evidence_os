const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(p) {
  fs.mkdirSync(path.join(root, p), { recursive: true });
}

function writeFile(p, content) {
  const full = path.join(root, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

function writeJson(p, value) {
  writeFile(p, JSON.stringify(value, null, 2) + "\n");
}

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

function readJsonSafe(p, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
  } catch {
    return fallback;
  }
}

const now = new Date().toISOString();

const docs = [
  "docs/phase-07",
  "docs/ai",
  "docs/architecture",
  "docs/ai-study",
  "docs/roadmap"
];

const contentDirs = [
  "src/content/jobs",
  "src/content/job-search",
  "src/content/source-connectors",
  "src/content/companies",
  "src/content/work-authorization",
  "src/content/applications",
  "src/content/resumes",
  "src/content/recommendations",
  "src/content/academics",
  "src/content/phd",
  "src/content/gre",
  "src/content/sop",
  "src/content/research",
  "src/content/chatbot",
  "src/content/models",
  "src/content/model-router",
  "src/content/hardware",
  "src/content/tool-router",
  "src/content/web-research",
  "src/content/source-confidence",
  "src/content/registry",
  "src/content/animations",
  "src/content/templates",
  "src/content/playground",
  "src/content/project-study"
];

const schemaDirs = [
  "src/lib/schema"
];

[...docs, ...contentDirs, ...schemaDirs].forEach(ensureDir);

writeFile("docs/phase-07/phase07-status.md", `# Phase 07 — Admin-First Patch Application and AI Study Framework Patch

Status: IN PROGRESS

Created: ${now}

## Goal

Patch the current EvidenceOS repo so it matches the admin-backend-first direction before Phase 08 project extraction starts.

## Phase 07 is not extraction

Do not OCR, parse, extract, or approve project evidence in this phase.

Phase 07 creates the patched repo structure, policies, schemas, navigation, and AI study framework that Phase 08 will use project by project.
`);

writeFile("docs/ai/phase06-final-install-summary.md", `# Phase 06 Final AI Install Summary

Phase 06 AI installation is complete and verified.

Local report paths:

- /mnt/d/AI/ril-local-ai/logs/install/phase06_10_final_ai_install_report.txt
- /mnt/d/AI/ril-local-ai/logs/install/phase06_10_final_ai_install_report.json

## Final local model role map

| Role | Model |
|---|---|
| embedding_fast | nomic-embed-text |
| embedding_quality | bge-m3 |
| primary_general_multimodal_model | qwen3.5:9b |
| fast_text_fallback | qwen3:4b |
| vision_fallback | qwen2.5vl:3b |
| reasoning_model | deepseek-r1:8b |
| code_schema_json_model | qwen2.5-coder:7b |

## Runtime rule

EvidenceOS runs model combinations by router role. It must not force all models to run together.
`);

writeFile("docs/architecture/combo-model-execution-policy.md", `# Combo Model Execution Policy

EvidenceOS can run a combo/router workflow, not all models together.

## Execution order

1. Extract or parse input.
2. Retrieve evidence or source packet.
3. Choose model role.
4. Run selected model.
5. Validate output.
6. Send to another model only if needed.
7. Save as draft or review output.

## Rule

No workflow should hardcode a model name. Workflows call a model role through the Model Router.
`);

writeFile("docs/architecture/model-router-policy.md", `# Model Router Policy

EvidenceOS is model-flexible.

## Current active roles

- primary_general_multimodal_model: qwen3.5:9b
- fast_text_fallback: qwen3:4b
- vision_fallback: qwen2.5vl:3b
- reasoning_model: deepseek-r1:8b
- code_schema_json_model: qwen2.5-coder:7b
- embedding_fast: nomic-embed-text
- embedding_quality: bge-m3

## Rule

Every AI workflow calls a role, not a hardcoded model.

## Future upgrades

Future models such as quantized Gemma 4 or larger local models can be added as candidates, tested, approved, switched in, and rolled back.
`);

writeFile("docs/architecture/tool-router-policy.md", `# Tool Router Policy

The FastAPI Local Brain Tool Router is admin-only.

## Allowed

- Manual URL import
- Pasted text import
- Screenshot/PDF import
- Public webpage fetch where allowed
- GitHub connector
- Company career page parser
- PhD program/professor page parser
- Approved web search provider later

## Blocked

- Public frontend web search
- Auto-apply
- Recruiter spam
- Unauthorized scraping
- Login bypass
- Paywall bypass
- Ignoring robots/terms/rate limits
`);

writeFile("docs/architecture/admin-internet-research-policy.md", `# Admin Internet Research Policy

Local models do not browse the internet directly.

EvidenceOS uses:

FastAPI Local Brain → Tool Router → Search/URL/GitHub/Webpage Adapter → Parser → Source Packet → Model Router → Claim Guard → Admin Output

## Admin-only routes

- /admin/job-search
- /admin/job-copilot
- /admin/company-analyzer
- /admin/resume-lab
- /admin/interview-prep
- /admin/phd-search
- /admin/sop-lab
- /admin/research-writer
- /admin/chatbot-lab

## Public blocked

The public frontend cannot call web search or raw local AI.
`);

writeFile("docs/architecture/manual-apply-job-search-policy.md", `# Manual-Apply Job Search Policy

EvidenceOS is not an auto-apply bot.

## Allowed workflow

1. User imports/searches jobs.
2. EvidenceOS creates EOS-JOB lead.
3. EvidenceOS analyzes job/company/source.
4. EvidenceOS prepares resume/interview strategy.
5. User opens external job link.
6. User applies manually.
7. User manually marks status as applied.

## Blocked

- Auto-apply
- Form submission automation
- Recruiter spam
- Unauthorized LinkedIn/Indeed/Handshake automation
- Logged-in scraping without permission
`);

writeFile("docs/architecture/public-private-boundary.md", `# Public / Private Boundary

## Public can use

- Approved JSON
- Approved source chips
- Approved public-safe project summaries
- Approved public-safe recommendation snippets
- Approved public resume/CV
- Approved public RAG chunks

## Public cannot use

- Raw OCR
- Raw evidence vault files
- Private resumes
- Job tracker records
- Recruiter replies
- Private recommendations
- Local AI logs
- Model files
- Private academic/SOP drafts
- Web search
`);

writeFile("docs/architecture/evidence-vault-boundary.md", `# Evidence Vault Boundary

Raw evidence stays outside the app repo.

Evidence vault:

- D:\\evidence_os_evidence_vault
- /mnt/d/evidence_os_evidence_vault

App repo:

- D:\\evidence_os
- /mnt/d/evidence_os

Do not commit raw PDFs, screenshots, OCR outputs, private notes, recommendation files, recruiter replies, job tracker files, resumes, model files, or local AI logs.
`);

writeFile("docs/architecture/registry-driven-architecture.md", `# Registry-Driven Architecture

EvidenceOS must be extensible through files, registries, schemas, and admin approval.

Adding a new project, recommendation/LOR, academic record, model, card type, GLB asset, or animation should not require rewriting the core app.

## Principle

Content record → Registry entry → Schema validation → Admin approval → Dynamic render
`);

writeFile("docs/architecture/frontend-playground-policy.md", `# Frontend Playground Policy

The public frontend should be a governed playground, not hardcoded pages.

It should use:

- Dynamic page renderer
- Section block renderer
- Card renderer
- Template renderer
- Asset registry
- Animation registry
- Public/private render gate
- Admin preview before publish

The playground is governed by schemas and public-safe approval.
`);

writeFile("docs/architecture/model-upgrade-policy.md", `# Model Upgrade Policy

New models can be added as candidates.

Workflow:

1. Install candidate model.
2. Add to model registry.
3. Run health check.
4. Run role-specific eval.
5. Compare against active model.
6. Approve for selected roles.
7. Switch role.
8. Keep rollback.
`);

writeFile("docs/architecture/hardware-upgrade-policy.md", `# Hardware Upgrade Policy

EvidenceOS should adapt when hardware changes.

Hardware profile affects model routing.

Current hardware class:

- 32 GB RAM
- RTX 5060 8 GB VRAM
- Windows + WSL
- D:\\AI storage

Larger GPUs or RAM can unlock larger candidate models later.
`);

writeFile("docs/ai-study/project-by-project-learning-policy.md", `# Project-by-Project Learning Policy

EvidenceOS AI learns one project at a time.

## Rules

- Do not dump all projects into one memory.
- Do not create one messy global summary.
- Each project gets a project study run ID.
- Each project gets a project memory draft.
- Human review happens before approval.
- Approved export candidates are separated from raw extraction.
`);

writeFile("docs/ai-study/project-study-packet-v1.md", `# Project Study Packet v1

A project study packet contains:

- projectStudyRunId
- projectSlug
- file inventory
- source map
- OCR summary
- PDF extraction summary
- Excel/CSV/Tableau summary
- code summary
- tool map
- skill map
- evidence map
- metrics found
- claim boundary draft
- resume bullet candidates
- interview prep notes
- chatbot answer-card candidates
- public-safe content candidates
- review status
`);

writeFile("docs/ai-study/human-review-queue-policy.md", `# Human Review Queue Policy

All AI outputs are drafts until reviewed.

Review statuses:

- draft
- pending-review
- approved-public
- approved-summary-only
- private-held
- rejected
- do-not-use
`);

writeFile("docs/ai-study/approved-export-candidate-policy.md", `# Approved Export Candidate Policy

Only approved records can move from local AI outputs into app repo content.

Raw extraction stays local.
Approved JSON can enter the app repo.
`);

writeJson("src/content/models/model-registry.json", [
  {
    "modelId": "qwen35_9b_ollama",
    "ollamaTag": "qwen3.5:9b",
    "role": "primary_general_multimodal_model",
    "status": "active"
  },
  {
    "modelId": "qwen3_4b_ollama",
    "ollamaTag": "qwen3:4b",
    "role": "fast_text_fallback",
    "status": "fallback"
  },
  {
    "modelId": "qwen25vl_3b_ollama",
    "ollamaTag": "qwen2.5vl:3b",
    "role": "vision_fallback",
    "status": "fallback"
  },
  {
    "modelId": "deepseek_r1_8b_ollama",
    "ollamaTag": "deepseek-r1:8b",
    "role": "reasoning_model",
    "status": "active"
  },
  {
    "modelId": "qwen25_coder_7b_ollama",
    "ollamaTag": "qwen2.5-coder:7b",
    "role": "code_schema_json_model",
    "status": "active"
  },
  {
    "modelId": "nomic_embed_text_ollama",
    "ollamaTag": "nomic-embed-text",
    "role": "embedding_fast",
    "status": "active"
  },
  {
    "modelId": "bge_m3_ollama",
    "ollamaTag": "bge-m3",
    "role": "embedding_quality",
    "status": "active"
  }
]);

writeJson("src/content/model-router/model-role-map.json", {
  version: "model-router-v1",
  comboExecution: true,
  noAllModelsAtOnce: true,
  roles: {
    embedding_fast: "nomic-embed-text",
    embedding_quality: "bge-m3",
    primary_general_multimodal_model: "qwen3.5:9b",
    fast_text_fallback: "qwen3:4b",
    vision_fallback: "qwen2.5vl:3b",
    reasoning_model: "deepseek-r1:8b",
    code_schema_json_model: "qwen2.5-coder:7b"
  }
});

writeJson("src/content/hardware/hardware-profile.json", {
  profileId: "current-local-workstation",
  ramGb: 32,
  gpu: "NVIDIA RTX 5060",
  vramGb: 8,
  os: ["Windows", "Ubuntu/WSL"],
  storageRoot: "D:/AI",
  routingNote: "Use combo/router execution; do not force all models to run together."
});

writeJson("src/content/tool-router/tool-registry.json", [
  "manual_url_importer",
  "pasted_text_importer",
  "screenshot_pdf_import_policy",
  "webpage_fetch_adapter",
  "private_web_search_adapter_placeholder",
  "github_connector_adapter",
  "company_career_page_parser",
  "job_board_manual_parser_policy",
  "phd_program_page_parser",
  "professor_lab_page_parser"
]);

writeJson("src/content/source-confidence/source-confidence-labels.json", [
  "official-company-page",
  "user-provided-url",
  "screenshot-ocr",
  "pasted-text",
  "public-search-result",
  "verified-company-source",
  "needs-manual-verification"
]);

writeJson("src/content/job-search/job-source-policy.json", {
  mode: "manual-assist",
  autoApplyAllowed: false,
  recruiterSpamAllowed: false,
  publicFrontendSearchAllowed: false,
  userManuallyApplies: true,
  userManuallyMarksApplied: true
});

writeJson("src/content/work-authorization/work-authorization-signal-policy.json", {
  legalAdvice: false,
  guarantee: false,
  signalTypes: [
    "confirmed-from-job-post",
    "inferred-from-public-data",
    "historical-public-data",
    "user-marked",
    "unknown",
    "needs-verification"
  ]
});

writeJson("src/content/chatbot/answer-card-types.json", [
  "ProjectCard",
  "SkillCard",
  "ToolCard",
  "EvidenceCard",
  "ClaimSafetyCard",
  "ResumeBulletCard",
  "JobRequirementCard",
  "CompanySignalCard",
  "VisaSignalCard",
  "AcademicEvidenceCard",
  "RecommendationCard",
  "PhDProgramCard",
  "ResearchSourceCard",
  "NextActionCard"
]);

writeJson("src/content/chatbot/chatbot-animation-policy.json", {
  publicChatbot: "approved-public-content-only",
  adminChatbot: "may-reference-private-local-data-with-labels",
  animationIsProof: false,
  answerMustUseEvidence: true
});

writeJson("src/content/registry/content-registry.json", []);
writeJson("src/content/registry/page-section-registry.json", []);
writeJson("src/content/registry/card-registry.json", []);
writeJson("src/content/animations/animation-registry.json", []);
writeJson("src/content/templates/template-registry.json", []);
writeJson("src/content/playground/frontend-playground-policy.json", {
  governedPlayground: true,
  publicPrivateGateRequired: true,
  adminPreviewRequired: true
});

writeJson("src/content/project-study/project-study-packet-schema.json", {
  projectStudyRunId: "",
  projectSlug: "",
  status: "draft",
  sourceMap: [],
  evidenceMap: [],
  toolMap: [],
  skillMap: [],
  claimBoundaries: [],
  publicSafeCandidates: [],
  reviewStatus: "pending-review"
});

const schemaFiles = [
  "job.ts",
  "jobSearch.ts",
  "sourceConnector.ts",
  "company.ts",
  "workAuthorization.ts",
  "resume.ts",
  "application.ts",
  "recommendation.ts",
  "academics.ts",
  "phd.ts",
  "gre.ts",
  "sop.ts",
  "research.ts",
  "chatbot.ts",
  "answerCard.ts",
  "modelRegistry.ts",
  "modelRouter.ts",
  "hardwareProfile.ts",
  "toolRouter.ts",
  "sourceConfidence.ts",
  "registry.ts",
  "animation.ts",
  "template.ts",
  "projectStudy.ts"
];

for (const f of schemaFiles) {
  const name = f.replace(".ts", "");
  const schemaName = name
    .split(/[-_]/)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join("") + "Schema";

  writeFile(`src/lib/schema/${f}`, `import { z } from "zod";

export const ${schemaName} = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type ${schemaName.replace("Schema", "")} = z.infer<typeof ${schemaName}>;
`);
}

const adminNavPath = "src/content/site/admin-navigation.json";
const adminNav = [
  { label: "Dashboard", href: "/admin", group: "overview" },
  { label: "Local AI Health", href: "/admin/local-ai-health", group: "ai" },
  { label: "Tool Router", href: "/admin/tool-router", group: "ai" },
  { label: "Model Registry", href: "/admin/model-registry", group: "ai" },
  { label: "Model Router", href: "/admin/model-router", group: "ai" },
  { label: "Chatbot Lab", href: "/admin/chatbot-lab", group: "ai" },
  { label: "Project Ingest", href: "/admin/project-ingest", group: "evidence" },
  { label: "Project Knowledge", href: "/admin/project-knowledge", group: "evidence" },
  { label: "Evidence Review", href: "/admin/evidence-review", group: "evidence" },
  { label: "Job Search", href: "/admin/job-search", group: "career" },
  { label: "Job Copilot", href: "/admin/job-copilot", group: "career" },
  { label: "Company Analyzer", href: "/admin/company-analyzer", group: "career" },
  { label: "Application Tracker", href: "/admin/application-tracker", group: "career" },
  { label: "Resume Lab", href: "/admin/resume-lab", group: "career" },
  { label: "Profile Optimizer", href: "/admin/profile-optimizer", group: "career" },
  { label: "Recommendations", href: "/admin/recommendations", group: "evidence" },
  { label: "Academics", href: "/admin/academics", group: "academic" },
  { label: "PhD Search", href: "/admin/phd-search", group: "academic" },
  { label: "GRE Prep", href: "/admin/gre-prep", group: "academic" },
  { label: "SOP Lab", href: "/admin/sop-lab", group: "academic" },
  { label: "Research Writer", href: "/admin/research-writer", group: "research" },
  { label: "Frontend Playground", href: "/admin/frontend-playground", group: "frontend" },
  { label: "Settings", href: "/admin/settings", group: "system" }
];
writeJson(adminNavPath, adminNav);

const pageRegistryPath = "src/content/site/page-registry.json";
const pageRegistry = readJsonSafe(pageRegistryPath, []);
const existingRoutes = new Set(Array.isArray(pageRegistry) ? pageRegistry.map(x => x.route) : []);
for (const item of adminNav) {
  if (!existingRoutes.has(item.href)) {
    pageRegistry.push({
      route: item.href,
      title: item.label,
      visibility: "admin-private",
      phase: "07-placeholder",
      status: "planned"
    });
  }
}
writeJson(pageRegistryPath, pageRegistry);

const adminRoutes = adminNav
  .map(x => x.href)
  .filter(x => x !== "/admin");

for (const route of adminRoutes) {
  const rel = route.replace(/^\//, "");
  const filePath = `app/${rel}/page.tsx`;
  if (!exists(filePath)) {
    writeFile(filePath, `export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">${route}</h1>
      <p className="mt-4 text-sm opacity-70">EvidenceOS Phase 07 admin placeholder.</p>
    </main>
  );
}
`);
  }
}

writeFile("scripts/validate-admin-first.js", `const fs = require("fs");

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
`);

writeFile("scripts/validate-private-boundary.js", `const fs = require("fs");
const path = require("path");

const roots = ["src", "app", "docs", "public"];
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

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

let ok = true;
for (const root of roots) {
  for (const file of walk(root)) {
    const text = fs.readFileSync(file, "utf8");
    for (const bad of forbidden) {
      if (text.includes(bad)) {
        console.error("FORBIDDEN", bad, "in", file);
        ok = false;
      }
    }
  }
}

if (ok) console.log("Private boundary check OK");
process.exit(ok ? 0 : 1);
`);

console.log("Phase 07 admin-first patch files created.");
