import { hubspot } from 'netzo/apis/hubspot/mod.ts'
const { api } = hubspot({ apiKey: Deno.env.get('HUBSPOT_API_KEY') })

// see https://legacydocs.hubspot.com/docs/methods/contacts/create_contact
// see https://blog.waalaxy.com/en/synchronize-waalaxy-crms/#What%20data%20is%20synchronised

Deno.serve(async (req: Request) => {
  const event = await req.json()
  const [contact, company] = await Promise.all([
    api.contacts.v2.contact.post({
      'properties': [
        {
          'property': 'email',
          'value': event?.email,
        },
        {
          'property': 'firstname',
          'value': event?.firstName,
        },
        {
          'property': 'lastname',
          'value': event?.lastName,
        },
        {
          'property': 'website',
          'value': event?.company_website,
        },
        {
          'property': 'company',
          'value': event?.company_name,
        },
        {
          'property': 'phone',
          'value': event?.phone,
        },
        {
          'property': 'city',
          'value': event?.city,
        },
      ],
    }),
    api.companies.v2.companies.post({
      'properties': [
        {
          'name': 'name',
          'value': event?.company_name,
        },
        {
          'name': 'description',
          'value': event?.company_description,
        },
      ],
    }),
  ])

  return Response.json({ contact, company })
})
