import { useSignal } from "@preact/signals";
import { default as DatePicker } from "https://esm.sh/react-datepicker@4.16.0?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat";
import { Head } from "fresh/runtime.ts";
import { NInputText } from "../mod.ts";
import { n } from "../../utils/mod.ts";

export interface NInputDateRangeProps extends DatePicker {
  valueStart?: Date;
  valueEnd?: Date;
}

export function NInputDateRange(props: NInputDateRangeProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n(["n-input-date-range", props.class, extra]),
  });

  const today = new Date();
  const start = useSignal<Date>(props.valueStart ?? subMonths(today, 1));
  const end = useSignal<Date>(props.valueStart ?? today);
  const value = useSignal(`${start.value} - ${end.value}`);

  const onChange = ([dateStart, dateEnd]: [Date, Date]) => {
    start.value = dateStart;
    end.value = dateEnd;
    value.value = `${start.value} - ${end.value}`;
  };

  const onInputCustomInput = (e: Event) => {
    e.preventDefault();
    const [dateStart, dateEnd] = e.target?.value?.split(" - ");
    console.log([dateStart, dateEnd]);
    start.value = new Date(dateStart);
    end.value = new Date(dateEnd);
  };

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/react-datepicker@4.16.0/dist/react-datepicker.min.css"
          rel="stylesheet"
        />
      </Head>
      <DatePicker
        selected={start.value}
        onChange={onChange}
        startDate={start.value}
        endDate={end.value}
        selectsRange
        showWeekNumbers
        monthsShown={2}
        maxDate={new Date()}
        highlightDates={[new Date()]}
        openToDate={subMonths(new Date(), 1)}
        placeholderText="Select date range"
        showYearDropdown
        todayButton="Today"
        customInput={
          <NInputText
            value={value.value}
            onInput={onInputCustomInput}
          />
        }
      />
    </>
  );
}

function subMonths(date, months) {
  const dateCopy = new Date(date); // avoid mutating original
  dateCopy.setMonth(dateCopy.getMonth() - months);
  return dateCopy;
}
