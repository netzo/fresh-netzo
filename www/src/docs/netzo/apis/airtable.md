<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/airtable.svg" alt="netzo/apis/airtable" class="mb-5 w-75px">

# Airtable

Airtable is a smart spreadsheet and low-code platform for building collaborative apps. Customize your workflow, collaborate, and achieve ambitious outcomes.

- **labels:** `project-management`, `productivity`, `collaboration`, `task-management`
- **authentication:** `bearer`

## Usage

```ts
import { airtable } from 'https://deno.land/x/netzo/apis/airtable/mod.ts'
const { api } = airtable({
  personalAccessToken: Deno.env.get('AIRTABLE_PERSONAL_ACCESS_TOKEN')
})
```

## Configuration

The `airtable` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param                 | Type   | Default                                          | Description                                |
|-----------------------|--------|--------------------------------------------------|--------------------------------------------|
| `personalAccessToken` | string | `Deno.env.get('AIRTABLE_PERSONAL_ACCESS_TOKEN')` | the access token to use for authentication |


::: tip Refer to the [API documentation](https://airtable.com/developers/web/api/introduction) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/airtable/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find records

Find all records that match the query.

```ts
import type { QueryRecords, Records } from 'netzo/apis/airtable/types.ts'

const query: QueryRecords = {}
const result = await api[DATABASE_ID][TABLE_ID_OR_NAME].get<Records>(query)
const resultData = result.records
```

### Add records

Add one or multiple records.

```ts
import type { QueryAddRecords, Records } from 'netzo/apis/airtable/types.ts'

const payload: QueryRecords = {
  records: [
    {
      fields: {
        Address: '333 Post St',
        Name: 'Union Square',
        Visited: true
      }
    }
  ]
}
const result = await api[DATABASE_ID][TABLE_ID_OR_NAME].post<Records>(payload)
const resultData = result.records
```

### Update records

Update one or multiple records by id.

Id property of the payload is optional if upsert property is enabled.

```ts
import type { QueryUpdateRecords, UpdateRecordsResponse } from 'netzo/apis/airtable/types.ts'

const payload: QueryUpdateRecords = {
  records: [
    {
      fields: {
        Address: 'Updated Address',
      },
      id: RECORD_ID
    }
  ]
}
const result = await api[DATABASE_ID][TABLE_ID_OR_NAME].patch<UpdateRecordsResponse>(payload)
const resultData = result.records
```

### Delete records

Delete one or multiple records by id.

```ts
import type { QueryDeleteRecords, RecordsDeleted } from 'netzo/apis/airtable/types.ts'

const query: QueryDeleteRecords = {
  records: [RECORD_ID_1, RECORD_ID_2]
}
const result = await api[DATABASE_ID][TABLE_ID_OR_NAME].delete<RecordsDeleted>(query)
const resultData = result.records
```

### Find databases

Find all databases the api key can access.

```ts
import type { Databases, QueryDatabases } from 'netzo/apis/airtable/types.ts'

const query: QueryDatabases = {}
const result = await api.meta.bases.get<Databases>(query)
const resultData = result.bases
```

### Find tables

Find all tables in a specific database.

```ts
import type { QueryTables, Tables } from 'netzo/apis/airtable/types.ts'

const query: QueryTables = {}
const result = await api.meta.bases[DATABASE_ID].tables.get<Tables>(query)
const resultData = result.tables
```

## References

- [API documentation](https://airtable.com/developers/web/api/introduction)
- [Webhooks API](https://airtable.com/developers/web/guides/webhooks-api)
