import { CalendarIcon } from "../../deps/@radix-ui/react-icons.ts";
import { format } from "../../deps/date-fns.ts";
import { useState } from "../../deps/preact/hooks.ts";

import { cn } from "../utils.ts";
import { Button } from "../ui/button.tsx";
import { Calendar } from "../ui/calendar.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";

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
