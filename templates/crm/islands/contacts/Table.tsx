import { DataTable } from "@/components/tables/data-table.tsx";
import { columns } from "@/data/contacts.columns.tsx";

export function Table({ data, options }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      options={options}
    />
  );
}
