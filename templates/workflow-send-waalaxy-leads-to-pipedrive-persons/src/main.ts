import { pipedrive } from 'netzo/apis/pipedrive/mod.ts'
const { api } = pipedrive({ apiKey: Deno.env.get('PIPEDRIVE_API_KEY') })

// see https://developers.pipedrive.com/docs/api/v1/Leads#getLeads
// see https://blog.waalaxy.com/en/synchronize-waalaxy-crms/#What%20data%20is%20synchronised

Deno.serve(async (req: Request) => {
  const event = await req.json()
  const [person] = await Promise.all([
    api.persons.post({
      'name': `${event?.firstName} ${event?.lastName}`,
      'email': [
        {
          'value': event?.email,
          'primary': 'TRUE',
        },
      ],
      'phone': [
        {
          'value': event?.phone,
          'primary': 'TRUE',
        },
      ],
      'visible_to': '1',
      'marketing_status': 'no_consent',
    }),
  ])

  return Response.json({ person })
})
