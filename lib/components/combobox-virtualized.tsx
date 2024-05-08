// adapted from https://github.com/oaarnikoivu/shadcn-virtualized-combobox
// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { useVirtualizer } from "npm:@tanstack/react-virtual@3.5.0";
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

type Option = {
  value: string;
  label: string;
};

interface VirtualizedCommandProps {
  height: string;
  options: Option[];
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
  const [filteredOptions, setFilteredOptions] = React.useState<Option[]>(
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
        option.value.toLowerCase().includes(search.toLowerCase() ?? [])
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

interface ComboboxVirtualizedProps {
  options: string[];
  searchPlaceholder?: string;
  width?: string;
  height?: string;
}

export function ComboboxVirtualized({
  options,
  searchPlaceholder = "Search items...",
  width = "400px",
  height = "400px",
}: ComboboxVirtualizedProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          style={{
            width: width,
          }}
        >
          {selectedOption
            ? options.find((option) => option === selectedOption)
            : searchPlaceholder}
          <i className="mdi-unfold-more-horizontal ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: width }}>
        <VirtualizedCommand
          height={height}
          options={options.map((option) => ({ value: option, label: option }))}
          placeholder={searchPlaceholder}
          selectedOption={selectedOption}
          onSelectOption={(currentValue) => {
            setSelectedOption(
              currentValue === selectedOption ? "" : currentValue,
            );
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
