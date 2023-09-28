# Interacting with APIs

Netzo provides a simple and intuitive way to interact with APIs. It allows you to create a client for an existing API or a custom API and provides a convenient way to make requests to the API.

The following basic examples show how to work with APIs.

## Creating a client for a custom API

An example of connecting to a custom API, in this case the JSONPlaceholder API.

```jsx
import { rest } from 'https://deno.land/x/netzo@v0.2.43/apis/rest/mod.ts'

const api = rest({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'content-type': 'application/json' }
})

const data = await api.sales.get({ start: Date.now() })
```

## Creating a client for an existing API

An example of connecting to an existing API, in this case the JSONPlaceholder API.

```jsx
import { jsonplaceholder } from 'https://deno.land/x/netzo@v0.2.43/apis/jsonplaceholder/mod.ts'

const { api } = jsonplaceholder()

const users = await api.users.get()
```

You can visit the [`apis`](/docs/netzo/apis) page to see a list of all the APIs that are currently supported.

::: tip API configuration options
Note that different APIs might require different configuration options (see [here](/docs/netzo/apis) for more information).
:::
