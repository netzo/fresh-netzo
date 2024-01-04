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
  createdAt: z.string(),
  updatedAt: z.string(),
});

// types:

export type Deal = z.infer<typeof dealSchema>;

// data:

export const deals: Deal[] = [
  {
    "id": "1",
    "status": "done",
    "accountId": 101,
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "createdAt": "2023-12-01T08:30:00Z",
    "updatedAt": "2023-12-01T09:00:00Z",
  },
  {
    "id": "2",
    "status": "in-progress",
    "accountId": 105,
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "createdAt": "2023-12-05T11:00:00Z",
    "updatedAt": "2023-12-05T11:30:00Z",
  },
  {
    "id": "3",
    "status": "backlog",
    "accountId": 102,
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "createdAt": "2023-12-10T13:45:00Z",
    "updatedAt": "2023-12-10T14:00:00Z",
  },
  {
    "id": "4",
    "status": "done",
    "accountId": 101,
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "createdAt": "2023-12-15T08:30:00Z",
    "updatedAt": "2023-12-15T09:00:00Z",
  },
  {
    "id": "5",
    "status": "in-progress",
    "accountId": 105,
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "createdAt": "2023-12-20T11:00:00Z",
    "updatedAt": "2023-12-20T11:30:00Z",
  },
  {
    "id": "6",
    "status": "backlog",
    "accountId": 102,
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "createdAt": "2023-12-25T13:45:00Z",
    "updatedAt": "2023-12-25T14:00:00Z",
  },
  {
    "id": "7",
    "status": "done",
    "accountId": 101,
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "createdAt": "2024-01-01T08:30:00Z",
    "updatedAt": "2024-01-01T09:00:00Z",
  },
  {
    "id": "8",
    "status": "in-progress",
    "accountId": 105,
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "createdAt": "2024-01-05T11:00:00Z",
    "updatedAt": "2024-01-05T11:30:00Z",
  },
  {
    "id": "9",
    "status": "backlog",
    "accountId": 102,
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "createdAt": "2024-01-10T13:45:00Z",
    "updatedAt": "2024-01-10T14:00:00Z",
  },
  {
    "id": "10",
    "status": "done",
    "accountId": 101,
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "createdAt": "2024-01-15T08:30:00Z",
    "updatedAt": "2024-01-15T09:00:00Z",
  },
  {
    "id": "11",
    "status": "in-progress",
    "accountId": 105,
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "createdAt": "2024-01-20T11:00:00Z",
    "updatedAt": "2024-01-20T11:30:00Z",
  },
  {
    "id": "12",
    "status": "backlog",
    "accountId": 102,
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "createdAt": "2024-01-25T13:45:00Z",
    "updatedAt": "2024-01-25T14:00:00Z",
  },
  {
    "id": "13",
    "status": "done",
    "accountId": 101,
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "createdAt": "2024-02-01T08:30:00Z",
    "updatedAt": "2024-02-01T09:00:00Z",
  },
  {
    "id": "14",
    "status": "in-progress",
    "accountId": 105,
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "createdAt": "2024-02-05T11:00:00Z",
    "updatedAt": "2024-02-05T11:30:00Z",
  },
  {
    "id": "15",
    "status": "backlog",
    "accountId": 102,
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "createdAt": "2024-02-10T13:45:00Z",
    "updatedAt": "2024-02-10T14:00:00Z",
  },
  {
    "id": "16",
    "status": "done",
    "accountId": 101,
    "name": "Meeting with potential client",
    "description": "Discussed the new product features",
    "labels": [
      "meeting",
    ],
    "createdAt": "2024-02-15T08:30:00Z",
    "updatedAt": "2024-02-15T09:00:00Z",
  },
  {
    "id": "17",
    "status": "in-progress",
    "accountId": 105,
    "name": "Follow-up call",
    "description": "Addressed client concerns",
    "labels": [
      "call",
    ],
    "createdAt": "2024-02-20T11:00:00Z",
    "updatedAt": "2024-02-20T11:30:00Z",
  },
  {
    "id": "18",
    "status": "cancelled",
    "accountId": 102,
    "name": "Follow-up email",
    "description": "Sent product brochure",
    "labels": [
      "email",
    ],
    "createdAt": "2024-02-25T13:45:00Z",
    "updatedAt": "2024-02-25T14:00:00Z",
  },
];
