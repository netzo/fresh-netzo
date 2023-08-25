<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/medium.svg" alt="netzo/apis/medium" class="mb-5 w-75px">

# Medium

Medium is a place to write, read, and connect. It is easy to find and follow the things that matter to you most on Medium.

- **labels:** `blogging`, `writing`, `publishing`, `content`
- **authentication:** `bearer`

## Usage

```ts
import { medium } from 'https://deno.land/x/netzo/apis/medium/mod.ts'
const { api } = medium({
  accessToken: Deno.env.get('MEDIUM_ACCESS_TOKEN'),
})
```

## Configuration

The `medium` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param         | Type   | Default                               | Description                         |
|---------------|--------|---------------------------------------|-------------------------------------|
| `accessToken` | string | `Deno.env.get('MEDIUM_ACCESS_TOKEN')` | the token to use for authentication |

::: tip Refer to the [API documentation](https://github.com/medium/medium-api-docs#1-overview) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/medium/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find publications

Find all publications a user is subscribed to, writes to, or edits.

```ts
import type { Publications } from 'netzo/apis/medium/types.ts'

const result = await api.users[USER_ID].publications.get<Publications>()
const resultData = result.data
```

### Get user

Get the authenticated user's info.

```ts
import type { User } from 'netzo/apis/medium/types.ts'

const result = await api.me.get<User>()
const resultData = result.data
```

### Add post

Create a post to the authenticated user's profile.

```ts
import type { Post, DataAddPost } from 'netzo/apis/medium/types.ts'

const data: DataAddPost = {
  title: 'New Post',
  contentFormat: 'html',
  content: '<h1>New title</h1><p>This is new post content</p>'
}
const result = await api.users[AUTHOR_ID].posts.post<Post>(data)
const resultData = result.data
```

## References

- [API Documentation](https://github.com/medium/medium-api-docs#1-overview)
- [Website](https://medium.com/)
