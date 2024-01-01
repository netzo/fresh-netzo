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
import { FormContact } from "@/islands/contacts/Form.tsx";

export function SheetCreate() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-8 px-2 ml-3 lg:px-3">
            New contact
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
              <FormContact url={`${ctx.url.origin}/api/contacts/${id}`}>
              </FormContact>
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
