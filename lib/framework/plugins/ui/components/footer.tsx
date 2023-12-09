import { cn } from "../../../../components/utils.ts";
import type { UiOptions } from "../mod.ts";

export const Footer = ({ className, ...props }: UiOptions["footer"]) => {
  return (
    <footer
      className={cn(
        "flex items-center justify-center p-3 bg-[hsl(var(--background))]",
        className,
      )}
    >
      {props?.left && <div dangerouslySetInnerHTML={{ __html: props?.left }} />}

      {props?.center
        ? <div dangerouslySetInnerHTML={{ __html: props?.center }} />
        : (
          <a href="https://netzo.io/" target="_blank">
            <img
              src="https://netzo.io/logos/built-with-netzo-light.svg"
              alt="Built with Netzo"
              class="h-[32px]"
            />
          </a>
        )}

      {props?.right && (
        <div dangerouslySetInnerHTML={{ __html: props?.right }} />
      )}
    </footer>
  );
};
