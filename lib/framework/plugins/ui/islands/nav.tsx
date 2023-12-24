import type { NetzoConfig } from "../../../../framework/mod.ts";
import { useSignal } from "../../../../deps/@preact/signals.ts";
import { cn } from "../../../../components/utils.ts";
import { buttonVariants } from "../../../../components/ui/button.tsx";
import { NavItem, type NavItemProps, NavItemUser } from "./nav-item.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./nav-item.accordion.tsx";
export function Nav({ className, ...props }: NetzoConfig["ui"]["nav"]) {
  // open all by default to let unocss SSR render all icons else hidden will be missing
  const defaultValue = props?.items?.map((_, i) => `item-${i}`);
  const open = useSignal(defaultValue);

  return (
    <div className="flex flex-col h-screen">
      <nav
        f-client-nav
        className={cn(
          "flex-1 grid gap-1 py-2 px-2",
          // "bg-[hsl(var(--secondary))]",
          className,
        )}
      >
        {props?.items?.map((item: NavItemProps, i: number) =>
          item?.items?.length
            ? (
              <Accordion
                type="multiple"
                collapsible
                className="space-y-2"
                key={item.text}
                defaultValue={defaultValue}
                value={open.value}
                onValueChange={(value) => open.value = value}
              >
                <AccordionItem value={`item-${i}`} className="border-none">
                  <AccordionTrigger
                    className={cn(buttonVariants({ variant: "ghost" }))}
                  >
                    <NavItem {...item} className="py-2" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pl-3 mt-2">
                    {item.items?.map((subItem) => (
                      <NavItem {...subItem} key={subItem.text} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
            : <NavItem {...item} />
        )}
      </nav>

      {/* IMPORTANT: disable client-side navigation for logout */}
      {props?.sessionUser && (
        <div f-client-nav={false} className="px-3 py-2">
          <NavItemUser sessionUser={props?.sessionUser} />
        </div>
      )}
    </div>
  );
}
