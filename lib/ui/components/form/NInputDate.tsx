import { useSignal } from "@preact/signals";
import { forwardRef } from "preact/compat";
import { Head } from "fresh/runtime.ts";
import { NInputText } from "../mod.ts";
import { n } from "netzo/ui/utils/mod.ts";
import DatePicker from "react-datepicker";

export interface NInputDateProps extends DatePicker {
  value?: Date;
  onChange?: (date: Date) => void;
}

export function NInputDate(props: NInputDateProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n(["n-input-date cursor-pointer", props.class, extra]),
  });

  const value = useSignal<Date>(props.value ?? new Date());

  const onChange = (date: Date) => {
    value.value = date;
    props?.onChange?.(date);
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
        selected={value.value}
        onChange={onChange}
        placeholderText="Select date range"
        showYearDropdown
        todayButton="Today"
        customInput={<NInputTextDateRange />}
      />
    </>
  );
}
