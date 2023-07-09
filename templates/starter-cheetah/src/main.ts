import cheetah from 'https://deno.land/x/cheetah@v0.13.0/mod.ts'

const app = new cheetah().get('/', () => 'Hello World!')

Deno.serve(app.fetch)
