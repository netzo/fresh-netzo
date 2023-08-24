# Authentication

The **Netzo API** currently supports the following authentication methods:

- **[API key:](#api-key-authentication)** used to authenticate external requests (**recommended**)
- **[Bearer token:](#bearer-token-authentication)** used internally by the Netzo Web Application

## API Key Authentication

To make a request, you need to create an [API key](/docs/platform/workspaces#api-keys) and provide it in either:

- **`'x-api-key'` header for example `{ 'x-api-key': API_KEY }` (recommended)**

```sh
curl -H "x-api-key: API_KEY" https://api.netzo.io/RESOURCE
```

```js
fetch('https://api.netzo.io/RESOURCE', {
  headers: { 'x-api-key': 'API_KEY' },
})
```

- **`apiKey` query parameter for example `/RESOURCE?apiKey=${API_KEY}`**

```sh
curl -H "Content-Type: application/json" -X GET https://api.netzo.io/RESOURCE?apiKey=API_KEY
```

```js
fetch('https://api.netzo.io/RESOURCE?apiKey=API_KEY')
```

::: tip API keys identify applications
**API keys** are workspace-scoped so requests will be limited to the resources of the authenticated workspace (that which owns the API key).
:::

## Bearer Token Authentication

Authenticating HTTP requests in this way is a two step process. First you have to obtain a valid JWT from the authentication service by POSTing the strategy you want to use. This however is not meant to be used for external requests to the API. Use [API key authentication](#api-key-authentication) instead.

::: tip Access tokens identify users
**Bearer tokens** are user-scoped so requests will be limited to resources across all of the authenticated user's workspaces. The JWT will also expire after 24 hours, making it less convenient to use than API keys.
:::
