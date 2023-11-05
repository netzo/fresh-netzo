import { DataTable } from "@/components/tables/components/data-table.tsx";
import { columns } from "@/components/tables/invoices/columns.tsx";
import { SheetCreate } from "@/components/tables/invoices/sheet-create.tsx";
import { SheetBulkUpdate } from "@/components/tables/invoices/sheet-bulkUpdate.tsx";
import { FormAdmin } from "@/components/tables/invoices/form-admin.tsx";

export function Table({ data, options }) {
  return (
    <div className="overflow-x-auto p-4">
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
    <div className="ml-10 mt-5 mb-10">
      <div className="grid grid-cols-3 items-center gap-4">
        <div>
          <h1 className="text-lg font-medium">Edit</h1>
          <div className="text-xs text-center bg-yellow-100 bg-opacity-30 rounded-lg my-2 p-2">
            This action will replace all the data in the row, possibly with
            empty values.
          </div>
          <FormAdmin data={data} />
        </div>
      </div>
    </div>
  );
}
