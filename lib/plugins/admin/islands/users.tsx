import { type UserAccessPermission } from "@/components/mod.tsx";
import { type $User } from "@/database/schema.ts";
import { useTableUtils } from "@/utils/mod.ts";
import { useSignal } from "@preact/signals";
import { Avatar, AvatarFallback, AvatarImage } from "netzo/components/avatar.tsx";
import {
  TableActionsReload,
  TableColumnHeader,
  TableFilters,
  TablePagination,
  TableSearch,
  TableView,
  TableViewOptions,
  useTable,
} from "netzo/components/blocks/table/table.tsx";
import { ScrollArea, ScrollBar } from "netzo/components/scroll-area.tsx";
import { useState } from "preact/hooks";

export function Card$Users({ $users, permissions }: {
  $users: $User[];
  permissions: UserAccessPermission[];
}) {
  // table requires useState for data (useSignal/signal not supported)
  const [data, setData] = useState<$User[]>($users ?? []);
  const active = useSignal<$User>({});

  const {
    create,
    update,
    duplicate,
    remove,
    copyId,
    downloadDataAsCsv,
    downloadTemplateAsCsv,
  } = useTableUtils<$User>({
    endpoint: "/database/$users",
    data,
    setData,
    active,
    getDefault: () => ({}),
  });

  type PermissionsArray = {
    value: string;
    label: string;
  };

  const createPermissionColumns = (props: { permissions: PermissionsArray[] }) => {
    return props.permissions.map((permission) => {
      const accessorKey = permission.value;
      const title = permission.label;

      return {
        accessorKey: accessorKey,
        title: title,
        header: (props) => <TableColumnHeader {...props} />,
        cell: ({ row }) => {
          const { data } = row.original;
          const access = data.permissions?.includes(permission.value) ?? false;
          return (
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={access}
                disabled={true}
                className="form-checkbox h-4 w-4 text-primary-500"
              />
            </div>
          );
        },
      };
    });
  };

  const routeLevelPermissions: PermissionsArray[] = [
    {
      value: "routes_deals",
      label: "Negocios",
    },
    {
      value: "routes_deal",
      label: "Negocio",
    },
    {
      value: "routes_activities",
      label: "Actividades",
    },
    {
      value: "routes_inquiries",
      label: "Solicitudes",
    },
    {
      value: "routes_accounts",
      label: "Cuentas",
    },
    {
      value: "routes_account",
      label: "Cuenta",
    },
    {
      value: "routes_contacts",
      label: "Contactos",
    },
    {
      value: "routes_contact",
      label: "Contacto",
    },
    {
      value: "routes_quotes",
      label: "Cotizaciones",
    },
    {
      value: "routes_cfdis",
      label: "CFDIs",
    },
    {
      value: "routes_work_orders",
      label: "Ordenes de trabajo",
    },
    {
      value: "routes_settings",
      label: "Ajustes",
    },
  ];

  const operationPermissions: PermissionsArray[] = [
    {
      value: "crud_create",
      label: "Crear",
    },
    {
      value: "crud_update",
      label: "Actualizar",
    },
    {
      value: "crud_delete",
      label: "Eliminar",
    },
    {
      value: "systems_sync_invoices",
      label: "Sincronizar facturas",
    },
    {
      value: "data_download",
      label: "Descargar",
    },
  ];

  const routePermissions = createPermissionColumns({
    permissions: routeLevelPermissions,
  });

  const operationPermissionsColumns = createPermissionColumns({
    permissions: operationPermissions,
  });

  const table = useTable<$User>({
    data,
    columns: [
      {
        accessorKey: "name",
        title: "Nombre",
        header: (props) => <TableColumnHeader {...props} />,
        cell: ({ row }) => {
          const { id, name = "", avatar } = row.original;
          return (
            <div className="flex items-center p-1">
              <Avatar className="h-7 w-7 mr-3">
                <AvatarImage src={avatar} />
                <AvatarFallback>{name?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="w-max">{name?.toUpperCase()}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        title: "Email",
        header: (props) => <TableColumnHeader {...props} />,
        cell: ({ row }) => {
          const { email = "" } = row.original;
          if (!email) return null;
          return (
            <div className="flex items-center p-1">
              <a
                href={`mailto:${email}`}
                target="_blank"
                className="w-max text-blue-500 underline"
              >
                {email?.toLowerCase()}
              </a>
            </div>
          );
        },
      },
      {
        header: "Acceso a rutas",
        columns: [
          ...routePermissions,
        ],
      },
      {
        header: "Operaciones permitidas (CRUD)",
        columns: [
          ...operationPermissionsColumns,
        ],
      },
    ],
    // NOTE: columnVisibility, search, sorting, and filters use table.getColumn() and MUST
    // reference nested columns with underscore syntax (e.g. "data.name" is "data_name")
    initialState: {
      search: {
        column: "name",
        placeholder: "Filtrar por nombre...",
      },

      sorting: [
        { id: "name", desc: false },
      ],
      filters: [],
    },
    meta: {
      setData,
      create,
      update,
      remove,
      duplicate,
      copyId,
      downloadDataAsCsv,
      downloadTemplateAsCsv,
    },
  });

  return (
    <div className="grid grid-rows-[min-content_auto_min-content] h-full overflow-x-auto">
      <header className="grid gap-2 p-4">
        <div className="flex items-center justify-between gap-2 py-1 overflow-x-auto">
          <div className="flex items-center flex-1 space-x-2">
            <TableActionsReload table={table} />
            <TableSearch table={table} />
            <TableFilters table={table} />
          </div>
          <div className="flex items-center space-x-2">
            <TableViewOptions table={table} />
          </div>
        </div>
      </header>
      <div className="border rounded-md overflow-x-auto mx-2">
        <ScrollArea
          style={{
            display: "grid",
            width: "100%",
            height: "calc(100vh - 200px)",
          }}
        >
          <TableView table={table} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <footer className="flex items-center justify-between p-4">
        <TablePagination table={table} />
      </footer>
    </div>
  );
}
