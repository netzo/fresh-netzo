import { HandlerContext, Handlers } from 'fresh/server.ts'
import { pick } from 'radash'
import { rows } from '../../../data/mod.ts'

export interface Sale {
  'id': string
  'productId': string
  'Dispatched revenue (Current Date)': number
  'Dispatched revenue (Compare Date)': number
  'YoY Amount': number
  'YoY %': number
  'Y&Y': number
  'Dispatched units': number
  'Dispatched units LY': number
  // 'YoY Amount': number
  // 'YoY %': number
  'Customer returns': number
  'Customer returns LY': number
  // 'YoY Amount': number
  // 'YoY %': number
}

export const sales: Sale[] = rows.map((row) =>
  pick(row, [
    'id',
    'productId',
    'Dispatched revenue (Current Date)',
    'Dispatched revenue (Compare Date)',
    'YoY Amount',
    'YoY %',
    'Y&Y',
    'Dispatched units',
    'Dispatched units LY',
    // 'YoY Amount',
    // 'YoY %',
    'Customer returns',
    'Customer returns LY',
    // 'YoY Amount',
    // 'YoY %',
  ])
)

export const handler: Handlers = {
  GET(_req: Request, _ctx: HandlerContext) {
    const data = sales
    return Response.json(data)
  },
}
