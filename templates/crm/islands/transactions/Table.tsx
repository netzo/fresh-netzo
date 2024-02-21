import { Badge } from "netzo/components/badge.tsx";
import { toDateTime, toEuro } from "netzo/components/blocks/format.ts";
import { Grid } from "netzo/components/blocks/table/table.grid.tsx";
import {
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { CellContext } from "netzo/deps/@tanstack/react-table.ts";
import {
  I18N,
  type Transaction,
  transactionSchema,
} from "../../data/transactions.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = (
  { options }: TableProps<Transaction, unknown>,
): TableProps<Transaction, unknown>["columns"] => [
  {
    id: "actions",
    cell: (props) => (
      <TableRowActions {...props} options={options} data={[]} columns={[]} />
    ),
  },
  {
    accessorKey: "issuerAccountId",
    header: (props) => (
      <TableColumnHeader {...props} title={I18N.issuerAccountId} />
    ),
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const { issuerAccountId, issuerAccount } = row.original;
      return (
        <div className="flex items-center">
          <a
            href={`/accounts/${issuerAccountId}`}
            className="whitespace-nowrap text-center font-medium text-primary hover:underline"
          >
            {issuerAccount?.name ?? issuerAccountId}
          </a>
          <IconCopy value={issuerAccountId} tooltip="Copy ID" />
        </div>
      );
    },
  },
  {
    accessorKey: "receiverAccountId",
    header: (props) => (
      <TableColumnHeader {...props} title={I18N.receiverAccountId} />
    ),
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const { receiverAccountId, receiverAccount } = row.original;
      return (
        <div className="flex items-center">
          <a
            href={`/accounts/${receiverAccountId}`}
            className="whitespace-nowrap text-center font-medium text-primary hover:underline"
          >
            {receiverAccount?.name ?? receiverAccountId}
          </a>
          <IconCopy value={receiverAccountId} tooltip="Copy ID" />
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: (props) => <TableColumnHeader {...props} title={I18N.type} />,
    cell: ({ row }) => {
      const { type } = row.original;
      const props = ({
        income: {
          icon: "mdi-cash-plus",
          text: "Income",
          className: `bg-green hover:bg-green bg-opacity-80 text-white`,
        },
        expense: {
          icon: "mdi-cash-minus",
          text: "Expense",
          className: `bg-red hover:bg-red bg-opacity-80 text-white`,
        },
        "transfer": {
          icon: "mdi-cash-sync",
          text: "Transfer",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
      })?.[type];
      return props
        ? (
          <Badge variant="default" className={`${props.className}`}>
            <i className={`${props.icon} mr-1`} />
            {props.text}
          </Badge>
        )
        : null;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "amount",
    header: (props) => <TableColumnHeader {...props} title={I18N.amount} />,
    cell: ({ row }) => {
      const { amount } = row.original;
      return <div>{toEuro(amount)}</div>;
    },
  },
  {
    accessorKey: "currency",
    header: (props) => <TableColumnHeader {...props} title={I18N.currency} />,
    cell: ({ row }) => {
      const { currency } = row.original;
      return <div>{currency}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: (props) => <TableColumnHeader {...props} title={I18N.updatedAt} />,
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return <div>{toDateTime(updatedAt)}</div>;
    },
  },
];

export function Table<Transaction, TValue = unknown>(
  props: Omit<TableProps<Transaction, unknown>, "columns">,
) {
  const columns = getColumns(props);

  const table = useTable<Transaction, TValue>({
    ...props,
    columns,
    meta: {
      forms: {
        create: transactionSchema,
        update: transactionSchema,
      },
    },
  });

  return (
    <div className="space-y-4">
      <TableToolbar {...props} table={table} />
      <div className="border rounded-md">
        <Grid {...props} columns={columns} table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
