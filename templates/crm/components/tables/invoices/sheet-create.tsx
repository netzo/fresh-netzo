import { Button } from "netzo/components/ui/button.tsx";
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
import { FormInvoice } from "@/islands/invoices/Form.tsx";

export function SheetCreate() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-8 px-2 ml-3 lg:px-3">
            New invoice
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Create new invoice</SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <div className="">
            <div className="">
              <FormInvoice url={`${ctx.url.origin}/api/invoices/${id}`}>
              </FormInvoice>
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
