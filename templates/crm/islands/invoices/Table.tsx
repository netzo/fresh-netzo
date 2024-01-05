import {
  DataTable,
  type DataTableProps,
} from "netzo/components/blocks/table/data-table.tsx";
import { columns } from "@/data/invoices.columns.tsx";

type TableProps = Omit<DataTableProps<unknown, unknown>, "columns">;

export function Table(props: TableProps) {
  return (
    <DataTable
      data={props.data}
      options={props.options}
      columns={columns as DataTableProps["columns"]}
    />
  );
}
