import { z } from "https://deno.land/x/zod/mod.ts";

const profileBaseSchema = z.object({
  about: z.string(),
  address: z.string(),
  description: z.string(),
  email: z.string(),
  messaging_product: z.literal("whatsapp"),
  profile_picture_url: z.string(),
  websites: z.array(z.string()),
  vertical: z.string()
})

export const profileSchema = z.object({
  data: z.array(profileBaseSchema)
}).deepPartial()

export const queryProfileSchema = profileBaseSchema.partial()

export const queryUpdateProfileSchema = profileBaseSchema.partial().extend({
  messaging_product: z.string()
})

export const updateProfileResponseSchema = z.object({
  success: z.boolean()
})

//types:

export type Profile = z.infer<typeof profileSchema>
export type QueryProfile = z.infer<typeof queryProfileSchema>
export type QueryUpdateProfile = z.infer<typeof queryUpdateProfileSchema>
export type UpdateProfileResponse = z.infer<typeof updateProfileResponseSchema>
