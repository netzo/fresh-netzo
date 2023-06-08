import { Hono } from 'https://deno.land/x/hono@v3.2.5/mod.ts'
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'

const app = new Hono()

app.get('/', (c) => c.text('Hello Deno!'))

serve(app.fetch)
