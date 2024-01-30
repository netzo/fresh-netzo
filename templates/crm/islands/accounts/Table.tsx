import {
  Table as _Table,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";
import {
  renderCell,
  renderCheckboxRow,
  renderHeader,
} from "netzo/components/blocks/render.tsx";
import { toDateTime } from "netzo/components/blocks/format.ts";
import { CopyId } from "netzo/components/blocks/shared/copy-id.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { type Account, accountSchema, ALIASES } from "@/resources/accounts.ts";

// NOTE: columns must be defined in island due to client-only function serialization
export const getColumns = (_props: TableProps): TableProps["columns"] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mx-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="my-3 mr-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: renderHeader(ALIASES.name),
    cell: ({ row }) => {
      const { id, name } = row.original;
      return (
        <div className="flex">
          <a
            href={`/accounts/${id}`}
            className="whitespace-nowrap text-center font-medium text-[hsl(var(--primary))] hover:underline"
          >
            {name}
          </a>
          <CopyId id={id} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: renderHeader(ALIASES.status),
    cell: ({ row }) => {
      const { status } = row.original;
      const colors = {
        active: "black",
        inactive: "gray",
      };
      return (
        <p
          className={`text-${colors[status]}-500`}
        >
          {status}
        </p>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "type",
    header: renderHeader(ALIASES.type),
    cell: renderCell(),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "createdAt",
    header: renderHeader(ALIASES.createdAt),
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <div>{toDateTime(createdAt)}</div>;
      // return <input type="date" bind:value={createdAt} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: renderHeader(ALIASES.updatedAt),
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return <div>{toDateTime(updatedAt)}</div>;
      // return <input type="date" bind:value={updatedAt} />;
    },
  },
];

export function Table(props: Omit<TableProps<Account, unknown>, "columns">) {
  const columns = getColumns(props);
  return (
    <_Table
      data={props.data}
      options={props.options}
      columns={columns}
    />
  );
}
