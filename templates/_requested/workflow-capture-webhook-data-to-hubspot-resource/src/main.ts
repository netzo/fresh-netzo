import { hubspot } from 'netzo/apis/hubspot/mod.ts'
const { api } = hubspot({ apiKey: Deno.env.get('HUBSPOT_API_KEY') })

// see https://legacydocs.hubspot.com/docs/methods/contacts

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
    })
  ])

  return Response.json({ resource1, resource2 })
})




