import type { JSX } from "../../deps/preact.ts";
import { cn } from "../../components/utils.ts";
import { Separator } from "../../components/ui/separator.tsx";
import { buttonVariants } from "../../components/ui/button.tsx";
import { useUI } from "../../composables/use-ui.ts";
import type { UiConfig } from "../plugin.ts";

export type NavProps =
  & JSX.HTMLAttributes<HTMLDivElement>
  & UiConfig["nav"];

export function Nav({ className, ui = {}, ...props }: NavProps) {
  const {
    root,
    nav,
    navHeaderRoot,
    navHeader,
    navHeaderImage,
    navHeaderTitle,
    navItemRoot,
    navItem,
    navItemIcon,
    navItemHeader,
    navItemSeparator,
  } = useUI(ui, {
    root: {
      className: cn(
        "group flex flex-col gap-4 bg-primary-foreground text-foreground",
        className,
      ),
    },
    nav: {
      className: "grid gap-1",
    },
    navHeaderRoot: {},
    navHeader: { className: "flex items-center p-4" },
    navHeaderImage: { className: "w-auto h-9 my-auto mr-4" }, // dark:filter-invert?
    navHeaderTitle: { className: "text-xl font-bold" },
    navItemRoot: { className: "mx-1" },
    navItem: {
      className: cn(
        buttonVariants({ variant: "ghost" }),
        "flex w-full justify-start",
        "hover:cursor-pointer hover:text-primary",
        // `aria-[current='true']:text-primary`, // ancestor links
        `aria-[current='page']:text-primary`, // current page
      ),
    },
    navItemIcon: {
      className: "w-5 h-5 mr-3",
    },
    navItemHeader: {
      className: "mt-3 mb-1 mx-4 text-xs font-medium text-muted-foreground",
    },
    navItemSeparator: {},
  });

  const showNavHeader = props?.image || props?.title;

  return (
    <div {...root}>
      {showNavHeader && (
        <div {...navHeaderRoot}>
          <header {...navHeader}>
            {props?.image && <img {...navHeaderImage} src={props?.image} />}
            {props?.title && <h2 {...navHeaderTitle}>{props?.title}</h2>}
          </header>

          <Separator />
        </div>
      )}

      <nav f-client-nav {...nav}>
        {props.items?.map((item, index) => {
          if ("href" in item) {
            return (
              <div {...navItemRoot}>
                <a key={index} {...{ ...navItem, ...item }}>
                  {item.icon && (item.icon.startsWith("http")
                    ? <img {...navItemIcon} src={item.icon} />
                    : (
                      <div
                        {...navItemIcon}
                        className={cn(navItemIcon?.className, item.icon)}
                      />
                    ))}
                  {item.text}
                </a>
              </div>
            );
          } else if ("text" in item) {
            return (
              <h3 {...navItemHeader}>
                {item.text}
              </h3>
            );
          } else return <Separator {...navItemSeparator} />;
        })}
      </nav>
    </div>
  );
}
