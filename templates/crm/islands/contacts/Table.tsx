import {
  Table as _Table,
  type TableProps,
} from "netzo/components/blocks/table/table.tsx";
import { columns } from "@/data/contacts.columns.tsx";

type TableProps = Omit<TableProps<unknown, unknown>, "columns">;

export function Table(props: TableProps) {
  return (
    <_Table
      data={props.data}
      options={props.options}
      columns={columns as TableProps["columns"]}
    />
  );
}
