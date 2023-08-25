import { z } from "../deps.ts";

export const queryRecordsSchema = z.object({
  Action: z.union([
    z.literal("Find"),
    z.literal("Add"),
    z.literal("Edit"),
    z.literal("Delete")
  ]),
  Properties: z
    .object({
      Locale: z.string().optional(),
      Location: z.string().optional(),
      Timezone: z.string().optional(),
      UserSettings: z.object({}).optional()
    })
    .optional(),
  Rows: z.array(z.record(z.any())).optional()
})

export const recordsSchema = z.object({
  Rows: z.array(z.record(z.any()))
})

export const queryAddRecordsSchema = queryRecordsSchema.extend({
  Action: z.literal("Add")
})

export const queryUpdateRecordsSchema = queryRecordsSchema.extend({
  Action: z.literal("Edit")
})

export const queryDeleteRecordsSchema = queryRecordsSchema.extend({
  Action: z.literal("Delete")
})

//types:

export type QueryRecords = z.infer<typeof queryRecordsSchema>
export type Records = z.infer<typeof recordsSchema>
export type QueryAddRecords = z.infer<typeof queryAddRecordsSchema>
export type QueryUpdateRecords = z.infer<typeof queryUpdateRecordsSchema>
export type QueryDeleteRecords = z.infer<typeof queryDeleteRecordsSchema>