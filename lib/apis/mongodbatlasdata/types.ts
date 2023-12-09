import { z } from "netzo/deps/zod/mod.ts";

const documentBaseSchema = z.object({
  _id: z.string(),
  status: z.string(),
  text: z.string(),
});

export const documentsSchema = z.object({
  documents: z.array(documentBaseSchema),
}).deepPartial();

export const queryDocumentsSchema = z.object({
  dataSource: z.string(),
  database: z.string(),
  collection: z.string(),
  filter: z.object({
    text: z.string().optional(),
  }),
  projection: z
    .object({
      status: z.number().optional(),
      text: z.number().optional(),
    })
    .optional(),
  sort: z.object({}).optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
});

export const dataAddDocumentSchema = z.object({
  dataSource: z.string(),
  database: z.string(),
  collection: z.string(),
  document: z.object({}),
});

export const addDocumentResultSchema = z.object({
  insertedId: z.string(),
});

export const dataUpdateDocumentSchema = z.object({
  dataSource: z.string(),
  database: z.string(),
  collection: z.string(),
  filter: z.object({}),
  update: z.object({}),
  upsert: z.boolean().optional(),
});

export const updateDocumentResultSchema = z.object({
  matchedCount: z.number(),
  modifiedCount: z.number(),
});

// types:

export type Documents = z.infer<typeof documentsSchema>;
export type QueryDocuments = z.infer<typeof queryDocumentsSchema>;
export type DataAddDocument = z.infer<typeof dataAddDocumentSchema>;
export type AddDocumentResult = z.infer<typeof addDocumentResultSchema>;
export type DataUpdateDocument = z.infer<typeof dataUpdateDocumentSchema>;
export type UpdateDocumentResult = z.infer<
  typeof updateDocumentResultSchema
>;
