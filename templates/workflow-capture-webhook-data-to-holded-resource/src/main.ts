import { holded } from 'netzo/apis/holded/mod.ts'
const { api } = holded({ apiKey: Deno.env.get('HOLDED_API_KEY') })

// see https://developers.holded.com/reference

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




