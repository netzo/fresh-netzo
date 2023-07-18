import { brevo } from 'netzo/apis/brevo/mod.ts'
const { api } = brevo({ apiKey: Deno.env.get('BREVO_API_KEY') })

// see https://developers.brevo.com/reference/createcontact

Deno.serve(async (req: Request) => {
  const event = await req.json()
  const [resource1, resource2] = await Promise.all([
    api.endpoint1.post({
      // POST_BODY_1
      //e.g.  event?.email
    }),
    api.endpoint2.post({
      // POST_BODY_2
      //e.g.  event?.email
    }),
  ])

  return Response.json({ resource1, resource2 })
})
