import { z } from "zod";

export const JobSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Job = z.infer<typeof JobSchema>;
