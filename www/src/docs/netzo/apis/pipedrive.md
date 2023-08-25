<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/pipedrive.svg" alt="netzo/apis/pipedrive" class="mb-5 w-75px">

# Pipedrive

Pipedrive is a cloud-based sales software company and CRM tool that helps businesses to plan their sales activities and monitor deals.

- **labels:** `sales`, `marketing`, `communication/email`, `customer-service`
- **authentication:** `apiKey`

## Usage

```ts
import { pipedrive } from 'https://deno.land/x/netzo/apis/pipedrive/mod.ts'
const { api } = pipedrive({
  apiToken: Deno.env.get('PIPEDRIVE_API_TOKEN'),
  companyDomain: Deno.env.get('PIPEDRIVE_COMPANY_DOMAIN')
})
```

## Configuration

The `pipedrive` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param           | Type   | Default                                    | Description                                  |
|-----------------|--------|--------------------------------------------|----------------------------------------------|
| `apiToken`      | string | `Deno.env.get('PIPEDRIVE_API_TOKEN')`      | the API token to use for authentication      |
| `companyDomain` | string | `Deno.env.get('PIPEDRIVE_COMPANY_DOMAIN')` | the company domain to use for authentication |


::: tip Refer to the [API documentation](https://pipedrive.readme.io/docs/getting-started) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/pipedrive/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find Deals

Find all deals that match the query.

```ts
import type { Deals, QueryGetDeals } from 'netzo/apis/pipedrive/types.ts'

const query: QueryGetDeals = {}
const result = await api.deals.get<Deals>(query)
const resultData = result.data
```

### Search Deals

Find all deals that match the search criteria.

```ts
import type { QuerySearchDeals, SearchDealsResponse } from 'netzo/apis/pipedrive/types.ts'

const query: QuerySearchDeals = { term: 'New Deal' }
const result = await api.deals.search.get<SearchDealsResponse>(query)
const resultData = result.data.items
```

### Add Deal

Add a new deal.

```ts
import type { AddOrUpdateDealResponse, DataAddDeal } from 'netzo/apis/pipedrive/types.ts'

const data: DataAddDeal = { title: 'New Deal', value: 100 }
const result = await api.deals.post<AddOrUpdateDealResponse>(data)
const resultData = result.data
```

### Update deal

Update a deal by id.

```ts
import type { AddOrUpdateDealResponse, DataUpdateDeal } from 'netzo/apis/pipedrive/types.ts'

const data: DataUpdateDeal = { title: 'Updated Title' }
const result = await api.deals[DEAL_ID].put<AddOrUpdateDealResponse>(data)
const resultData = result.data
```

### Delete deal

Delete a deal by id.

```ts
import type { DeleteResponse } from 'netzo/apis/pipedrive/types.ts'

const result = await api.deals[DEAL_ID].delete<DeleteResponse>()
const resultData = result.data
```

### Find persons

Find all persons that match the query.

```ts
import type { Persons, QueryGetPersons } from 'netzo/apis/pipedrive/types.ts'

const query: QueryGetPersons = {}
const result = await api.persons.get<Persons>(query)
const resultData = result.data
```

### Search persons

Find all persons that match the search criteria.

```ts
import type { QuerySearchPersons, SearchPersonsResponse } from 'netzo/apis/pipedrive/types.ts'

const query: QuerySearchPersons = { term: 'Smith' }
const result = await api.persons.search.get<SearchPersonsResponse>(query)
const resultData = result.data.items
```

### Add person

Add a new person.

```ts
import type { AddOrUpdatePersonResponse, DataAddPerson } from 'netzo/apis/pipedrive/types.ts'

const data: DataAddPerson = { name: 'John Doe' }
const result = await api.persons.post<AddOrUpdatePersonResponse>(data)
const resultData = result.data
```

### Update person

Update a person by id.

```ts
import type { AddOrUpdatePersonResponse, DataUpdatePerson } from 'netzo/apis/pipedrive/types.ts'

const data: DataUpdatePerson = { email: 'updated-email@email.com' }
const result = await api.persons[PERSON_ID].put<AddOrUpdatePersonResponse>(data)
const resultData = result.data
```

### Delete person

Delete a person by id.

```ts
import type { DeleteResponse } from 'netzo/apis/pipedrive/types.ts'

const result = await api.persons[PERSON_ID].delete<DeleteResponse>()
const resultData = result.data
```

## References

- [API documentation](https://pipedrive.readme.io/docs/getting-started)
- [API reference](https://developers.pipedrive.com/docs/api/v1/)
- [Website](https://pipedrive.com/)
