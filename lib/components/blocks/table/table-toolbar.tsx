import { cn } from "../../utils.ts";
import { Button, buttonVariants } from "../../button.tsx";
import { Input } from "../../input.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../sheet.tsx";
import {
  type Table,
  TableFacetedFilter,
  TableOptions,
  type TableProps,
  TableSheet,
} from "./table.tsx";

// TODO: move out from here
import type { Account } from "@/services/accounts.ts";
import { FormAccount } from "@/islands/accounts/Form.tsx";

type TableToolbarProps<TData> = {
  table: Table<TData>;
  options: TableProps<TData, unknown>["options"];
};

export function TableToolbar<TData>({
  table,
  options,
}: TableToolbarProps<TData>) {
  const { servicePath, idField = "id" } = options;

  const isFiltered = table.getState().columnFilters.length > 0;

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

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" size="sm">Create</Button>
          </SheetTrigger>
          <SheetContent className="h-full overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
            </SheetHeader>

            <div className="py-4">
              <FormAccount
                method="POST"
                action={`/api/${servicePath}`}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Create</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
