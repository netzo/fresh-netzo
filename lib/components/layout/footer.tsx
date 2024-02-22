import type { ComponentChildren, JSX } from "preact";
import { useDarkMode } from "../../deps/usehooks-ts.ts";
import { cn, useUI } from "../utils.ts";

export type FooterProps = JSX.IntrinsicElements["footer"] & {
  /** Extra props to customize element (overwrites defaults). */
  ui?: {
    root?: JSX.IntrinsicElements["footer"];
  };
  /** Optional JSX content */
  children?: ComponentChildren;
};

export const NetzoLogo = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <a href="https://netzo.io/" target="_blank" className="mx-auto">
      <img
        src={`https://netzo.io/logos/built-with-netzo-${
          isDarkMode ? "dark" : "light"
        }.svg`}
        alt="Built with Netzo"
        className="h-[32px]"
      />
    </a>
  );
};

export const Footer = ({ className, ui = {}, ...props }: FooterProps) => {
  const { root } = useUI(ui, {
    root: {
      ...props,
      className: cn(
        "sticky bottom-0 w-full flex items-center justify-center md:justify-between bg-background p-3 text-muted-foreground",
        className,
      ),
    },
  });

  return (
    <footer {...root}>
      {props.children ?? <NetzoLogo />}
    </footer>
  );
};
