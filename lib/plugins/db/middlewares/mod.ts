import type { FreshContext } from "../../../deps/$fresh/server.ts";
import type { NetzoState } from "../../../mod.ts";

export async function handleErrors(
  _req: Request,
  ctx: FreshContext<NetzoState>,
) {
  try {
    return await ctx.next();
  } catch (error) {
    if ("toResponse" in error && typeof error.toResponse === "function") {
      return error.toResponse();
    }
    return new Response(error.message, { status: 500 });
  }
}
