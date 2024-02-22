import { type ComponentProps, forwardRef, type Ref } from "preact/compat";
import * as TabsPrimitive from "../deps/@radix-ui/react-tabs.ts";
import { cva } from "../deps/class-variance-authority.ts";
import { cn } from "./utils.ts";

const Tabs = TabsPrimitive.Root;

// variants from https://github.com/shadcn-ui/ui/discussions/683

const tabsListVariants = cva(
  "inline-flex ",
  {
    variants: {
      variant: {
        default:
          "items-center justify-center h-10 rounded-md bg-muted p-1 text-muted-foreground",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        outline:
          "relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface TabsListProps
  extends
    ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = forwardRef<Ref<typeof TabsPrimitive.List>, TabsListProps>((
  { className, variant, ...props },
  ref,
) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends
    ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = forwardRef<
  Ref<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  Ref<typeof TabsPrimitive.Content>,
  ComponentProps<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
