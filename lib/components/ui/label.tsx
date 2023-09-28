import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import type { JSX } from "preact";
import {
  type ComponentProps,
  forwardRef,
  type Ref,
  useState,
} from "preact/compat";
import { cn } from "netzo/components/utils.ts";

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
