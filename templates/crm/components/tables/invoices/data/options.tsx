import { Invoice } from "./schema.ts";
import { DataTableProps } from "@/components/tables/components/data-table.tsx";

export const aliases = {
  id: "ID",
  createdAt: "Created",
  updatedAt: "Updated",
  invoiceNumber: "Invoice No",
  description: "Description",
  dueDate: "Due date",
  status: "Status",
  subtotal: "Subtotal",
  tax: "Tax",
  total: "Total",
  accountId: "Account",
};

export const getOptions = (
  data: Invoice[],
): DataTableProps<Invoice, unknown>["options"] => {
  return {
    search: {
      column: "invoiceNumber",
      placeholder: "Search by invoice number...",
    },
    filters: [
      {
        column: "status",
        title: aliases.status,
        options: [...new Set(data.map((item) => item.status))].map((
          value,
        ) => (value
          ? { label: value, value }
          : { label: "*no data", value: undefined })
        ),
      },
    ],
    resource: "invoices",
  };
};
