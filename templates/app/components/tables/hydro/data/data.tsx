import { Hydro } from "./schema.ts";
import { DataTableProps } from "@/components/tables/components/data-table.tsx";
import { data as hydroData } from "./data.ts";

export const getData = (): Hydro[] => {
  return hydroData;
};

// faceted-filters: make sure to update filterFn in columns.tsx

export const getOptions = (
  data: Hydro[],
): DataTableProps<Hydro, unknown>["options"] => {
  return {
    search: {
      column: "name",
      placeholder: "Filtrar por nombre...",
    },
    filters: [
      {
        column: "status",
        title: "Status",
        options: [...new Set(data.map((item) => item.status))].map((
          value,
        ) => ({ label: value, value })),
      },
    ],
    button: {
      text: "Crear reporte",
      onClick: () => {},
    },
  };
};
