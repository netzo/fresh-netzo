import type { JSX } from "../../deps/preact.ts";
import { useComputed } from "../../deps/@preact/signals.ts";
import { cn } from "../../components/utils.ts";
import { useUI } from "../../composables/use-ui.ts";
import { useTheme } from "../../composables/use-theme.ts";
import type { UiConfig } from "../plugin.ts";

export type FooterProps =
  & JSX.HTMLAttributes<HTMLDivElement>
  & UiConfig["footer"];

export const Footer = (
  { className, ui = {}, ...props }: FooterProps,
) => {
  const { root, left, right } = useUI(ui, {
    root: {
      className: cn(
        "sticky bottom-0 w-full flex items-center justify-center md:justify-between bg-background p-3",
        className,
      ),
    },
    left: { className: "hidden md:flex pl-4 text-muted-foreground" },
    right: { className: "hidden md:flex pr-4 text-muted-foreground" },
  });

  const { theme } = useTheme();
  const src = useComputed(() =>
    `https://netzo.io/logos/built-with-netzo-${theme.value}.svg`
  );

  return (
    <footer {...root}>
      {props?.innerHTMLLeft
        ? (
          <div
            {...left}
            dangerouslySetInnerHTML={{ __html: props?.innerHTMLLeft }}
          />
        )
        : <span />}

      <a href="https://netzo.io/" target="_blank">
        <img src={src.value} alt="Built with Netzo" className="h-[32px]" />
      </a>

      {props?.innerHTMLRight
        ? (
          <div
            {...right}
            dangerouslySetInnerHTML={{ __html: props?.innerHTMLRight }}
          />
        )
        : <span />}
    </footer>
  );
};
