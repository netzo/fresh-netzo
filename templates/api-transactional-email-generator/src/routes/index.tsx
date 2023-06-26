import { HandlerContext, Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import InputSearch from '@/components/InputSearch.tsx'
import templates from '@/data/templates.json' assert { type: 'json' }
import { Data } from './[id].tsx'

const meta = {
  title: 'API Email Router',
  description:
    'An HTTP API to generate and send emails from existing templates written in JSX.',
}

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const locale = url.searchParams.get('locale') || ''
    const query = url.searchParams.get('query') || ''
    const filteredTemplates = templates
      .filter((t: Data) => locale ? t.locale === locale : true)
      .filter((t: Data) =>
        !query && t.id.toLowerCase().includes(query?.toLowerCase())
      )
    return ctx.render({ templates: filteredTemplates, locale, query })
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
          <div class='w-full max-w-3xl mx-auto'>
            <div class='sticky top-0 py-6 bg-white dark:bg-gray-900'>
              <InputSearch
                locale={props.data.locale}
                query={props.data.query}
              />
            </div>

            {props.data.templates?.length
              ? (
                <ul class='divide-y divide-gray-200 dark:divide-gray-700'>
                  {props.data.templates!.map((template: Data) => (
                    <a href={`/${template.id}`}>
                      <li class='rounded p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'>
                        <div class='flex items-center space-x-4'>
                          <div class='flex-shrink-0'>
                            <img
                              class='w-8 h-8 rounded-full'
                              src={template.avatar}
                            />
                          </div>
                          <div class='flex-1 min-w-0'>
                            <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                              {template.title}
                            </p>
                            <p class='text-sm text-gray-500 truncate dark:text-gray-400'>
                              {template.id}
                            </p>
                            <p class='mt-1 text-sm text-gray-500 truncate dark:text-gray-400'>
                              {template.description}
                            </p>
                          </div>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='32'
                            height='32'
                            viewBox='0 0 24 24'
                          >
                            <path
                              fill='currentColor'
                              d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z'
                            />
                          </svg>
                        </div>
                      </li>
                    </a>
                  ))}
                </ul>
              )
              : (
                <div class='py-12 grid gap-4 place-items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#ffffff'
                      d='m19.31 18.9l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 .88-.25 1.71-.69 2.4m-3.81.1a2.5 2.5 0 0 0 0-5a2.5 2.5 0 0 0 0 5M21 4v2H3V4h18M3 16v-2h6v2H3m0-5V9h18v2h-2.03c-1.01-.63-2.2-1-3.47-1s-2.46.37-3.47 1H3Z'
                    />
                  </svg>
                  <p class='text-center text-gray-500 dark:text-gray-400'>
                    No templates found.<br />
                    Try changing locale or search.
                  </p>
                </div>
              )}
          </div>
        </main>
      </body>
    </>
  )
}
