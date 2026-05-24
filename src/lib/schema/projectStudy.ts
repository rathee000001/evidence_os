import { z } from "zod";

export const ProjectStudySchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type ProjectStudy = z.infer<typeof ProjectStudySchema>;
