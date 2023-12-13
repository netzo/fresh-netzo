import { Button } from "netzo/components/ui/button.tsx";
import { Pencil1Icon } from "netzo/deps/@radix-ui/react-icons.ts";
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
import { FormAdmin } from "@/components/tables/clients/form-admin.tsx";
import { Client } from "@/components/tables/clients/data/schema.ts";

export interface FormUpdateProps<TData> {
  selectedRows: TData[];
}

export function SheetBulkUpdate(
  { selectedRows }: FormUpdateProps<Client>,
) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-8 px-2 ml-3 lg:px-3">
            <Pencil1Icon className="w-4 h-4 mr-2" /> Edit
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              Edit {selectedRows.length} rows
            </SheetTitle>
            <SheetDescription>
              <div className="p-2 my-2 text-xs font-semibold text-yellow-900 bg-yellow-200 rounded-lg bg-opacity-30">
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
