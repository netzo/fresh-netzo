import { cn } from "netzo/_ui/utils/mod.ts";
import AccordionDemo from "netzo/_ui/registry/netzo/example/accordion-demo.tsx";
import AlertDialogDemo from "netzo/_ui/registry/netzo/example/alert-dialog-demo.tsx";
import AspectRatioDemo from "netzo/_ui/registry/netzo/example/aspect-ratio-demo.tsx";
import AvatarDemo from "netzo/_ui/registry/netzo/example/avatar-demo.tsx";
import BadgeDemo from "netzo/_ui/registry/netzo/example/badge-demo.tsx";
import BadgeDestructive from "netzo/_ui/registry/netzo/example/badge-destructive.tsx";
import BadgeOutline from "netzo/_ui/registry/netzo/example/badge-outline.tsx";
import BadgeSecondary from "netzo/_ui/registry/netzo/example/badge-secondary.tsx";
import ButtonDemo from "netzo/_ui/registry/netzo/example/button-demo.tsx";
import ButtonDestructive from "netzo/_ui/registry/netzo/example/button-destructive.tsx";
import ButtonGhost from "netzo/_ui/registry/netzo/example/button-ghost.tsx";
import ButtonLink from "netzo/_ui/registry/netzo/example/button-link.tsx";
import ButtonLoading from "netzo/_ui/registry/netzo/example/button-loading.tsx";
import ButtonOutline from "netzo/_ui/registry/netzo/example/button-outline.tsx";
import ButtonSecondary from "netzo/_ui/registry/netzo/example/button-secondary.tsx";
import ButtonWithIcon from "netzo/_ui/registry/netzo/example/button-with-icon.tsx";
import CardDemo from "netzo/_ui/registry/netzo/example/card-demo.tsx";
import CheckboxDemo from "netzo/_ui/registry/netzo/example/checkbox-demo.tsx";
import CollapsibleDemo from "netzo/_ui/registry/netzo/example/collapsible-demo.tsx";
import CommandDemo from "netzo/_ui/registry/netzo/example/command-demo.tsx";
import ContextMenuDemo from "netzo/_ui/registry/netzo/example/context-menu-demo.tsx";
import DatePickerDemo from "netzo/_ui/registry/netzo/example/date-picker-demo.tsx";
import DatePickerWithRangeDemo from "netzo/_ui/registry/netzo/example/date-picker-with-range.tsx";
import DialogDemo from "netzo/_ui/registry/netzo/example/dialog-demo.tsx";
import DropdownMenuDemo from "netzo/_ui/registry/netzo/example/dropdown-menu-demo.tsx";
import HoverCardDemo from "netzo/_ui/registry/netzo/example/hover-card-demo.tsx";
import MenubarDemo from "netzo/_ui/registry/netzo/example/menubar-demo.tsx";
import NavigationMenuDemo from "netzo/_ui/registry/netzo/example/navigation-menu-demo.tsx";
import PopoverDemo from "netzo/_ui/registry/netzo/example/popover-demo.tsx";
import ProgressDemo from "netzo/_ui/registry/netzo/example/progress-demo.tsx";
import RadioGroupDemo from "netzo/_ui/registry/netzo/example/radio-group-demo.tsx";
import ScrollAreaDemo from "netzo/_ui/registry/netzo/example/scroll-area-demo.tsx";
import SelectDemo from "netzo/_ui/registry/netzo/example/select-demo.tsx";
import SeparatorDemo from "netzo/_ui/registry/netzo/example/separator-demo.tsx";
import SheetDemo from "netzo/_ui/registry/netzo/example/sheet-demo.tsx";
import SkeletonDemo from "netzo/_ui/registry/netzo/example/skeleton-demo.tsx";
import SliderDemo from "netzo/_ui/registry/netzo/example/slider-demo.tsx";
import SwitchDemo from "netzo/_ui/registry/netzo/example/switch-demo.tsx";
import TabsDemo from "netzo/_ui/registry/netzo/example/tabs-demo.tsx";
import ToastDemo from "netzo/_ui/registry/netzo/example/toast-demo.tsx";
import ToggleDemo from "netzo/_ui/registry/netzo/example/toggle-demo.tsx";
import ToggleDisabled from "netzo/_ui/registry/netzo/example/toggle-disabled.tsx";
import ToggleOutline from "netzo/_ui/registry/netzo/example/toggle-outline.tsx";
import ToggleWithText from "netzo/_ui/registry/netzo/example/toggle-with-text.tsx";
import TooltipDemo from "netzo/_ui/registry/netzo/example/tooltip-demo.tsx";
import { Button } from "netzo/_ui/registry/netzo/ui/button.tsx";
import { Head } from "fresh/runtime.ts";

