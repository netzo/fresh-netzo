/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'preact'
import {
  BadgeDelta,
  Card,
  DeltaType,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'

interface Sale {
  name: string
  leads: number
  sales: string
  quota: string
  variance: string
  region: string
  delta: string
  deltaType: DeltaType
}

const sales: Sale[] = [
  {
    name: 'Peter Doe',
    leads: 45,
    sales: '1,000,000',
    quota: '1,200,000',
    variance: 'low',
    region: 'Region A',
    delta: 'overperforming',
    deltaType: 'moderateIncrease',
  },
  {
    name: 'Lena Whitehouse',
    leads: 35,
    sales: '900,000',
    quota: '1,000,000',
    variance: 'low',
    region: 'Region B',
    delta: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Phil Less',
    leads: 52,
    sales: '930,000',
    quota: '1,000,000',
    variance: 'medium',
    region: 'Region C',
    delta: 'underperforming',
    deltaType: 'moderateDecrease',
  },
  {
    name: 'John Camper',
    leads: 22,
    sales: '390,000',
    quota: '250,000',
    variance: 'low',
    region: 'Region A',
    delta: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Max Balmoore',
    leads: 49,
    sales: '860,000',
    quota: '750,000',
    variance: 'low',
    region: 'Region B',
    delta: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Peter Moore',
    leads: 82,
    sales: '1,460,000',
    quota: '1,500,000',
    variance: 'low',
    region: 'Region A',
    delta: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Joe Sachs',
    leads: 49,
    sales: '1,230,000',
    quota: '1,800,000',
    variance: 'medium',
    region: 'Region B',
    delta: 'underperforming',
    deltaType: 'moderateDecrease',
  },
]

export default () => {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className='text-right'>Leads</TableHeaderCell>
            <TableHeaderCell className='text-right'>
              {' '}
              Sales ($){' '}
            </TableHeaderCell>
            <TableHeaderCell className='text-right'>
              {' '}
              Quota ($){' '}
            </TableHeaderCell>
            <TableHeaderCell className='text-right'>Variance</TableHeaderCell>
            <TableHeaderCell className='text-right'>Region</TableHeaderCell>
            <TableHeaderCell className='text-right'>Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sales.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell className='text-right'>{item.leads}</TableCell>
              <TableCell className='text-right'>{item.sales}</TableCell>
              <TableCell className='text-right'>{item.quota}</TableCell>
              <TableCell className='text-right'>{item.variance}</TableCell>
              <TableCell className='text-right'>{item.region}</TableCell>
              <TableCell className='text-right'>
                <BadgeDelta deltaType={item.deltaType} size='xs'>
                  {item.delta}
                </BadgeDelta>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
