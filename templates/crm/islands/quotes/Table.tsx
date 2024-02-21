import { Badge } from "netzo/components/badge.tsx";
import { Grid } from "netzo/components/blocks/table/table.grid.tsx";
import {
  TableColumnHeader,
  TablePagination,
  TableRowActions,
  TableToolbar,
  useTable,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import { I18N, type Quote } from "../../data/quotes.ts";
import { toDateTime } from "../mod.ts";

export const getTableOptions = (
  data: Quote[],
): TableProps<Quote, unknown>["options"] => {
  return {
    resource: "quotes",
    search: {
      column: "quoteNumber",
      placeholder: "Search by quote number...",
    },
    filters: [
      {
        column: "status",
        title: I18N.status,
        options: [...new Set(data.map((item) => item.status))].map((
          value,
        ) => (value ? { label: value, value } : { label: "*no data", value })),
      },
    ],
    columns: [
      {
        id: "actions",
        cell: (props) => <TableRowActions {...props} resource="quotes" />,
      },
      {
        accessorKey: "id",
        header: (props) => <TableColumnHeader {...props} title={I18N.id} />,
        cell: ({ row }) => {
          const { id } = row.original;
          return (
            <div className="flex items-center">
              <a
                href={`/quotes/${id}`}
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
        accessorKey: "status",
        header: (props) => <TableColumnHeader {...props} title={I18N.status} />,
        cell: ({ row }) => {
          const { status } = row.original;
          const colors = {
            pending: "red",
            paid: "green",
            cancelled: "gray",
          };
          const background = `bg-${colors[status]}-500`;
          return status
            ? (
              <Badge
                variant="default"
                className={`${background} hover:${background} bg-opacity-80 text-white`}
              >
                {status}
              </Badge>
            )
            : <></>;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "updatedAt",
        header: (props) => (
          <TableColumnHeader {...props} title={I18N.updatedAt} />
        ),
        cell: ({ row }) => {
          const { updatedAt } = row.original;
          return <div>{toDateTime(updatedAt)}</div>;
        },
      },
    ],
  };
};

export function Table(props: TableProps<Quote, unknown>) {
  const options = getTableOptions(props.data);

  const table = useTable<Quote, unknown>({ ...props, options });

  return (
    <div className="space-y-4">
      <TableToolbar options={options} table={table} />
      <div className="border rounded-md">
        <Grid options={options} table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}
