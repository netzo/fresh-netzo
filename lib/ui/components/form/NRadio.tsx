import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "../../utils/mod.ts";

export interface NRadioProps extends JSX.HTMLAttributes<HTMLInputElement> {
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

export function NRadio(props: NRadioProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n([
      "n-radio inline-flex hover:n-radio-hover select-none items-center n-disabled:n-disabled",
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
    <label {...ui()} checked={checked}>
      <input
        type="radio"
        class="peer absolute op0"
        checked={checked}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
      <span class="n-radio-box n-checked:n-radio-box-checked peer-active:n-active-base peer-focus-visible:n-focus-base n-transition">
        <div class="n-radio-inner n-checked:n-radio-inner-checked n-transition" />
      </span>
      <span>
        {props.children}
      </span>
    </label>
  );
}
