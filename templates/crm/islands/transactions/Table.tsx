import {
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { Grid } from "netzo/components/blocks/table/table.grid.tsx";
import { toDateTime } from "netzo/components/blocks/format.ts";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { Badge } from "netzo/components/badge.tsx";
import {
  I18N,
  type Transaction,
  transactionSchema,
} from "@/resources/transactions.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = ({ options }: TableProps): TableProps["columns"] => [
  {
    id: "actions",
    cell: (props) => <TableRowActions {...props} options={options} />,
  },
  {
    accessorKey: "id",
    header: (props) => <TableColumnHeader {...props} title={I18N.id} />,
    cell: ({ row }) => {
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
      const colors = {
        prospect: "yellow",
        customer: "green",
        supplier: "red",
        partner: "blue",
        other: "gray",
      };
      const background = `bg-${colors[type]}-500`;
      return type
        ? (
          <Badge
            variant="default"
            className={`${background} hover:${background} bg-opacity-80 text-white`}
          >
            {type}
          </Badge>
        )
        : <></>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
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

export function Table(
  props: Omit<TableProps<Transaction, unknown>, "columns">,
) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({
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
