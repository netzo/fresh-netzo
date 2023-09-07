import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";

export const notionPaginationSchema = z.object({
  start_cursor: z.string().optional(),
  page_size: z.number().optional(),
});

export const pageSchema = z.object({
  object: z.string(),
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  created_by: z.object({
    object: z.string(),
    id: z.string(),
  }),
  last_edited_by: z.object({
    object: z.string(),
    id: z.string(),
  }),
  cover: z.object({
    type: z.string(),
    external: z.object({
      url: z.string(),
    }),
  }),
  icon: z.object({
    type: z.string(),
    emoji: z.string(),
  }),
  properties: z.record(z.any()),
  parent: z.object({
    type: z.string(),
    database_id: z.string(),
  }),
  archived: z.boolean(),
  url: z.string(),
  public_url: z.any(),
}).deepPartial();

export const queryPropertiesSchema = z.object({
  filter_properties: z.array(z.string()),
});

export const pagesSchema = z.record(z.object({}).optional()).and(
  z.object({
    object: z.string(),
    results: z.array(pageSchema),
    next_cursor: z.any(),
    has_more: z.literal(false),
    type: z.string(), //type value becomes new key
  }).deepPartial(),
);

export const blockSchema = z.record(z.object({}).optional()).and(
  z.object({
    object: z.string(),
    results: z.array(
      z.record(z.object({})).and(
        z.object({
          object: z.string(),
          id: z.string(),
          parent: z.object({
            type: z.string(),
            block_id: z.string(),
          }),
          type: z.string(),
          created_time: z.string(),
          last_edited_time: z.string(),
          created_by: z.object({
            object: z.string(),
            id: z.string(),
          }),
          last_edited_by: z.object({
            object: z.string(),
            id: z.string(),
          }),
          has_children: z.boolean(),
          archived: z.boolean(),
        }),
      ),
    ),
    next_cursor: z.any(),
    has_more: z.literal(false),
    type: z.string(), //type value becomes new key
  }).deepPartial(),
);

const userBaseSchema = z.object({
  object: z.literal("user"),
  id: z.string(),
  type: z.union([z.literal("person"), z.literal("bot")]),
  name: z.string(),
  avatar_url: z.string(),
});

const personUserSchema = userBaseSchema.extend({
  person: z.object({
    email: z.string(),
  }),
});

const botUserSchema = userBaseSchema.extend({
  bot: z.object({
    owner: z.object({
      type: z.string(),
      workspace: z.boolean(),
    }),
    workspace_name: z.string(),
  }),
});

export const usersSchema = z.object({
  results: z.array(z.union([personUserSchema, botUserSchema])),
  next_cursor: z.string(),
  has_more: z.boolean(),
});

export const queryDatabaseSchema = notionPaginationSchema.extend({
  filter: z
    .object({
      property: z.string().optional(),
      checkbox: z.object({}).optional(),
      date: z.object({}).optional(),
      files: z.object({}).optional(),
      formula: z.object({}).optional(),
      multi_select: z.object({}).optional(),
      number: z.object({}).optional(),
      people: z.object({}).optional(),
      phone_number: z.object({}).optional(),
      relation: z.object({}).optional(),
      rich_text: z.object({}).optional(),
      select: z.object({}).optional(),
      status: z.object({}).optional(),
      timestamp: z.object({}).optional(),
    })
    .optional(),
  sorts: z
    .array(
      z.object({
        property: z.string().optional(),
        direction: z
          .union([z.literal("ascending"), z.literal("descending")])
          .optional(),
      }),
    )
    .optional(),
});

//types:

export type NotionPagination = z.infer<typeof notionPaginationSchema>;
export type Page = z.infer<typeof pageSchema>;
export type QueryProperties = z.infer<typeof queryPropertiesSchema>;
export type Pages = z.infer<typeof pagesSchema>;
export type Block = z.infer<typeof blockSchema>;
export type Users = z.infer<typeof usersSchema>;
export type QueryDatabase = z.infer<typeof queryDatabaseSchema>;
