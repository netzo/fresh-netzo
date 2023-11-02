Deno.serve((_request: Request): Response => {
  return Response.json({ message: "Hello World!" });
});