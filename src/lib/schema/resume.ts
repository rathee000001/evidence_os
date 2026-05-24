import { z } from "zod";

export const ResumeSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Resume = z.infer<typeof ResumeSchema>;
