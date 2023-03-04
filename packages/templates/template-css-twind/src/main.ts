import { serve } from 'https://deno.land/std@0.159.0/http/server.ts'
import { ssr, tw } from './twind.ts'

serve((_req: Request): Response => {
  const html = ssr({ title: 'Netzo', renderBody })
  return new Response(html, {
    headers: {
      'access-control-allow-origin': '*',
      'content-type': 'text/html',
    },
  })
})

function renderBody() {
  return `
    <h1 class="${tw`text(3xl blue-500)`}">Hello from Deno</h1>
    <form>
      <input name="user">
      <button class="${tw`text(red-500)`}">
        Submit
      </button>
    </form>
  `
}
