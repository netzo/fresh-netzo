import {
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Grid } from "netzo/components/blocks/table/table.grid.tsx";
import { toDateTime, toEuro } from "netzo/components/blocks/format.ts";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { Badge } from "netzo/components/badge.tsx";
import {
  I18N,
  type Transaction,
  transactionSchema,
} from "@/resources/transactions.ts";
import { CellContext } from "netzo/deps/@tanstack/react-table.ts";

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
    accessorKey: "id",
    header: (props) => <TableColumnHeader {...props} title={I18N.id} />,
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const { id } = row.original;
      return (
        <div className="flex items-center">
          <a
            href={`/invoices/${id}`}
            className="whitespace-nowrap text-center font-medium text-primary hover:underline"
          >
            {id}
          </a>
          <IconCopy value={id} tooltip="Copy ID" />
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
    accessorKey: "createdAt",
    header: (props) => <TableColumnHeader {...props} title={I18N.createdAt} />,
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <div>{toDateTime(createdAt)}</div>;
      // return <input type="date" bind:value={createdAt} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: (props) => <TableColumnHeader {...props} title={I18N.updatedAt} />,
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return <div>{toDateTime(updatedAt)}</div>;
      // return <input type="date" bind:value={updatedAt} />;
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
