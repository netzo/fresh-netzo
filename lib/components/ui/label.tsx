import * as LabelPrimitive from "../../deps/@radix-ui/react-label.ts";
import { cva, type VariantProps } from "../../deps/class-variance-authority.ts";

import type { JSX } from "../../deps/preact.ts";
import {
  type ComponentProps,
  forwardRef,
  type Ref,
  useState,
} from "../../deps/preact/compat.ts";
import { cn } from "../utils.ts";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = forwardRef<
  Ref<typeof LabelPrimitive.Root>,
  & ComponentProps<typeof LabelPrimitive.Root>
  & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
