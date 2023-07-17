import { JSX } from "preact";
import { n } from "../../utils/mod.ts";

export interface NIconTitleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  text?: string;
  children?: preact.ComponentChildren;
}

export const NIconTitle = (props: NIconTitleProps) => {
  const ui = (extra?: string) => ({
    ...props,
    class: n(["flex gap-3 items-center", props.class, extra]),
  });

  return (
    <div {...ui()}>
      {props.icon && <div class={props.icon} />}
      {props.children ?? <div>{props.text}</div>}
    </div>
  );
};
