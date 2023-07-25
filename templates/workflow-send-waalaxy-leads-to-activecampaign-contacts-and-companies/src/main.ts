import { activecampaign } from "netzo/apis/activecampaign/mod.ts";
const { api } = activecampaign({
  apiKey: Deno.env.get("ACTIVECAMPAIGN_API_KEY"),
});

// see https://developers.activecampaign.com/reference/create-a-new-contact
// see https://blog.waalaxy.com/en/synchronize-waalaxy-crms/#What%20data%20is%20synchronised

Deno.serve(async (req: Request) => {
  const event = await req.json();
  const [contact, company] = await Promise.all([
    api.contacts.post({
      "contact": {
        "email": event?.email,
        "firstName": event?.firstName,
        "lastName": event?.lastName,
        "phone": event?.phone,
        "fieldValues": [],
      },
    }),
    api.accounts.post({
      "account": {
        "name": event?.companyName,
        "accountUrl": event?.companyWebsite,
        "owner": 1,
        "fields": [],
      },
    }),
  ]);

  // Create a function that calls the assosiation endpoint and link the contact to the company using the d in contact and id in company
  // https://developers.activecampaign.com/reference/create-an-account-1

  const association = await api.accountContacts.post({
    "accountContact": {
      "contact": contact?.contact?.id,
      "account": company?.account?.id,
      "jobTitle": event?.occupation,
    },
  });

  return Response.json({ contact, company, association });
});
