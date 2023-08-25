<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/notion.svg" alt="netzo/apis/notion" class="mb-5 w-75px">

# Notion

Notion is an all-in-one workspace for your notes, tasks, wikis, and databases.

- **labels:** `project-management`, `collaboration`, `task-management`, `productivity`
- **authentication:** `apiKey`

## Usage

```ts
import { notion } from 'https://deno.land/x/netzo/apis/notion/mod.ts'
const { api } = notion({
  internalIntegrationToken: Deno.env.get('NOTION_INTERNAL_INTEGRATION_TOKEN'),
  notionVersion: Deno.env.get('NOTION_VERSION'),
})
```

## Configuration

The `notion` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param                      | Type   | Default                                             | Description                           |
|----------------------------|--------|-----------------------------------------------------|---------------------------------------|
| `internalIntegrationToken` | string | `Deno.env.get('NOTION_INTERNAL_INTEGRATION_TOKEN')` | the API key to use for authentication |
| `notionVersion`            | string | `Deno.env.get('NOTION_VERSION')`                    | Notion version                        |


::: tip Refer to the [API documentation](https://developers.notion.com/reference/intro) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/notion/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find pages

Find all the pages that belong to a specific database and match the query.

```ts
import type { Pages, QueryDatabase } from 'netzo/apis/notion/types.ts'

const query: QueryDatabase = {}
const result = await api.databases[DATABASE_ID].query.post<Pages>(query)
const resultData = result.results
```

### Get page

Get a page by id.

Property ids can be passed as query parameters to limit the search to specific properties.

```ts
import type { Page, QueryProperties } from 'netzo/apis/notion/types.ts'

const query: QueryProperties = {}
const resultData = await api.pages[PAGE_ID].get<Page>(query)
```

### Get page content

Get the content of a specific page.

```ts
import type { Block, NotionPagination } from 'netzo/apis/notion/types.ts'

const query: NotionPagination = {}
const result = await api.blocks[PAGE_ID].children.get<Block>(query)
const resultData = result.results
```

### Find users

Find all users of the workplace.

```ts
import type { NotionPagination, Users } from 'netzo/apis/notion/types.ts'

const query: NotionPagination = {}
const result = await api.users.get<Users>(query)
const resultData = result.results
```

## References

- [API Documentation](https://developers.notion.com/reference/intro)
- [Website](https://www.notion.so/)

