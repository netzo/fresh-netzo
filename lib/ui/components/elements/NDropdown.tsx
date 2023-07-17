import { createRef, JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "../../utils/mod.ts";
import { NButton, type NButtonProps } from "../mod.ts";

export interface NDropdownProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: boolean;
  buttonProps?: NButtonProps & { text?: string };
}

export const NDropdown = (props: NDropdownProps) => {
  const ui = (extra?: string) => ({
    ...props,
    class: n([
      "absolute z-100 border n-border-base rounded shadow n-transition n-bg-base",
      props.class,
      extra,
    ]),
  });

  const dropdownRef = createRef<HTMLDivElement>();

  const open = useSignal(props.value ?? false);

  const onClick = (e: MouseEvent) => {
    open.value = !open.value;
  };

  const onClickOutside = (e: MouseEvent) => {
    open.value = false;
  };

  return (
    <div ref={dropdownRef} class="relative">
      <NButton {...props.buttonProps} onClick={onClick}>
        Dropdown
      </NButton>

      {open.value && (
        <div
          {...ui(
            open.value ? "op-100" : "op0 pointer-events-none -translate-y-1",
          )}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
