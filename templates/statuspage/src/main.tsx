/** @jsx h */
import { serve } from 'http/server.ts'
import { h } from 'preact'
import { renderToString } from 'preact-render-to-string'
import {
  Badge,
  Block,
  Callout,
  Card,
  Flex,
  Text,
  Title,
  Tracking,
  TrackingBlock,
} from '@tremor/react'
import data from './data.json' assert { type: 'json' }

interface Item {
  name: string
  url: string
  status: 'up' | 'down' | 'maintenance'
  timestamp: string
}

const statusColors = { up: 'emerald', down: 'red', maintenance: 'gray' }

function Statuspage({ data }) {
  // TODO: add custom business logic to fetch and transform data to match Item interface
  const groupByKey = (array: Item[], key: string): Record<string, Item[]> => {
    return array.reduce(
      (acc, obj) => ({ ...acc, [obj[key]]: (acc[obj[key]] || []).concat(obj) }),
      {},
    )
  }

  const groupedData = groupByKey(data, 'url')

  const systemsIndownCount =
    Object.keys(groupedData).filter((key) =>
      groupedData[key].at(-1).status === 'down'
    )?.length ?? 0

  const BadgeStatus = ({ status }) => (
    <Badge text={status} color={statusColors[status]} size='xs' />
  )

  return (
    <main style='padding: 24px 48px;'>
      <Flex justifyContent='justify-space-between'>
        <Flex justifyContent='justify-start' spaceX='space-x-2'>
          <Title>Statuspage</Title>
        </Flex>
        <a href='https://netzo.io' target='_blank'>
          <img
            src='https://netzo.io/images/built-with-netzo-light.svg'
            style='height: 32px;'
          />
        </a>
      </Flex>
      <Flex marginTop='mt-2' justifyContent='justify-start' spaceX='space-x-1'>
        <Text>Tracks the</Text>
        <BadgeStatus status='up' />,
        <BadgeStatus status='down' />
        <Text>and</Text>
        <BadgeStatus status='maintenance' />
        <Text>
          status of a (multiple) services over time. Note that the data used in
          this template is mock data and is not the real for the services.
        </Text>
      </Flex>

      {systemsIndownCount
        ? (
          <Callout
            title={systemsIndownCount === 1
              ? '1 system is down'
              : `${systemsIndownCount} systems are down`}
            color={statusColors['down']}
            marginTop='mt-4'
          />
        )
        : (
          <Callout
            title='All systems up'
            color={statusColors['up']}
            marginTop='mt-3'
          />
        )}

      <div style='margin-top: 36px;'>
        {Object.values(groupedData).map((data, idx) => (
          <StatuspageCard data={data} key={idx} />
        ))}
      </div>
    </main>
  )
}

function StatuspageCard({ data }) {
  return (
    <Card marginTop='mt-5'>
      <Flex>
        <div>
          <Title>{data.at(-1).name}</Title>
          <a href={data.at(-1).url} target='_blank'>
            <Text>{data.at(-1).url}</Text>
          </a>
        </div>
        <Badge
          text={data.at(-1).status}
          color={statusColors[data.at(-1).status]}
          size='xs'
        />
      </Flex>
      <Block spaceY='space-y-2'>
        <Flex>
          <Tracking marginTop='mt-3'>
            {data.map((item, index) => (
              <TrackingBlock
                key={item._id}
                color={statusColors[item.status]}
                tooltip={item.status}
              />
            ))}
          </Tracking>
        </Flex>
      </Block>
      <Flex marginTop='mt-3'>
        <Text>{`${data.length || 0} minutes ago`}</Text>
        <Text>now</Text>
      </Flex>
    </Card>
  )
}

function handler(req: Request): Promise<Response> {
  const page = (
    <html>
      <head>
        <title>Statuspage | Netzo</title>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/@tremor/react@1.0.7/dist/esm/tremor.css'
        />
      </head>
      <body>
        <Statuspage data={data} />
      </body>
    </html>
  )

  const html = renderToString(page)

  return new Response(html, {
    headers: { 'content-type': 'text/html' },
  })
}

serve(handler)
