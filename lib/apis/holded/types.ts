import { z } from "../deps.ts";

export const contactSchema = z.object({
  id: z.string(),
  customId: z.string(),
  name: z.string(),
  code: z.string(),
  tradeName: z.string(),
  email: z.string(),
  mobile: z.string(),
  phone: z.string(),
  type: z.string(),
  iban: z.string(),
  swift: z.string(),
  clientRecord: z.number(),
  supplierRecord: z.number(),
  billAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.number(),
    province: z.string(),
    country: z.string(),
    countryCode: z.string(),
    info: z.string(),
  }),
  defaults: z.object({
    salesChannel: z.number(),
    expensesAccount: z.number(),
    dueDays: z.number(),
    paymentMethod: z.number(),
    discount: z.number(),
    language: z.string(),
    currency: z.string(),
    tax: z.string(),
    retention: z.string(),
  }),
  socialNetworks: z.object({
    website: z.string(),
  }),
  tags: z.array(z.string()),
  notes: z.array(
    z.object({
      noteId: z.string(),
      name: z.string(),
      description: z.string(),
      color: z.string(),
      updatedAt: z.number(),
      userId: z.string(),
    }),
  ),
  contactPersons: z.array(
    z.object({
      personId: z.string(),
      name: z.string(),
      job: z.string(),
      phone: z.string(),
      email: z.string(),
      sendDocumentsByDefault: z.boolean(),
      linkedin: z.string(),
    }),
  ),
  shippingAddresses: z.array(
    z.object({
      shippingId: z.string(),
      name: z.string(),
      address: z.string(),
      city: z.string(),
      postalCode: z.number(),
      province: z.string(),
      country: z.string(),
      countryCode: z.string(),
      notes: z.string(),
      privateNotes: z.string(),
    }),
  ),
  customFields: z.array(
    z.object({
      field: z.string(),
      value: z.string(),
    }),
  ),
}).deepPartial();

export const queryContactsSchema = z.object({
  phone: z.string().optional(),
  mobile: z.string().optional(),
  customId: z.array(z.string()).optional(),
});

export const queryAddContactSchema = z.object({
  CustomId: z.string().optional(),
  name: z.string().optional(),
  code: z.string().optional(),
  email: z.string().optional(),
  mobile: z.string().optional(),
  phone: z.string().optional(),
  type: z
    .union([
      z.literal("supplier"),
      z.literal("debtor"),
      z.literal("creditor"),
      z.literal("client"),
      z.literal("lead"),
    ])
    .optional(),
  isperson: z.boolean().optional(),
  iban: z.string().optional(),
  swift: z.string().optional(),
  sepaRef: z.string().optional(),
  groupId: z.string().optional(),
  taxOperation: z.string().optional(),
  sepaDate: z.number().optional(),
  clientRecord: z.number().optional(),
  supplierRecord: z.number().optional(),
  billAddress: z.object({}).optional(),
  numberingSeries: z.object({}).optional(),
  shippingAddresses: z.array(z.object({})).optional(),
  defaults: z.object({}).optional(),
  socialNetworks: z.object({}).optional(),
  tags: z.array(z.string()).optional(),
  note: z.string().optional(),
  contactPersons: z.array(z.object({})).optional(),
});

export const contactResponseSchema = z.object({
  status: z.number(),
  info: z.string(),
  id: z.string(),
}).deepPartial();

export const queryUpdateContactSchema = queryAddContactSchema.omit({
  tags: true,
  note: true,
  contacPersons: true,
  CustomId: true,
}).extend({
  tradeName: z.string().optional(),
});

//types:

export type Contact = z.infer<typeof contactSchema>;
export type QueryContacts = z.infer<typeof queryContactsSchema>;
export type QueryAddContact = z.infer<typeof queryAddContactSchema>;
export type ContactResponse = z.infer<typeof contactResponseSchema>;
export type QueryUpdateContact = z.infer<typeof queryUpdateContactSchema>;
