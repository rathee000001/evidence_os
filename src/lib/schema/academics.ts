import { z } from "zod";

export const AcademicsSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Academics = z.infer<typeof AcademicsSchema>;
