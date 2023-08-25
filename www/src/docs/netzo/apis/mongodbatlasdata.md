<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/mongodbatlasdata.svg" alt="netzo/apis/mongodbatlasdata" class="mb-5 w-75px">

# MongoDB Atlas Data

MongoDB Atlas Data is a cloud-based database service that provides all of the features of the MongoDB database in a simple, easy-to-use platform.

- **labels:** `database`, `nosql`, `cloud`, `cloud-hosting`
- **authentication:** `apiKey`

## Usage

```ts
import { mongodbatlasdata } from 'https://deno.land/x/netzo/apis/mongodbatlasdata/mod.ts'
const { api } = mongodbatlasdata({
  apiKey: Deno.env.get('MONGODBATLASDATA_API_KEY'),
  dataApiAppId: Deno.env.get('MONGODBATLASDATA_DATA_API_APP_ID')
})
```

## Configuration

The `mongodbatlasdata` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param          | Type   | Default                                            | Description                           |
|----------------|--------|----------------------------------------------------|---------------------------------------|
| `apiKey`       | string | `Deno.env.get('MONGODBATLASDATA_API_KEY') `        | the api key to use for authentication |
| `dataApiAppId` | string | `Deno.env.get('MONGODBATLASDATA_DATA_API_APP_ID')` | the app id                            |

::: tip Refer to the [API documentation](https://www.mongodb.com/docs/atlas/app-services/) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/mongodbatlasdata/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find documents

Find all documents that match a query.

```ts
import type { Documents, QueryDocuments } from 'netzo/apis/mongodbatlasdata/types.ts'

const query: QueryDocuments = {
  dataSource: 'mongodb-atlas',
  database: DATABASE_NAME,
  collection: COLLECTION_NAME,
  filter: {
    text: 'Example entry'
  }
}
const result = await api.action.find.post<Documents | null>(query)
const data = result.documents
```


### Add document

Add a document to a collection.

```ts
import type { AddDocumentResponse, QueryAddDocument } from 'netzo/apis/mongodbatlasdata/types.ts'

const payload: QueryAddDocument = {
  dataSource: 'mongodb-atlas',
  database: DATABASE_NAME,
  collection: COLLECTION_NAME,
  document: { DATA_TO_ADD },
}
const data = await api.action.insertOne.post<AddDocumentResponse>(payload)
```

### Update document

Update a specific document.

```ts
import type { QueryUpdateDocument, UpdateDocumentResponse } from 'netzo/apis/mongodbatlasdata/types.ts'

const payload: QueryUpdateDocument = {
  dataSource: 'mongodb-atlas',
  database: DATABASE_NAME,
  collection: COLLECTION_NAME,
  filter: { FILTERS },
  update: { DATA_TO_UPDATE },
}
const data = await api.action.updateOne.post<UpdateDocumentResponse>(payload)
```

## References

- [API Documentation](https://www.mongodb.com/docs/atlas/app-services/)
- [Website](https://www.mongodb.com/atlas/database)
