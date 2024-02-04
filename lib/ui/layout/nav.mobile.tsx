import type { JSX } from "../../deps/preact.ts";
import { useContext } from "../../deps/preact/hooks.ts";
import { useSignal } from "../../deps/@preact/signals.ts";
import { cn } from "../utils.ts";
import { Button } from "../components/button.tsx";
import { Sheet, SheetContent, SheetTrigger } from "../components/sheet.tsx";
import type { NavProps } from "./nav.tsx";
import { useUI } from "../composables/use-ui.ts";
import { Ctx } from "@/routes/_app.tsx";

export function NavMobile({ className, ...props }: NavProps) {
  const ctx = useContext(Ctx);
  const { auth } = ctx.state.config;
  const { sessionId, sessionUser } = ctx.state.auth ?? {};

  const mustAuth = !!auth && !sessionId;

  if (mustAuth) return null;

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
          <i className="mdi-menu h-[1.2rem] w-[1.2rem]" />
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
