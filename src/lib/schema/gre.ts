import { z } from "zod";

export const GreSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Gre = z.infer<typeof GreSchema>;
