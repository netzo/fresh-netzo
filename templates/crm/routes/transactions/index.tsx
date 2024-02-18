import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/components/blocks/table/use-table.ts";
import {
  I18N,
  type Transaction,
  transactionSchema,
} from "../../data/transactions.ts";
import { FormTransaction } from "../../islands/transactions/Form.tsx";
import { Table } from "../../islands/transactions/Table.tsx";
import { api } from "../../netzo.config.ts";

export const getTableOptions = (
  data: Transaction[],
): TableProps<Transaction, unknown>["options"] => {
  return {
    resource: "transactions",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [
      {
        column: "type",
        title: I18N.type,
        options: [...new Set(data.map((item) => item.type))].sort().map((
          value,
        ) => (value ? { label: value, value } : { label: "*no data", value })),
      },
    ],
    layouts: ["grid"],
    forms: {
      create: transactionSchema,
      update: transactionSchema,
    },
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await api.transactions.get<Transaction[]>();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table
        data={data}
        options={options}
        formCreate={FormTransaction}
      />
    </div>
  );
});
