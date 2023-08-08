import { n } from "netzo/ui/utils/mod.ts";
import { NIcon } from "../mod.ts";

export interface NTipProps {
  icon?: string;
}

export function NTip(props: NTipProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n(["n-tip n-tip-base", props.class, extra]),
  });

  return (
    <div {...ui()}>
      {props.icon && <NIcon icon={props.icon} class="n-tip-icon" />}
      <div>
        {props.children}
      </div>
    </div>
  );
}
