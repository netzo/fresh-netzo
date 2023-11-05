import { DataTableProps } from "@/components/tables/components/data-table.tsx";
import { Table } from "@tanstack/react-table";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "netzo/components/ui/button.tsx";
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
} from "netzo/components/ui/alert-dialog.tsx";

interface DialogDeleteProps<TData> {
  options: DataTableProps<TData, unknown>["options"];
  selectedRows: TData[];
}

export function DialogDelete(
  { options, selectedRows }: DialogDeleteProps<TData>,
) {
  const handleDelete = async () => {
    const { db } = await import("@/db.ts"); // avoid Deno not defined in browser
    const deletePromises = selectedRows.map((row) => {
      db.remove(options.resource, row.original.id);
    });

    const deleteResult = await Promise.all(deletePromises);
    if (deleteResult) {
      window.alert("Deletion complete");
      return window.location.reload();
    } else {
      window.alert("Error");
      return;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="ml-3 h-8 px-2 lg:px-3"
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          Eliminar selección
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedRows?.length > 1
              ? <>Delete {selectedRows.length} rows</>
              : <>Delete 1 row</>}
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete the data permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white"
            onClick={handleDelete}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
