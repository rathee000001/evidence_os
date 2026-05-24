import { z } from "zod";

export const HardwareProfileSchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
});

export type HardwareProfile = z.infer<typeof HardwareProfileSchema>;
