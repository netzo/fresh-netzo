// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { IS_BROWSER } from "fresh/runtime.ts";
import * as TogglePrimitive from "../deps/@radix-ui/react-toggle.ts";
import { cva, type VariantProps } from "../deps/class-variance-authority.ts";
import { cn } from "./utils.ts";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:bg-primary-foreground focus-visible:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:!bg-primary data-[state=on]:!bg-opacity-20 data-[state=on]:!text-primary",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  & React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
  & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
    disabled={IS_BROWSER ? !!props.disabled : true}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
