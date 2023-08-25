import { z } from "https://deno.land/x/zod/mod.ts";

const mailingListBaseSchema = z.object({
  access_level: z.string(),
  address: z.string(),
  created_at: z.string(),
  description: z.string(),
  members_count: z.number(),
  name: z.string()
})

export const mailingListsSchema = z.object({
  items: z.array(mailingListBaseSchema),
  paging: z.object({
    first: z.string(),
    last: z.string(),
    next: z.string(),
    previous: z.string()
  })
}).deepPartial()

export const queryMailingListsSchema = z.object({
  limit: z.number().optional()
})

export const queryAddMailingListSchema = z.object({
  address: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  access_level: z
    .union([z.literal("readonly"), z.literal("members"), z.literal("everyone")])
    .optional(),
  reply_preference: z.union([z.literal("list"), z.literal("sender")]).optional()
})

export const queryUpdateMailingListSchema = queryAddMailingListSchema.partial()

export const addOrUpdateListResponseSchema = z.object({
  message: z.string(),
  list: mailingListBaseSchema
})

export const queryAddMemberSchema = z.object({
  address: z.string(),
  name: z.string().optional(),
  vars: z.record(z.any()).optional(),
  subscribed: z.union([z.literal("yes"), z.literal("no")]).optional(),
  upsert: z.union([z.literal("yes"), z.literal("no")]).optional()
})

export const addMemberResponseSchema = z.object({
  member: z.object({
    vars: z.record(z.any()),
    name: z.string(),
    subscribed: z.boolean(),
    address: z.string()
  }),
  message: z.string()
})

export const deleteMemberResponseSchema = z.object({
  member: z.object({
    address: z.string()
  }),
  message: z.string()
})

//types:

export type MailingLists = z.infer<typeof mailingListsSchema>
export type QueryMailingLists = z.infer<typeof queryMailingListsSchema>
export type QueryAddMailingList = z.infer<typeof queryAddMailingListSchema>
export type QueryUpdateMailingList = z.infer<typeof queryUpdateMailingListSchema>
export type AddOrUpdateListResponse = z.infer<typeof addOrUpdateListResponseSchema>
export type QueryAddMember = z.infer<typeof queryAddMemberSchema>
export type AddMemberResponse = z.infer<typeof addMemberResponseSchema>
export type DeleteMemberResponse = z.infer<typeof deleteMemberResponseSchema>
