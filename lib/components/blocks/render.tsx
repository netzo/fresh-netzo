import { _get } from "../../deps/lodash.get.ts";
import { cn } from "../utils.ts";
import { Checkbox } from "../ui/checkbox.tsx";
import { TableColumnHeader } from "./table/table-column-header.tsx";

export const renderHeader = (title: string) => ({ column }) => {
  return <TableColumnHeader column={column} title={title} />;
};

export const renderCell =
  (formatter = (v: unknown) => v) => ({ column, row }) => {
    const value = _get(row.original, column.id.replaceAll("_", "."));
    const isNegativeNumber = typeof value === "number" && value < 0;
    const onKeyPress = (e: JSX.KeyboardEvent<HTMLDivElement>) => {
      if (["Enter"].includes(event.key)) {
        e.preventDefault();
        e.target.blur();
      }
    };
    return (
      <div
        contenteditable
        onKeyPress={onKeyPress}
        className={cn(
          "w-max",
          isNegativeNumber ? `text-left text-red7` : "text-left",
        )}
      >
        {formatter(value)}
      </div>
    );
  };

export const renderCheckboxRow = () => ({ column, row }) => {
  const stringValue = _get(row.original, column.id.replaceAll("_", "."));
  const value = ["TRUE", "true", true].includes(stringValue)
    ? true
    : ["FALSE", "false", false].includes(stringValue)
    ? false
    : undefined;
  return (
    <Checkbox
      checked={value}
      disabled={true}
      aria-label="Select row"
    />
  );
};

export const renderCheckbox = (value: string | boolean) => {
  if (typeof value === "boolean") {
    return value;
  } else {
    const boolValue = ["TRUE", "true"].includes(value)
      ? true
      : ["FALSE", "false"].includes(value)
      ? false
      : undefined;
    return boolValue;
  }
};
