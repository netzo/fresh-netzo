/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { serve } from 'https://deno.land/std@0.176.0/http/server.ts'
import { createServer } from 'ultra/server.ts'
import App from './app.tsx'

const server = await createServer({
  importMapPath: import.meta.resolve('./import_map.json'),
  browserEntrypoint: import.meta.resolve('./app.tsx'),
})

server.get('*', async (context) => {
  /**
   * Render the request
   */
  const result = await server.render(<App />)

  return context.body(result, 200, {
    'content-type': 'text/html; charset=utf-8',
  })
})

if (import.meta.main) {
  serve(server.fetch)
}

export default server
