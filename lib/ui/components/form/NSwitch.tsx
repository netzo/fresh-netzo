import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "../../utils/mod.ts";

export interface NSwitchProps extends JSX.HTMLAttributes<HTMLInputElement> {
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  children?: preact.ComponentChildren;
  onClick?: (e: MouseEvent) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

export function NSwitch(props: NSwitchProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n([
      "n-switch n-switch-base hover:n-switch-hover n-disabled:n-disabled",
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
        type="checkbox"
        class="peer absolute op0"
        checked={checked}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
      <div class="n-switch-slider n-checked:n-switch-slider-checked peer-active:n-active-base peer-focus-visible:n-focus-base n-transition">
        <div class="n-checked:n-switch-thumb-checked n-switch-thumb n-transition" />
      </div>
      {props.children}
    </label>
  );
}
