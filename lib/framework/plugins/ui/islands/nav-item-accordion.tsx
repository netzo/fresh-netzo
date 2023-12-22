import * as AccordionPrimitive from "../../../../deps/@radix-ui/react-accordion.ts";
import { ChevronDownIcon } from "../../../../deps/@radix-ui/react-icons.ts";

import type { JSX } from "../../../../deps/preact.ts";
import {
  type ComponentProps,
  forwardRef,
  type Ref,
  useState,
} from "../../../../deps/preact/compat.ts";
import { cn } from "../../../../components/utils.ts";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  Ref<typeof AccordionPrimitive.Item>,
  ComponentProps<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  Ref<typeof AccordionPrimitive.Trigger>,
  ComponentProps<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 shrink-0 text-muted-foreground" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  Ref<typeof AccordionPrimitive.Content>,
  ComponentProps<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pt-0 pb-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
