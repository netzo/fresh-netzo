/** @jsx h */
import { h } from 'preact'
import {
  BadgeDelta,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from 'tremor'

// interface SalesPerson {
//   name: string
//   leads: number
//   sales: string
//   quota: string
//   variance: string
//   region: string
//   status: string
//   deltaType: string
// }

export function SalesTable({ items }) {
  return (
    <Table marginTop='mt-6'>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell textAlignment='text-right'>Leads</TableHeaderCell>
          <TableHeaderCell textAlignment='text-right'>
            Sales ($)
          </TableHeaderCell>
          <TableHeaderCell textAlignment='text-right'>
            Quota ($)
          </TableHeaderCell>
          <TableHeaderCell textAlignment='text-right'>Variance</TableHeaderCell>
          <TableHeaderCell textAlignment='text-right'>Region</TableHeaderCell>
          <TableHeaderCell textAlignment='text-right'>Status</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell textAlignment='text-right'>{item.leads}</TableCell>
            <TableCell textAlignment='text-right'>{item.sales}</TableCell>
            <TableCell textAlignment='text-right'>{item.quota}</TableCell>
            <TableCell textAlignment='text-right'>{item.variance}</TableCell>
            <TableCell textAlignment='text-right'>{item.region}</TableCell>
            <TableCell textAlignment='text-right'>
              <BadgeDelta
                deltaType={item.deltaType}
                text={item.status}
                size='xs'
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
