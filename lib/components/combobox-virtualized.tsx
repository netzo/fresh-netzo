// adapted from https://github.com/oaarnikoivu/shadcn-virtualized-combobox
// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { useVirtualizer } from "../deps/@tanstack/react-virtual.ts";
import { useResizeObserver } from "../deps/usehooks-ts.ts";
import { Button } from "./button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.tsx";
import { cn } from "./utils.ts";

type ComboboxOption = {
  value: string;
  label: string;
};

interface VirtualizedCommandProps {
  height: string;
  options: ComboboxOption[];
  placeholder: string;
  selectedOption: string;
  onSelectOption?: (option: string) => void;
}

const VirtualizedCommand = ({
  height,
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] = React.useState<
    ComboboxOption[]
  >(
    options,
  );
  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) =>
        option.label?.toLowerCase().includes(search?.toLowerCase() ?? [])
      ),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup
        ref={parentRef}
        style={{
          height: height,
          width: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualOptions.map((virtualOption) => (
            <CommandItem
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualOption.size}px`,
                transform: `translateY(${virtualOption.start}px)`,
              }}
              key={filteredOptions[virtualOption.index].value}
              value={filteredOptions[virtualOption.index].value}
              onSelect={onSelectOption}
              className="w-full truncate"
            >
              <i
                className={cn(
                  "mdi-check mr-2 h-4 w-4",
                  selectedOption === filteredOptions[virtualOption.index].value
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {filteredOptions[virtualOption.index].label}
            </CommandItem>
          ))}
        </div>
      </CommandGroup>
    </Command>
  );
};

export interface ComboboxVirtualizedProps {
  options: ComboboxOption[];
  searchPlaceholder?: string;
  height?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function ComboboxVirtualized({
  options,
  searchPlaceholder,
  height = "400px",
  disabled = false,
  value = "",
  onChange,
}: ComboboxVirtualizedProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<string>(value);

  const ref = React.useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({ ref, box: "border-box" });

  const selectedOptionLabel = options.find(({ value }) =>
    value === selectedOption
  )?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          role="combobox"
          variant="outline"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between hover:bg-secondary/20 active:scale-100"
        >
          <span className="line-clamp-1 text-left font-normal">
            {selectedOption ? selectedOptionLabel : searchPlaceholder}
          </span>
          <i className="mdi-unfold-more-horizontal h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: `${width}px` }}>
        <VirtualizedCommand
          height={height}
          options={options.map(({ value, label }) => ({ value, label }))}
          placeholder={searchPlaceholder}
          selectedOption={selectedOption}
          onSelectOption={(currentValue) => {
            // WORKAROUND: somehow currentValue is returned in all lowercase, so
            // we use toUpperCase() since ULIDs are all capital letters always
            const value = currentValue === selectedOption
              ? ""
              : currentValue.toUpperCase();
            setSelectedOption(value);
            onChange!(value);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
