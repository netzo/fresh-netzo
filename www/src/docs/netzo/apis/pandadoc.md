<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/pandadoc.svg" alt="netzo/apis/pandadoc" class="mb-5 w-75px">

# PandaDoc

PandaDoc is a document automation software as a service with built-in electronic signatures, workflow management, a document builder, and CPQ functionality.

- **labels:** `productivity`, `documents`, `esignatures`, `cpq`, `workflow`
- **authentication:** `apiKey`

## Usage

```ts
import { pandadoc } from 'https://deno.land/x/netzo/apis/pandadoc/mod.ts'
const { api } = pandadoc({
  apiKey: Deno.env.get('PANDADOC_API_KEY')
})
```

## Configuration

The `pandadoc` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                            | Description                           |
|----------|--------|------------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('PANDADOC_API_KEY')` | the api key to use for authentication |


::: tip Refer to the [API documentation](https://developers.pandadoc.com/reference/) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/pandadoc/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find documents

Find all documents that match the query.

```ts
import type { Documents, QueryDocuments } from 'netzo/apis/pandadoc/types.ts'

const query: QueryDocuments = {}
const result = await api.documents.get<Documents>(query)
const resultData = result.results
```

### Get document

Get all details of a document by id.

```ts
import type { Document } from 'netzo/apis/pandadoc/types.ts'

const resultData = await api.documents[DOCUMENT_ID].details.get<Document>()
```

### Update document

Update a document by id.

```ts
import type { DataAddDocument } from 'netzo/apis/pandadoc/types.ts'

const data: DataAddDocument = {
  recipients: {
    ID: RECIPIENT_ID,
    first_name: 'John Doe'
  }
}
const resultData = await api.documents[DOCUMENT_ID].patch<{}>(data)
```

### Delete document

Delete a document by id.

```ts
await api.documents[DOCUMENT_ID].delete<void>()
```

### Find contacts

Find all contacts associated with the workspace.

```ts
import type { Contacts } from 'netzo/apis/pandadoc/types.ts'

const result = await api.contacts.get<Contacts>()
const resultData = result.results
```

### Add contact

Add a new contact.

```ts
import type { Contact, DataAddContact } from 'netzo/apis/pandadoc/types.ts'

const data: DataAddContact = { email: 'email@example.com' }
const resultData = await api.contacts.post<Contact>(data)
```

## References

- [API documentation](https://developers.pandadoc.com/reference/)
- [Website](https://www.pandadoc.com/)
