import { z } from "netzo/deps/zod/mod.ts";
import { accountSchema } from "@/components/data/accounts.ts";

// schemas:

export const contactSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  avatar: z.string(),
  email: z.string().email({
    message: "Invalid email format",
  }).optional().or(z.literal("")),
  phone: z.string(),
  notifications: z.object({
    new: z.boolean(),
    promotions: z.boolean(),
    marketing: z.boolean(),
  }),
  accountId: z.string(),
  account: accountSchema,
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// data:

export const contacts: Contact[] = [
  {
    id: "01HEG8XFZ9J46NZEBVW35TSM4D",
    createdAt: "2023-01-01T13:03:00.000Z",
    updatedAt: "2023-01-01T13:03:00.000Z",
    name: "John Doe",
    avatar: "",
    email: "john.doe@abcinc.com",
    phone: "111-111-1111",
    accountId: "01HEG8XFYVMQK2QT9EX2TVHN7K",
    notifications: {
      new: true,
      promotions: false,
      marketing: false,
    },
  },
  {
    id: "01HEG8XFZ9J46NZEBVW35TSM4E",
    createdAt: "2023-02-19T13:03:00.000Z",
    updatedAt: "2023-02-19T13:03:00.000Z",
    name: "Jane Smith",
    avatar: "",
    email: "jane.smith@xyzcorp.com",
    phone: "222-222-2222",
    accountId: "01HEG8XFZ8XHFTEM5K4E2ARWXB",
    notifications: {
      new: true,
      promotions: false,
      marketing: false,
    },
  },
  {
    id: "01HEG8XFZ9J46NZEBVW35TSM4F",
    createdAt: "2023-01-19T13:03:00.000Z",
    updatedAt: "2023-01-19T13:03:00.000Z",
    name: "Michael Johnson",
    avatar: "",
    email: "michael.johnson@lmn-ltd.com",
    phone: "333-333-3333",
    accountId: "01HEG8XFZ8XHFTEM5K4E2ARWXC",
    notifications: {
      new: true,
      promotions: false,
      marketing: false,
    },
  },
];

// i18n:

export const ALIASES = {
  id: "ID",
  createdAt: "Created",
  updatedAt: "Updated",
  name: "Name",
  avatar: "Image",
  email: "Email",
  phone: "Phone",
  accountId: "Account",
  notifications: {
    new: "New products",
    promotions: "Promotions",
    marketing: "Marketing",
  },
};