import { router } from 'https://deno.land/x/rutt@0.1.0/mod.ts'

Deno.serve(
  router({
    '/': (_req: Request) => new Response('Hello World!', { status: 200 }),
  }),
)
