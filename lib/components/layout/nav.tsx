import { signal } from "@preact/signals";
import type { JSX } from "preact";
import { buttonVariants } from "../button.tsx";
import { Separator } from "../separator.tsx";
import { Sheet, SheetContent, SheetTrigger } from "../sheet.tsx";
import { cn, useUI } from "../utils.ts";
import { NetzoLogo } from "./footer.tsx";

export type NavItem = Array<
  | { text: string } // header
  | {
    icon?: string;
    text: string;
    href?: string;
    target?: string;
    exact?: boolean; // do not style as active if not exact
  } // link
  | Record<string | number | symbol, never> // divider (empty object)
>;

export type NavProps = JSX.IntrinsicElements["nav"] & {
  /** A short title for the app at the navigation drawer. */
  title?: string;
  /** An https or data URL of a cover image at the navigation drawer */
  image?: string;
  /** Navigation items (headers, links with absolute or relative URLs and/or dividers)
   * or navigation groups (arrays of items) with auto-spacing between each group. */
  items?: NavItem | NavItem[];
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

export const open = signal<boolean>(false);

export function Nav({ className, ...props }: NavProps) {
  return (
    <>
      <Sheet
        className={cn(
          "md:hidden",
          open.value ? "w-[250px]" : "w-[28px]",
        )}
        open={open.value}
        onOpenChange={(e) => open.value = e}
      >
        <SheetTrigger asChild>
          <div
            variant="outline"
            size="icon"
            className={cn(
              "h-full w-[28px]",
              "fixed top-0 left-0 z-1000",
              "hover:bg-background hover:bg-opacity-80 hover:cursor-pointer",
              "flex items-center justify-center",
              open.value ? "!hidden" : "!md:hidden",
              className,
            )}
            onClick={() => open.value = !open.value}
          >
            <i className="mdi-menu-open rotate-180  h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle navigation</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] p-0">
          <div className="h-full">
            <NavBase {...props} />
          </div>
        </SheetContent>
      </Sheet>

      <NavBase
        className={cn("hidden md:flex md:b-r-1", className)}
        {...props}
      />
    </>
  );
}

function NavBase({ className, ui = {}, ...props }: NavProps) {
  const {
    root,
    nav,
    navGroup,
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
        "h-full group flex flex-col gap-2 bg-primary-foreground",
        className,
      ),
    },
    nav: {
      className: "flex flex-col justify-between h-full py-2",
    },
    navGroup: {
      className: "flex flex-col gap-1",
    },
    navHeaderRoot: {},
    navHeader: { className: "flex items-center p-4" },
    navHeaderImage: { className: "w-auto h-9 my-auto mr-4" }, // dark:filter-invert?
    navHeaderTitle: { className: "text-xl font-bold" },
    navItemGroupRoot: { className: "flex-1" },
    navItemRoot: { className: "mx-1" },
    navItem: {
      className: cn(
        buttonVariants({ variant: "ghost" }),
        "flex w-full justify-start",
        "hover:cursor-pointer hover:bg-muted", // hover
        `aria-[current='true']:bg-border`, // ancestor links (disabled below if exact=true)
        `aria-[current='page']:bg-border`, // current page
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

  const getNavItem = (item: NavItem[number], index: number) => {
    if ("href" in item) {
      return (
        <div key={`nav-item-${index}`} {...navItemRoot}>
          <a
            {...navItem}
            className={cn(
              navItem?.className,
              item.exact ? "aria-[current='true']:bg-transparent" : "",
            )}
            href={item.href}
            target={item.target}
          >
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
    } else if (Object.keys(item).length === 0) {
      return (
        <Separator
          key={`nav-item-separator-${index}`}
          {...navItemSeparator}
        />
      );
    } else {
      return <div {...navItemRoot} />;
    }
  };

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
        {props.items?.map((item, index) =>
          Array.isArray(item)
            ? (
              <div key={`nav-item-${index}`} {...navGroup}>
                {item.map((subItem, subIndex) => getNavItem(subItem, subIndex))}
              </div>
            )
            : getNavItem(item, index)
        )}
      </nav>

      <footer className="w-full flex items-center justify-center p-3 b-t-1">
        <NetzoLogo />
      </footer>
    </div>
  );
}
