await import("@/netzo.config.ts"); // loads project configuration

Deno.serve((_request: Request): Response => {
  return Response.json(Deno.env.toObject());
});
