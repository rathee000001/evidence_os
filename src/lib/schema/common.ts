import { z } from "zod";

export const VisibilitySchema = z.enum([
  "public-safe",
  "private-draft",
  "approved-public",
  "approved-summary-only",
  "private-held",
  "pending-confirmation",
  "do-not-use"
]);

export const EvidenceStatusSchema = z.enum([
  "approved-public",
  "approved-summary-only",
  "private-held",
  "pending-confirmation",
  "do-not-use",
  "collected-pending-ocr-review"
]);

export const ProjectTierSchema = z.enum(["tier-1", "tier-2", "tier-3"]);

export const ClaimSensitivitySchema = z.enum([
  "low",
  "low-medium",
  "medium",
  "high"
]);

export const StringArraySchema = z.array(z.string());

export const EmptyOrStringSchema = z.string();

export const JsonObjectSchema = z.record(z.string(), z.unknown());
