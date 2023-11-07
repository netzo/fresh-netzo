<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/ipgeolocation.svg" alt="netzo/apis/ipgeolocation" class="mb-5 w-75px">

# IP Geolocation

IP Geolocation is a set of APIs that translate IP addresses to physical locations. You can use it to customize your content based on the visitor's location or display their country, currency, time zone, and more.

- **labels:** `geolocation`, `ip`, `location`, `timezone`
- **authentication:** `apiKey`

## Usage

```ts
import { ipgeolocation } from 'https://deno.land/x/netzo/apis/ipgeolocation/mod.ts'
const {
  api,
  getLocation
} = ipgeolocation({
  apiKey: Deno.env.get('IPGEOLOCATION_API_KEY'),
})
```

## Configuration

The `ipgeolocation` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                                 | Description                           |
|----------|--------|-----------------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('IPGEOLOCATION_API_KEY')` | the API key to use for authentication |


::: tip Refer to the [API documentation](https://ipgeolocation.io/documentation.html) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/ipgeolocation/types.ts) for all exported types to pass to the `api` client for typed responses.

### Get geolocation

Get geolocation based on provided IP address.

```ts
import type { Geolocation } from 'netzo/apis/ipgeolocation/types.ts'

const resultData = await api.ipgeo.get<Geolocation>({ ip: IP_ADDRESS })
```

## References

- [API Documentation](https://ipgeolocation.io/documentation.html)
- [Website](https://ipgeolocation.io/)
