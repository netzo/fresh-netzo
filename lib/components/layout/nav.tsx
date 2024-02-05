import type { JSX } from "../../deps/preact.ts";
import { cn } from "../utils.ts";
import { Separator } from "../separator.tsx";
import { buttonVariants } from "../button.tsx";
import { useUI } from "../../hooks/use-ui.ts";
// import { Ctx } from "@/routes/_app.tsx";

export type NavProps = IntrinsicElements["nav"] & {
  /** A short title for the app at the navigation drawer. */
  title?: string;
  /** An https or data URL of a cover image at the navigation drawer */
  image?: string;
  /** Navigation headers, links with absolute or relative URLs and/or dividers */
  items?: Array<
    | { text: string } // header
    | { icon?: string; text: string; href?: string; target?: string } // link
    | Record<string | number | symbol, never> // divider (empty object)
  >;
  /** Extra props to customize element (overwrites defaults). */
  ui?: {
    root?: JSX.IntrinsicElements["div"];
    nav?: JSX.IntrinsicElements["nav"];
    navHeaderRoot?: JSX.IntrinsicElements["div"];
    navHeader?: JSX.IntrinsicElements["header"];
    navHeaderImage?: JSX.IntrinsicElements["img"];
    navHeaderTitle?: JSX.IntrinsicElements["h2"];
    navItemRoot?: JSX.IntrinsicElements["div"];
    navItem?: JSX.IntrinsicElements["a"];
    navItemIcon?: JSX.IntrinsicElements["img"] | JSX.IntrinsicElements["div"];
    navItemHeader?: JSX.IntrinsicElements["h3"];
    navItemSeparator?: JSX.IntrinsicElements["div"];
  };
};

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
      ...props,
      className: cn(
        "h-full group flex flex-col gap-4 bg-primary-foreground text-foreground",
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
      className: "w-4 h-4 mr-3",
    },
    navItemHeader: {
      className: "mt-3 mb-1 mx-4 text-xs font-medium text-muted-foreground",
    },
    navItemSeparator: {},
  });

  const showNavHeader = props?.image || props?.title;

  const getIcon = (icon: string) =>
    icon.startsWith("http")
      ? <img {...navItemIcon} src={icon} />
      : <div {...navItemIcon} className={cn(navItemIcon?.className, icon)} />;

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
              <div key={`nav-item-${index}`} {...navItemRoot}>
                <a {...navItem} href={item.href} target={item.target}>
                  {item.icon && getIcon(item.icon)}
                  {item.text}
                </a>
              </div>
            );
          } else if ("text" in item) {
            return (
              <h3 key={`nav-item-header-${index}`} {...navItemHeader}>
                {item.text}
              </h3>
            );
          } else {return (
              <Separator
                key={`nav-item-separator-${index}`}
                {...navItemSeparator}
              />
            );}
        })}
      </nav>
    </div>
  );
}
