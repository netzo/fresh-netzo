import * as SeparatorPrimitive from "../deps/@radix-ui/react-separator.ts";
import type { JSX } from "../deps/preact.ts";
import {
  type ComponentProps,
  forwardRef,
  type Ref,
} from "../deps/preact/compat.ts";
import { cn } from "./utils.ts";

const Separator = forwardRef<
  Ref<typeof SeparatorPrimitive.Root>,
  ComponentProps<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
