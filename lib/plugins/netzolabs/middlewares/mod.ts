import type { FreshContext } from "fresh/server.ts";
import { NetzoState } from "../../../mod.ts";
import type { NetzolabsConfig, NetzolabsState } from "../plugin.ts";

export function createNetzolabsState(config: NetzolabsConfig) {
  return async (_req: Request, ctx: FreshContext<NetzoState>) => {
    ctx.state.netzolabs ??= {
      projectId: Deno.env.get("NETZO_PROJECT_ID")!,
      denoJson: config.denoJson,
    } satisfies NetzolabsState;

    return await ctx.next();
  };
}
