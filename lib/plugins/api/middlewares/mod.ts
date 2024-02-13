import type { FreshContext } from "../../../deps/$fresh/server.ts";
import type { NetzoState } from "../../../mod.ts";

// const skip = (_req: Request, ctx: FreshContext<NetzoState>) => {
//   if (!["route"].includes(ctx.destination)) return true;
//   return false;
// };

export async function handleErrors(
  _req: Request,
  ctx: FreshContext<NetzoState>,
) {
  // if (skip(req, ctx)) return await ctx.next();

  try {
    return await ctx.next();
  } catch (error) {
    if ("toJSON" in error && typeof error.toJSON === "function") {
      const { name, message, code } = error;
      return new Response(`${name}: ${message}`, { status: code });
    }
    return new Response(error.message, { status: 500 });
  }
}
