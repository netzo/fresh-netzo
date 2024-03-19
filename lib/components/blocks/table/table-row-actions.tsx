import { Row } from "../../../deps/@tanstack/react-table.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../alert-dialog.tsx";
import { Button } from "../../button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu.tsx";
import type { UseTableOptions } from "./table.tsx";

type TableRowActionsProps<TData> = UseTableOptions<TData> & {
  row: Row<TData>;
  endpoint: string;
  idField?: string;
  actions?: ("duplicate" | "copyId" | "remove")[];
};

export function TableRowActions<TData>({
  endpoint,
  idField = "id",
  row,
  actions = ["duplicate", "copyId", "remove"],
}: TableRowActionsProps<TData>) {
  const onSelectDuplicate = async () => {
    const { [idField]: id, ...data } = row.original;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (globalThis.location.href.includes(id)) {
      // href.replaceAll to handle cases where id might be in pathname and/or search
      const href = globalThis.location.href.replaceAll(id, result.id);
      globalThis.location.href = href;
    } else globalThis.location.reload();
  };

  const onSelectCopyId = () => {
    navigator.clipboard.writeText(row.original[idField]);
  };

  const onClickRemove = async () => {
    const { [idField]: id } = row.original;
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (globalThis.location.href.includes(`/${id}`)) {
      globalThis.location.href = globalThis.location.href.replace(`/${id}`, "");
    } else globalThis.location.reload();
  };

  // NOTE: to activate the Dialog component from within ContextMenu we must
  // place it at root (see https://ui.shadcn.com/docs/components/dialog#notes)
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 mx-auto p-0 data-[state=open]:bg-muted"
          >
            <i className="mdi-dots-horizontal h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {actions.includes("duplicate") && (
            <DropdownMenuItem onSelect={onSelectDuplicate}>
              Duplicate
            </DropdownMenuItem>
          )}
          {actions.includes("copyId") && (
            <DropdownMenuItem onSelect={onSelectCopyId}>
              Copy ID
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {actions.includes("remove") && (
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="!text-red-500">
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-red-600"
            onClick={onClickRemove}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
