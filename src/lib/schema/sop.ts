import { z } from "zod";

export const SopSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Sop = z.infer<typeof SopSchema>;
