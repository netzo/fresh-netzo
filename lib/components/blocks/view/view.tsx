import { ViewPagination } from "../view/view-pagination.tsx";
import { ViewToolbar } from "../view/view-toolbar.tsx";
import { Table } from "../table/table.tsx";
import { useView, type ViewProps } from "../../../composables/use-view.ts";
import { layout } from "./view-options.tsx";

export function View<TData, TValue>({
  data,
  options,
  columns,
}: ViewProps<TData, TValue>) {
  const view = useView<TData, TValue>({ data, options, columns });

  return (
    <div className="space-y-4">
      <ViewToolbar
        table={view}
        options={options}
      />
      <div className="border rounded-md">
        {[
          "table".includes(layout.value) && (
            <Table
              table={view}
              data={data}
              options={options}
              columns={columns}
            />
          ),
        ]}
      </div>
      <ViewPagination table={view} />
    </div>
  );
}
