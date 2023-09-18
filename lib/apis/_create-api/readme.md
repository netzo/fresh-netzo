# `create-api`

The `create-api` module exports the `createApi` factory function to create a
client for an HTTP API. The client is a minimal wrapper around the `fetch` API
using JS proxies that simplifies making HTTP requests.

```ts
const client = await createApi({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// GET {baseURL}/users (types optional)
const users = await client.users.get<User[]>();

// PATCH {baseURL}/users/12 (types optional)
const user = await client.users[12].patch<User>({ name: "John" });
```

::: tip This module is heavily inspired by
[`johannschopplich/unrested`](https://github.com/johannschopplich/unrested) and
its documentation. :::

## HTTP request methods

Call the appropriate method call to make a request:

- `.get()`
- `.post()`
- `.put()`
- `.delete()`
- `.patch()`

## Query parameters

For HTTP request methods supporting query parameters, add them to the method
call.

```ts
// GET {baseURL}/users?search=john
const result = await client.users.get({ search: "john" });
```

::: tip URL encoding Query parameters are automatically URL encoded using
`encodeURI`. You can pass the query parameters directly as an object. :::

## Path parameters

To include dynamic API path segments, for example `GET` request to `/users/12`,
you have two options:

```ts
// GET {baseURL}/users/12 (chain syntax):
const user = await client.users(12).get<UserResult>();
// GET {baseURL}/users/12 (bracket syntax):
const user = await client.users[12].get<UserResult>();
```

## Payload requests

For HTTP request methods supporting a payload, add it to the method call.

```ts
// POST request to {baseURL}/users
const result = await client.users.post({ name: "foo" });
```

## Request Options

You can add/overwrite client options on a method-level:

```ts
const result = await client.users.get({
  headers: { "content-type": "application/json" },
  onRequest: (request, options) => {
    request.url = request.url.replace("/v1", "/v2");
  },
  onError: (request, options, error) => {
    console.error(error);
  },
});
```

## Authorization

The following table gives an overview of the currently supported auth types for
the [supported specs](#supported-specs):

| **Auth Type**                | **Support** |
| ---------------------------- | :---------: |
| [No auth](#no-auth)          |     ✅      |
| [Basic auth](#basic-auth)    |     ✅      |
| [Bearer token](#bearer-auth) |     ✅      |
| [API key](#api-key)          |     ✅      |
| [OAuth2](#oauth2)            |     ⌛      |

### No auth

Requests will be sent without authorization by default. If your resource does
not require any authorization details you may go ahead and start using your
resource right away.

### Basic auth

**Basic auth** schema is a simple authentication method built into the HTTP
protocol. The client must provide a user name and password when sending HTTP
requests. For this, the request contains a header field in the form of
`Authorization: Basic <CREDENTIAL>`, where credential is the Base64 encoding of
username and password joined together by a single colon.

To use this auth type select `HTTP` and `basic` options, and fill-out the
following required fields:

- `username`
- `password`

### Bearer auth

**Bearer auth** (also refered to as **token authentication**) schema is a simple
HTTP authentication schema that uses security tokens (referred to as **bearer
tokens**). Bearer tokens are text strings that are included in the request
header in the form of `Authorization: Bearer <TOKEN>` and act as access keys.

To use this auth type select `HTTP` and `bearer` options, and fill-out the
following required fields:

- `token`

### API key

**API keys** is a security schema that uses simple encrypted strings to identify
an application or project that is calling the API. API keys include a key-value
pair in the request headers or query parameters when sending requests to an API.
After selecting this security schema from the dropdown field, you must provide
the key-value pair before confirming to save your changes.

To use this auth type select `API Key`, select how to send the API key
(`header`, `query`, or `cookie`), and fill-out the following required fields:

- `name`
- `value`

::: warning Multiple API Keys Some APIs use security key pairs (API key and App
ID) for authentication. For the time being we do not support multiple API Keys
out of the box. :::

### OAuth2

:::warning Authorizing Resources via the OAuth2 protocol within Netzo is not yet
supported :::

**OAuth2** is an authorization mechanism that gives API clients limited access
to user data on a web server.

This authorization mechanism requires 3 pieces of information to generate an
**Access Token**:

- **Client ID**: A unique identifier for the client application.
- **Client Secret**: A secret that is used to authenticate the client
  application.
- **Authentication URL**: The URL that the client application uses to
  authenticate with the server.

You can use external services such as [Hopscotch](https://hoppscotch.io/) or
[Postman](https://web.postman.co) to easily generate a token.

The general steps are as follows

- (1) Add your resources **Client ID**, **Client Secret** and **Authorization
  URL** within the authorization configuration
- (2) Look for a button to "Generate Token" or "Authorize", you will be prompted
  to log into the account of your authentication provider
- (3) After successful generation, retrieve the `Token` contained in the
  response
- (4) Set the **Access Token** as Bearer token in `header` or `query` parameters
  within the Netzo resource authorization overlay.

## Hooks

**Hooks are async interceptors to hook into lifecycle events of the HTTP Request
and Response.** Hooks can be configured both for the base and for Requests.
**Base hooks** run before the corresponding **Request hook** rather than
overwriting them. This allows adding additional functionality at the Request
level, while retaining base functionality common to all Requests.

There are four types of hooks:

- **`onRequest`:** runs **before** the `fetch` request is dispatched. Allows
  modifying `request` and `options`
- **`onRequestError`:** runs **if** the `fetch` request fails. Allows modifying
  `request`, `options` and `error`
- **`onResponse`:** runs **after** the `fetch` response returns (after
  `response.body` is parsed and set to `response._data`). Allows modifying
  `request`, `options` and `response`
- **`onResponseError`:** runs **if** the `fetch` response fails (when
  `response.ok` is not true). Allows modifying `request`, `options` and
  `response`
