import { JSX } from "preact";
import { n } from "../../utils/mod.ts";
import { NIcon } from "../mod.ts";

export interface NIconButtonProps
  extends JSX.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export const NIconButton = (props: NIconButtonProps) => {
  const ui = (extra?: string) => ({
    ...props,
    class: n(["n-transition n-icon-button", props.class, extra]),
  });

  return props.href
    ? (
      <a {...ui(props.disabled ? "n-disabled op10" : "")}>
        <NIcon icon={props.icon} />
      </a>
    )
    : (
      <button {...ui(props.disabled ? "n-disabled op10" : "")}>
        <NIcon icon={props.icon} />
      </button>
    );
};
