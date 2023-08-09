import { useState } from "preact/hooks";
import { Calendar } from "netzo/ui/components/ui/calendar.tsx";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}
