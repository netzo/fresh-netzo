<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/mailgun.svg" alt="netzo/apis/mailgun" class="mb-5 w-75px">

# Mailgun

Mailgun is an email automation service that allows you to send, receive, and track email. It is a powerful tool for building email automation into your app.

- **labels:** `email`, `email-marketing`, `email-automation`, `email-tracking`
- **authentication:** `apiKey`

## Usage

```ts
import { mailgun } from 'https://deno.land/x/netzo/apis/mailgun/mod.ts'
const { api } = mailgun({ 
    apiKey: Deno.env.get('MAILGUN_API_KEY') 
    })
```

## Configuration

The `mailgun` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param                 | Type   | Default                                        | Description                                |
|-----------------------|--------|------------------------------------------------|--------------------------------------------|
| `apiKey` | string | `Deno.env.get('MAILGUN_API_KEY')` | the api key to use for authentication | 

::: tip Refer to the [API documentation](https://documentation.mailgun.com/en/latest/api_reference.html) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/mailgun/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find mailing lists

Find all mailing lists.

```ts
import type { MailingLists, QueryMailingLists } from  'netzo/apis/mailgun/mod.ts'

const query: QueryMailingLists = {}
const result = await api.v3.lists.pages.get<MailingLists>(query)
const data = result.items
```

### Add mailing list

Add a new mailing list.

```ts
import type { AddOrUpdateListResponse, QueryAddMailingList } from  'netzo/apis/mailgun/mod.ts'

const payload: QueryAddMailingList = { 
    address:'list_name@email.com', 
    name: 'Newsletter'
 }
const result = await api.v3.lists.post<QueryAddMailingList>(payload)
const data = result.list
```

### Update mailing list

Update a mailing list by its email address.

```ts
import type { AddOrUpdateListResponse, QueryUpdateMailingList } from  'netzo/apis/mailgun/mod.ts'

const payload: QueryUpdateMailingList = { 
    name: 'Updated name'
 }
const result = await api.v3.lists[LIST_ADDRESS].put<QueryUpdateMailingList>(payload)
const data = result.list
```

### Add member to mailing list

Add a new email address to a mailing list.

```ts
import type { AddMemberResponse, QueryAddMember } from  'netzo/apis/mailgun/mod.ts'

const payload: QueryAddMember = { 
    address: 'example@email.com'
 }
const result = await api.v3.lists[LIST_ADDRESS].members.post<QueryUpdateMailingList>(payload)
const data = result.member
```

### Delete mailing list member

Remove an email from a mailing list.

```ts
import type { DeleteMemberResponse } from  'netzo/apis/mailgun/mod.ts'

const data = await api.v3.lists[LIST_ADDRESS].members[MEMBER_ADDRESS].delete<DeleteMemberResponse>()
```

## References

- [API Documentation](https://documentation.mailgun.com/en/latest/api_reference.html)
- [Website](https://www.mailgun.com/)