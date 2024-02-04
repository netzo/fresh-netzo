import type { JSX } from "../../deps/preact.ts";
import { Partial } from "netzo/deps/$fresh/runtime.ts";
import { cn } from "../utils.ts";
import { useUI } from "../../composables/use-ui.ts";

export type MainProps = JSX.IntrinsicElements["main"] & {
  /** Extra props to customize element (overwrites defaults). */
  mustAuth: boolean;
  ui?: {
    root?: JSX.IntrinsicElements["main"];
  };
};

export function Main({ className, ui = {}, ...props }: MainProps) {
  const { root } = useUI(ui, {
    root: {
      ...props,
      className: cn("flex-1", className),
    },
  });

  return props.mustAuth
    ? (
      <main {...root}>
        {props.children}
      </main>
    )
    : (
      <main {...root}>
        <Partial name="main">
          {props.children}
        </Partial>
      </main>
    );
}
