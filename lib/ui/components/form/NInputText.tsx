import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "../../utils/mod.ts";
import { NIcon } from "../mod.ts";

export interface NInputTextProps extends JSX.HTMLAttributes<HTMLInputElement> {
  value?: string | number;
  icon?: string;
  onInput?: (e: Event) => void;
}

export function NInputText(props: NInputTextProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n([
      "ml-0.4em w-full flex-auto n-bg-base !outline-none",
      props.class,
      extra,
    ]),
  });

  const value = useSignal(props.value);

  const onInput = (e: Event) => {
    value.value = e.target.value;
    props?.onInput?.(e);
  };

  return (
    <div class="n-input-text flex flex items-center border n-border-base rounded py-1 pl-1 pr-2 focus-within:n-focus-base focus-within:border-context n-bg-base">
      {props.icon && (
        <NIcon icon={props.icon} class="ml-0.3em mr-0.1em text-1.1em op50" />
      )}
      <input {...ui()} value={value.value} onInput={onInput} />
    </div>
  );
}
