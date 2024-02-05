import { z } from "zod";

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
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Transaction = z.infer<typeof transactionSchema>;

// i18n:

export const I18N = {
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
