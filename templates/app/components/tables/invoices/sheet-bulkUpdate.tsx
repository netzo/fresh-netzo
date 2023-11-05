import { Button } from "netzo/components/ui/button.tsx";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "netzo/components/ui/sheet.tsx";
import { FormAdmin } from "@/components/tables/invoices/form-admin.tsx";
import { Invoice } from "@/components/tables/invoices/data/schema.ts";

export interface FormUpdateProps<TData> {
  selectedRows: TData[];
}

export function SheetBulkUpdate(
  { selectedRows }: FormUpdateProps<Invoice>,
) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-3 h-8 px-2 lg:px-3">
            <Pencil1Icon className="mr-2 h-4 w-4" /> Edit selected
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              Edit {selectedRows.length} rows
            </SheetTitle>
            <SheetDescription>
              <div className="text-xs text-center bg-yellow-100 bg-opacity-30 rounded-lg my-2 p-2">
                Edited fields will be applied to all selected rows.
              </div>
            </SheetDescription>
          </SheetHeader>
          <div className="">
            <div className="">
              <FormAdmin
                ids={selectedRows.map((row) => row.original.id)}
              >
              </FormAdmin>
            </div>
          </div>
          <SheetFooter>
            <div className="flex flex-col w-full mt-2">
              <SheetClose asChild>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
