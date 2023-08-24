<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/googleappsheet.svg" alt="netzo/apis/googleappsheet" class="mb-5 w-75px">

# Google AppSheet

Google AppSheet is a no-code development platform that lets you build apps for your business using spreadsheets and forms.

- **labels:** `development`, `no-code`, `low-code`, `mobile-apps`, `web-apps`
- **authentication:** `apiKey`

## Usage

```ts
import { googleappsheet } from 'https://deno.land/x/netzo/apis/googleappsheet/mod.ts'
const { api } = googleappsheet({
  appId: Deno.env.get('GOOGLEAPPSHEET_APP_ID'),
  applicationAccessKey: Deno.env.get('GOOGLEAPPSHEET_APPLICATION_ACCESS_KEY'),
})
```

## Configuration

The `googleappsheet` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param                  | Type   | Default                                                 | Description                              |
|------------------------|--------|---------------------------------------------------------|------------------------------------------|
| `applicationAccessKey` | string | `Deno.env.get('GOOGLEAPPSHEET_APPLICATION_ACCESS_KEY')` | the access key to use for authentication |
| `appId`                | string | `Deno.env.get('GOOGLEAPPSHEET_APP_ID')`                 | the unique identifier for the app        |


::: tip Refer to the [API documentation](https://support.google.com/appsheet/topic/10105767) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/googleappsheet/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find records

Find records in a table.

```ts
import type { QueryRecords, Records } from 'netzo/apis/googleappsheet/mod.ts'

const query: QueryRecords = { Action: 'Find' }
const result = await api[TABLE_NAME].Action.get<Records>(query)
const data = result.Rows
```

### Add records

Add one or multiple rows to a table.

```ts
import type { QueryAddRecords, Records } from 'netzo/apis/googleappsheet/mod.ts'

const payload: QueryAddRecords = {
  Action: 'Add',
  Rows: [{
    FIELD: 'NEW_VALUE'
  }]
}
const result = await api[TABLE_NAME].Action.post<Records>(payload)
const data = result.Rows
```

### Update records

Update one or multiple rows.

In the request, each row must include the key fields and values that identify the row to be updated.

```ts
import type { QueryUpdateRecords, Records } from 'netzo/apis/googleappsheet/mod.ts'

const payload: QueryUpdateRecords = {
  Action: 'Edit',
  Rows: [{
    KEY_FIELD: 'KEY_VALUE',
    FIELD: 'UPDATE_VALUE'
  }]
}
const result = await api[TABLE_NAME].Action.post<Records>(payload)
const data = result.Rows
```

### Delete records

Delete one or multiple rows.

In the request, the row to be deleted is identified by the key fields and values specific to the app.

```ts
import type { QueryDeleteRecords, Records } from 'netzo/apis/googleappsheet/mod.ts'

const query: QueryDeleteRecords = {
  Action: 'Delete',
  Rows: [{
    KEY_FIELD: 'KEY_VALUE'
  }]
}
const result = await api[TABLE_NAME].Action.post<Records>(query)
const data = result.Rows
```

## References

- [API Documentation](https://support.google.com/appsheet/topic/10105767)
- [Website](https://about.appsheet.com/home/)
