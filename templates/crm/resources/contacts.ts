import { z } from "netzo/deps/zod/mod.ts";

// schemas:

export const contactSchema = z.object({
  id: z.string(),
  accountId: z.array(z.string()),
  account: z.array(z.object()),
  accountDomain: z.string(), // Will be used to match records from email domain, once associated with an account, it will be removed from here
  firstName: z.string(),
  lastName: z.string(),
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
      createdBy: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
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
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// data:

export const contacts: Contact[] = [
  {
    id: "1",
    accountId: "ACCOUNT1",
    account: [{ $ref: {} }],
    accountDomain: "esgraf.com,.mx",
    firstName: "John",
    lastName: "Doe",
    position: "CEO",
    department: "Management",
    phone: [{
      type: "work",
      name: "Work Phone",
      value: "+521234567890",
    }],
    emails: [{
      type: "work",
      name: "Work Email",
      value: "john.doe@esgraf.com.mx",
    }],
    links: [
      { name: "facebook", value: "https://facebook.com/johndoe" },
      { name: "instagram", value: "https://instagram.com/johndoe" },
      { name: "linkedin", value: "https://linkedin.com/johndoe" },
    ],
    notes: [{
      text: "Call with John Doe",
      createdBy: "USER1",
      createdAt: "2021-01-01T10:00:00.000Z",
      updatedAt: "2021-01-01T10:00:00.000Z",
    }],
    consent: {
      documents: true,
      documentsTimestamp: 1612137600,
      marketing: true,
      marketingLastTimestamp: 1612137600,
      terms: true,
      termsTimestamp: 1612137600,
      privacy: true,
      privacyTimestamp: 1612137600,
    },
    createdBy: "USER1",
    createdAt: "2021-01-01T10:00:00.000Z",
    updatedAt: "2021-01-01T10:00:00.000Z",
  },
  {
    id: "2",
    accountId: "ACCOUNT1",
    account: [{ $ref: {} }],
    accountDomain: "esgraf.com,.mx",
    firstName: "John",
    lastName: "Doe",
    position: "CEO",
    department: "Management",
    phone: [{
      type: "work",
      name: "Work Phone",
      value: "+521234567890",
    }],
    emails: [{
      type: "work",
      name: "Work Email",
      value: "john.doe@esgraf.com.mx",
    }],
    links: [
      { name: "facebook", value: "https://facebook.com/johndoe" },
      { name: "instagram", value: "https://instagram.com/johndoe" },
      { name: "linkedin", value: "https://linkedin.com/johndoe" },
    ],
    notes: [{
      text: "Call with John Doe",
      createdBy: "USER1",
      createdAt: "2021-01-01T10:00:00.000Z",
      updatedAt: "2021-01-01T10:00:00.000Z",
    }],
    consent: {
      documents: true,
      documentsTimestamp: 1612137600,
      marketing: true,
      marketingLastTimestamp: 1612137600,
      terms: true,
      termsTimestamp: 1612137600,
      privacy: true,
      privacyTimestamp: 1612137600,
    },
    createdBy: "USER1",
    createdAt: "2021-01-01T10:00:00.000Z",
    updatedAt: "2021-01-01T10:00:00.000Z",
  },
  {
    id: "3",
    accountId: "ACCOUNT1",
    account: [{ $ref: {} }],
    accountDomain: "esgraf.com,.mx",
    firstName: "John",
    lastName: "Doe",
    position: "CEO",
    department: "Management",
    phone: [{
      type: "work",
      name: "Work Phone",
      value: "+521234567890",
    }],
    emails: [{
      type: "work",
      name: "Work Email",
      value: "john.doe@esgraf.com.mx",
    }],
    links: [
      { name: "facebook", value: "https://facebook.com/johndoe" },
      { name: "instagram", value: "https://instagram.com/johndoe" },
      { name: "linkedin", value: "https://linkedin.com/johndoe" },
    ],
    notes: [{
      text: "Call with John Doe",
      createdBy: "USER1",
      createdAt: "2021-01-01T10:00:00.000Z",
      updatedAt: "2021-01-01T10:00:00.000Z",
    }],
    consent: {
      documents: true,
      documentsTimestamp: 1612137600,
      marketing: true,
      marketingLastTimestamp: 1612137600,
      terms: true,
      termsTimestamp: 1612137600,
      privacy: true,
      privacyTimestamp: 1612137600,
    },
    createdBy: "USER1",
    createdAt: "2021-01-01T10:00:00.000Z",
    updatedAt: "2021-01-01T10:00:00.000Z",
  },
];

// i18n:

export const ALIASES = {
  id: "Contact Id",
  accountId: "Account Id",
  account: "Account",
  accountDomain: "Account Domain",
  firstName: "First Name",
  lastName: "Last Name",
  position: "Position",
  department: "Department",
  phone: "Phone Numbers ",
  emails: "Emails",
  links: "Links",
  notes: {
    text: "Text",
    createdBy: "Created By",
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
  createdBy: "Created By",
  createdAt: "Created At",
  updatedAt: "Updated At",
};
