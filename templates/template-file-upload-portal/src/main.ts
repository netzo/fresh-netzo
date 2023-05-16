import { jsx, serve } from 'https://deno.land/x/netzo@v0.1.59/mod.ts'
import { app } from './components/app.tsx'

serve({ '*': (_req: Request) => jsx(app) })
