import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { NTextInput } from "../mod.ts";

export interface NTextInputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  value?: string | number;
  icon?: string;
}

export function NDateRangeInput(props: NTextInputProps) {
  const valueStart = useSignal(props.value);
  const valueEnd = useSignal(props.value);

  const onInputStart = (e: Event) => {
    value.value = e.target.value;
  };

  const onInputEnd = (e: Event) => {
    value.value = e.target.value;
  };

  if (IS_BROWSER) {
    const elem = document.getElementById("foo");
    const rangepicker = new DateRangePicker(elem, {});
    console.log(document.querySelector("input").rangepicker);
  }

  return (
    <div id="foo">
      <NTextInput
        type="text"
        name="start"
        value={valueStart}
        onInput={onInputStart}
      />
      <span>to</span>
      <NTextInput
        type="text"
        name="end"
        value={valueEnd}
        onInput={onInputEnd}
      />
    </div>
  );
}
