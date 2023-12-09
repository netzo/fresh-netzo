import type { ColumnDef } from "netzo/deps/@tanstack/react-table.ts";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { Badge } from "netzo/components/ui/badge.tsx";
import { Invoice } from "@/components/tables/invoices/data/schema.ts";
import { CopyId } from "@/components/tables/components/copy-id.tsx";
import { aliases } from "@/components/tables/invoices/data/options.tsx";
import {
  renderCell,
  renderCellCheckbox,
  renderHeader,
  toDate,
  toDateTime,
  toEuro,
  toFixed,
  toInteger,
  toMxn,
  toPercent,
} from "@/utils.tsx";

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] mr-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "General",
    columns: [
      {
        accessorKey: "invoiceNumber",
        header: renderHeader(aliases.invoiceNumber),
        cell: ({ row }) => {
          const { id, invoiceNumber } = row.original;
          return (
            <div className="flex">
              <a
                href={`/invoices/${id}`}
                className="whitespace-nowrap text-center font-medium text-blue-500 hover:text-blue-600 hover:underline"
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
        header: renderHeader(aliases.status),
        cell: ({ row }) => {
          const { status } = row.original;
          const colors = {
            pending: "red",
            paid: "blue",
            cancelled: "gray",
          };
          return status
            ? (
              <Badge
                variant="outline"
                className={`bg-${colors[status]}-500 bg-opacity-80 text-white`}
              >
                {status}
              </Badge>
            )
            : <></>;
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "description",
        header: renderHeader(aliases.description),
        cell: renderCell(),
      },
      {
        accessorKey: "dueDate",
        header: renderHeader(aliases.dueDate),
        cell: ({ row }) => {
          const { dueDate } = row.original;
          return <div>{dueDate ? toDate(dueDate) : undefined}</div>;
        },
      },
      {
        accessorKey: "clientId",
        header: renderHeader(aliases.clientId),
        cell: ({ row }) => {
          const { clientId, client } = row.original;
          return (
            <a
              href={`/clients/${clientId}`}
              target="_blank"
              className="whitespace-nowrap text-center font-medium text-blue-500 hover:text-blue-600 hover:underline"
            >
              {client?.name ? client.name : clientId}
            </a>
          );
        },
      },
    ],
  },
  {
    header: "Amount",
    columns: [
      {
        accessorKey: "subtotal",
        header: renderHeader(aliases.subtotal),
        cell: renderCell(),
      },
      {
        accessorKey: "tax",
        header: renderHeader(aliases.tax),
        cell: renderCell(),
      },
      {
        accessorKey: "total",
        header: renderHeader(aliases.total),
        cell: renderCell(),
      },
    ],
  },
  {
    header: "Other",
    columns: [
      {
        accessorKey: "createdAt",
        header: renderHeader(aliases.createdAt),
        cell: ({ row }) => {
          const { createdAt } = row.original;
          return <div>{toDateTime(createdAt)}</div>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: renderHeader(aliases.updatedAt),
        cell: ({ row }) => {
          const { updatedAt } = row.original;
          return <div>{toDateTime(updatedAt)}</div>;
        },
      },
    ],
  },
];
