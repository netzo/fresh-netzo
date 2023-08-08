import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import {
  type ComponentProps,
  forwardRef,
  type JSX,
  type Ref,
  useState,
} from "../../../deps.ts";
import { cn } from "../../../utils/mod.ts";

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
