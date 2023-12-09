import { useState } from "../../deps/preact/hooks.ts";
import { Calendar } from "../ui/calendar.tsx";

export default () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
};
