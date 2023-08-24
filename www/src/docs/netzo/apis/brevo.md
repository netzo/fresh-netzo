<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/brevo.svg" alt="netzo/apis/brevo" class="mb-5 w-75px">

# Brevo

Brevo is a cloud-based property management software that helps property managers and landlords to manage their properties.

- **labels:** `property-management`, `real-estate`, `communication/email`, `customer-service`
- **authentication:** `apiKey`

## Usage

```ts
import { brevo } from 'https://deno.land/x/netzo/apis/brevo/mod.ts'
const { api } = brevo({
  apiKey: Deno.env.get('BREVO_API_KEY')
})
```

# Configuration

The `brevo` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                         | Description                           |
|----------|--------|---------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('BREVO_API_KEY')` | the api key to use for authentication |


::: tip Refer to the [API documentation](https://developers.brevo.com/reference) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/brevo/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find contacts

Find all contacts with optional filtering and pagination.

```ts
import type { Contacts, QueryContacts } from 'netzo/apis/brevo/mod.ts'

const query: QueryContacts = {}
const result = await api.contacts.get<Contacts>(query)
const data = result.contacts
```

### Get contact

Get a contact by its unique identifier, which can be id, email or SMS attribute value.

```ts
import type { Contact, QueryContact } from 'netzo/apis/brevo/mod.ts'

const query: QueryContact = {}
const data = await api.contacts[CONTACT_IDENTIFIER].get<Contact>(query)
```

### Add contact

Add a new contact.

```ts
import type { QueryAddContact } from 'netzo/apis/brevo/mod.ts'

const payload: QueryContact = { email: 'example@email.com' }
const data = await api.contacts.post<{ id: number }>(payload)
```

### Update contact

Update a contact by its unique identifier, which can be id, email or SMS attribute value.

```ts
import type { QueryUpdateContact } from 'netzo/apis/brevo/mod.ts'

const payload: QueryUpdateContact = {
  attributes: {
    EMAIL: 'updated-email@email.com'
  }
}
await api.contacts[CONTACT_IDENTIFIER].put<void>(payload)
```

### Find email campaigns

Find all email campaigns that match the query.

```ts
import type { EmailCampaigns, QueryEmailCampaigns } from 'netzo/apis/brevo/mod.ts'

const query: QueryEmailCampaigns = {}
const result = await api.emailCampaigns.get<EmailCampaigns>(query)
const data = result.campaigns
```

### Find companies

Find all companies with optional filtering and pagination.

```ts
import type { Companies, QueryCompanies } from 'netzo/apis/brevo/mod.ts'

const query: QueryCompanies = {}
const result = await api.companies.get<Companies>(query)
const data = result.items
```

## References

- [API documentation](https://developers.brevo.com/reference)
- [Website](https://www.brevo.com/)
