import { z } from "netzo/deps/zod/mod.ts";

// schemas:

export const contactSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  account: z.any(),
  accountDomain: z.string(), // Will be used to match records from email domain, once associated with an account, it will be removed from here
  name: z.string(),
  position: z.string(),
  department: z.string(),
  phone: z.array(
    z.object({
      type: z.string(), // "work", "mobile", "whatsapp",
      name: z.string(), // "Personal whatsapp", "Work phone", "Home phone", "Mobile phone", "Fax", "Other"
      value: z.string(),
    }),
  ),
  emails: z.array(
    z.object({
      type: z.string(), // "personal", "work"
      name: z.string(), // "Personal email", "Work email", "Other"
      value: z.string().email(),
    }),
  ),
  links: z.array(
    z.object({
      name: z.string(), // "website", "facebook", "linkedin", "twitter", "other"
      value: z.string().url(),
    }),
  ),
  notes: z.array(
    z.object({
      text: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
  consent: z.object({
    documents: z.boolean(),
    documentsTimestamp: z.number(),
    marketing: z.boolean(),
    marketingLastTimestamp: z.number(),
    terms: z.boolean(),
    termsTimestamp: z.number(),
    privacy: z.boolean(),
    privacyTimestamp: z.number(),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// i18n:

export const ALIASES = {
  id: "Contact Id",
  accountId: "Account Id",
  account: "Account",
  accountDomain: "Account Domain",
  name: "Full Name",
  position: "Position",
  department: "Department",
  emails: "Emails",
  phones: "Phone Numbers",
  links: "Links",
  notes: {
    text: "Text",
    createdAt: "Created At",
    updatedAt: "Updated At",
  },
  consent: {
    documents: "Documents",
    documentsTimestamp: "Documents Timestamp",
    marketing: "Marketing",
    marketingLastTimestamp: "Marketing Last Timestamp",
    terms: "Terms",
    termsTimestamp: "Terms Timestamp",
    privacy: "Privacy",
    privacyTimestamp: "Privacy Timestamp",
  },
  createdAt: "Created At",
  updatedAt: "Updated At",
};
