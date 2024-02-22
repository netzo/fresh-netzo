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
import type { TableProps } from "./use-table.ts";

type TableRowActionsProps<TData> = TableProps<TData> & {
  row: Row<TData>;
  resource: string;
  idField?: string;
};

export function TableRowActions<TData>({
  table,
  resource,
  idField = "id",
  row,
}: TableRowActionsProps<TData>) {
  const onSelectOpen = () => {
    window.location.pathname = `/${resource}/${row.original[idField]}`;
  };

  const onSelectDuplicate = async () => {
    const { [idField]: _id, ...data } = row.original;
    await fetch(`/api/${resource}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    window.location.reload();
  };

  const onSelectCopyId = () => {
    navigator.clipboard.writeText(row.original[idField]);
  };

  const onClickRemove = async () => {
    await fetch(`/api/${resource}/${row.original[idField]}`, {
      method: "DELETE",
    });
    window.location.reload();
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
          <DropdownMenuItem onSelect={onSelectOpen}>
            Open
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onSelectDuplicate}>
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onSelectCopyId}>
            Copy ID
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="!text-red-500">
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete the data permanently.
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
