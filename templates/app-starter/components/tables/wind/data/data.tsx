import { Wind } from "./schema.ts";
import { DataTableProps } from "@/components/tables/components/data-table.tsx";
import { data as windData } from "./data.ts";

export const getData = (): Wind[] => {
  return windData;
};

// faceted-filters: make sure to update filterFn in columns.tsx

export const getOptions = (
  data: Wind[],
): DataTableProps<Wind, unknown>["options"] => {
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
