import { z } from "netzo/deps/zod/mod.ts";

// schemas:

export const accountSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  status: z.union([z.literal("active"), z.literal("inactive")]),
  type: z.string(),
  web: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
  phone: z.string(),
  address: z.object({
    streetAddress: z.string(),
    number: z.string(),
    city: z.string(),
    postCode: z.string(),
  }),
  notifications: z.object({
    payments: z.union([z.boolean(), z.string()]),
    invoices: z.union([z.boolean(), z.string()]),
    promotions: z.union([z.boolean(), z.string()]),
    marketing: z.union([z.boolean(), z.string()]),
  }),
});

// types:

export type Account = z.infer<typeof accountSchema>;

// data:

export const accounts: Account[] = [
  {
    id: "01HEG8XFYVMQK2QT9EX2TVHN7K",
    createdAt: "2023-10-20",
    updatedAt: "2023-10-20",
    name: "ABC Inc.",
    status: "active",
    type: "Technology",
    web: "https://www.abcinc.com",
    phone: "123-456-7890",
    address: {
      streetAddress: "123 Main St",
      number: "Suite 100",
      city: "New York",
      postCode: "10001",
    },
    notifications: {
      payments: true,
      invoices: true,
      promotions: false,
      marketing: true,
    },
  },
  {
    id: "01HEG8XFZ8XHFTEM5K4E2ARWXB",
    createdAt: "2022-12-19T15:03:00.000Z",
    updatedAt: "2023-10-09T14:00:00.000Z",
    name: "XYZ Corp.",
    status: "inactive",
    type: "Finance",
    web: "https://www.xyzcorp.com",
    phone: "555-555-5555",
    address: {
      streetAddress: "456 Elm St",
      number: "Suite 200",
      city: "Los Angeles",
      postCode: "90001",
    },
    notifications: {
      payments: true,
      invoices: true,
      promotions: true,
      marketing: true,
    },
  },
  {
    id: "01HEG8XFZ8XHFTEM5K4E2ARWXC",
    createdAt: "2022-10-19T13:03:00.000Z",
    updatedAt: "2023-10-19T13:03:00.000Z",
    name: "LMN Ltd.",
    status: "active",
    type: "Retail",
    web: "https://www.lmn-ltd.com",
    phone: "888-123-4567",
    address: {
      streetAddress: "789 Oak St",
      number: "28B",
      city: "Chicago",
      postCode: "60601",
    },
    notifications: {
      payments: true,
      invoices: true,
      promotions: false,
      marketing: false,
    },
  },
];
