/** @jsx h */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { h } from 'https://esm.sh/preact@10.5.15'
import { renderToString } from 'https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15'

function handler(req: Request): Response {
  const page = (
    <html>
      <head>
        <meta name='viewport' content='width=device-width' />
        <title>Project | Netzo</title>
        <link
          href='https://cdn.jsdelivr.net/npm/daisyui@1.25.4/dist/full.css'
          rel='stylesheet'
          type='text/css'
        />
        <link
          href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css'
          rel='stylesheet'
          type='text/css'
        />
      </head>
      <body>
        <div>
          <button class='btn btn-primary'>Click Me</button>
          <div class='form-control'>
            <label class='label'>
              <span class='label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='username'
              class='input input-bordered'
            />
          </div>
        </div>
      </body>
    </html>
  )
  const html = renderToString(page)
  return new Response(html, {
    headers: { 'content-type': 'text/html' },
  })
}

serve(handler)
