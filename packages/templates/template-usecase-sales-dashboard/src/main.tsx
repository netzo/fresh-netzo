/** @jsx h */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { h } from 'https://esm.sh/preact@10.11.3'
import { renderToString } from 'https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.11.3'
import {
  Block,
  Card,
  ColGrid,
  Flex,
  Text,
  Title,
} from 'https://esm.sh/@tremor/react?alias=react:preact/compat,react-dom:preact/compat&deps=preact@10.11.3'
import { KpiCard } from './components/kpi-card.tsx'
import { SalesTable } from './components/sales-table.tsx'
import { getDataKpis, getDataSales } from './data/mod.ts'

const [kpis, sales] = await Promise.all([getDataKpis(), getDataSales()])

// Dashboard Settings
const title = 'Sales Dashboard'
const description =
  'A sales dashboard to track performance of sales teams in real-time, and provides a variety of metrics to help make informed decisions.'

function handler(_req: Request): Promise<Response> {
  const page = (
    <html>
      <head>
        <title>{title} | Netzo</title>
        <meta name='description' content={description} />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/@tremor/react@1.0.7/dist/esm/tremor.css'
        />
      </head>
      <body>
        <main style='padding: 24px;'>
          <Flex justifyContent='justify-between' spaceX='space-x-2'>
            <Flex>
              <svg
                style='margin-right: 24px;'
                width='64'
                height='64'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7H12Z'
                >
                </path>
              </svg>
              <Block>
                <Title>{title}</Title>
                <Text marginTop='mt-2'>{description}</Text>
              </Block>
            </Flex>
            <a href='https://netzo.io' target='_blank'>
              <img
                src='https://netzo.io/images/built-with-netzo-light.svg'
                style='height: 32px;'
              />
            </a>
          </Flex>

          <ColGrid numColsMd={3} gapX='gap-x-6' gapY='gap-y-6' marginTop='mt-6'>
            {kpis.map((item) => <KpiCard item={item} />)}
          </ColGrid>

          <Block marginTop='mt-6'>
            <Card>
              <SalesTable items={sales} />
            </Card>
          </Block>
        </main>
      </body>
    </html>
  )

  const html = renderToString(page)

  return new Response(html, {
    headers: { 'content-type': 'text/html' },
  })
}

serve(handler)
