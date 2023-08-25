import { z } from "../deps.ts";

const documentBaseSchema = z.object({
  _id: z.string(),
  status: z.string(),
  text: z.string()
})

export const documentsSchema = z.object({
  documents: z.array(documentBaseSchema)
}).deepPartial()

export const queryDocumentsSchema = z.object({
  dataSource: z.string(),
  database: z.string(),
  collection: z.string(),
  filter: z.object({
    text: z.string().optional()
  }),
  projection: z
    .object({
      status: z.number().optional(),
      text: z.number().optional()
    })
    .optional(),
  sort: z.object({}).optional(),
  limit: z.number().optional(),
  skip: z.number().optional()
})

export const queryAddDocumentSchema = z.object({
  dataSource: z.string(),
  database: z.string(),
  collection: z.string(),
  document: z.object({})
})

export const addDocumentResponseSchema = z.object({
  insertedId: z.string()
})

export const queryUpdateDocumentSchema = z.object({
  dataSource: z.string(),
  database: z.string(),
  collection: z.string(),
  filter: z.object({}),
  update: z.object({}),
  upsert: z.boolean().optional()
})

export const updateDocumentResponseSchema = z.object({
  matchedCount: z.number(),
  modifiedCount: z.number()
})

//types:

export type Documents = z.infer<typeof documentsSchema>
export type QueryDocuments = z.infer<typeof queryDocumentsSchema>
export type QueryAddDocument = z.infer<typeof queryAddDocumentSchema>
export type AddDocumentResponse = z.infer<typeof addDocumentResponseSchema>
export type QueryUpdateDocument = z.infer<typeof queryUpdateDocumentSchema>
export type UpdateDocumentResponse = z.infer<typeof updateDocumentResponseSchema>
