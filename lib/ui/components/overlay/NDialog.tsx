import { createRef, JSX } from "preact";
import { n } from "netzo/ui/utils/mod.ts";
import { NButton, type NButtonProps } from "../mod.ts";

export interface NDialogProps extends JSX.HTMLAttributes<HTMLDialogElement> {
  buttonProps?: NButtonProps & { text?: string };
}

export const NDialog = (props: NDialogProps) => {
  const ui = (extra?: string) => ({
    ...props,
    class: n([props.class, extra]),
  });

  const dialogRef = createRef<HTMLDialogElement>();

  const onClick = (e: MouseEvent) => {
    if (dialogRef.current?.open) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  };

  return (
    <>
      <dialog {...ui()} open={props.open} ref={dialogRef}>
        {props.children}
      </dialog>

      <div>
        <NButton {...props.buttonProps} onClick={onClick}>
          {props.buttonProps?.text ?? "Open Dialog"}
        </NButton>
      </div>
    </>
  );
};
