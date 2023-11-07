<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/rest.svg" alt="netzo/apis/rest" class="mb-5 w-75px">

# REST

This is a generic REST API client. It can be used to connect to any REST API.

- **labels:** `rest`, `generic`
- **authentication:** `none`, `basic`, `bearer`, `apikey`, `oauth2`

## Usage

```ts
import { rest } from 'https://deno.land/x/netzo/apis/rest/mod.ts'

const { api } = rest({ baseURL: 'https://api.example.com' })
```

::: tip The generic rest api client follows the same pattern as all other api clients. To see a further example of usage, take a look at any other of our api clients.
:::