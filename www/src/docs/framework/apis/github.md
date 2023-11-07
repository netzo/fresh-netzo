<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/github.svg" alt="netzo/apis/github" class="mb-5 w-75px">

# GitHub

GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

- **labels:** `development`, `source-control`, `git`, `version-control`, `code-hosting`
- **authentication:** `bearer`

## Usage

```ts
import { github } from 'https://deno.land/x/netzo/apis/github/mod.ts'

const { api } = github({
  personalAccessToken: Deno.env.get('GITHUB_PERSONAL_ACCESS_TOKEN'),
})
```

## Configuration

The `github` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param                 | Type   | Default                                        | Description                                |
|-----------------------|--------|------------------------------------------------|--------------------------------------------|
| `personalAccessToken` | string | `Deno.env.get('GITHUB_PERSONAL_ACCESS_TOKEN')` | the access token to use for authentication |


::: tip Refer to the [API documentation](https://docs.github.com/en/rest) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/github/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find users/organizations

Find all users and organizations matching the query.

```ts
import type { QueryUsers, User } from 'netzo/apis/github/types.ts'

const query: QueryUsers = {}
const resultData = await api.users.get<User[]>(query)
```

### Get user/organization

Get a user or organization by username.

```ts
import type { User } from 'netzo/apis/github/types.ts'

const resultData = await api.users[USERNAME].get<User[]>()
```

### Find repositories of user

Find all repositories of a given user that match the query.

```ts
import type { QueryRepositories, Repository } from 'netzo/apis/github/types.ts'

const query: QueryRepositories = {}
const resultData = await api.users[USERNAME].repos.get<Repository[]>(query)
```

### Find repositories of organization

Find all repositories of a given organization that match the query.

```ts
import type { QueryRepositories, Repository } from 'netzo/apis/github/types.ts'

const query: QueryRepositories = {}
const resultData = await api.orgs[ORG].repos.get<Repository[]>(query)
```

### Find issues of repository

Find all issues of a given organization that match the query.

```ts
import type { Issue, QueryIssues } from 'netzo/apis/github/types.ts'

const query: QueryIssues = {}
const resultData = await api.repos[OWNER][REPO].issues.get<Issue[]>(query)
```

## References

- [API documentation & reference](https://docs.github.com/en/rest)
- [Website](https://github.com/)
