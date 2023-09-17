<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/paddle.svg" alt="netzo/apis/paddle" class="mb-5 w-75px">

# Paddle

Paddle is a SaaS platform for selling software and digital products online. It provides a suite of tools that businesses can use to grow, manage, and analyze their sales.

- **labels:** `billing`, `payments`
- **authentication:** `bearer`

## Usage

```ts
import { paddle } from 'https://deno.land/x/netzo/apis/paddle/mod.ts'

const { api } = paddle({
  apiKey: Deno.env.get('PADDLE_API_KEY'),
  baseUrl: 'https://api.paddle.com/'
})
```

## Configuration

The `paddle` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param     | Type   | Default                          | Description                           |
|-----------|--------|----------------------------------|---------------------------------------|
| `apiKey`  | string | `Deno.env.get('PADDLE_API_KEY')` | the API key to use for authentication |
| `baseUrl` | string | `https://api.paddle.com/`        | the base URL to use for requests      |


::: tip Refer to the [API documentation](https://developer.paddle.com/) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/paddle/types.ts) for all exported types to pass to the `api` client for typed responses.

## References

- [API documentation](https://developer.paddle.com/)
- [Webhooks API](https://developer.paddle.com/webhooks/overview)
