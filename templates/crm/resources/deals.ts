import { z } from "zod";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { ulid } from "netzo/core/api/utils.ts";

// schemas:

export const dealSchema = z.object({
  id: z.string(),
  status: z.enum([
    "backlog",
    "todo",
    "in-progress",
    "done",
    "cancelled",
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

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid(),
  status: faker.helpers.arrayElement([
    "backlog",
    "todo",
    "in-progress",
    "done",
    "cancelled",
  ]),
  accountIds: Array.from(Array(2)).map(() => ulid()),
  accounts: Array.from(Array(2)).map(() => ({ $ref: {} })),
  contactIds: Array.from(Array(2)).map(() => ulid()),
  contacts: Array.from(Array(2)).map(() => ({ $ref: {} })),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  amount: faker.number.int(),
  currency: faker.finance.currencyCode(),
  assignedTo: ulid(),
  notes: Array.from(Array(3)).map(() => ({
    text: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  tasks: Array.from(Array(2)).map(() => ({
    type: faker.lorem.word(),
    status: "in-progress",
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    assigneeIds: Array.from(Array(2)).map(() => ulid()),
    assignees: Array.from(Array(2)).map(() => ({ $ref: {} })),
    assignerIds: Array.from(Array(2)).map(() => ulid()),
    assigners: Array.from(Array(2)).map(() => ({ $ref: {} })),
    dateDue: faker.date.future().toISOString(),
    dateCompleted: faker.date.recent().toISOString(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Deal ID",
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
