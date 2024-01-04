import { CalendarIcon } from "../../deps/@radix-ui/react-icons.ts";
import { addDays, format } from "../../deps/date-fns.ts";
import { DateRange } from "../../deps/react-day-picker.ts";
import { useState } from "../../deps/preact/hooks.ts";
import { cn } from "../utils.ts";
import { Button } from "../ui/button.tsx";
import { Calendar } from "../ui/calendar.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";

export default ({ className }: JSX.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from
              ? (
                date.to
                  ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  )
                  : (
                    format(date.from, "LLL dd, y")
                  )
              )
              : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
