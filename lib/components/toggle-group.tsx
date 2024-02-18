import {
  type ComponentProps,
  createContext,
  forwardRef,
  type Ref,
  useContext,
} from "preact/compat";
import * as ToggleGroupPrimitive from "../deps/@radix-ui/react-toggle-group.ts";
import { VariantProps } from "../deps/class-variance-authority.ts";
import { toggleVariants } from "./toggle.tsx";
import { cn } from "./utils.ts";

const ToggleGroupContext = createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

const ToggleGroup = forwardRef<
  Ref<typeof ToggleGroupPrimitive.Root>,
  & ComponentProps<typeof ToggleGroupPrimitive.Root>
  & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = forwardRef<
  Ref<typeof ToggleGroupPrimitive.Item>,
  & ComponentProps<typeof ToggleGroupPrimitive.Item>
  & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
