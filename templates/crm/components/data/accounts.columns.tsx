import type { ColumnDef } from "netzo/deps/@tanstack/react-table.ts";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { Account } from "@/components/data/accounts.ts";
import { CopyId } from "netzo/components/blocks/shared/copy-id.tsx";
import { ALIASES } from "@/components/data/accounts.ts";
import { Button } from "netzo/components/ui/button.tsx";
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
    ],
  },
  {
    header: "Contact",
    columns: [
      {
        accessorKey: "phone",
        header: renderHeader(ALIASES.phone),
        cell: renderCell(),
      },
      {
        accessorKey: "web",
        header: renderHeader(ALIASES.web),
        cell: renderCell(),
      },
    ],
  },
  {
    header: "Address",
    columns: [
      {
        accessorKey: "address.streetAddress",
        header: renderHeader(ALIASES.address.streetAddress),
        cell: renderCell(),
      },
      {
        accessorKey: "address.number",
        header: renderHeader(ALIASES.address.number),
        cell: renderCell(),
      },
      {
        accessorKey: "address.city",
        header: renderHeader(ALIASES.address.city),
        cell: renderCell(),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "address.postCode",
        header: renderHeader(ALIASES.address.postCode),
        cell: renderCell(),
      },
    ],
  },
  {
    header: "Notificaciones",
    columns: [
      {
        accessorKey: "notifications.payments",
        header: renderHeader(ALIASES.notifications.payments),
        cell: renderCellCheckbox(),
      },
      {
        accessorKey: "notifications.invoices",
        header: renderHeader(ALIASES.notifications.invoices),
        cell: renderCellCheckbox(),
      },
      {
        accessorKey: "notifications.promotions",
        header: renderHeader(ALIASES.notifications.promotions),
        cell: renderCellCheckbox(),
      },
      {
        accessorKey: "notifications.marketing",
        header: renderHeader(ALIASES.notifications.marketing),
        cell: renderCellCheckbox(),
      },
    ],
  },
  {
    header: "Other",
    columns: [
      {
        accessorKey: "createdAt",
        header: renderHeader(ALIASES.createdAt),
        cell: ({ row }) => {
          const { createdAt } = row.original;
          return <div>{toDateTime(createdAt)}</div>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: renderHeader(ALIASES.updatedAt),
        cell: ({ row }) => {
          const { updatedAt } = row.original;
          return <div>{toDateTime(updatedAt)}</div>;
        },
      },
    ],
  },
];
