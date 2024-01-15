import { z } from "netzo/deps/zod/mod.ts";

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
  accountId: z.string(),
  name: z.string(),
  description: z.string(),
  labels: z.array(z.string()),
  notes: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// data:

export const deals: Deal[] = [
  {
    "id": "1",
    "createdAt": "2023-12-01T08:30:00Z",
    "updatedAt": "2023-12-01T09:00:00Z",
    "status": "done",
    "accountId": "101",
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "notes": [],
  },
  {
    "id": "2",
    "createdAt": "2023-12-05T11:00:00Z",
    "updatedAt": "2023-12-05T11:30:00Z",
    "status": "in-progress",
    "accountId": "105",
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "notes": [],
  },
  {
    "id": "3",
    "createdAt": "2023-12-10T13:45:00Z",
    "updatedAt": "2023-12-10T14:00:00Z",
    "status": "backlog",
    "accountId": "102",
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "notes": [],
  },
  {
    "id": "4",
    "createdAt": "2023-12-15T08:30:00Z",
    "updatedAt": "2023-12-15T09:00:00Z",
    "status": "done",
    "accountId": "101",
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "notes": [],
  },
  {
    "id": "5",
    "createdAt": "2023-12-20T11:00:00Z",
    "updatedAt": "2023-12-20T11:30:00Z",
    "status": "in-progress",
    "accountId": "105",
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "notes": [],
  },
  {
    "id": "6",
    "createdAt": "2023-12-25T13:45:00Z",
    "updatedAt": "2023-12-25T14:00:00Z",
    "status": "backlog",
    "accountId": "102",
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "notes": [],
  },
  {
    "id": "7",
    "createdAt": "2024-01-01T08:30:00Z",
    "updatedAt": "2024-01-01T09:00:00Z",
    "status": "done",
    "accountId": "101",
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "notes": [],
  },
  {
    "id": "8",
    "createdAt": "2024-01-05T11:00:00Z",
    "updatedAt": "2024-01-05T11:30:00Z",
    "status": "in-progress",
    "accountId": "105",
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "notes": [],
  },
  {
    "id": "9",
    "createdAt": "2024-01-10T13:45:00Z",
    "updatedAt": "2024-01-10T14:00:00Z",
    "status": "backlog",
    "accountId": "102",
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "notes": [],
  },
  {
    "id": "10",
    "createdAt": "2024-01-15T08:30:00Z",
    "updatedAt": "2024-01-15T09:00:00Z",
    "status": "done",
    "accountId": "101",
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "notes": [],
  },
  {
    "id": "11",
    "createdAt": "2024-01-20T11:00:00Z",
    "updatedAt": "2024-01-20T11:30:00Z",
    "status": "in-progress",
    "accountId": "105",
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "notes": [],
  },
  {
    "id": "12",
    "createdAt": "2024-01-25T13:45:00Z",
    "updatedAt": "2024-01-25T14:00:00Z",
    "status": "backlog",
    "accountId": "102",
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "notes": [],
  },
  {
    "id": "13",
    "createdAt": "2024-02-01T08:30:00Z",
    "updatedAt": "2024-02-01T09:00:00Z",
    "status": "done",
    "accountId": "101",
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "notes": [],
  },
  {
    "id": "14",
    "createdAt": "2024-02-05T11:00:00Z",
    "updatedAt": "2024-02-05T11:30:00Z",
    "status": "in-progress",
    "accountId": "105",
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "notes": [],
  },
  {
    "id": "15",
    "createdAt": "2024-02-10T13:45:00Z",
    "updatedAt": "2024-02-10T14:00:00Z",
    "status": "backlog",
    "accountId": "102",
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "notes": [],
  },
  {
    "id": "16",
    "createdAt": "2024-02-15T08:30:00Z",
    "updatedAt": "2024-02-15T09:00:00Z",
    "status": "done",
    "accountId": "101",
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "notes": [],
  },
  {
    "id": "17",
    "createdAt": "2024-02-20T11:00:00Z",
    "updatedAt": "2024-02-20T11:30:00Z",
    "status": "in-progress",
    "accountId": "105",
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "notes": [],
  },
  {
    "id": "18",
    "createdAt": "2024-02-25T13:45:00Z",
    "updatedAt": "2024-02-25T14:00:00Z",
    "status": "cancelled",
    "accountId": "102",
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "notes": [],
  },
];

// i18n:

export const ALIASES = {};
