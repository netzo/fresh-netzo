import type { JSX } from "preact";
import type { Table } from "../../../deps/@tanstack/react-table.ts";
import { Button } from "../../button.tsx";
import { cn } from "../../utils.ts";

export function TableActionsReload<TData = unknown>({
  className,
  table,
}: JSX.IntrinsicElements["button"] & { table: Table<TData> }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.location.reload()}
      className={cn("h-8 px-2 lg:px-3", className)}
    >
      <i className="mdi-reload w-4 h-4" />
    </Button>
  );
}
