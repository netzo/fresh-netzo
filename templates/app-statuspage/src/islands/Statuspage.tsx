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
import events from '../data/events.json' assert { type: 'json' }

interface Event {
  name: string
  url: string
  status: 'up' | 'down' | 'maintenance'
  timestamp: string
}

const statusColors = { up: 'emerald', down: 'red', maintenance: 'gray' }

export default function Statuspage() {
  const groupByKey = (array: Event[], key: string): Record<string, Event[]> => {
    return array.reduce(
      (acc, obj) => ({ ...acc, [obj[key]]: (acc[obj[key]] || []).concat(obj) }),
      {},
    )
  }

  const groupedData = groupByKey(events, 'url')

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
        {Object.values(groupedData).map((event, idx) => (
          <StatuspageCard event={event} key={idx} />
        ))}
      </div>
    </main>
  )
}

function StatuspageCard({ event }) {
  return (
    <Card marginTop='mt-5'>
      <Flex>
        <div>
          <Title>{event.at(-1).name}</Title>
          <a href={event.at(-1).url} target='_blank'>
            <Text>{event.at(-1).url}</Text>
          </a>
        </div>
        <Badge
          text={event.at(-1).status}
          color={statusColors[event.at(-1).status]}
          size='xs'
        />
      </Flex>
      <Block spaceY='space-y-2'>
        <Flex>
          <Tracking marginTop='mt-3'>
            {event.map((item, index) => (
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
        <Text>{`${event.length || 0} minutes ago`}</Text>
        <Text>now</Text>
      </Flex>
    </Card>
  )
}
