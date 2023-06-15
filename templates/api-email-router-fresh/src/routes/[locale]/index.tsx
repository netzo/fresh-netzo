/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { HandlerContext, Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import TabsLocale from '@/components/TabsLocale.tsx'
import InputSearch from '@/components/InputSearch.tsx'
import en from '@/templates/en.json' assert { type: 'json' }
import es from '@/templates/es.json' assert { type: 'json' }
import { Data } from './[templateId].tsx'

const meta = {
  title: 'API Email Router',
  description:
    'An HTTP API to generate and send emails from existing templates written in JSX.',
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const query = url.searchParams.get('q') || ''
    const allTemplates = { en, es }?.[ctx.params.locale]
    const templates = allTemplates.filter(({ id }: Data) => id.includes(query))
    return ctx.render({ templates, query })
  },
}

export default (props: PageProps) => {
  return (
    <>
      <Head>
        <title>{`${meta.title} | Netzo`}</title>
        <meta name='description' content={meta.description} />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>

      <body class='h-screen flex-col text-bg-white dark:bg-gray-900 dark:text-white'>
        <header class='flex justify-between items-center py-6 px-10'>
          <div>
            <h1 class='text-2xl mb-1 font-semibold dark:text-white'>
              {meta.title}
            </h1>
            <p class='text-sm dark:text-gray-300'>{meta.description}</p>
          </div>
          <a href='https://netzo.io' target='_blank'>
            <img
              src='https://netzo.io/images/built-with-netzo-light.svg'
              class='h-10'
            />
          </a>
        </header>

        <main class='pt-12 flex-1 grid place-items-center'>
          <TabsLocale locale={props.params.locale} />

          <div class='rounded p-2 max-w-5xl mx-auto'>
            <InputSearch />

            <ul class='pt-4 max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
              {props.data.templates!.map((template) => (
                <a href={`/${props.params.locale}/${template.id}`}>
                  <li class='rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'>
                    <div class='flex items-center space-x-4'>
                      <div class='flex-shrink-0'>
                        <svg
                          class='w-8 h-8 rounded-full'
                          xmlns='http://www.w3.org/2000/svg'
                          width='32'
                          height='32'
                          viewBox='0 0 24 24'
                        >
                          <path
                            fill='currentColor'
                            d='m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z'
                          />
                        </svg>
                      </div>
                      <div class='flex-1 min-w-0'>
                        <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                          {template.title}
                        </p>
                        <p class='text-sm text-gray-500 truncate dark:text-gray-400'>
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </>
  )
}
