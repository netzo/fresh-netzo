import { z } from "netzo/deps/zod/mod.ts";

// schemas:

export const transactionSchema = z.object({
  id: z.string(),
  treasuryIdSource: z.string(),
  treasuryIdDestination: z.string(),
  type: z.string(), // income, expense, internal-transfer
  method: z.string(), // "wire-transfer", "check", "cash", "credit-card", "debit-card", "paypal", "stripe
  status: z.string(), // "pending", "completed", "failed", "cancelled", "refunded"
  reference: z.string(), // "check number", "transaction id", etc.
  issuerAccountId: z.string(),
  receiverAccountId: z.string(),
  dateIssued: z.string(),
  datePayment: z.string(),
  amount: z.number(),
  currency: z.string(),
  exchangeRate: z.number(),
  notes: z.array(
    z.object({
      text: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// types:

export type Transaction = z.infer<typeof transactionSchema>;

// data:

export const transactions: Transaction[] = [
  {
    "id": "12345",
    "treasuryIdSource": "ABC123",
    "treasuryIdDestination": "XYZ789",
    "type": "income",
    "method": "wire-transfer",
    "status": "completed",
    "reference": "transaction-id-6789",
    "issuerAccountId": "ACCOUNT1",
    "receiverAccountId": "ACCOUNT2",
    "dateIssued": "2023-06-15T09:30:00Z",
    "datePayment": "2023-06-15",
    "amount": 5000,
    "currency": "USD",
    "exchangeRate": 1.0,
    "notes": [
      {
        "text": "Received payment for services rendered",
        "createdAt": "2023-06-15T09:35:00Z",
        "updatedAt": "2023-06-15T09:35:00Z",
      },
    ],
    "createdAt": "2023-06-15T09:40:00Z",
    "updatedAt": "2023-06-15T09:40:00Z",
  },
  {
    "id": "67890",
    "treasuryIdSource": "XYZ789",
    "treasuryIdDestination": "DEF456",
    "type": "expense",
    "method": "credit-card",
    "status": "completed",
    "reference": "transaction-id-2345",
    "issuerAccountId": "ACCOUNT2",
    "receiverAccountId": "ACCOUNT3",
    "dateIssued": "2023-07-20T14:45:00Z",
    "datePayment": "2023-07-20",
    "amount": 800,
    "currency": "EUR",
    "exchangeRate": 0.92,
    "notes": [
      {
        "text": "Payment for office supplies",
        "createdAt": "2023-07-20T14:50:00Z",
        "updatedAt": "2023-07-20T14:50:00Z",
      },
    ],
    "createdAt": "2023-07-20T15:00:00Z",
    "updatedAt": "2023-07-20T15:00:00Z",
  },
  {
    "id": "13579",
    "treasuryIdSource": "PQR321",
    "treasuryIdDestination": "ABC123",
    "type": "internal-transfer",
    "method": "cash",
    "status": "pending",
    "reference": "internal-transfer-5678",
    "issuerAccountId": "ACCOUNT4",
    "receiverAccountId": "ACCOUNT1",
    "dateIssued": "2023-08-05T11:00:00Z",
    "datePayment": "2023-08-05",
    "amount": 300,
    "currency": "GBP",
    "exchangeRate": 1.32,
    "notes": [
      {
        "text": "Transferring funds between internal accounts",
        "createdAt": "2023-08-05T11:05:00Z",
        "updatedAt": "2023-08-05T11:05:00Z",
      },
    ],
    "createdAt": "2023-08-05T11:10:00Z",
    "updatedAt": "2023-08-05T11:10:00Z",
  },
];

// i18n:

export const ALIASES = {
  id: "Transaction Id",
  treasuryIdSource: "Source Treasury Id",
  treasuryIdDestination: "Destination Treasury Id",
  type: "Type",
  method: "Method",
  status: "Status",
  reference: "Reference",
  issuerAccountId: "issuerAccountId",
  receiverAccountId: "receiverAccountId",
  dateIssued: "Issued Date",
  datePayment: "Payment Date",
  amount: "Amount",
  currency: "Currency",
  exchangeRate: "Exchange Rate",
  notes: {
    text: "Text",
    createdAt: "Created At",
    updatedAt: "Updated At",
  },
  createdAt: "Created At",
  updatedAt: "Updated At",
};
