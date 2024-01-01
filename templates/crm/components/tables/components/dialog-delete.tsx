import { DataTableProps } from "@/components/tables/components/data-table.tsx";
import { Table } from "netzo/deps/@tanstack/react-table.ts";
import { TrashIcon } from "netzo/deps/@radix-ui/react-icons.ts";
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

export function DialogDelete({ options, selectedRows }: DialogDeleteProps<TData>) {
  const handleDelete = async () => {
    await Promise.all(selectedRows.map((row) => {
      const url = `/api/${options.resource}/${row.original.id}`;
      return fetch(url, { method: "DELETE" });
    }));
    window.location.reload();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="h-8 px-2 ml-3 lg:px-3"
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
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
            className="text-white bg-red-600"
            onClick={handleDelete}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
