import type { FreshContext } from "fresh";
import { NetzoState } from "../../../mod.ts";
import type { ToolbarConfig, ToolbarState } from "../plugin.ts";

export function createToolbarState(config: ToolbarConfig) {
  return async (_req: Request, ctx: FreshContext<NetzoState>) => {
    ctx.state.toolbar ??= {
      projectId: Deno.env.get("NETZO_PROJECT_ID")!,
      locale: config.locale,
      denoJson: config.denoJson,
      links: config.links,
    } satisfies ToolbarState;

    return await ctx.next();
  };
}
