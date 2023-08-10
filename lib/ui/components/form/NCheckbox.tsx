import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "netzo/ui/utils/mod.ts";
import { NIcon } from "../mod.ts";

export interface NCheckboxProps extends JSX.HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

export function NCheckbox(props: NCheckboxProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n([
      "n-checkbox hover:n-checkbox-hover select-none items-center n-disabled:n-disabled",
      props.class,
      extra,
    ]),
  });

  const checked = useSignal(props.checked);

  const onClick = (e: MouseEvent) => {
    checked.value = !checked.value;
    props.onClick?.(e);
  };

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") checked.value = !checked.value;
    props.onKeyPress?.(e);
  };

  return (
    <label {...ui()} checked={checked.value}>
      <input
        type="checkbox"
        class="peer absolute op0"
        checked={checked.value}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
      <span class="n-checkbox-box n-checked:n-checkbox-box-checked peer-active:n-active-base peer-focus-visible:n-focus-base n-transition">
        <NIcon
          class={`n-checkbox-icon scale-0 transform op0 n-transition ${
            checked.value ? "n-checked:scale-100 n-checked:op100" : ""
          }`}
        />
      </span>
      <span class={`n-transition ${checked.value ? "" : "op50"}`}>
        {props.children}
      </span>
    </label>
  );
}
