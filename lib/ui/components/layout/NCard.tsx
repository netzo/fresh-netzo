import { JSX } from "preact";
import { n } from "../../utils/mod.ts";

export interface NCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children?: preact.ComponentChildren;
}

export function NCard(props: NCardProps) {
  const ui = (extra?: string) => ({
    ...props,
    class: n(["n-card n-card-base", props.class, extra]),
  });

  return (
    <div {...ui()}>
      {props.children}
    </div>
  );
}
