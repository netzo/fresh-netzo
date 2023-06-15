import { MiddlewareHandlerContext } from "$fresh/server.ts";

export function handler(
  req: Request,
  ctx: MiddlewareHandlerContext
) {
  const url = new URL(req.url);
  if (url.pathname === "/") {
    return new Response("", {
      status: 307,
      headers: { Location: "/en" },
    });
  }
  return ctx.next();
}