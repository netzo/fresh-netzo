// from https://github.com/gaofubin/t3-app-template/blob/main/src/components/layout/subnav-accordion.tsx
import * as AccordionPrimitive from "../../../../deps/@radix-ui/react-accordion.ts";
// import { ChevronDownIcon } from "../../../../deps/@radix-ui/react-icons.ts";

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
      className={cn(className, "flex items-center justify-between w-full px-0")}
      {...props}
    >
      {children}
      {/* <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 shrink-0 text-muted-foreground" /> */}
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
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
