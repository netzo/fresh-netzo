import { z } from "https://deno.land/x/zod/mod.ts";

export const recordSchema = z.record(z.any())

export const addOrUpdateRecordResponseSchema = z.record(z.any().optional()).and(
  z.object({
    _id: z.string(),
    _created: z.string(),
    _changed: z.string(),
    _createdby: z.string(),
    _changedby: z.string()
  }).optional()
)

export const deleteRecordResponseSchema = z.object({
  result: z.array(z.string())
})

//types:

export type Record = z.infer<typeof recordSchema>
export type AddOrUpdateRecordResponse = z.infer<typeof addOrUpdateRecordResponseSchema>
export type DeleteRecordResponse = z.infer<typeof deleteRecordResponseSchema>
