import { holded } from 'netzo/apis/holded/mod.ts'
const { api } = holded({ apiKey: Deno.env.get('HOLDED_API_KEY') })

// see https://developers.holded.com/reference/api-key
// see https://blog.waalaxy.com/en/synchronize-waalaxy-crms/#What%20data%20is%20synchronised

Deno.serve(async (req: Request) => {
  const event = await req.json()
  const [contact] = await Promise.all([
    api.contacts.post(
      {
        "name": event?.firstName,
        "email": event?.email,
        "mobile": event?.phone,
        "phone": event?.phone,
        "isperson": true,
        "socialNetworks": {
          "website": event?.linkedinUrl,
        },
        "tags": [
          `${event?.occupation}`
        ],
        "note": "Contact accepted LinkedIn invitation",
      }
    )
  ])
  return Response.json({ contact })
})





