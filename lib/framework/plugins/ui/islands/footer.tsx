import type { NetzoConfig } from "../../../../framework/mod.ts";
import { useComputed } from "../../../../deps/@preact/signals.ts";
import { cn } from "../../../../components/utils.ts";
import { useTheme } from "../../../../composables/theme.ts";

export const Footer = (
  { className, ...props }: NetzoConfig["ui"]["footer"],
) => {
  const { theme } = useTheme();
  const src = useComputed(() =>
    `https://netzo.io/logos/built-with-netzo-${theme.value}.svg`
  );
  return (
    <footer
      className={cn(
        "flex items-center justify-center bg-[hsl(var(--background))] p-3",
        className,
      )}
    >
      {props?.innerHTML
        ? (
          <div
            class="h-[32px]"
            dangerouslySetInnerHTML={{ __html: props?.innerHTML }}
          />
        )
        : (
          <a href="https://netzo.io/" target="_blank">
            <img src={src.value} alt="Built with Netzo" class="h-[32px]" />
          </a>
        )}
    </footer>
  );
};
