import { JSX } from "preact";
import { n } from "netzo/ui/utils/mod.ts";

export interface NIconProps extends JSX.HTMLAttributes<HTMLDivElement> {
  icon: string;
}

export const NIcon = (props: NIconProps) => {
  const ui = (extra?: string) => ({
    ...props,
    class: n([props.class, extra, props.icon]),
  });

  return <div {...ui()} />;
};
