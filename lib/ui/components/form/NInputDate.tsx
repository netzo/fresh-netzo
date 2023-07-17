import { useSignal } from "@preact/signals";
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
    class: n(["n-input-date", props.class, extra]),
  });

  const value = useSignal<Date>(props.value ?? new Date());

  const onChange = (date: Date) => {
    console.log(typeof date.getMonth === "function", date);
    value.value = date;
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
        value={value.value}
        onChange={onChange}
        placeholderText="Select date range"
        showYearDropdown
        todayButton="Today"
        customInput={
          <NInputText {...ui()} value={value.value} onChange={onChange} />
        }
      />
    </>
  );
}
