import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Gallery } from "netzo/components/blocks/table/table.gallery.tsx";
import {
  TableColumnHeader,
  TablePagination,
  type TableProps,
  TableRowActions,
  TableToolbar,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { IconCopy } from "netzo/components/icon-copy.tsx";
import type { Contact } from "../data/contacts.ts";
import { I18N, toDateTime } from "../data/mod.ts";

export const getTableOptions = (
  data: Contact[],
): TableProps<Contact, unknown>["options"] => {
  return {
    resource: "contacts",
    fieldIds: {
      id: "id",
      name: "name",
      image: "image",
    },
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    columns: [
      {
        id: "actions",
        cell: (props) => <TableRowActions {...props} resource="contacts" />,
      },
      {
        accessorKey: "name",
        header: (props) => <TableColumnHeader {...props} title={I18N.name} />,
        cell: ({ row }) => {
          const { id, name = "", image } = row.original;
          const [first = "", last = ""] = name.split(" ");
          const initials = `${first[0]}${last[0]}`?.toUpperCase();
          return (
            <div className="flex items-center py-1">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={image} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <a
                href={`/contacts/${id}`}
                className="whitespace-nowrap text-center font-medium text-primary hover:underline"
              >
                {name}
              </a>
              <IconCopy value={id} tooltip="Copy ID" />
            </div>
          );
        },
      },
      {
        accessorKey: "accountId",
        header: (props) => (
          <TableColumnHeader {...props} title={I18N.accountId} />
        ),
        cell: ({ row }) => {
          const { accountId, account } = row.original;
          return (
            <a
              href={`/accounts/${accountId}`}
              className="whitespace-nowrap text-center font-medium text-primary hover:underline"
            >
              {account?.name ? account.name : accountId}
            </a>
          );
        },
      },
      {
        accessorKey: "phones",
        header: (props) => <TableColumnHeader {...props} title={I18N.phones} />,
        cell: ({ row }) => {
          const { phones = {} } = row.original;
          const ICONS = {
            work: "mdi-phone",
            mobile: "mdi-cellphone",
            personal: "mdi-cellphone-lock",
          } as const;
          const items = Object.entries(phones)
            .filter(([name, value]) => value)
            .map(([name, value]) => ({ name, value, className: ICONS[name] }));
          return (
            <div className="flex gap-1">
              {items.map((item, index) => (
                <a
                  key={`phone-${index}`}
                  href={`tel:${item.value}`}
                  target="_blank"
                  title={`${item.name}: ${item.value}`}
                  className={item.className}
                />
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "emails",
        header: (props) => <TableColumnHeader {...props} title={I18N.emails} />,
        cell: ({ row }) => {
          const { emails = {} } = row.original;
          const ICONS = {
            work: "mdi-email",
            personal: "mdi-email-lock",
          } as const;
          const items = Object.entries(emails)
            .filter(([name, value]) => value)
            .map(([name, value]) => ({ name, value, className: ICONS[name] }));
          return (
            <div className="flex gap-1">
              {items.map((item, index) => (
                <a
                  key={`mail-${index}`}
                  href={`mailto:${item.value}`}
                  target="_blank"
                  title={`${item.name}: ${item.value}`}
                  className={item.className}
                />
              ))}
            </div>
          );
        },
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

export function Table(props: { data: Contact[] }) {
  const options = getTableOptions(props.data);

  const table = useTable<Contact, unknown>({ ...props, options });

  return (
    <div className="space-y-4">
      <TableToolbar options={options} table={table} />
      <Gallery options={options} table={table} />
      <TablePagination table={table} />
    </div>
  );
}
