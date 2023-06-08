import cheetah from 'https://deno.land/x/cheetah@v0.10.0/mod.ts'
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'

const app = new cheetah()
  .get('/', () => 'Hello World')

serve(app.fetch)
