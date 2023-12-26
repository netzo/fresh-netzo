import type { NetzoConfig } from "../../../../framework/mod.ts";
import { cn } from "../../../../components/utils.ts";
import { Button } from "../../../../components/ui/button.tsx";
import { useToggle } from "../../../../composables/toggle.ts";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../../components/ui/sheet.tsx";
import { Nav } from "./nav.tsx";

export function NavMobile({ className, ...props }: NetzoConfig["ui"]["nav"]) {
  const { value: open, toggle } = useToggle();

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
          onClick={toggle}
        >
          <div className="mdi-menu h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-0">
        <div className="h-full px-1 py-6 pt-16">
          <Nav {...props} sessionUser={props.sessionUser} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
