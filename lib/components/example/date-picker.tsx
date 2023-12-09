import { CalendarIcon } from "netzo/deps/@radix-ui/react-icons.ts";
import { format } from "netzo/deps/date-fns.ts";
import { useState } from "netzo/deps/preact/hooks.ts";

import { cn } from "netzo/components/utils.ts";
import { Button } from "netzo/components/ui/button.tsx";
import { Calendar } from "netzo/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "netzo/components/ui/popover.tsx";

export default () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
