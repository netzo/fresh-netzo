/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import { signal } from '@preact/signals'
import { Card, Grid, Tab, TabList } from '@tremor/react'
import MetricCard, { type Category } from './MetricCard.tsx'
import TableCard from './TableCard.tsx'
// import ChartCard from './ChartCard.tsx'

const categories: Category[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456',
    delta: '34.3%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Profit',
    metric: '$ 40,598',
    metricPrev: '$ 45,564',
    delta: '10.9%',
    deltaType: 'moderateDecrease',
  },
  {
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856',
    delta: '25.3%',
    deltaType: 'moderateIncrease',
  },
]

const selectedView = signal('1')

export default function Home() {
  return (
    <>
      <TabList
        defaultValue='1'
        onValueChange={(value) => selectedView.value = value}
        className='mt-6'
      >
        <Tab value='1' text='Overview' />
        <Tab value='2' text='Detail' />
      </TabList>

      {selectedView.value === '1'
        ? (
          <>
            <Grid numColsMd={2} numColsLg={3} className='gap-6 mt-6'>
              {categories.map((item) => (
                <MetricCard key={item.title} item={item} />
              ))}
            </Grid>

            <div className='mt-6'>
              <TableCard />
            </div>
          </>
        )
        : (
          <div className='mt-6'>
            {/* <ChartCard /> */}
            <TableCard />
          </div>
        )}
    </>
  )
}
