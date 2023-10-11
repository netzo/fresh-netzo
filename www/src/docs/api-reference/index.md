# Netzo API

**Netzo is powered by an HTTP API that provides access to nearly every feature.** The Netzo front-end web application is built on top of this API, meaning almost all its data and functionality is available through the API itself.

The following resources are available externally for the specified methods:

- **Authentication:**
  - **`authentication`**: `create`
- **General:**
  - **`users`**: `find`, `get`, `create`, `patch`, `remove`
  - **`workspaces`**: `find`, `get`, `patch`, `remove`
- **Workspace Resources:**
  - **`api-keys`**: `find`, `get`, `create`, `patch`, `remove`
  - **`audit-logs`**: `find`, `get`, `create`
  - **`deployments`**: `find`, `get`, `create`
  - **`requests`**: `find`, `get`, `create`
  - **`projects`**: `find`, `get`, `create`, `patch`, `remove`
  - **`workspace-users`**: `find`, `get`, `create`, `patch`, `remove`

For a more in depth API reference check-out [api.netzo.io/docs](https://api.netzo.io/docs).

::: tip Interacting with the Netzo API
You can use the Netzo API client at [`https://deno.land/x/netzo/apis/netzo/mod.ts`](https://deno.land/x/netzo/apis/netzo/mod.ts) for an even easier way to interact programatically with the Netzo API in JavaScript/TypeScript.
:::

## Authentication

You need to provide valid authentication information to make requests to the Netzo API. Head over to the [authentication](/docs/api-reference/authentication) page to learn how to authenticate with the Netzo API.

## Usage

To make requests to the Netzo API, replace the `RESOURCE` placeholder with a valid one from the list above, and the `API_KEY` placeholder with a valid API key.

### `find`

Retrieves a list of all matching resources from the service.

```sh
curl -H "x-api-key: API_KEY" -X GET https://api.netzo.io/RESOURCE
```

```js
fetch('https://api.netzo.io/RESOURCE', {
  method: 'GET',
  headers: { 'x-api-key': 'API_KEY' },
})
```

<details>
<summary>Sample Response</summary>
Here is how a sample response could look like:

```json
{
  "total": 2,
  "limit": 25,
  "skip": 0,
  "data": [{...}, {...}]
}
```
Notice the data array returns an array of resources and is wrapped by additional pagination information.

</details>

### `get`

Retrieve a single resource from the service.

```sh
curl -H "x-api-key: API_KEY" -X GET https://api.netzo.io/RESOURCE/{_id}
```

```js
fetch('https://api.netzo.io/RESOURCE/{_id}', {
  method: 'GET',
  headers: { 'x-api-key': 'API_KEY' },
})
```

<details>
<summary>Sample Response</summary>
Here is how a sample response could look like:

```json
{...}
```
Notice how the resource is returned directly (no pagination).

</details>

### `create`

Create a new resource with data or multiple resources by passing in an array as data.

```sh
curl -H "x-api-key: API_KEY" -d '{...}' -X POST https://api.netzo.io/RESOURCE/{_id}
```

```js
fetch('https://api.netzo.io/RESOURCE/{_id}', {
    method: 'POST',
    headers: { 'x-api-key': 'API_KEY' },
    body: JSON.stringify({...})
})
```

<details>
<summary>Sample Response</summary>
Here is how a sample response could look like:

```json
{...}
```
Notice how the resource is returned directly (no pagination).

</details>

::: info Some resources don't support `create` for multiple entries from an array.
:::

### `update`

Completely replace a single or multiple resources.

```sh
curl -H "x-api-key: API_KEY" -d '{...}' -X PUT https://api.netzo.io/RESOURCE/{_id}
```

```js
fetch('https://api.netzo.io/RESOURCE/{_id}', {
    method: 'PUT',
    headers: { 'x-api-key': 'API_KEY' },
    body: JSON.stringify({...})
})
```

<details>
<summary>Sample Response</summary>
Here is how a sample response could look like:

```json
{...}
```
Notice how the resource is returned directly (no pagination).

</details>

::: info `update` is normally expected to replace an entire resource which is why for multiple records only `patch` is supported.
:::

### `patch`

Merge the existing data of a single or multiple resources with the new data.

```sh
curl -H "x-api-key: API_KEY" -d '{...}' -X PATCH https://api.netzo.io/RESOURCE/{_id}
```

```js
fetch('https://api.netzo.io/RESOURCE/{_id}', {
    method: 'PATCH',
    headers: { 'x-api-key': 'API_KEY' },
    body: JSON.stringify({...})
})
```

<details>
<summary>Sample Response</summary>
Here is how a sample response could look like:

```json
{...}
```
Notice how the resource is returned directly (no pagination).

</details>

::: info Some resources don't support `patch` for multiple entries from an array.
:::

### `remove`

Remove a single or multiple resources.

```sh
curl -H "x-api-key: API_KEY" -X DELETE https://api.netzo.io/RESOURCE/{_id}
```

```js
fetch('https://api.netzo.io/RESOURCE/{_id}', {
  method: 'DELETE',
  headers: { 'x-api-key': 'API_KEY' },
})
```

<details>
<summary>Sample Response</summary>
Here is how a sample response could look like:

```json
{...}
```
Notice how the resource is returned directly (no pagination).

</details>

::: info Some resources don't support `remove` for multiple entries from an array.
:::
