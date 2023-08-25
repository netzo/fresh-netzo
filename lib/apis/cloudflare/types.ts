import { z } from "https://deno.land/x/zod/mod.ts";

const responseBaseSchema = z.object({
  errors: z.array(z.any()),
  messages: z.array(z.any()),
  success: z.boolean()
})

const queryBaseSchema = z.object({
  name: z.string().optional(),
  direction: z.union([z.literal("asc"), z.literal("desc")]).optional(),
  match: z.union([z.literal("any"), z.literal("all")]).optional(),
  page: z.number().optional(),
  per_page: z.number().optional(),
  status: z.string().optional()
})

const zoneBaseSchema = z.object({
  account: z.object({
    id: z.string(),
    name: z.string()
  }),
  activated_on: z.string(),
  created_on: z.string(),
  development_mode: z.number(),
  id: z.string(),
  meta: z.object({
    cdn_only: z.boolean(),
    custom_certificate_quota: z.number(),
    dns_only: z.boolean(),
    foundation_dns: z.boolean(),
    page_rule_quota: z.number(),
    phishing_detected: z.boolean(),
    step: z.number()
  }),
  modified_on: z.string(),
  name: z.string(),
  original_dnshost: z.string(),
  original_name_servers: z.array(z.string()),
  original_registrar: z.string(),
  owner: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string()
  }),
  vanity_name_servers: z.array(z.string())
})

export const organizationsSchema = responseBaseSchema.extend({
  result: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      permissions: z.array(z.string()),
      roles: z.array(z.string()),
      status: z.string()
    })
  ),
  result_info: z.object({
    count: z.number(),
    page: z.number(),
    per_page: z.number(),
    total_count: z.number()
  })
}).deepPartial()

export const queryOrganizationsSchema = queryBaseSchema.extend({
  order: z
    .union([z.literal("id"), z.literal("name"), z.literal("status")])
    .optional()
})

export const zonesSchema = responseBaseSchema.extend({
  result_info: z.object({
    count: z.number(),
    page: z.number(),
    per_page: z.number(),
    total_count: z.number()
  }),
  result: z.array(zoneBaseSchema)
}).deepPartial()

export const queryZonesSchema = queryBaseSchema.extend({
  account: z.object({
    id: z.string().optional(),
    name:  z.string().optional(),
  }),
  order: z
    .union([
      z.literal("name"),
      z.literal("status"),
      z.literal("account.id"),
      z.literal("account.name")
    ])
    .optional()
})

export const zoneSchema = responseBaseSchema.extend({
  result: zoneBaseSchema
}).deepPartial()

export const queryAddZoneSchema = z.object({
  account: z.object({
    id: z.string()
  }),
  name: z.string(),
  type: z.union([z.literal("full"), z.literal("partial")]).optional()
})

export const deleteResponseSchema = responseBaseSchema.extend({
  result: z.object({
    id: z.string()
  })
}).deepPartial()


//types: 

export type Organizations = z.infer<typeof organizationsSchema>
export type QueryOrganizations = z.infer<typeof queryOrganizationsSchema>
export type Zones = z.infer<typeof zonesSchema>
export type QueryZones = z.infer<typeof queryZonesSchema>
export type Zone = z.infer<typeof zoneSchema>
export type QueryAddZone = z.infer<typeof queryAddZoneSchema>
export type DeleteResponse = z.infer<typeof deleteResponseSchema>
