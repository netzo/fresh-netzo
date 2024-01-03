import type { ColumnDef } from "netzo/deps/@tanstack/react-table.ts";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { Account } from "@/data/accounts.schema.ts";
import { CopyId } from "@/components/tables/copy-id.tsx";
import { aliases } from "@/data/accounts.options.tsx";
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

export const columns: ColumnDef<Account>[] = [
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
        className="mr-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "General",
    columns: [
      {
        accessorKey: "name",
        header: renderHeader(aliases.name),
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
        header: renderHeader(aliases.status),
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
        header: renderHeader(aliases.type),
        cell: renderCell(),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
    ],
  },
  {
    header: "Contact",
    columns: [
      {
        accessorKey: "phone",
        header: renderHeader(aliases.phone),
        cell: renderCell(),
      },
      {
        accessorKey: "web",
        header: renderHeader(aliases.web),
        cell: renderCell(),
      },
    ],
  },
  {
    header: "Address",
    columns: [
      {
        accessorKey: "address.streetAddress",
        header: renderHeader(aliases.address.streetAddress),
        cell: renderCell(),
      },
      {
        accessorKey: "address.number",
        header: renderHeader(aliases.address.number),
        cell: renderCell(),
      },
      {
        accessorKey: "address.city",
        header: renderHeader(aliases.address.city),
        cell: renderCell(),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "address.postCode",
        header: renderHeader(aliases.address.postCode),
        cell: renderCell(),
      },
    ],
  },
  {
    header: "Notificaciones",
    columns: [
      {
        accessorKey: "notifications.payments",
        header: renderHeader(aliases.notifications.payments),
        cell: renderCellCheckbox(),
      },
      {
        accessorKey: "notifications.invoices",
        header: renderHeader(aliases.notifications.invoices),
        cell: renderCellCheckbox(),
      },
      {
        accessorKey: "notifications.promotions",
        header: renderHeader(aliases.notifications.promotions),
        cell: renderCellCheckbox(),
      },
      {
        accessorKey: "notifications.marketing",
        header: renderHeader(aliases.notifications.marketing),
        cell: renderCellCheckbox(),
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
