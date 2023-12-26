import { FreshContext } from "$fresh/server.ts";

export async function handler(_req: Request, ctx: FreshContext) {
  const isNotFound = ["notFound"].includes(ctx.destination);
  const isApi = ctx.url.pathname.startsWith("/api");
  if (isNotFound && !isApi) {
    ctx.url.pathname = "/clients";
    return Response.redirect(ctx.url.href, 307);
  }
  const resp = await ctx.next();
  return resp;
}
