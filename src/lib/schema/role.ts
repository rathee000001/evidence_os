import { z } from "zod";

export const RoleItemSchema = z.object({
  roleId: z.string().min(1),
  title: z.string().min(1),
  coreSkills: z.array(z.unknown()),
  strongProjects: z.array(z.unknown()),
  resumeStrategy: z.string()
});

export const RoleRegistrySchema = z.array(RoleItemSchema);
