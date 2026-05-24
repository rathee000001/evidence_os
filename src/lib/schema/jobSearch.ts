import { z } from "zod";

export const JobSearchSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type JobSearch = z.infer<typeof JobSearchSchema>;
