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
  type Interaction,
  interactionSchema,
} from "../../data/interactions.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = (
  { options }: TableProps<Interaction, unknown>,
): TableProps<Interaction, unknown>["columns"] => [
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
      const props = ({
        call: {
          icon: "mdi-phone",
          text: "Call",
          className: `bg-purple hover:bg-purple bg-opacity-80 text-white`,
        },
        email: {
          icon: "mdi-email",
          text: "Email",
          className: `bg-red hover:bg-red bg-opacity-80 text-white`,
        },
        meeting: {
          icon: "mdi-account-group",
          text: "Meeting",
          className: `bg-yellow hover:bg-yellow bg-opacity-80 text-white`,
        },
        "whatsapp-msg": {
          icon: "mdi-whatsapp",
          text: "WhatsApp",
          className: `bg-green hover:bg-green bg-opacity-80 text-white`,
        },
        "livechat-msg": {
          icon: "mdi-chat",
          text: "Livechat",
          className: `bg-green hover:bg-green bg-opacity-80 text-white`,
        },
        "facebook-msg": {
          icon: "mdi-facebook",
          text: "Facebook",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        "instagram-msg": {
          icon: "mdi-instagram",
          text: "Instagram",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        "linkedin-msg": {
          icon: "mdi-linkedin",
          text: "LinkedIn",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        "twitter-msg": {
          icon: "mdi-twitter",
          text: "Twitter",
          className: `bg-blue hover:bg-blue bg-opacity-80 text-white`,
        },
        other: {
          icon: "mdi-help",
          text: "Other",
          className: `bg-gray hover:bg-gray bg-opacity-80 text-white`,
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
  props: Omit<TableProps<Interaction, unknown>, "columns">,
) {
  const columns = getColumns(props);

  const table = useTable<Interaction, unknown>({
    ...props,
    columns,
    meta: {
      forms: {
        create: interactionSchema,
        update: interactionSchema,
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
