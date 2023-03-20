//https://github.com/exhibitionist-digital/ultra/tree/main/examples/lite
import { serve } from 'https://deno.land/std@0.164.0/http/server.ts'
import { createServer } from 'https://deno.land/x/ultra@v2.1.7/server.ts'
import App from './app.tsx'
import React from 'https://esm.sh/react@18.2.0'

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

if (import.meta.main) serve(server.fetch)

export default server
