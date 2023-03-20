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
        <div class='p-4'>
          <button class='btn btn-primary'>primary</button>
          <button class='btn btn-secondary'>secondary</button>
          <button class='btn btn-accent'>accent</button>
        </div>

        <div class='p-4' data-theme='valentine'>
          <button class='btn btn-primary'>primary</button>
          <button class='btn btn-secondary'>secondary</button>
          <button class='btn btn-accent'>accent</button>
        </div>

        <div class='p-4 tabs'>
          <button class='tab tab-lifted'>Tab 1</button>
          <button class='tab tab-lifted tab-active'>Tab 2</button>
          <button class='tab tab-lifted'>Tab 3</button>
        </div>

        <div class='p-4'>
          <input type='checkbox' class='toggle toggle-primary' />
          <input type='checkbox' class='toggle toggle-secondary' />
          <input type='checkbox' class='toggle toggle-accent' />
        </div>

        <div class='card shadow-2xl w-80 m-4'>
          <figure>
            <img src='https://picsum.photos/id/1005/500/250' />
          </figure>
          <div class='card-body'>
            <h2 class='card-title'>DaisyUI Card</h2>
            <p>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit sit necessitatibus.
            </p>
          </div>
        </div>

        <div class='dropdown m-4'>
          <div tabindex='0' class='m-1 btn'>Dropdown</div>
          <ul
            tabindex='0'
            class='p-2 menu dropdown-content bg-neutral text-neutral-content rounded-box w-52'
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>

        <label for='my-modal' class='btn modal-button'>Modal</label>

        <input type='checkbox' id='my-modal' class='modal-toggle' />
        <div class='modal'>
          <div class='modal-box'>
            <p>
              Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut
              adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla
              ea quasi eligendi. Saepe velit autem minima.
            </p>
            <div class='modal-action'>
              <label for='my-modal' class='btn'>Close</label>
            </div>
          </div>
        </div>

        <ul class='steps my-4 w-full'>
          <li class='step step-primary'>Register</li>
          <li class='step step-primary'>Choose plan</li>
          <li class='step'>Purchase</li>
          <li class='step'>Receive Product</li>
        </ul>

        <div class='avatar online m-10'>
          <div class='rounded-full w-24 h-24'>
            <img src='http://daisyui.com/tailwind-css-component-profile-1@94w.png' />
          </div>
        </div>
        <div class='avatar offline m-10'>
          <div class='rounded-full w-24 h-24'>
            <img src='http://daisyui.com/tailwind-css-component-profile-2@94w.png' />
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
