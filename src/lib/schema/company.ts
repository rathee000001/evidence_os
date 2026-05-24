import { z } from "zod";

export const CompanySchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type Company = z.infer<typeof CompanySchema>;
