import type { ComponentChildren, JSX } from "../../deps/preact.ts";
import { useSignal } from "../../deps/@preact/signals.ts";
import { cn } from "../../components/utils.ts";
import { Button } from "../../components/ui/button.tsx";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../components/ui/sheet.tsx";
import type { UiConfig } from "../plugin.ts";

export type NavProps =
  & JSX.HTMLAttributes<HTMLDivElement>
  & UiConfig["nav"]
  & { children: ComponentChildren };

export function NavMobile({ className, ...props }: NavProps) {
  const open = useSignal<boolean>(false);

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
          <div className="mdi-menu h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-0">
        <div className="h-full">
          {props.children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
