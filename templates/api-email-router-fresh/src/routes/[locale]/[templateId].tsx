/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { HandlerContext, Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import Mustache from 'mustache'
// import { brevo } from 'netzo/lib/apis/brevo/mod.ts'
import Header from '@/components/Header.tsx'
import Button from '@/components/Button.tsx'
import Footer from '@/components/Footer.tsx'
import en from '@/templates/en.json' assert { type: 'json' }
import es from '@/templates/es.json' assert { type: 'json' }

export interface Data {
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
}

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url)
    const { locale = 'en', templateId = 'users-welcome' } = ctx.params
    const q = url.searchParams.get('q') || ''
    // @ts-ignore: disable type checking for dynamic import
    const templates = { en, es }?.[locale]?.filter((t) =>
      !q && t.id.includes(q)
    )
    console.log(templates)
    // @ts-ignore: disable type checking for dynamic import
    const template = templates?.[templateId] as Data
    if (!template) return new Response('Template not found', { status: 404 })
    const data = Object.fromEntries(url.searchParams.entries())
    const result = Mustache.render(JSON.stringify(template), data)
    const response = await ctx.render(JSON.parse(result))
    return response
  },
  // async POST(req: Request, ctx: HandlerContext) {
  //   const contentType = req.headers.get('content-type')
  //   const data = contentType?.includes('application/json')
  //     ? await req.json()
  //     : contentType?.includes('application/x-www-form-urlencoded')
  //     ? Object.fromEntries((await req.formData()).entries())
  //     : Object.fromEntries(new URL(req.url).searchParams.entries())

  //   const { api } = brevo({ apiKey: Deno.env.get('BREVO_API_KEY') })

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
  //     const response = await ctx.render(data)
  //     return response
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
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

          <div class='flex space-x-2'>
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
