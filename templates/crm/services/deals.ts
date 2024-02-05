import { z } from "zod";

// schemas:

export const dealSchema = z.object({
  id: z.string(),
  status: z.union([
    z.literal("backlog"),
    z.literal("todo"),
    z.literal("in-progress"),
    z.literal("done"),
    z.literal("cancelled"),
  ]),
  accountIds: z.array(z.string()),
  accounts: [{ $ref: {} }],
  contactIds: z.array(z.string()),
  contacts: [{ $ref: {} }],
  title: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  assignedTo: z.string(),
  notes: z.array(
    z.object({
      text: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
  tasks: z.array(
    z.object({
      type: z.string(),
      status: z.string(),
      title: z.string(),
      description: z.string(),
      assigneeIds: z.array(z.string()),
      assignees: z.array(z.object({ $ref: {} })),
      assignerIds: z.array(z.string()),
      assigners: z.array(z.object({ $ref: {} })),
      dateDue: z.string(),
      dateCompleted: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// i18n:

export const I18N = {
  id: "Deal Id",
  status: "in-progress",
  accountIds: "Accounts Ids",
  accounts: "Accounts",
  contactIds: "Contact Ids",
  contacts: "Contacts",
  title: "Title",
  description: "Description",
  amount: "Amount",
  currency: "Currency",
  assignedTo: "Assigned to",
  notes: {
    text: "Text",
    createdAt: "Created at",
    updatedAt: "Updated at",
  },
  tasks: {
    type: "Type",
    status: "in-progress",
    title: "Title",
    description: "Description",
    assigneeIds: "Assignee Ids",
    assignees: "Assignees",
    assignerIds: "Assigner Ids",
    assigners: "Assigners",
    dateDue: "Date due",
    dateCompleted: "Date completed",
    createdAt: "Created at",
    updatedAt: "Updated at",
  },
  createdAt: "Created at",
  updatedAt: "Updated at",
};
