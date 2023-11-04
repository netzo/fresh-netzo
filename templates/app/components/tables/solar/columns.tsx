import { IS_BROWSER } from "$fresh/runtime.ts";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "netzo/components/ui/badge.tsx";
import { Checkbox } from "netzo/components/ui/checkbox.tsx";
import { Solar } from "./data/schema.ts";
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

export const columns: ColumnDef<Solar>[] = [
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
          const baseURL = IS_BROWSER ? '' : Deno.env.get("NETZO_PROJECT")
          return (
            <a
              href={`${baseURL}.netzo.dev/solar/${id}`}
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
        accessorKey: "efficiencyPanel",
        header: renderHeader("Turbina"),
        cell: ({ row }) => {
          const { efficiencyPanel } = row.original;
          let color = "gray";
          if (efficiencyPanel < 30) color = "red";
          else if (efficiencyPanel < 60) color = "yellow";
          else if (efficiencyPanel > 90) color = "green";
          return (
            <Badge
              variant="secondary"
              className={`ml-2 bg-${color}-500 bg-opacity-50`}
            >
              {toPercent(efficiencyPanel)}
            </Badge>
          );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "efficiencyInverter",
        header: renderHeader("Generador"),
        cell: ({ row }) => {
          const { efficiencyInverter } = row.original;
          let color = "gray";
          if (efficiencyInverter < 30) color = "red";
          else if (efficiencyInverter < 60) color = "yellow";
          else if (efficiencyInverter > 90) color = "green";
          return (
            <Badge
              variant="secondary"
              className={`ml-2 bg-${color}-500 bg-opacity-50`}
            >
              {toPercent(efficiencyInverter)}
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
        accessorKey: "irradiance",
        header: renderHeader("Caudal (W/m²)"),
        cell: renderCell(),
      },
      {
        accessorKey: "powerOutput",
        header: renderHeader("Potencia (kW)"),
        cell: renderCell(),
      },
      {
        accessorKey: "temperature",
        header: renderHeader("Temperatura (C)"),
        cell: renderCell(),
      },
      {
        accessorKey: "ambientTemperature",
        header: renderHeader("Temperatura ambiente (C)"),
        cell: renderCell(),
      },
      {
        accessorKey: "shadingEffect",
        header: renderHeader("Sombreado"),
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
