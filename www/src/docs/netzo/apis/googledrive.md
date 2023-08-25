
<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/googledrive.svg" alt="netzo/apis/googledrive" class="mb-5 w-75px">

# Google Drive

Google Drive is a file storage and synchronization service that allows users to store files. Google Drive encompasses Google Docs, Sheets and Slides, an office suite that permits collaborative editing of documents, spreadsheets, presentations, drawings, forms, and more. Files created and edited through the office suite are saved in Google Drive.

- **labels:** `productivity`, `storage`, `collaboration`
- **authentication:** `googlejwtsa`

## Usage

```ts
import { googledrive } from 'https://deno.land/x/netzo/apis/googledrive/mod.ts'
const { api } = googledrive({
  googleServiceAccountCredentials: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS'),
  scope: ['drive.readonly'],
})
```

## Configuration

The `googlesheets` factory function expects an object with the following, and returns an object with an HTTP client `api`.


| Param                             | Type   | Default                                              | Description                                           |
|-----------------------------------|--------|------------------------------------------------------|-------------------------------------------------------|
| `googleServiceAccountCredentials` | string | `Deno.env.get('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS')` | credentials to use for authentication                 |
| `scope`                           | array  | `['spreadsheets.readonly']`                          | the permissions granted to interact with the resource |

::: tip Refer to the [API documentation](https://developers.google.com/drive/api/reference/rest/v3) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/googledrive/types.ts) for all exported types to pass to the `api` client for typed responses.


### Find files

Find all files that match the query.

```ts
import type { Files, QueryFiles } from 'netzo/apis/googlesheets/mod.ts'

const query: QueryFiles = {}
const result = await api.files.get<Files>(query)
const data = result.files
```

### Get file

Get a file by id.

```ts
import type { File, QueryFile } from 'netzo/apis/googlesheets/mod.ts'

const query: QueryFile = {}
const data = await api.files[FILE_ID].get<File>(query)
```

### Copy file

Create a copy of a file and apply updates.

```ts
import type { File, QueryCopyFile } from 'netzo/apis/googlesheets/mod.ts'

const payload: QueryCopyFile = { description: 'Copy of my file' }
const data = await api.files[FILE_ID].copy.post<File>(payload)
```

## References

- [API Documentation](https://developers.google.com/drive/api/reference/rest/v3)
