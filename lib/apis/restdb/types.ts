import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";

export const recordSchema = z.record(z.any());

export const addOrUpdateRecordResultSchema = z.record(z.any().optional()).and(
  z.object({
    _id: z.string(),
    _created: z.string(),
    _changed: z.string(),
    _createdby: z.string(),
    _changedby: z.string(),
  }).optional(),
);

export const deleteRecordResultSchema = z.object({
  result: z.array(z.string()),
});

// types:

export type Record = z.infer<typeof recordSchema>;
export type AddOrUpdateRecordResult = z.infer<
  typeof addOrUpdateRecordResultSchema
>;
export type DeleteRecordResult = z.infer<typeof deleteRecordResultSchema>;
