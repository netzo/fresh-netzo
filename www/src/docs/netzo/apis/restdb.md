<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/restdb.svg" alt="netzo/apis/restdb" class="mb-5 w-75px">

# RestDB

RestDB is a cloud-hosted NoSQL database service.

- **labels:** `database`, `nosql`, `cloud`, `cloud-hosting`
- **authentication:** `apiKey`

## Usage

```ts
import { restdb } from 'https://deno.land/x/netzo/apis/restdb/mod.ts'
const { api } = restdb({
  apiKey: Deno.env.get('RESTDB_API_KEY'),
  databaseURL: Deno.env.get('RESTDB_DATABASE_URL')
})
```

## Configuration

The `restdb` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param         | Type   | Default                               | Description                           |
|---------------|--------|---------------------------------------|---------------------------------------|
| `apiKey`      | string | `Deno.env.get('RESTDB_API_KEY')`      | the api key to use for authentication |
| `databaseURL` | string | `Deno.env.get('RESTDB_DATABASE_URL')` | the database URL                      |

::: tip Refer to the [API documentation](https://restdb.io/docs) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/restdb/types.ts) for all exported types to pass to the `api` client for typed responses.


### Find records

Find records from a collection.

```ts
import type { Record } from 'netzo/apis/restdb/types.ts'

const data = await api[COLLECTION_NAME].get<Record[]>()
```

### Add record

Add a new record to a collection.

```ts
import type { AddOrUpdateRecordResponse, Record } from 'netzo/apis/restdb/types.ts'

const payload: Record = { title: 'New title' }
const data = await api[COLLECTION_NAME].post<AddOrUpdateRecordResponse>(payload)
```

### Update record

Update a record by id.

```ts
import type { AddOrUpdateRecordResponse, Record } from 'netzo/apis/restdb/types.ts'

const payload: Record = { title: 'Updated title' }
const data = await api[COLLECTION_NAME][RECORD_ID].patch<AddOrUpdateRecordResponse>(payload)
```

### Delete record

Delete a record by id.

```ts
import type { DeleteRecordResponse } from 'netzo/apis/restdb/types.ts'

const result = await api[COLLECTION_NAME][RECORD_ID].delete<DeleteRecordResponse>()
const data = result.result
```

## References

- [API documentation](https://restdb.io/docs)
- [Website](https://restdb.io/)
