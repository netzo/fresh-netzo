import { z } from "netzo/deps/zod/mod.ts";

const recordObjectSchema = z.object({
  fields: z.record(z.any()),
  id: z.string().optional(),
});

export const recordsSchema = z.object({
  records: z.array(recordObjectSchema.merge(
    z.object({
      createdTime: z.string(),
    }),
  )),
}).deepPartial();

export const queryRecordsSchema = z.object({
  timeZone: z.object({}).optional(),
  userLocale: z.string().optional(),
  pageSize: z.number().optional(),
  maxRecords: z.number().optional(),
  offset: z.string().optional(),
  view: z.string().optional(),
  sort: z
    .array(
      z.object({
        field: z.string().optional(),
        direction: z.union([z.literal("asc"), z.literal("desc")]).optional(),
      }),
    )
    .optional(),
  filterByFormula: z.string().optional(),
  cellFormat: z.union([z.literal("json"), z.literal("string")]).optional(),
  fields: z.array(z.string()).optional(),
  returnFieldsByFieldId: z.boolean().optional(),
  recordMetaData: z.array(z.string()).optional(),
});

export const dataAddRecordsSchema = z.object({
  records: z.array(recordObjectSchema.pick({ fields: true })),
  returnFieldsByFieldId: z.boolean().optional(),
  typecast: z.boolean().optional(),
});

export const dataUpdateRecordsSchema = z.object({
  records: z.array(recordObjectSchema),
  performUpsert: z
    .object({
      fieldsToMergeOn: z.array(z.string()),
    })
    .optional(),
  returnFieldsByFieldId: z.boolean().optional(),
  typecast: z.boolean().optional(),
});

export const updateRecordsResultSchema = z.object({
  records: z.array(recordObjectSchema),
  createdRecords: z.array(z.string()),
  updatedRecords: z.array(z.string()),
}).deepPartial();

export const queryDeleteRecordsSchema = z.object({
  records: z.array(z.string()),
});

export const recordsDeletedSchema = z.object({
  records: z.array(
    z.object({
      deleted: z.boolean(),
      id: z.string(),
    }),
  ),
}).deepPartial();

export const databasesSchema = z.object({
  bases: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      permissionLevel: z.string(),
    }),
  ),
  offset: z.string(),
}).deepPartial();

export const queryDatabasesSchema = z.object({
  offset: z.string().optional(),
});

export const tablesSchema = z.object({
  tables: z.array(
    z.object({
      description: z.string().optional(),
      fields: z.array(
        z.object({
          description: z.string().optional(),
          id: z.string(),
          name: z.string(),
          type: z.string(),
          options: z
            .object({
              inverseLinkFieldId: z.string(),
              isReversed: z.boolean(),
              linkedTableId: z.string(),
              prefersSingleRecordLink: z.boolean(),
            })
            .optional(),
        }),
      ),
      id: z.string(),
      name: z.string(),
      primaryFieldId: z.string(),
      views: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          type: z.string(),
        }),
      ),
    }),
  ),
}).deepPartial();

export const queryTablesSchema = z.object({
  include: z.array(z.string()).optional(),
});

// types:

export type Records = z.infer<typeof recordsSchema>;
export type QueryRecords = z.infer<typeof queryRecordsSchema>;
export type DataAddRecords = z.infer<typeof dataAddRecordsSchema>;
export type DataUpdateRecords = z.infer<typeof dataUpdateRecordsSchema>;
export type UpdateRecordsResult = z.infer<typeof updateRecordsResultSchema>;
export type QueryDeleteRecords = z.infer<typeof queryDeleteRecordsSchema>;
export type RecordsDeleted = z.infer<typeof recordsDeletedSchema>;
export type Databases = z.infer<typeof databasesSchema>;
export type QueryDatabases = z.infer<typeof queryDatabasesSchema>;
export type Tables = z.infer<typeof tablesSchema>;
export type QueryTables = z.infer<typeof queryTablesSchema>;
