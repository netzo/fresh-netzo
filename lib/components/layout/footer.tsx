import type { JSX } from "../../deps/preact.ts";
import { useComputed } from "../../deps/@preact/signals.ts";
import { cn } from "../utils.ts";
import { useUI } from "../../hooks/use-ui.ts";
import { useDarkMode } from "../../hooks/use-dark-mode.ts";

export type FooterProps = JSX.IntrinsicElements["footer"] & {
  /** Extra props to customize element (overwrites defaults). */
  ui?: {
    root?: JSX.IntrinsicElements["footer"];
  };
  /** Optional JSX content */
  children?: JSX.ComponentChildren;
};

export const Footer = (
  { className, ui = {}, ...props }: FooterProps,
) => {
  const { root } = useUI(ui, {
    root: {
      ...props,
      className: cn(
        "sticky bottom-0 w-full flex items-center justify-center md:justify-between bg-background p-3 text-muted-foreground",
        className,
      ),
    },
  });

  const { darkMode } = useDarkMode();
  const src = useComputed(() => {
    const variant = darkMode.value ? "dark" : "light";
    return `https://netzo.io/logos/built-with-netzo-${variant}.svg`;
  });

  const NetzoLogo = () => (
    <a href="https://netzo.io/" target="_blank" className="mx-auto">
      <img src={src.value} alt="Built with Netzo" className="h-[32px]" />
    </a>
  );

  return (
    <footer {...root}>
      {props.children ?? <NetzoLogo />}
    </footer>
  );
};
