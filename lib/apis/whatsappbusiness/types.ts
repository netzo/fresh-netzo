import { z } from "netzo/deps/zod/mod.ts";

const profileBaseSchema = z.object({
  about: z.string(),
  address: z.string(),
  description: z.string(),
  email: z.string(),
  messaging_product: z.literal("whatsapp"),
  profile_picture_url: z.string(),
  websites: z.array(z.string()),
  vertical: z.string(),
});

export const profileSchema = z.object({
  data: z.array(profileBaseSchema),
}).deepPartial();

export const queryProfileSchema = profileBaseSchema.partial();

export const dataUpdateProfileSchema = profileBaseSchema.partial().extend({
  messaging_product: z.string(),
});

export const updateProfileResultSchema = z.object({
  success: z.boolean(),
});

// types:

export type Profile = z.infer<typeof profileSchema>;
export type QueryProfile = z.infer<typeof queryProfileSchema>;
export type DataUpdateProfile = z.infer<typeof dataUpdateProfileSchema>;
export type UpdateProfileResult = z.infer<typeof updateProfileResultSchema>;
