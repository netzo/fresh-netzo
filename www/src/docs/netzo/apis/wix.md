<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/wix.svg" alt="netzo/apis/wix" class="mb-5 w-75px">

# Wix

Wix is a website builder that allows users to create HTML5 websites and mobile sites through the use of online drag and drop tools. Users may add functionalities such as social plug-ins, e-commerce, contact forms, e-mail marketing, and community forums to their websites using a variety of Wix-developed and third-party applications.

- **labels:** `sales`, `marketing`, `communication/email`, `customer-service`
- **authentication:** `apiKey`

## Usage

```ts
import { wix } from 'https://deno.land/x/netzo/apis/wix/mod.ts'
const { api } = wix({
  accountId: Deno.env.get('WIX_ACCOUNT_ID'),
  siteId: Deno.env.get('WIX_SITE_ID'),
  apiKey: Deno.env.get('WIX_API_KEY')
})
```

## Configuration

The `wix` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param       | Type   | Default                          | Description                           |
|-------------|--------|----------------------------------|---------------------------------------|
| `accountId` | string | `Deno.env.get('WIX_ACCOUNT_ID')` | the Wix account id                    |
| `siteId`    | string | `Deno.env.get('WIX_SITE_ID')`    | the site id                           |
| `apiKey`    | string | `Deno.env.get('WIX_API_KEY')`    | the api key to use for authentication |

::: tip Refer to the [API documentation](https://dev.wix.com/docs/rest/articles/getting-started/overview) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/wix/types.ts) for all exported types to pass to the `api` client for typed responses.

### Get site properties

Get the properties of your site.

```ts
import type { QuerySite, Site } from 'netzo/apis/wix/types.ts'

const query: QuerySite = {}
const result = await api['site-properties'].v4.properties.get<Site>(query)
const resultData = result.properties
```

### Find contacts

Find visitors who have shared contact information with the site.

```ts
import type { Contacts, QueryContacts } from 'netzo/apis/wix/types.ts'

const query: QueryContacts = {}
const result = await api.contacts.v4.contacts.get<Contacts>(query)
const resultData = result.contacts
```

### Add contact

Add a new contact.

```ts
import type { Contact, DataAddContact } from 'netzo/apis/wix/types.ts'

const data: DataAddContact = {
  info: { name: { first: 'John', last: 'Doe' } }
}
const result = await api.contacts.v4.contacts.post<Contact>(data)
const resultData = result.contact
```

### Update contact

Update a contact by id.

```ts
import type { Contact, DataUpdateContact } from 'netzo/apis/wix/types.ts'

const data: DataUpdateContact = {
  revision: REVISION_NUMBER,
  info: { name: { first: 'Jane', last: 'Doe' } }
}
const result = await api.contacts.v4.contacts[CONTACT_ID].patch<Contact>(data)
const resultData = result.contact
```

### Delete contact

Delete a contact by id.

```ts
const resultData = await api.contacts.v4.contacts[CONTACT_ID].delete<{}>()
```

## References

- [API documentation](https://dev.wix.com/api/rest/getting-started/overview)
- [Website](https://www.wix.com/)
