// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { forwardRef } from "preact/compat";
import { format } from "../deps/date-fns.ts";
import { Button } from "./button.tsx";
import { Calendar } from "./calendar.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.tsx";
import { cn } from "./utils.ts";

export const DatePicker = forwardRef<
  HTMLDivElement,
  {
    date?: Date;
    setDate: (date?: Date) => void;
  }
>(function DatePickerCmp({ date, setDate }, ref) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <i className="i-mdi-calendar mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" ref={ref}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});
