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
  resource: string;
  idField?: string;
  actions?: ("open" | "duplicate" | "copyId" | "remove")[];
};

export function TableRowActions<TData>({
  resource,
  idField = "id",
  row,
  actions = ["open", "duplicate", "copyId", "remove"],
}: TableRowActionsProps<TData>) {
  const onSelectOpen = () => {
    globalThis.location.pathname = `/${resource}/${row.original[idField]}`;
  };

  const onSelectDuplicate = async () => {
    const { [idField]: _id, ...data } = row.original;
    await fetch(`/api/${resource}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    globalThis.location.reload();
  };

  const onSelectCopyId = () => {
    navigator.clipboard.writeText(row.original[idField]);
  };

  const onClickRemove = async () => {
    await fetch(`/api/${resource}/${row.original[idField]}`, {
      method: "DELETE",
    });
    globalThis.location.pathname = `/${resource}`;
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
          {actions.includes("open") && (
            <DropdownMenuItem onSelect={onSelectOpen}>
              Open
            </DropdownMenuItem>
          )}
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
