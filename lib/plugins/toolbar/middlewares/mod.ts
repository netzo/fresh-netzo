import type { MiddlewareFn } from "fresh";
import { NetzoState } from "../../../mod.ts";
import type { ToolbarConfig, ToolbarState } from "../plugin.ts";

export function createToolbarState(config: ToolbarConfig): MiddlewareFn<NetzoState> {
  return async (ctx) => {
    ctx.state.toolbar ??= {
      projectId: Deno.env.get("NETZO_PROJECT_ID")!,
      locale: config.locale,
      denoJson: config.denoJson,
      links: config.links,
    } satisfies ToolbarState;

    return await ctx.next();
  };
}
