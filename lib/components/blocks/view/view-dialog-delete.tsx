import type { ViewProps } from "../../../composables/use-view.ts";
import { Button } from "../../ui/button.tsx";
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
} from "../../ui/alert-dialog.tsx";

type ViewDialogDeleteProps<TData> = {
  options: ViewProps<TData, unknown>["options"];
  selectedRows: TData[];
};

export function ViewDialogDelete(
  { options, selectedRows }: ViewDialogDeleteProps<TData>,
) {
  const handleDelete = async () => {
    await Promise.all(selectedRows.map((row) => {
      const url = `/api/${options.servicePath}/${row.original.id}`;
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
          <i className="mdi-delete w-4 h-4 mr-2" />
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
