import { cn } from "netzo/ui/utils/mod.ts";
import AccordionDemo from "netzo/ui/components/example/accordion-demo.tsx";
import AlertDialogDemo from "netzo/ui/components/example/alert-dialog-demo.tsx";
import AspectRatioDemo from "netzo/ui/components/example/aspect-ratio-demo.tsx";
import AvatarDemo from "netzo/ui/components/example/avatar-demo.tsx";
import BadgeDemo from "netzo/ui/components/example/badge-demo.tsx";
import BadgeDestructive from "netzo/ui/components/example/badge-destructive.tsx";
import BadgeOutline from "netzo/ui/components/example/badge-outline.tsx";
import BadgeSecondary from "netzo/ui/components/example/badge-secondary.tsx";
import ButtonDemo from "netzo/ui/components/example/button-demo.tsx";
import ButtonDestructive from "netzo/ui/components/example/button-destructive.tsx";
import ButtonGhost from "netzo/ui/components/example/button-ghost.tsx";
import ButtonLink from "netzo/ui/components/example/button-link.tsx";
import ButtonLoading from "netzo/ui/components/example/button-loading.tsx";
import ButtonOutline from "netzo/ui/components/example/button-outline.tsx";
import ButtonSecondary from "netzo/ui/components/example/button-secondary.tsx";
import ButtonWithIcon from "netzo/ui/components/example/button-with-icon.tsx";
import CardDemo from "netzo/ui/components/example/card-demo.tsx";
import CheckboxDemo from "netzo/ui/components/example/checkbox-demo.tsx";
import CollapsibleDemo from "netzo/ui/components/example/collapsible-demo.tsx";
import CommandDemo from "netzo/ui/components/example/command-demo.tsx";
import ContextMenuDemo from "netzo/ui/components/example/context-menu-demo.tsx";
import DatePickerDemo from "netzo/ui/components/example/date-picker-demo.tsx";
import DatePickerWithRangeDemo from "netzo/ui/components/example/date-picker-with-range.tsx";
import DialogDemo from "netzo/ui/components/example/dialog-demo.tsx";
import DropdownMenuDemo from "netzo/ui/components/example/dropdown-menu-demo.tsx";
import HoverCardDemo from "netzo/ui/components/example/hover-card-demo.tsx";
import MenubarDemo from "netzo/ui/components/example/menubar-demo.tsx";
import NavigationMenuDemo from "netzo/ui/components/example/navigation-menu-demo.tsx";
import PopoverDemo from "netzo/ui/components/example/popover-demo.tsx";
import ProgressDemo from "netzo/ui/components/example/progress-demo.tsx";
import RadioGroupDemo from "netzo/ui/components/example/radio-group-demo.tsx";
import ScrollAreaDemo from "netzo/ui/components/example/scroll-area-demo.tsx";
import SelectDemo from "netzo/ui/components/example/select-demo.tsx";
import SeparatorDemo from "netzo/ui/components/example/separator-demo.tsx";
import SheetDemo from "netzo/ui/components/example/sheet-demo.tsx";
import SkeletonDemo from "netzo/ui/components/example/skeleton-demo.tsx";
import SliderDemo from "netzo/ui/components/example/slider-demo.tsx";
import SwitchDemo from "netzo/ui/components/example/switch-demo.tsx";
import TabsDemo from "netzo/ui/components/example/tabs-demo.tsx";
import ToastDemo from "netzo/ui/components/example/toast-demo.tsx";
import ToggleDemo from "netzo/ui/components/example/toggle-demo.tsx";
import ToggleDisabled from "netzo/ui/components/example/toggle-disabled.tsx";
import ToggleOutline from "netzo/ui/components/example/toggle-outline.tsx";
import ToggleWithText from "netzo/ui/components/example/toggle-with-text.tsx";
import TooltipDemo from "netzo/ui/components/example/tooltip-demo.tsx";
import { Button } from "netzo/ui/components/ui/button.tsx";
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
