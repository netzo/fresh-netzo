import { Row } from "../../../deps/@tanstack/react-table.ts";
import { Button } from "../../button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu.tsx";
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

// TODO: move out from here
import type { Account } from "@/services/accounts.ts";
import { FormAccount } from "@/islands/accounts/Form.tsx";

type TableRowActionsProps<TData> = TableProps<TData> & {
  row: Row<TData>;
};

export function TableRowActions<TData>({
  table,
  options,
  row,
}: TableRowActionsProps<TData>) {
  const { servicePath, idField = "id" } = options;

  const onSelectUpdate = () => {
    window.alert("Edit");
  };

  const onSelectCreateACopy = async () => {
    const { [idField]: _id, ...data } = row.original;
    await fetch(`/api/${servicePath}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    window.location.reload();
  };

  const onClickRemove = async () => {
    await fetch(`/api/${servicePath}/${row.original[idField]}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
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
        {/* Edit */}
        <Sheet>
          <SheetTrigger asChild>
            {
              /*
            IMPORTANT: must call preventDefault() when using Sheet within DropdownMenu
            see https://github.com/radix-ui/primitives/issues/1836#issuecomment-1674338372
             */
            }
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit
            </DropdownMenuItem>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
            </SheetHeader>

            <div className="h-full overflow-y-auto py-4">
              <FormAccount
                data={row.original}
                method="PATCH"
                action={`/api${servicePath}/${row.original[idField]}`}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Create a copy */}
        <DropdownMenuItem onSelect={onSelectCreateACopy}>
          Create a copy
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="!text-red-500">
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
