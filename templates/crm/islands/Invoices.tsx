import { DataTable } from "@/components/tables/components/data-table.tsx";
import { columns } from "@/components/tables/invoices/columns.tsx";
import { SheetCreate } from "@/components/tables/invoices/sheet-create.tsx";
import { SheetBulkUpdate } from "@/components/tables/invoices/sheet-bulkUpdate.tsx";
import { FormAdmin } from "@/components/tables/invoices/form-admin.tsx";

export function Table({ data, options }) {
  return (
    <div className="h-full p-4">
      <DataTable
        columns={columns}
        data={data}
        options={options}
        SheetCreateComponent={SheetCreate}
        SheetBulkUpdateComponent={SheetBulkUpdate}
      />
    </div>
  );
}

export function EditForm({ data }) {
  return (
    <div className="ml-10 mt-5 mb-10 max-w-500px">
      <h1 className="text-lg font-medium">Edit</h1>
      <div className="text-xs font-semibold text-yellow-900 bg-yellow-200 bg-opacity-30 rounded-lg my-2 p-2">
        Warning: this action is not reversible.
      </div>
      <FormAdmin data={data} />
    </div>
  );
}