export default function KitchenSinkPage() {
  return (
    <>
      <Head>
        <link
          href="https://esm.sh/react-day-picker@8.8.0/dist/style.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-start gap-4">
            <div className="grid gap-4">
              <ComponentWrapper>
                <CardDemo className="w-full" />
              </ComponentWrapper>
              <ComponentWrapper>
                <SliderDemo className="w-full" />
              </ComponentWrapper>
              <ComponentWrapper className="spa flex-col items-start space-x-0
          space-y-2">
                <p className="text-sm text-muted-foreground">Documentation</p>
                <p className="text-sm font-medium leading-none">
                  You can customize the theme using{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
                    CSS variables
                  </code>
                  .{" "}
                  <a
                    href="#"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    Click here
                  </a>{" "}
                  to learn more.
                </p>
              </ComponentWrapper>
              <ComponentWrapper>
                <CheckboxDemo />
                <HoverCardDemo />
              </ComponentWrapper>
              <ComponentWrapper className="[&>div]:w-full">
                <TabsDemo />
              </ComponentWrapper>
            </div>
            <div className="grid gap-4">
              <ComponentWrapper>
                <MenubarDemo />
                <AvatarDemo />
              </ComponentWrapper>
              <ComponentWrapper className="flex-col items-start space-x-0 space-y-2">
                <div className="flex space-x-2">
                  <ButtonDemo />
                  <ButtonSecondary />
                  <ButtonDestructive />
                </div>
                <div className="flex space-x-2">
                  <ButtonOutline />
                  <ButtonLink />
                  <ButtonGhost />
                </div>
                <div className="flex space-x-2">
                  <ButtonWithIcon />
                  <ButtonLoading />
                </div>
                <div className="flex space-x-2">
                  <Button size="lg">Large</Button>
                  <Button size="sm">Small</Button>
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <DatePickerDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <DatePickerWithRangeDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <AccordionDemo />
              </ComponentWrapper>
              <ComponentWrapper className="[&_ul>li:last-child]:hidden">
                <NavigationMenuDemo />
              </ComponentWrapper>
              <ComponentWrapper className="justify-between">
                <SwitchDemo />
                <SelectDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <SeparatorDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <AspectRatioDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <PopoverDemo />
                <ToastDemo />
              </ComponentWrapper>
            </div>
            <div className="grid gap-4">
              <ComponentWrapper>
                <TooltipDemo />
                <SheetDemo />
                <ProgressDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <CommandDemo />
              </ComponentWrapper>
              <ComponentWrapper className="[&>span]:h-[80px] [&>span]:w-[200px]">
                <RadioGroupDemo />
                <ContextMenuDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <div className="flex space-x-2">
                  <DropdownMenuDemo />
                  <AlertDialogDemo />
                  <DialogDemo />
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <div className="flex space-x-2">
                  <BadgeDemo />
                  <BadgeSecondary />
                  <BadgeDestructive />
                  <BadgeOutline />
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <SkeletonDemo />
              </ComponentWrapper>
              <ComponentWrapper className="[&>div]:w-full">
                <CollapsibleDemo />
              </ComponentWrapper>
              <ComponentWrapper>
                <div className="flex space-x-2">
                  <ToggleDemo />
                  <ToggleOutline />
                  <ToggleDisabled />
                  <ToggleWithText />
                </div>
              </ComponentWrapper>
              <ComponentWrapper>
                <ScrollAreaDemo />
              </ComponentWrapper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ComponentWrapper({
  className,
  children,
}: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-4 rounded-md p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
