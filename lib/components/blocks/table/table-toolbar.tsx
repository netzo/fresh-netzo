import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import { Button } from "../../button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../dialog.tsx";
import { Input } from "../../input.tsx";
import { Label } from "../../label.tsx";
import { TableFacetedFilter, TableOptions, type TableProps } from "./table.tsx";

type TableToolbarProps<TData> = {
  table: Table<TData>;
  options: TableProps<TData, unknown>["options"];
  children?: ComponentChildren;
};

export function TableToolbar<TData>({
  table,
  options,
  ...props
}: TableToolbarProps<TData>) {
  const { resource, idField = "id" } = options;

  const isFiltered = table.getState().columnFilters.length > 0;

  const data = useSignal({ name: "" });

  const onClickCreate = async () => {
    const response = await fetch(`/api/${resource}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data.value),
    });
    if (response.ok) {
      const data = await response.json();
      window.location.href = `/${resource}/${data[idField]}`;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="h-8 px-2 lg:px-3"
        >
          <i className="mdi-reload w-4 h-4" />
        </Button>
        {options.search && (
          <Input
            placeholder={options.search.placeholder}
            value={(table.getColumn(options.search.column)
              ?.getFilterValue() as string) ?? ""}
            onChange={(invoice) =>
              table.getColumn(options.search.column)?.setFilterValue(
                invoice.target.value,
              )}
            className="h-8 w-[150px] lg:w-[250px]"
            autocomplete="off"
          />
        )}

        {options.filters?.map(({ column, title, options }) =>
          table.getColumn(column) && (
            <TableFacetedFilter
              column={table.getColumn(column)}
              title={title}
              options={options}
            />
          )
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <i className="mdi-close w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <TableOptions table={table} />

        {props.children ?? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="ml-2">Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="text-left">
                <DialogTitle>Create New</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={data.value.name}
                    onInput={(e) => data.value.name = e.target.value}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={onClickCreate}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
