import type { JSX } from "../../deps/preact.ts";
import { cn, useUI } from "../utils.ts";
import { HeaderDarkMode } from "./header.dark-mode.tsx";
import { HeaderAuth } from "./header.auth.tsx";
import type { HeaderAuthProps } from "./header.auth.tsx";

export type HeaderProps = JSX.IntrinsicElements["header"] & {
  /** A short title for the app at the header. */
  title?: string;
  /** A short description for the app at the header. */
  description?: string;
  /** An https or data URL of a cover image at the header */
  image?: string;
  /** Extra props to customize element (overwrites defaults). */
  ui?: {
    root?: JSX.IntrinsicElements["header"];
    title?: JSX.IntrinsicElements["h1"];
    description?: JSX.IntrinsicElements["div"];
    image?: JSX.IntrinsicElements["img"];
    left?: JSX.IntrinsicElements["div"];
    right?: JSX.IntrinsicElements["div"];
  };
} & HeaderAuthProps;

export function Header({ className, ui = {}, ...props }: HeaderProps) {
  const { root, title, description, image, left, right } = useUI(ui, {
    root: {
      // ...props,
      className: cn(
        "flex items-center justify-between p-4 space-y-2 bg-background",
        className,
      ),
    },
    title: { className: "text-xl font-bold" },
    description: {
      className:
        "flex items-center ml-2 text-sm mdi-information text-muted-foreground",
    },
    image: { className: "w-auto h-9 my-auto mr-4" },
    left: { className: "flex items-center gap-2 !my-auto" },
    right: { className: "flex items-center gap-4 !my-auto" },
  });

  return (
    <header {...root}>
      <div {...left}>
        {props.children}
        {/* NOTE: use dark:filter-invert to invert color on dark */}
        {props?.image && <img {...image} src={props?.image} />}
        {props?.title && <h1 {...title}>{props.title}</h1>}
        {props?.description && (
          <div {...description} title={props.description} />
        )}
      </div>

      <div {...right}>
        <HeaderDarkMode />
        <HeaderAuth f-client-nav={false} sessionUser={props.sessionUser} />
      </div>
    </header>
  );
}
