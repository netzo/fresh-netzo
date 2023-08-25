<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/hubspot.svg" alt="netzo/apis/hubspot" class="mb-5 w-75px">

# Hubspot

Hubspot is a full-suite of business apps including CRM, marketing, sales, customer service, and content management software.

- **labels:** `sales`, `marketing`, `communication/email`, `customer-service`
- **authentication:** `bearer`

## Usage

```ts
import { hubspot } from 'https://deno.land/x/netzo/apis/hubspot/mod.ts'
const { api } = hubspot({
  privateAppAccessToken: Deno.env.get('HUBSPOT_PRIVATE_APP_ACCESS_TOKEN')
})
```

## Configuration

The `hubspot` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param                   | Type   | Default                                            | Description                                |
|-------------------------|--------|----------------------------------------------------|--------------------------------------------|
| `privateAppAccessToken` | string | `Deno.env.get('HUBSPOT_PRIVATE_APP_ACCESS_TOKEN')` | the access token to use for authentication |


::: tip Refer to the [API documentation](https://developers.hubspot.com/docs/api/overview) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/hubspot/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find contacts

Find all contacts that match the query.

```ts
import type { Contacts, QueryContacts } from 'netzo/apis/hubspot/mod.ts'

const query: QueryContacts = {}
const result = await api.crm.v3.objects.contacts.get<Contacts>(query)
const data = result.results
```

### Add contact

Add a new contact.

```ts
import type { AddOrUpdateContactResponse, QueryAddOrUpdateContact } from 'netzo/apis/hubspot/mod.ts'

const payload: QueryAddOrUpdateContact = {
  properties: {
    company: 'Company X',
    email: 'example@email.com'
  }
}
const data = await api.crm.v3.objects.contacts.post<AddOrUpdateContactResponse>(payload)
```

### Update contact

Update a contact by id.

```ts
import type { AddOrUpdateContactResponse, QueryAddOrUpdateContact } from 'netzo/apis/hubspot/mod.ts'

const payload: QueryAddOrUpdateContact = {
  properties: {
    company: 'New Company Name',
  }
}
const data = await api.crm.v3.objects.contacts[CONTACT_ID].patch<AddOrUpdateContactResponse>(payload)
```

### Delete contact

Delete a contact by id.

```ts
await api.crm.v3.objects.contacts[CONTACT_ID].delete<void>()
```

### Find forms

Find all forms that match the query.

```ts
import type { Form, QueryForms } from 'netzo/apis/hubspot/mod.ts'

const query: QueryForms = {}
const data = await api.forms.v2.forms.get<Form[]>(query)
```

### Find submissions

Find all submissions that correspond to a specific form.

```ts
import type { FormSubmissions, QuerySubmissions } from 'netzo/apis/hubspot/mod.ts'

const query: QuerySubmissions = {}
const result = await api['form-integrations'].v1.submissions.forms[FORM_ID].get<FormSubmissions>(query)
const data = result.results
```

### Find deals

Find all deals that match the query.

```ts
import type { Deals, QueryDeals } from 'netzo/apis/hubspot/mod.ts'

const query: QueryDeals = {}
const result = await api.crm.v3.objects.deals.get<Deals>(query)
const data = result.results
```

### Add deal

Add a new deal.

```ts
import type { AddDealResponse, QueryAddDeal } from 'netzo/apis/hubspot/mod.ts'

const payload: QueryAddDeal = {
  properties: {
    amount: '1000.00',
    dealname: 'New deal'
  }
}
const data = await api.crm.v3.objects.deals.post<AddDealResponse>(payload)
```

## References

- [API documentation & reference](https://developers.hubspot.com/docs/api/overview)
- [Website](https://www.hubspot.com/)


