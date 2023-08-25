<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/sendgrid.svg" alt="netzo/apis/sendgrid" class="mb-5 w-75px">

# SendGrid

SendGrid is a cloud-based email service that provides reliable transactional email delivery, scalability, and real-time analytics along with flexible APIs that make custom integration easy.

- **labels:** `email`, `email-marketing`, `email-automation`, `email-delivery`
- **authentication:** `apiKey`

## Usage

```ts
import { sendgrid } from 'https://deno.land/x/netzo/apis/sendgrid/mod.ts'
const { api } = sendgrid({
  apiKey: Deno.env.get('SENDGRID_API_KEY')
})
```

## Configuration

The `sendgrid` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                            | Description                           |
|----------|--------|------------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('SENDGRID_API_KEY')` | the api key to use for authentication |

::: tip Refer to the [API documentation](https://docs.sendgrid.com/api-reference) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/sendgrid/types.ts) for all exported types to pass to the `api` client for typed responses.


### Find lists

Find all your contact lists.

```ts
import type { Lists, QueryLists } from 'netzo/apis/sendgrid/types.ts'

const query: QueryLists = {}
const result = await api.marketing.lists.get<Lists>(query)
const resultData = result.result
```

### Get list

Get a list by id.

```ts
import type { List, QueryList } from 'netzo/apis/sendgrid/types.ts'

const query: QueryList = {}
const resultData = await api.marketing.lists[LIST_ID].get<List>(query)
```

### Update list name

Update the name of a list.

```ts
import type { QueryUpdateList, UpdateListResponse } from 'netzo/apis/sendgrid/types.ts'

const data: QueryUpdateList = { name: 'Updated list name' }
const resultData = await api.marketing.lists[LIST_ID].patch<UpdateListResponse>(data)
```

### Add contacts to list

Add contacts to one or multiple lists.

```ts
import type { AddContactsResponse, QueryAddContacts } from 'netzo/apis/sendgrid/types.ts'

const data: QueryAddContacts = {
  list_ids: [LIST_ID1, LIST_ID2],
  contacts: [{ email: 'email@example.com' }]
}
const resultData = await api.marketing.contacts.put<AddContactsResponse>(data)
```

### Send email

Send an email over the API.

```ts
import type { QuerySendEmail } from 'netzo/apis/sendgrid/types.ts'

const data: QuerySendEmail = {
  personalizations: [
    {
      to: [
        {
          email: 'email@example.com',
          name: 'Contact name'
        }
      ]
    }
  ],
  from: {
    email: 'myemail@example.com',
    name: 'Sender name'
  },
  subject: 'New Subject',
  content: [
    {
      type: 'text/html',
      value: '<p>Content of my email</p>'
    }
  ]
}

await api.mail.send.post<void>(data)
```

## References

- [API Documentation](https://docs.sendgrid.com/api-reference)
- [Website](https://sendgrid.com)
