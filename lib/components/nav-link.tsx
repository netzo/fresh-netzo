// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

// adapted from https://github.com/shadcn-ui/ui/issues/414#issuecomment-1772421366
import type { JSX } from "preact";
import { Slot } from "../deps/@radix-ui/react-slot.ts";
import { type VariantProps } from "../deps/class-variance-authority.ts";
import { buttonVariants } from "./button.tsx"; // Assuming Button.tsx is in the same directory
import { cn } from "./utils.ts";

export interface NavLinkProps
  extends Omit<JSX.HTMLAttributes<HTMLAnchorElement>, "size">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(({
  className,
  variant,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, className }),
        "inline-block relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none transition-none focus-visible:ring-0 aria-[current='page']:border-b-primary aria-[current='page']:text-foreground aria-[current='page']:shadow-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
NavLink.displayName = "NavLink";

export { NavLink };
