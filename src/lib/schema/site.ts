import { z } from "zod";

export const SiteProfileSchema = z.object({
  siteId: z.string().min(1),
  productName: z.string().min(1),
  publicTitle: z.string().min(1),
  ownerName: z.string().min(1),
  tagline: z.string(),
  primaryAudience: z.array(z.string()),
  publicPositioning: z.string(),
  privatePositioning: z.string(),
  claimPolicyVersion: z.string(),
  visibility: z.string(),
  buildStatus: z.string()
});

export const NavigationItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  group: z.string().min(1),
  description: z.string().optional()
});

export const PublicNavigationSchema = z.array(NavigationItemSchema);
export const AdminNavigationSchema = z.array(NavigationItemSchema);
