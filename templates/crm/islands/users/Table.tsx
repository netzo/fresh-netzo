import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "netzo/components/avatar.tsx";
import { Badge } from "netzo/components/badge.tsx";
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
import { I18N, type User } from "../../data/users.ts";
// import { emailSchema } from "../../data/utils/global.types.ts";

// NOTE: define columns in island (route to island function serialization unsupported)
export const getColumns = ({ options }: TableProps): TableProps["columns"] => [
  {
    id: "actions",
    cell: (props) => <TableRowActions {...props} options={options} />,
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
          {name}
          <IconCopy value={id} tooltip="Copy ID" />
        </div>
      );
    },
  },
  {
    accessorKey: "userInfo_position",
    header: (props) => (
      <TableColumnHeader {...props} title={I18N.userInfo.position} />
    ),
    cell: ({ row }) => {
      const { userInfo } = row.original as User;

      return userInfo.position
        ? (
          <div className="flex">
            <i className="mdi-account-tie-outline mr-2"></i>
            {userInfo.position}
          </div>
        )
        : <></>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "userInfo_office",
    header: (props) => (
      <TableColumnHeader {...props} title={I18N.userInfo.office} />
    ),
    cell: ({ row }) => {
      const { userInfo } = row.original as User;

      return userInfo.office
        ? (
          <div className="flex">
            <i className="mdi-map-marker-outline mr-2"></i>
            {userInfo.office}
          </div>
        )
        : <></>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "department",
    header: (props) => (
      <TableColumnHeader {...props} title={I18N.department.label} />
    ),
    cell: ({ row }) => {
      const { department, userInfo } = row.original as User;
      const departmentColors = {
        sales: "green",
        marketing: "yellow",
        management: "blue",
        finance: "red",
        hr: "purple",
        legal: "pink",
        operations: "indigo",
        productAndEngineering: "cyan",
        customerSuccess: "teal",
      };
      const seniorityColors = {
        entry: "gray",
        junior: "green",
        mid: "yellow",
        senior: "red",
        manager: "blue",
        executive: "purple",
      };

      const departmentBackground = departmentColors[department] !== undefined
        ? `bg-${departmentColors[department]}-500`
        : "bg-gray-500";
      const seniorityBackground =
        seniorityColors[userInfo.seniority] !== undefined
          ? `bg-${seniorityColors[userInfo.seniority]}-500`
          : "bg-gray-500";

      return department
        ? (
          <div className="flex">
            <i className="mdi-information-outline mr-2"></i>
            <Badge
              variant="default"
              className={`${departmentBackground} hover:${departmentBackground} bg-opacity-80 text-white`}
              style={{ marginRight: "0.5rem" }} // Add some space between badges
            >
              {I18N.department[department]}
            </Badge>
            <Badge
              variant="default"
              className={`${seniorityBackground} hover:${seniorityBackground} bg-opacity-80 text-white`}
            >
              {I18N.userInfo.seniority[userInfo.seniority]}
            </Badge>
          </div>
        )
        : <></>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "emails",
    header: (props) => <TableColumnHeader {...props} title={I18N.emails} />,
    cell: ({ row }) => {
      const { emails } = row.original;
      const workEmail = emails
        ? emails.find((email) => email.type === "work")
        : null;
      const personalEmail = emails
        ? emails.find((email) => email.type === "personal")
        : null;
      const otherEmail = emails
        ? emails.find((email) => email.type === "other")
        : null;

      return (
        <div className="grid grid-cols-1 items-center text-xs">
          {emails &&
            emails.map((email) => (
              <div key={email.value} className="flex items-center">
                <a
                  href={`mailto:${email?.value}`}
                  title={email.name}
                  className="flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ml-2 text-blue hover:underline">
                    {email.value}
                  </span>
                </a>
              </div>
            ))}
        </div>
      );
    },
  },
];

export function Table(props: Omit<TableProps<User, unknown>, "columns">) {
  const columns = getColumns(props);

  const table = useTable<TData, TValue>({ ...props, columns });

  return (
    <div className="space-y-4">
      <TableToolbar {...props} table={table} />
      <Gallery {...props} columns={columns} table={table} />
      <TablePagination table={table} />
    </div>
  );
}
