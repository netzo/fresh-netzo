import { JSX } from "preact";
import { n } from "../../utils/mod.ts";

export interface NIconProps extends JSX.HTMLAttributes<HTMLDivElement> {
  icon: string;
}

export const NIcon = (props: NIconProps) => {
  const ui = (ui?: string) => ({
    ...props,
    class: n([props.class, ui, props.icon]),
  });

  return <div {...ui()} />;
};
