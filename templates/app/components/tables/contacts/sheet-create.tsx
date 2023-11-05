import { PlusIcon } from "@radix-ui/react-icons";
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
import { FormAdmin } from "@/components/tables/contacts/form-admin.tsx";

export function SheetCreate() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-3 h-8 px-2 lg:px-3">
            <PlusIcon className="mr-2 h-4 w-4" /> New contact
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Create new contact</SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <div className="">
            <div className="">
              <FormAdmin>
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
