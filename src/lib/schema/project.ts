import { z } from "zod";
import {
  ProjectTierSchema,
  ClaimSensitivitySchema,
  StringArraySchema
} from "./common";

export const ProjectRegistryItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tier: ProjectTierSchema,
  order: z.number(),
  status: z.string().min(1),
  projectType: z.string().min(1),
  claimSensitivity: ClaimSensitivitySchema
});

export const ProjectRegistrySchema = z.array(ProjectRegistryItemSchema);

export const ProjectRecordSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  tier: ProjectTierSchema,
  order: z.number(),
  status: z.string().min(1),
  visibility: z.string().min(1),
  projectType: z.string().min(1),
  claimSensitivity: ClaimSensitivitySchema,
  evidenceVaultRef: z.string().min(1).optional(),
  publicSafeDescription: z.string(),
  summary: z.string(),
  primarySkills: StringArraySchema,
  secondarySkills: StringArraySchema,
  roleFit: StringArraySchema,
  proofTags: StringArraySchema,
  highlights: z.array(z.unknown()),
  metrics: z.array(z.unknown()),
  evidenceStatus: z.string().min(1),
  limitations: z.array(z.unknown()),
  notes: z.string().optional()
});

export const ProjectSkillsFileSchema = z.object({
  projectSlug: z.string().min(1),
  primarySkills: z.array(z.unknown()),
  secondarySkills: z.array(z.unknown()),
  toolSkills: z.array(z.unknown()),
  softSkills: z.array(z.unknown())
});

export const ProjectEvidenceFileSchema = z.object({
  projectSlug: z.string().min(1),
  evidence: z.array(z.unknown()),
  statusNote: z.string().optional()
});

export const ProjectTimelineFileSchema = z.object({
  projectSlug: z.string().min(1),
  timelineEvents: z.array(z.unknown())
});

export const ProjectResumeBulletsFileSchema = z.object({
  projectSlug: z.string().min(1),
  bullets: z.array(z.unknown()),
  rule: z.string().optional()
});

export const ProjectRoleFitFileSchema = z.object({
  projectSlug: z.string().min(1),
  roleFits: z.array(z.unknown())
});

export const ProjectMediaFileSchema = z.object({
  projectSlug: z.string().min(1),
  screenshots: z.array(z.unknown()),
  documents: z.array(z.unknown()),
  links: z.array(z.unknown())
});

export const ProjectAssetsFileSchema = z.object({
  projectSlug: z.string().min(1),
  glbAssets: z.array(z.unknown()),
  fallbackAssets: z.array(z.unknown()),
  status: z.string().optional()
});

export const ProjectRagFileSchema = z.object({
  projectSlug: z.string().min(1),
  chunks: z.array(z.unknown()),
  rule: z.string().optional()
});

export const ProjectLimitationsFileSchema = z.object({
  projectSlug: z.string().min(1),
  limitations: z.array(z.unknown()),
  rule: z.string().optional()
});
