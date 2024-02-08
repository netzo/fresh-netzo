// import { IS_BROWSER } from "../../deps/$fresh/runtime.ts";
import type { NetzoState } from "../../mod.ts";

export function useNetzoState(ctx: FreshContext<NetzoState>) {
  const { auth } = ctx.state.config;
  const { sessionId, sessionUser } = ctx.state.auth ?? {};

  const mustAuth = !!auth && !sessionId;

  return { sessionId, sessionUser, mustAuth };
}
