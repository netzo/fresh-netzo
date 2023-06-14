/** @jsx h */
import { h, jsx, serve } from 'netzo/mod.ts'
import { CSS, render } from 'gfm/mod.ts'
import * as sendinblue from './sendinblue.ts'
import { HtmlTemplate } from './templates.tsx'
import emailTemplates from './en.json' assert { type: 'json' }

const projectId = Deno.env.get('NETZO_PROJECT_ID')
const projectURL = `https://${Deno.env.get('DENO_DEPLOYMENT_ID')}.netzo.io`

async function handler(req: Request, _connInfo, params): Promise<Response> {
  const url = new URL(req.url)
  const templateId = url?.pathname // templateId is always second
  console.log(templateId)
  switch (req.method) {
    case 'GET': {
      if (templateId) {
        return jsx(<HtmlTemplate page={templateId} />)
      } else {
        const markdownResponse = await fetch(
          `https://api.netzo.io/projects/${projectId}/readme.md`,
        )
        const readme = await markdownResponse.text()
        const body = render(readme, projectURL)
        const html = `
        <!DOCTYPE html>
          <html lang="een">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                main {
                  max-width: 800px;
                  margin: 0 auto;
                }
                ${CSS}
              </style>
            </head>
            <body>
              <main data-color-mode="light" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
                ${body}
              </main>
            </body>
          </html>
        `
        return new Response(html, { headers: { 'content-type': 'text/html' } })
      }
    }
    case 'POST': {
      try {
        const data = await req.json()
        const htmlResponse = jsx(
          <HtmlTemplate page={templateId} data={data} />,
          { headers },
        )
        const html = await htmlResponse.text()
        const templateData = emailTemplates[templateId]
        const email = await sendinblue.sendTransactionalEmail({
          data,
          html,
          templateData,
        })

        return new Response(email, { headers: { 'content-type': 'text/html' } })
      } catch (error) {
        console.log(error)
      }
    }

    default:
      return new Response('Invalid method', { status: 405 })
  }
}

serve({
  '/': handler,
  '/newsletter-subscription-doi': handler,
  '/workspace-send-invitation': handler,
  '/users-welcome': handler,
  '/users-inactivity-6months': handler,
  '/website-contact-form-autoresponse': handler,
  404: () => new Response('Not found', { status: 405, headers }),
})
