import { json, jsx, serve } from 'https://deno.land/x/sift@0.6.0/mod.ts'

const App = () => (
  <div>
    <h1>Hello World!</h1>
  </div>
)

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
)

serve({
  '/': () => jsx(<App />),
  '/api': () => json({ message: 'Hello World!' }),
  '404': () => jsx(<NotFound />, { status: 404 }),
})
