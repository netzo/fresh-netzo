import { signal } from "@preact/signals";
import { Button } from "../button.tsx";
import { Sheet, SheetContent, SheetTrigger } from "../sheet.tsx";
import { cn } from "../utils.ts";
import { Nav, type NavProps } from "./nav.tsx";

export const open = signal<boolean>(false);

export function NavMobile({ className, ...props }: NavProps) {
  return (
    <Sheet
      className="md:hidden"
      open={open.value}
      onOpenChange={(e) => open.value = e}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("mr-4", className)}
          onClick={() => open.value = !open.value}
        >
          <i className="mdi-menu h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-0">
        <div className="h-full">
          <Nav {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
