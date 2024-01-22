import { z } from "netzo/deps/zod/mod.ts";

// schemas:

export const productionlineSchema = z.object({
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

export type ProductionLine = z.infer<typeof productionlineSchema>;

// data:

export const productionLines: ProductionLine[] = [
  {
    "line_id": "line1",
    "line_name": "Assembly Line 1",
    "machines": [
      {
        "machine_id": "machine1",
        "machine_name": "Assembler A",
        "specs": "High-speed assembly machine"
      },
      {
        "machine_id": "machine2",
        "machine_name": "Inspector X",
        "specs": "Quality inspection machine"
      }
    ],
    "shifts": [
      {
        "shift_id": "shift1",
        "start_time": "08:00 AM",
        "end_time": "04:00 PM"
      },
      {
        "shift_id": "shift2",
        "start_time": "04:00 PM",
        "end_time": "12:00 AM"
      }
    ],
    "excluded_stops": [
      "Breaks",
      "Changeovers"
    ]
  },
  {
    "line_id": "line2",
    "line_name": "Packaging Line 1",
    "machines": [
      {
        "machine_id": "machine3",
        "machine_name": "Packer Pro",
        "specs": "Automated packaging machine"
      }
    ],
    "shifts": [
      {
        "shift_id": "shift1",
        "start_time": "08:00 AM",
        "end_time": "04:00 PM"
      }
    ],
    "excluded_stops": [
      "Breaks"
    ]
  }
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

