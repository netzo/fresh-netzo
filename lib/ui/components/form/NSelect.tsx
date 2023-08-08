import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "netzo/ui/utils/mod.ts";
import { NIcon } from "../mod.ts";

export interface NSelectProps extends JSX.HTMLAttributes<HTMLSelectElement> {
  value?: any;
  placeholder?: string;
  icon?: string;
  disabled?: boolean;
  options?: JSX.HTMLAttributes<HTMLOptionElement[]>;
  children?: preact.ComponentChildren;
}

export function NSelect(props: NSelectProps) {
  const ui = (extra?: string) => ({
    value: undefined,
    placeholder: "",
    disabled: false,
    icon: "",
    ...props,
    class: n([
      "w-full flex-auto n-bg-base !outline-none",
      props.class,
      extra,
    ]),
  });

  const value = useSignal(props.value);

  const onInput = (e: Event) => {
    value.value = e.target.value;
  };

  return (
    <div class="n-input-text flex flex items-center border n-border-base rounded px-2 py-1 focus-within:n-focus-base focus-within:border-context n-bg-base">
      {props.icon && (
        <NIcon icon={props.icon} class="mr-0.4em text-1.1em op50" />
      )}
      <select
        {...ui()}
        disabled={props.disabled}
        value={value.value}
        onInput={onInput}
      >
        {props.placeholder && (
          <option value="" disabled hidden>{props.placeholder}</option>
        )}
        {props.children ?? (
          props?.options?.map((option) => <option {...option} />)
        )}
      </select>
    </div>
  );
}
