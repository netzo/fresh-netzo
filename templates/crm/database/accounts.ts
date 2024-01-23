import { z } from "netzo/deps/zod/mod.ts";
import { createZod } from "netzo/core/utils/database.utils.ts";

// schemas:

const accountJsonSchema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
    },
    "createdAt": {
      "type": "string",
    },
    "updatedAt": {
      "type": "string",
    },
    "name": {
      "type": "string",
    },
    "status": {
      "type": "string",
    },
    "type": {
      "type": "string",
    },
    "web": {
      "type": "string",
    },
    "phone": {
      "type": "string",
    },
    "address": {
      "type": "object",
      "properties": {
        "streetAddress": {
          "type": "string",
        },
        "number": {
          "type": "string",
        },
        "city": {
          "type": "string",
        },
        "postCode": {
          "type": "string",
        },
      },
      "required": [
        "streetAddress",
        "number",
        "city",
        "postCode",
      ],
    },
    "notifications": {
      "type": "object",
      "properties": {
        "payments": {
          "type": "string",
        },
        "invoices": {
          "type": "string",
        },
        "promotions": {
          "type": "string",
        },
        "marketing": {
          "type": "string",
        },
      },
      "required": [
        "payments",
        "invoices",
        "promotions",
        "marketing",
      ],
    },
  },
  "required": [
    "id",
    "createdAt",
    "updatedAt",
    "name",
    "status",
    "type",
    "web",
    "phone",
    "address",
    "notifications",
  ],
};

export const accountSchema = createZod(accountJsonSchema);

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

// i18n:

export const ALIASES = {
  id: "ID",
  createdAt: "Created",
  updatedAt: "Updated",
  name: "Name",
  status: "Status",
  type: "Type",
  web: "Website",
  phone: "Phone",
  address: {
    streetAddress: "Street address",
    number: "Number",
    city: "City",
    postCode: "Post code",
  },
  notifications: {
    payments: "Payments",
    invoices: "Invoices",
    promotions: "Promotions",
    marketing: "Marketing",
  },
};
