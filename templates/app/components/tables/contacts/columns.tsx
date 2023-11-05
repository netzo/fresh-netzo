import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { Contact } from "@/components/tables/contacts/data/schema.ts";
import { CopyId } from "@/components/tables/components/copy-id.tsx";
import { aliases } from "@/components/tables/contacts/data/options.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/ui/avatar.tsx";

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

export const columns: ColumnDef<Contact>[] = [
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
        accessorKey: "avatar",
        header: renderHeader(aliases.avatar),
        cell: ({ row }) => {
          const { name, avatar } = row.original;
          const [first, last] = name.split(" ");
          const initials = `${first[0]}${last[0]}`?.toUpperCase();
          return (
            <Avatar className="h-9 w-9">
              <AvatarImage src={avatar} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          );
        },
      },
      {
        accessorKey: "name",
        header: renderHeader(aliases.name),
        cell: ({ row }) => {
          const { id, name } = row.original;
          return (
            <div className="flex">
              <a
                href={`/contacts/${id}`}
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
    header: "Contact",
    columns: [
      {
        accessorKey: "email",
        header: renderHeader(aliases.email),
        cell: renderCell(),
      },
      {
        accessorKey: "phone",
        header: renderHeader(aliases.phone),
        cell: renderCell(),
      },
    ],
  },
  {
    header: "Notificaciones",
    columns: [
      {
        accessorKey: "notifications.new",
        header: renderHeader(aliases.notifications.new),
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
