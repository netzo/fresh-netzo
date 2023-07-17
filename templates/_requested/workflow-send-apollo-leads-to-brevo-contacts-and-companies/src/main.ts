import { brevo } from 'netzo/apis/brevo/mod.ts'
const { api } = brevo({ apiKey: Deno.env.get('BREVO_API_KEY') })

Deno.serve((req: Request) => {
  const event = await req.json()
  const [products, users] = await Promise.all([
    api.products.post({
      id: event?.id,
      userId: event.user?.id,
      userName: event.user?.name 'Unknown',
      productId: event.product?.id,
      productAsin: event.product?.asin ?? 'Unknown',
      productName: event.product?.name ?? 'Unknown'
    }),
    api.users.post(body)
  ])
  return Response.json({ products, users })
})