import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

import {
  ProjectRegistrySchema,
  ProjectRecordSchema,
  ProjectSkillsFileSchema,
  ProjectEvidenceFileSchema,
  ProjectTimelineFileSchema,
  ProjectResumeBulletsFileSchema,
  ProjectRoleFitFileSchema,
  ProjectMediaFileSchema,
  ProjectAssetsFileSchema,
  ProjectRagFileSchema,
  ProjectLimitationsFileSchema
} from "../src/lib/schema/project";

import {
  SiteProfileSchema,
  PublicNavigationSchema,
  AdminNavigationSchema
} from "../src/lib/schema/site";

import { SkillRegistrySchema } from "../src/lib/schema/skill";
import { RoleRegistrySchema } from "../src/lib/schema/role";
import {
  ClaimPolicySchema,
  AiAnswerPolicySchema,
  RetrievalPolicySchema
} from "../src/lib/schema/brain";
import { EvidenceStatusPolicySchema } from "../src/lib/schema/evidence";

const root = process.cwd();
const contentRoot = path.join(root, "src", "content");

type ValidationIssue = {
  file: string;
  message: string;
};

const issues: ValidationIssue[] = [];

function readJson(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function validateFile(filePath: string, schema: z.ZodTypeAny): void {
  try {
    const data = readJson(filePath);
    schema.parse(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown validation error";
    issues.push({
      file: path.relative(root, filePath),
      message
    });
  }
}

function assertExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    issues.push({
      file: path.relative(root, filePath),
      message: "Missing required file."
    });
  }
}

function assertNoForbiddenPublicStrings(): void {
  const forbiddenPatterns = [
    "D:\\\\",
    "D:/",
    "/mnt/d/",
    "raw OCR",
    "Gemma draft",
    "recruiter reply",
    "private evidence"
  ];

  const files = listJsonFiles(contentRoot);

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    for (const pattern of forbiddenPatterns) {
      if (raw.includes(pattern)) {
        issues.push({
          file: path.relative(root, file),
          message: `Forbidden public/private leak pattern found: ${pattern}`
        });
      }
    }
  }
}

function listJsonFiles(dir: string): string[] {
  const out: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listJsonFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      out.push(full);
    }
  }

  return out;
}

function validateAllJsonParse(): void {
  for (const file of listJsonFiles(contentRoot)) {
    try {
      readJson(file);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid JSON";
      issues.push({
        file: path.relative(root, file),
        message
      });
    }
  }
}

function validateProjectFolders(): void {
  const registryPath = path.join(contentRoot, "projects", "project-registry.json");
  const registry = ProjectRegistrySchema.parse(readJson(registryPath));

  const requiredProjectFiles: Record<string, z.ZodTypeAny> = {
    "project.json": ProjectRecordSchema,
    "skills.json": ProjectSkillsFileSchema,
    "evidence.json": ProjectEvidenceFileSchema,
    "timeline.json": ProjectTimelineFileSchema,
    "resume-bullets.json": ProjectResumeBulletsFileSchema,
    "role-fit.json": ProjectRoleFitFileSchema,
    "media.json": ProjectMediaFileSchema,
    "assets.json": ProjectAssetsFileSchema,
    "rag.json": ProjectRagFileSchema,
    "limitations.json": ProjectLimitationsFileSchema
  };

  for (const project of registry) {
    const projectDir = path.join(contentRoot, "projects", project.slug);

    if (!fs.existsSync(projectDir)) {
      issues.push({
        file: path.relative(root, projectDir),
        message: `Missing project folder for slug: ${project.slug}`
      });
      continue;
    }

    for (const [fileName, schema] of Object.entries(requiredProjectFiles)) {
      const filePath = path.join(projectDir, fileName);
      assertExists(filePath);

      if (fs.existsSync(filePath)) {
        validateFile(filePath, schema);
      }
    }

    const projectJsonPath = path.join(projectDir, "project.json");
    if (fs.existsSync(projectJsonPath)) {
      const projectRecord = ProjectRecordSchema.parse(readJson(projectJsonPath));
      if (projectRecord.slug !== project.slug) {
        issues.push({
          file: path.relative(root, projectJsonPath),
          message: `Project slug mismatch. Registry has ${project.slug}, project.json has ${projectRecord.slug}`
        });
      }
    }
  }
}

function main(): void {
  validateAllJsonParse();

  validateFile(path.join(contentRoot, "site", "site-profile.json"), SiteProfileSchema);
  validateFile(path.join(contentRoot, "site", "public-navigation.json"), PublicNavigationSchema);
  validateFile(path.join(contentRoot, "site", "admin-navigation.json"), AdminNavigationSchema);

  validateFile(path.join(contentRoot, "projects", "project-registry.json"), ProjectRegistrySchema);
  validateProjectFolders();

  validateFile(path.join(contentRoot, "skills", "skill-registry.json"), SkillRegistrySchema);
  validateFile(path.join(contentRoot, "roles", "role-registry.json"), RoleRegistrySchema);

  validateFile(path.join(contentRoot, "brain", "claim-policy.json"), ClaimPolicySchema);
  validateFile(path.join(contentRoot, "brain", "ai-answer-policy.json"), AiAnswerPolicySchema);
  validateFile(path.join(contentRoot, "brain", "retrieval-policy.json"), RetrievalPolicySchema);

  validateFile(path.join(contentRoot, "evidence", "evidence-status-policy.json"), EvidenceStatusPolicySchema);

  assertNoForbiddenPublicStrings();

  if (issues.length > 0) {
    console.error("\nEvidenceOS content validation failed:\n");
    for (const issue of issues) {
      console.error(`- ${issue.file}: ${issue.message}`);
    }
    process.exit(1);
  }

  console.log("EvidenceOS content validation passed.");
}

main();
