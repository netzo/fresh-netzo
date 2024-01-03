import { DataTable } from "@/components/tables/components/data-table.tsx";
import { columns } from "@/components/tables/activities/columns.tsx";

export function Table({ data, options }) {
  return (
    <div className="h-full p-4">
      <DataTable
        columns={columns}
        data={data}
        options={options}
      />
    </div>
  );
}
