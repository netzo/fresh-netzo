import { JSX } from "preact";
import { n } from "../../utils/mod.ts";
import { NIcon } from "../mod.ts";

export interface NButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  prependIcon?: string;
  appendIcon?: string;
  onClick?: (e: MouseEvent) => void;
}

export const NButton = (props: NButtonProps) => {
  const ui = (ui?: string) => ({
    ...props,
    class: n([
      "n-button active:n-button-active focus-visible:n-focus-base n-transition hover:n-button-hover n-disabled:n-disabled",
      props.class,
      ui,
    ]),
  });

  const getChildren = (props: NButtonProps) => {
    const { prependIcon, children, appendIcon } = props;
    return (
      <>
        {prependIcon && <NIcon icon={prependIcon} class="n-button-icon" />}
        {children}
        {appendIcon && <NIcon icon={appendIcon} class="n-button-icon" />}
      </>
    );
  };

  return props.href
    ? (
      <a {...ui()}>
        {getChildren(props)}
      </a>
    )
    : (
      <button {...ui()}>
        {getChildren(props)}
      </button>
    );
};
