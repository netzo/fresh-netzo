import { type JSX } from "preact";
import { _get } from "../../../deps/lodash.get.ts";
import { Column } from "../../../deps/@tanstack/react-table.ts";
import { cn } from "../../utils.ts";
import { Button } from "../../button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../dropdown-menu.tsx";

type TableColumnCellProps<TData, TValue> =
  & JSX.HTMLAttributes<HTMLDivElement>
  & {
    column: Column<TData, TValue>;
    title: string;
    render: (v: unknown) => JSX.ComponentChildren;
  };

export function TableColumnCell<TData, TValue>({
  row,
  column,
  className,
  render = (v: unknown) => v,
}: TableColumnCellProps<TData, TValue>) {
  const value = _get(row.original, column.id.replaceAll("_", "."));
  const isNegativeNumber = typeof value === "number" && value < 0;
  // const onKeyPress = async (e: JSX.KeyboardEvent<HTMLDivElement>) => {
  //   if (!IS_BROWSER) return;
  //   if (["Enter"].includes(event.key)) {
  //     e.preventDefault();
  //     e.target.blur();
  //     const value = e.target.textContent;
  //     console.log(value);
  //     const url = new URL(`/`, window.location.origin);
  //     const response = await fetch();
  //   }
  // };

  return (
    <div
      // contenteditable
      // onKeyPress={onKeyPress}
      className={cn(
        "w-max",
        isNegativeNumber ? `text-left text-red7` : "text-left",
      )}
    >
      {render(value) as ComponentChildren}
    </div>
  );
}

export function TableColumnCellCheckbox<TData, TValue>({
  row,
  column,
  className,
}: TableColumnCellProps<TData, TValue>) {
  const stringValue = _get(row.original, column.id.replaceAll("_", "."));
  const value = ["TRUE", "true", true].includes(stringValue)
    ? true
    : ["FALSE", "false", false].includes(stringValue)
    ? false
    : undefined;
  return (
    // WORKAROUND: add "ml-8" to somewhat center checkbox since
    // cannot center using "text-center" nor "mx-auto" on checkbox
    <Checkbox
      checked={value}
      disabled={true}
      aria-label="Select row"
      className="flex mx-auto my-2"
    />
  );
}
