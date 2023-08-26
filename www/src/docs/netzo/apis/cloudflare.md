<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/cloudflare.svg" alt="netzo/apis/cloudflare" class="mb-5 w-75px">

# Cloudflare

Cloudflare is a web infrastructure and website security company, providing content delivery network services, DDoS mitigation, Internet security, and distributed domain name server services.

- **labels:** `security`, `networking`, `dns`, `cdn`, `web-performance`
- **authentication:** `apiKey`

## Usage

```ts
import { cloudflare } from 'https://deno.land/x/netzo/apis/cloudflare/mod.ts'
const { api } = cloudflare({
  apiKey: Deno.env.get('CLOUDFLARE_API_KEY')
})
```

## Configuration

The `cloudfare` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                              | Description                           |
|----------|--------|--------------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('CLOUDFLARE_API_KEY')` | the api key to use for authentication |


::: tip Refer to the [API documentation](https://developers.cloudflare.com/api) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/cloudfare/types.ts) for all exported types to pass to the `api` client for typed responses.


### Find organizations

Find all organizations the user is associated with that match the query.

```ts
import type { Organizations, QueryOrganizations } from 'netzo/apis/cloudflare/types.ts'

const query: QueryOrganizations = {}
const result = await api.user.organizations.get<Organizations>(query)
const resultData = result.result
```

### Find zones

Find all your zones that match the query.

```ts
import type { QueryZones, Zones } from 'netzo/apis/cloudflare/types.ts'

const query: QueryZones = {}
const result = await api.zones.get<Zones>(query)
const resultData = result.result
```

### Add zone

Add a new zone.

```ts
import type { DataAddZone, Zone } from 'netzo/apis/cloudflare/types.ts'

const data: DataAddZone = {
  account: { id: ZONE_ID },
  name: DOMAIN_NAME
}
const result = await api.zones.post<Zone>(data)
const resultData = result.result
```

### Delete zone

Delete a zone by id.

```ts
import type { DeleteResult } from 'netzo/apis/cloudflare/types.ts'

const result = await api.zones[ZONE_ID].delete<DeleteResult>()
const resultData = result.result
```

## References

- [API documentation & reference](https://developers.cloudflare.com/api)
- [Website](https://www.cloudflare.com/)

