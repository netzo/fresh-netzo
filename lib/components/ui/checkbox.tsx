import * as CheckboxPrimitive from "../../deps/@radix-ui/react-checkbox.ts";
import { CheckIcon } from "../../deps/@radix-ui/react-icons.ts";

import type { JSX } from "../../deps/preact.ts";
import {
  type ComponentProps,
  forwardRef,
  type Ref,
  useState,
} from "../../deps/preact/compat.ts";
import { cn } from "../utils.ts";

const Checkbox = forwardRef<
  Ref<typeof CheckboxPrimitive.Root>,
  ComponentProps<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <CheckIcon className="w-4 h-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
