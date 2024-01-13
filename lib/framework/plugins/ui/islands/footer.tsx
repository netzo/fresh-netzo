import { useComputed } from "../../../../deps/@preact/signals.ts";
import { cn } from "../../../../components/utils.ts";
import { useTheme } from "../../../../composables/theme.ts";
import type { UiConfig } from "../mod.ts";

export const Footer = (
  { className, ...props }: UiConfig["footer"],
) => {
  const { theme } = useTheme();
  const src = useComputed(() =>
    `https://netzo.io/logos/built-with-netzo-${theme.value}.svg`
  );
  return (
    <footer
      className={cn(
        "w-full flex items-center justify-between bg-[hsl(var(--background))] p-3",
        className,
      )}
    >
      {props?.innerHTMLLeft
        ? (
          <div
            class="hidden md:flex pl-4 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: props?.innerHTMLLeft }}
          />
        )
        : <span />}
      <a href="https://netzo.io/" target="_blank">
        <img src={src.value} alt="Built with Netzo" class="h-[32px]" />
      </a>
      {props?.innerHTMLRight
        ? (
          <div
            class="hidden md:flex pr-4 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: props?.innerHTMLRight }}
          />
        )
        : <span />}
    </footer>
  );
};
