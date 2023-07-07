import { HandlerContext, Handlers } from 'fresh/server.ts'
import { products } from './index.ts'

export const handler: Handlers = {
  GET(_req: Request, ctx: HandlerContext) {
    const data = products.filter(({ id }) => id === ctx.params.id)
    return Response.json(data)
  },
}
