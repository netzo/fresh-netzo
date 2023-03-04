/** @jsx h */
import { h } from 'https://esm.sh/preact@10.11.3'
import {
  BadgeDelta,
  Block,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from 'https://esm.sh/@tremor/react?alias=react:preact/compat,react-dom:preact/compat&deps=preact@10.11.3'

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
        <Block truncate={true}>
          <Text>{item.title}</Text>
          <Metric truncate={true}>{item.metric}</Metric>
        </Block>
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
