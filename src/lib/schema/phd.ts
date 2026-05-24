import { z } from "zod";

export const PhdSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Phd = z.infer<typeof PhdSchema>;
