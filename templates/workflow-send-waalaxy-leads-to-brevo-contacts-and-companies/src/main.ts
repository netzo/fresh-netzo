import { brevo } from 'netzo/apis/brevo/mod.ts'
const { api } = brevo({ apiKey: Deno.env.get('BREVO_API_KEY') })

// see https://developers.brevo.com/reference/createcontact
// see https://blog.waalaxy.com/en/synchronize-waalaxy-crms/#What%20data%20is%20synchronised

Deno.serve(async (req: Request) => {
  const event = await req.json()
  const [contact, company] = await Promise.all([
    api.contacts.post({
      "email": event?.email,
      "ext_id": event?.id,
      "attributes": {
        "FNAME": event?.firstName,
        "LNAME": event?.lastName,
        "occupation": event?.occupation,
        "location": event?.location,
        "linkedInUrl": event?.linkedinUrl,
      },
      "emailBlacklisted": false,
      "smsBlacklisted": false,
      "listIds": [],
      "updateEnabled": true,
      "smtpBlacklistSender": [
        "user@example.com"
      ]
    }),
    api.companies.post({
      "company_name": event?.companyName,
      "company_website": event?.companyWebsite,
    })
  ])
  return Response.json({ contact, company })
})
