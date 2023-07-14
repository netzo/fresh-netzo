import { HandlerContext, Handlers, PageProps } from 'fresh/server.ts'
import { Head } from 'fresh/runtime.ts'
import Mustache from 'mustache'
import { rest } from 'netzo/apis/rest/mod.ts'
import Header from '@/components/Header.tsx'
import Button from '@/components/Button.tsx'
import Footer from '@/components/Footer.tsx'
import templates from '@/data/templates.json' assert { type: 'json' }

export interface Data {
  locale: 'en' | 'es'
  id: string
  emailSubject: string
  pageTitle: string
  title: string
  description: string
  buttons: {
    variant: 'primary' | 'secondary'
    text: string
    href: string
    target?: string
  }[]
  caption?: string
  avatar: string
}

const { api } = rest({ baseURL: 'https://enahwxkchnfyd.x.pipedream.net' })

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url)
    const template = templates.find((t: Data) => t.id === ctx.params.id)
    if (!template) return new Response('Template not found', { status: 404 })
    const data = Object.fromEntries(url.searchParams.entries())
    const result = Mustache.render(JSON.stringify(template), data)
    return ctx.render(JSON.parse(result))
  },
  async POST(req: Request, ctx: HandlerContext) {
    const contentType = req.headers.get('content-type')
    const data = contentType?.includes('application/json')
      ? await req.json()
      : contentType?.includes('application/x-www-form-urlencoded')
      ? Object.fromEntries((await req.formData()).entries())
      : Object.fromEntries(new URL(req.url).searchParams.entries())

    const template = templates.find((t: Data) => t.id === ctx.params.id)
    const result = Mustache.render(JSON.stringify(template), data)

    await api.post(JSON.parse(result))

    return ctx.render(data)
  },
}

export default function Welcome(props: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>{`${props.data.pageTitle} | Netzo`}</title>
        <meta name='description' content={props.data.description} />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>

      <body class='grid place-items-center gap-4 max-w-2xl mx-auto text-center'>
        <Header />

        <main className='p-4'>
          <h1 className='mb-4 text-3xl font-bold'>
            {props.data.title}
          </h1>

          <p>
            {props.data.description}
          </p>

          <div class='flex justify-center space-x-1 py-6'>
            {props.data.buttons?.map((button) => <Button {...button} />)}
          </div>

          <p>
            {props.data.caption}
          </p>
        </main>

        <Footer />
      </body>
    </>
  )
}

// email:

// interface EmailOptions {
//   data: Record<string, unknown>
//   html: string
//   templateData: Record<string, unknown>
// }

// async function sendTransactionalEmail(options: EmailOptions) {
//   const { data, html, templateData } = options
//   try {
//     const plainText = html.replace(/<[^>]+>/g, '')
//     const email = await api.smtp.email.post(
//       {
//         sender: {
//           name: 'Netzo',
//           email: 'hello@netzo.io',
//         },
//         to: [
//           {
//             email: data.invitedEmail,
//             name: `${data.inviterFirstName} ${data.inviterLastName}`,
//           },
//         ],
//         replyTo: {
//           email: 'hello@netzo.io',
//           name: 'Netzo Team',
//         },
//         htmlContent: html,
//         textContent: plainText,
//         subject: templateData.emailSubject,
//       },
//     )
//     return email
//   } catch (error) {
//     console.log(error)
//   }
// }
