import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "netzo/components/ui/badge.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { Hydro } from "./data/schema.ts";
import { DataTableRowActions } from "@/components/tables/components/data-table-row-actions.tsx";
import {
  renderCell,
  renderCellCheckbox,
  renderHeader,
  toDate,
  toEuro,
  toFixed,
  toInteger,
  toMxn,
  toPercent,
} from "@/utils.tsx";

export const columns: ColumnDef<Hydro>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
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
    header: "Operación",
    columns: [
      {
        accessorKey: "status",
        header: renderHeader("Status"),
        cell: ({ row }) => {
          const { status } = row.original;
          const colors = {
            operational: "green",
            maintenance: "gray",
            offline: "red",
          };
          return (
            <Badge
              variant="secondary"
              className={`ml-2 bg-${colors[status]}-500 bg-opacity-50`}
            >
              {status}
            </Badge>
          );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
    ],
  },
  {
    header: "Detalles",
    columns: [
      {
        accessorKey: "name",
        header: renderHeader("Nombre"),
        cell: ({ row }) => {
          const { id, name } = row.original;
          return (
            <a
              href={`https://${Deno.env.get('NETZO_PROJECT')}.netzo.dev/hydro/${id}`}
              target="_blank"
              className="text-center font-medium text-blue-500 hover:text-blue-600 hover:underline"
            >
              {name ?? id}
            </a>
          );
        },
      },
      {
        accessorKey: "id",
        header: renderHeader("ID"),
        cell: renderCell(),
      },
      // {
      //   accessorKey: "timestamp",
      //   header: renderHeader("Tiempo"),
      //   cell: renderCell(),
      // },
    ],
  },
  {
    header: "Eficiencia",
    columns: [
      {
        accessorKey: "efficiencyTurbine",
        header: renderHeader("Turbina"),
        cell: ({ row }) => {
          const { efficiencyTurbine } = row.original;
          let color = "gray";
          if (efficiencyTurbine < 30) color = "red";
          else if (efficiencyTurbine < 60) color = "yellow";
          else if (efficiencyTurbine > 90) color = "green";
          return (
            <Badge
              variant="secondary"
              className={`ml-2 bg-${color}-500 bg-opacity-50`}
            >
              {toPercent(efficiencyTurbine)}
            </Badge>
          );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "efficiencyGenerator",
        header: renderHeader("Generador"),
        cell: ({ row }) => {
          const { efficiencyGenerator } = row.original;
          let color = "gray";
          if (efficiencyGenerator < 30) color = "red";
          else if (efficiencyGenerator < 60) color = "yellow";
          else if (efficiencyGenerator > 90) color = "green";
          return (
            <Badge
              variant="secondary"
              className={`ml-2 bg-${color}-500 bg-opacity-50`}
            >
              {toPercent(efficiencyGenerator)}
            </Badge>
          );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
    ],
  },
  {
    header: "Mediciones",
    columns: [
      {
        accessorKey: "waterFlowRate",
        header: renderHeader("Caudal (m³/s)"),
        cell: renderCell(),
      },
      {
        accessorKey: "powerOutput",
        header: renderHeader("Potencia (kW)"),
        cell: renderCell(),
      },
      {
        accessorKey: "waterLevel",
        header: renderHeader("Nivel agua (m)"),
        cell: renderCell(),
      },
      {
        accessorKey: "inletPressure",
        header: renderHeader("Presión entrada (Pa)"),
        cell: renderCell(),
      },
      {
        accessorKey: "outletPressure",
        header: renderHeader("Presión salida (Pa)"),
        cell: renderCell(),
      },
    ],
  },
  {
    header: "Coordenadas",
    columns: [
      {
        accessorKey: "latitude",
        header: renderHeader("Latitud"),
        cell: renderCell(),
      },
      {
        accessorKey: "longitude",
        header: renderHeader("Longitud"),
        cell: renderCell(),
      },
    ],
  },
];
