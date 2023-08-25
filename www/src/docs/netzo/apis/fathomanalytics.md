<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/fathomanalytics.svg" alt="netzo/apis/fathomanalytics" class="mb-5 w-75px">

# Fathom Analytics

Fathom Analytics provides simple, useful websites stats without tracking or storing personal data of your users.

- **labels:** `analytics`, `web-analytics`, `privacy`
- **authentication:** `apiKey`

## Usage

```ts
import { fathomanalytics } from 'https://deno.land/x/netzo/apis/fathomanalytics/mod.ts'
const { api } = fathomanalytics({
  apiKey: Deno.env.get('FATHOMANALYTICS_API_KEY')
})
```

## Configuration

The `fathomanalytics` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                                    | Description                           |
|----------|--------|--------------------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('FATHOMANALYTICS_API_KEY') ` | the api key to use for authentication |

::: tip Refer to the [API documentation](https://usefathom.com/api#introduction) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/fathomanalytics/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find sites

 Find all sites the API key owns.

```ts
import type { QuerySites, Sites } from 'netzo/apis/fathomanalytics/types.ts'

const query: QuerySites = {}
const result = await api.sites.get<Sites>(query)
const resultData = result.resultData
```

### Get site

Get a site by id.

```ts
import type { Site } from 'netzo/apis/fathomanalytics/types.ts'

const resultData = await api.sites[SITE_ID].get<Site>()
```


### Add site

Add a new site

```ts
import type { QueryAddSite, Site } from 'netzo/apis/fathomanalytics/types.ts'

const data: QueryAddSite = { name: 'New website' }
const resultData = await api.sites.post<Site>(data)
```

### Update site

Update a site by id

```ts
import type { QueryUpdateSite, Site } from 'netzo/apis/fathomanalytics/types.ts'

const data: QueryUpdateSite = { name: 'Updated website' }
const resultData = await api.sites[SITE_ID].post<Site>(data)
```

### Wipe site

Wipe all pageviews & event completions from a website to reset statistics.

```ts
import type { Site } from 'netzo/apis/fathomanalytics/types.ts'

const resultData = await api.sites[SITE_ID].data.delete<Site>()
```

## References

- [API documentation & reference](https://usefathom.com/api#introduction)
- [Website](https://usefathom.com/)


