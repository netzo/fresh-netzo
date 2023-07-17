import { JSX } from "preact";
import { n } from "../../utils/mod.ts";

export interface NChipProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  icon?: string;
}

export const NChip = (props: NChipProps) => {
  const ui = (ui?: string) => ({
    ...props,
    class: n(["n-chip", props.class, ui]),
  });

  return (
    <span {...ui()}>
      {props.icon && <NIcon icon={props.icon} />}
      {props.children}
    </span>
  );
};
