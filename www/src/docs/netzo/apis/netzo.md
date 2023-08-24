<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/netzo.svg" alt="netzo/apis/netzo" class="mb-5 w-75px">

# Netzo

Netzo is a cloud-based internal app development platform, ideal for technology-driven businesses. Boost profitability with BI dashboards, admin panels, APIs and workflow automations in a single place.

- **labels:** `development`, `no-code`, `low-code`, `mobile-apps`, `web-apps`
- **authentication:** `apiKey`

## Usage

```ts
import { netzo } from 'https://deno.land/x/netzo/apis/netzo/mod.ts'
const { api } = netzo({
  apiKey: Deno.env.get('NETZO_API_KEY')
})
```

## Configuration

The `netzo` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                         | Description                           |
|----------|--------|---------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('NETZO_API_KEY')` | the api key to use for authentication |


::: tip Refer to the [API documentation](https://netzo.io/docs/api-reference/) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/netzo/types.ts) for all exported types to pass to the `api` client for typed responses.

Visit the official [API documentation](https://netzo.io/docs/api-reference/) or [API reference](https://api.netzo.io/docs/) for usage examples.

## References

- [API documentation](https://netzo.io/docs/api-reference/)
- [Website](https://netzo.io/)
