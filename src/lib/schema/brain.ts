import { z } from "zod";

export const ClaimPolicySchema = z.object({
  policyVersion: z.string().min(1),
  globalRule: z.string().min(1),
  sensitiveAreas: z.array(
    z.object({
      area: z.string().min(1),
      safeWording: z.array(z.string()),
      forbiddenClaims: z.array(z.string())
    })
  )
});

export const AiAnswerPolicySchema = z.object({
  rule: z.string().min(1),
  refusalMessage: z.string().min(1)
});

export const RetrievalPolicySchema = z.object({
  rule: z.string().min(1),
  publicNamespaces: z.array(z.string()),
  privateNamespaces: z.array(z.string())
});
