import type { JSX } from "../../../../deps/preact.ts";
import { cn } from "../../../../components/utils.ts";
import { Separator } from "../../../../components/ui/separator.tsx";
import { NavItem } from "./nav-item.tsx";
import type { UiConfig } from "../mod.ts";

export type NavProps =
  & JSX.HTMLAttributes<HTMLDivElement>
  & UiConfig["nav"];

export function Nav({ className, ...props }: NavProps) {
  const showNavHeader = props?.image || props?.title;
  return (
    <div className={cn("group flex flex-col gap-4", className)}>
      {showNavHeader && (
        <div>
          <div className="flex items-center p-4">
            {/* NOTE: use dark:filter-invert to invert color on dark */}
            {props?.image && (
              <img
                src={props?.image}
                class="w-auto h-9 my-auto mr-4"
              />
            )}
            <div>
              {props?.title && (
                <h2 className="text-xl font-bold">
                  {props?.title}
                </h2>
              )}
            </div>
          </div>

          <Separator />
        </div>
      )}

      <nav className="grid gap-1">
        {/* DISABLED: <nav f-client-nav className="grid gap-1"> */}
        {props.items?.map((item, index) => {
          if ("href" in item) {
            return (
              <div class="mx-1">
                <NavItem key={index} item={item} />
              </div>
            );
          } else if ("text" in item) {
            return (
              <h3 className="mt-3 mb-1 mx-4 text-xs font-medium text-muted-foreground">
                {item.text}
              </h3>
            );
          } else return <Separator />;
        })}
      </nav>
    </div>
  );
}
