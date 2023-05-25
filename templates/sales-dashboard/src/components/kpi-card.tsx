/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from '@tremor/react'

// interface Kpi {
//   title: string
//   metric: string
//   progress: number
//   target: string
//   delta: string
//   deltaType: string
// }

export function KpiCard({ item }) {
  return (
    <Card>
      <Flex alignItems='items-start'>
        <div truncate={true}>
          <Text>{item.title}</Text>
          <Metric truncate={true}>{item.metric}</Metric>
        </div>
        <BadgeDelta deltaType={item.deltaType} text={item.delta} />
      </Flex>
      <Flex marginTop='mt-4' spaceX='space-x-2'>
        <Text truncate={true}>{`${item.progress}% (${item.metric})`}</Text>
        <Text>{item.target}</Text>
      </Flex>
      <ProgressBar percentageValue={item.progress} marginTop='mt-2' />
    </Card>
  )
}
