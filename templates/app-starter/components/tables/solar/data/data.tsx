import { Solar } from "./schema.ts";
import { DataTableProps } from "@/components/tables/components/data-table.tsx";
import { data as solarData } from "./data.ts";

export const getData = (): Solar[] => {
  return solarData;
};

// faceted-filters: make sure to update filterFn in columns.tsx

export const getOptions = (
  data: Solar[],
): DataTableProps<Solar, unknown>["options"] => {
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
