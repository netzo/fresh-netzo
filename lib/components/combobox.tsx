// adapted from https://github.com/shadcn-ui/ui/issues/927#issuecomment-1788084995
// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { Button } from "./button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.tsx";
import { ScrollArea } from "./scroll-area.tsx";
import { cn } from "./utils.ts";

export interface ComboboxOption {
  value: string;
  label: React.ReactNode;
}

type ComboboxPropsSingle = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
};

type ComboboxPropsMultiple = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
};

export type ComboboxProps = ComboboxPropsSingle | ComboboxPropsMultiple;

export const handleSingleSelect = (
  props: ComboboxPropsSingle,
  option: ComboboxOption,
) => {
  if (props.clearable) {
    props.onChange?.(option.value === props.value ? "" : option.value);
  } else {
    props.onChange?.(option.value);
  }
};

export const handleMultipleSelect = (
  props: ComboboxPropsMultiple,
  option: ComboboxOption,
) => {
  if (props.value?.includes(option.value)) {
    if (!props.clearable && props.value.length === 1) return false;
    props.onChange?.(
      props.value.filter((value) => value !== option.value),
    );
  } else {
    props.onChange?.([...(props.value ?? []), option.value]);
  }
};

export const Combobox = React.forwardRef(
  (props: ComboboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant="outline"
            aria-expanded={open}
            disabled={props.disabled}
            className="w-full justify-between hover:bg-secondary/20 active:scale-100"
          >
            <span className="line-clamp-1 text-left font-normal">
              {props.multiple && props.value && props.value.length === 1 && (
                <span className="mr-2">{props.value}</span>
              )}

              {props.multiple && props.value && props.value.length > 1 && (
                <span className="mr-2">
                  {props.value.length} options selected
                </span>
              )}

              {!props.multiple &&
                props.value &&
                props.value !== "" &&
                props.options.find((option) => option.value === props.value)
                  ?.label}

              {(!props.value || (props.multiple && props.value.length === 0)) &&
                (props.selectPlaceholder ?? "Select an option")}
            </span>
            <i className="mdi-unfold-more-horizontal h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Command>
            <CommandInput
              ref={ref}
              placeholder={props.searchPlaceholder ?? "Search for an option"}
            />
            <CommandEmpty>{props.emptyText ?? "No results found"}</CommandEmpty>
            <CommandGroup>
              <ScrollArea orientation="vertical">
                <div className="max-h-60">
                  {props.options.map((option) => (
                    <CommandItem
                      key={option.value as string}
                      value={(option.label as string).toLowerCase().trim()}
                      onSelect={(selectedLabel) => {
                        const option = props.options.find(
                          (option) =>
                            (option.label as string).toLowerCase().trim() ===
                              selectedLabel,
                        );

                        if (!option) return null;

                        if (props.multiple) {
                          handleMultipleSelect(props, option);
                        } else {
                          handleSingleSelect(props, option);
                          setOpen(false);
                        }
                      }}
                    >
                      <i
                        className={cn(
                          "mdi-check mr-2 h-4 w-4 opacity-0",
                          !props.multiple && props.value === option.value &&
                            "opacity-100",
                          props.multiple &&
                            props.value?.includes(option.value) &&
                            "opacity-100",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </div>
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
