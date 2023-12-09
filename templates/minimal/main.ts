await import("./app.netzo.ts"); // loads project configuration

Deno.serve((_request: Request): Response => {
  return Response.json({ hello: "world" });
});
