import { z } from "zod";

export const WorkAuthorizationSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type WorkAuthorization = z.infer<typeof WorkAuthorizationSchema>;
