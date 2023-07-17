import { JSX } from "preact";
import { n } from "../../utils/mod.ts";

export interface NLinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  children?: preact.ComponentChildren;
}

export function NLink(props: NLinkProps) {
  const ui = (ui?: string) => ({
    ...props,
    class: n([
      "n-link n-transition hover:n-link-hover n-link-base",
      props.class,
      ui,
    ]),
  });

  return (
    <a {...ui()}>
      {props.children}
    </a>
  );
}
