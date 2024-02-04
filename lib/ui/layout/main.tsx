import type { JSX } from "../../deps/preact.ts";
import { useContext } from "../../deps/preact/hooks.ts";
import { Partial } from "netzo/deps/$fresh/runtime.ts";
import { cn } from "../utils.ts";
import { useUI } from "../composables/use-ui.ts";
import { Ctx } from "@/routes/_app.tsx";

export type MainProps = JSX.IntrinsicElements["main"] & {
  /** Extra props to customize element (overwrites defaults). */
  ui?: {
    root?: JSX.IntrinsicElements["main"];
  };
};

export function Main({ className, ui = {}, ...props }: MainProps) {
  const ctx = useContext(Ctx);
  const { auth } = ctx.state.config;
  const { sessionId, sessionUser } = ctx.state.auth ?? {};

  const mustAuth = !!auth && !sessionId;

  const { root } = useUI(ui, {
    root: {
      ...props,
      className: cn("flex-1", className),
    },
  });

  return mustAuth
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
