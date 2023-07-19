import { useSignal } from "@preact/signals";
import { forwardRef } from "preact/compat";
// IMPORTANT: somehow only working when importing here and not in "deps.ts"
import { default as DatePicker } from "https://esm.sh/react-datepicker@4.16.0?alias=react:preact/compat,react-dom:preact/compat,@types/react:preact/compat&external=preact/compat";
import { Head } from "fresh/runtime.ts";
import { NInputText } from "../mod.ts";
import { n } from "../../utils/mod.ts";

export interface NInputDateProps extends DatePicker {
  value?: Date;
}

export function NInputDate(props: NInputDateProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n(["n-input-date cursor-pointer", props.class, extra]),
  });

  const value = useSignal<Date>(props.value ?? new Date());

  const onChange = (date: Date) => {
    console.log(date);
    value.value = date;
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
