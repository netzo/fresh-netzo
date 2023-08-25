
<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/googlesheets.svg" alt="netzo/apis/googlesheets" class="mb-5 w-75px">

# Google Sheets

Google Sheets is a spreadsheet program included as part of a free, web-based software office suite offered by Google within its Google Drive service.

- **labels:** `productivity`, `spreadsheets`, `data`, `collaboration`
- **authentication:** `googlejwtsa`

## Usage

```ts
import { googlesheets } from 'https://deno.land/x/netzo/apis/googlesheets/mod.ts'
const {
  api,
  resultToRows
} = googlesheets({
  googleServiceAccountCredentials: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS'),
  scope: ['spreadsheets.readonly'],
  spreadsheetId: Deno.env.get('GOOGLESHEETS_SPREADSHEET_ID'),
})
```

## Configuration

The `googlesheets` factory function expects an object with the following, and returns an object with an HTTP client `api` and a useful function.

| Param                             | Type   | Default                                              | Description                                           |
|-----------------------------------|--------|------------------------------------------------------|-------------------------------------------------------|
| `googleServiceAccountCredentials` | string | `Deno.env.get('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS')` | credentials to use for authentication                 |
| `scope`                           | array  | `['spreadsheets.readonly']`                          | the permissions granted to interact with the resource |
| `spreadsheetId`                   | string | `Deno.env.get('GOOGLESHEETS_SPREADSHEET_ID')`        | the spreadsheet id                                    |

::: tip Refer to the [API documentation](https://developers.google.com/sheets/api/guides/concepts) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/googlesheets/types.ts) for all exported types to pass to the `api` client for typed responses.


<a id='function-tip'></a>
::: tip The `resultToRows` function transforms your data into key-value pairs with column headers as keys. The function assumes the first row of your sheet holds the headers. If this is not the case, you should pass the headers as the second argument to the function in `string[]` format, e.g. `['name', 'lastname', 'email']`
:::

### Get rows

Get all rows within the specified range.

The resultToRows function returns your data as key-value pairs, assuming the top row holds the headers. [Find out how to pass custom headers](#function-tip).

```ts
import type { ValueRange } from 'netzo/apis/googlesheets/types.ts'

const result = await api.values[RANGE].get<ValueRange>()
const data = result.values
const rows = resultToRows(result)
```

### Get row

Get one row of the spreadsheet by specifying the index.

The example returns the first row of data, assuming the top row holds the headers. The resultToRows function  returns your data as key-value pairs. [Find out how to pass custom headers](#function-tip).

```ts
import type { ValueRange } from 'netzo/apis/googlesheets/types.ts'

const index = 1
const result = await api.values[RANGE].get<ValueRange>()
const data = result.values[index]
const row = resultToRows(result)[index - 1]
```

### Add row

Add a row to the spreadsheet.

Be sure to keep insertDataOption as INSERT_ROWS, or existing data in your range will be overwritten.

```ts
import type { AddValuesResponse, QueryAddOrUpdateRows, RequestAddOrUpdateValues } from 'netzo/apis/googlesheets/types.ts'

const query: QueryAddOrUpdateRows = {
  valueInputOption: 'USER_ENTERED',
  insertDataOption: 'INSERT_ROWS',
  includeValuesInResponse: true
}
const payload: RequestAddOrUpdateValues = { values: [['value1', 'value2', 'value3']] }

const result = await api.values[`${RANGE_TO_INSERT}:append`].post<AddValuesResponse>(payload, query)
const data = result.updates.updatedData.values
```

### Update row

Update a row by specifying the range.

```ts
import type { QueryAddOrUpdateRows, RequestAddOrUpdateValues, UpdateValuesResponse } from 'netzo/apis/googlesheets/types.ts'

const query: QueryAddOrUpdateRows = {
  valueInputOption: 'USER_ENTERED',
  includeValuesInResponse: true
}
const payload: RequestAddOrUpdateValues = { values: [['updatedValue1', 'updatedValue2', 'updatedValue3']] }
const result = await api.values[RANGE_TO_UPDATE].put<UpdateValuesResponse>(payload, query)
const data = result.updatedData.values
```

### Delete row

Delete a row by specifying the range.

```ts
import type { DeleteValuesResponse } from 'netzo/apis/googlesheets/types.ts'

const data = await api.values[`${RANGE_TO_DELETE}:clear`].post<DeleteValuesResponse>()
 ```

## References

- [API Documentation](https://developers.google.com/sheets/api/guides/concepts)
