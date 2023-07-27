import { useSignal } from "@preact/signals";
import { forwardRef } from "preact/compat";
import { Head } from "fresh/runtime.ts";
import { NInputText } from "../mod.ts";
import { n } from "../../utils/mod.ts";
import { DatePicker } from "../../deps.ts";

export interface NInputDateRangeProps extends DatePicker {
  valueStart?: Date;
  valueEnd?: Date;
  onChange?: (dates: [Date, Date]) => void;
}

export function NInputDateRange(props: NInputDateRangeProps) {
  const today = new Date();

  const ui = (extra?: string) => ({
    selectsRange: true,
    showWeekNumbers: true,
    monthsShown: 2,
    maxDate: today,
    highlightDates: [today],
    openToDate: subMonths(new Date(), 1),
    placeholderText: "Select date range",
    showYearDropdown: true,
    todayButton: "Today",
    ...props,
    class: n(["n-input-date-range cursor-pointer", props.class, extra]),
  });

  const start = useSignal<Date>(props.valueStart ?? subMonths(today, 1));
  const end = useSignal<Date>(props.valueStart ?? today);

  const onChange = ([dateStart, dateEnd]: [Date, Date]) => {
    start.value = dateStart;
    end.value = dateEnd;
    props?.onChange?.([dateStart, dateEnd]);
  };

  const NInputTextDateRange = forwardRef(({ value, onClick }, ref) => (
    <NInputText ref={ref} value={value} onClick={onClick} readonly />
  ));

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/react-datepicker@4.16.0/dist/react-datepicker.min.css"
          rel="stylesheet"
        />
      </Head>
      <DatePicker
        {...ui()}
        selected={start.value}
        onChange={onChange}
        startDate={start.value}
        endDate={end.value}
        customInput={<NInputTextDateRange />}
      />
    </>
  );
}

function subMonths(date: Date, months: number): Date {
  const dateCopy = new Date(date); // avoid mutating original
  dateCopy.setMonth(dateCopy.getMonth() - months);
  return dateCopy;
}
