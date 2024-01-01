import { DataTable } from "@/components/tables/components/data-table.tsx";
import { columns } from "@/components/tables/clients/columns.tsx";
import { SheetCreate } from "@/components/tables/clients/sheet-create.tsx";

export function Table({ data, options }) {
  return (
    <div className="h-full p-4">
      <DataTable
        columns={columns}
        data={data}
        options={options}
        SheetCreateComponent={SheetCreate}
      />
    </div>
  );
}
