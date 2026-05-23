import { z } from "zod";

export const EvidenceStatusPolicySchema = z.array(
  z.object({
    status: z.string().min(1),
    meaning: z.string().min(1)
  })
);
