import {
  forwardRef,
  type ComponentProps,
  type Ref
} from "preact/compat";
import * as ProgressPrimitive from "../deps/@radix-ui/react-progress.ts";
import { cn } from "./utils.ts";

const Progress = forwardRef<
  Ref<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
