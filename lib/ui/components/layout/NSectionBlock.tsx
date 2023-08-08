import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { n } from "netzo/ui/utils/mod.ts";
import { NIconTitle } from "../mod.ts";

export interface NSectionBlockProps extends JSX.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  text?: string;
  description?: string;
  containerClass?: string;
  headerClass?: string;
  collapse?: boolean;
  open?: boolean;
  padding?: boolean | string;
  children?: preact.ComponentChildren;
}

export const NSectionBlock = (props: NSectionBlockProps) => {
  const ui = (extra?: string) => ({
    containerClass: "",
    open: true,
    padding: true,
    collapse: true,
    ...props,
    class: n(["n-panel-grids-center", props.class, extra]),
  });

  const open = useSignal(props.open ?? true);

  function onToggle(e: any) {
    open.value = e.target.open;
  }

  return (
    <>
      <details class="n-section-block" open={open.value} onToggle={onToggle}>
        <summary
          class={n([
            "cursor-pointer select-none hover:bg-active p4",
            props.collapse ? "" : "pointer-events-none",
          ])}
        >
          {props.text}
          {
            /* <NIconTitle
            icon={props.icon}
            text={props.text}
            class={n([
              "text-xl transition",
              open.value ? "op100" : "op60",
              props.headerClass,
            ])}
          >
            <div>
              <div class="text-base">
                {props.text}
              </div>
              {props.description && (
                <div class="text-sm op50">
                  {props.description}
                </div>
              )}
            </div>
            <div class="flex-auto" />
            {props.collapse && (
              <NIcon
                icon="mdi-chevron-down"
                class="chevron cursor-pointer place-self-start text-base op75 transition duration-500"
              />
            )}
          </NIconTitle> */
          }
        </summary>
        {open.value && (
          <div
            class={n([
              "flex flex-col flex-gap2 pb6 pt2",
              typeof props.padding === "string"
                ? props.padding
                : props.padding
                ? "px4"
                : "",
            ])}
          >
            {props.children}
          </div>
        )}
      </details>
      <div class="x-divider" />
    </>
  );
};
