import { z } from "../deps.ts";

export const siteSchema = z.object({
  id: z.string(),
  object: z.string(),
  name: z.string(),
  sharing: z.string(),
  created_at: z.string(),
}).deepPartial();

export const sitesSchema = z.object({
  object: z.string(),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(siteSchema),
}).deepPartial();

export const querySitesSchema = z.object({
  limit: z.number().optional(),
  starting_after: z.string().optional(),
  ending_before: z.string().optional(),
});

export const dataAddSiteSchema = z.object({
  name: z.string(),
  sharing: z
    .union([z.literal("none"), z.literal("private"), z.literal("public")])
    .optional(),
  share_password: z.string().optional(),
});

export const dataUpdateSiteSchema = dataAddSiteSchema.deepPartial();

//types:

export type Site = z.infer<typeof siteSchema>;
export type Sites = z.infer<typeof sitesSchema>;
export type QuerySites = z.infer<typeof querySitesSchema>;
export type DataAddSite = z.infer<typeof dataAddSiteSchema>;
export type DataUpdateSite = z.infer<typeof dataUpdateSiteSchema>;
