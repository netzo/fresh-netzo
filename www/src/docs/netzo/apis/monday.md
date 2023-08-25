<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/monday.svg" alt="netzo/apis/monday" class="mb-5 w-75px">

# Monday

Monday is a cloud-based project management software that helps teams to manage their projects and tasks.

- **labels:** `project-management`, `productivity`, `collaboration`, `task-management`
- **authentication:** `apiKey`

## Usage

```ts
import { monday } from 'https://deno.land/x/netzo/apis/monday/mod.ts'
const { api } = monday({ 
    apiKey: Deno.env.get('MONDAY_API_KEY') 
    })
```

## Configuration

The `monday` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param                 | Type   | Default                                          | Description                                |
|-----------------------|--------|--------------------------------------------------|--------------------------------------------|
| `apiKey` | string | `Deno.env.get('MONDAY_API_KEY')` | the api key to use for authentication |


::: tip Refer to the [API documentation](https://developer.monday.com/api-reference/docs) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Monday API is built with GraphQL, so refer to the API documentation to learn about data that is available for your queries and responses.

### Find boards

Find boards up to the limit you specify.

Specify the data you want returned in the query.

```ts
const query: string = `
    query { 
        boards (limit:50) { 
            name 
            id 
        }
    }`;
const resultData = await api.post<Record<string,any>>(query)
```

### Get board

Get information about a specific board.

Specify the data you want returned in the query.

```ts
const query: string = `
    query { 
        boards (ids: ${BOARD_ID}) { 
            name 
            state 
            id 
            permissions 
        }
    }`;
const resultData = await api.post<Record<string,any>>(query)
```
### Add board

Add a new board. 

Specify the data you want returned in the query.

```ts
const query: string = `
    mutation {
        create_board (board_name: 'New board', board_kind: public) {
            id
        }
    }`;
const resultData = await api.post<Record<string,any>>(query)
```

### Update board

Update a board by id. 

Specify the data you want returned in the query.

```ts
const query: string = `
    mutation {
        update_board(board_id: ${BOARD_ID}, board_attribute: name, new_value: 'Updated board name') 
      }`;
const resultData = await api.post<Record<string,any>>(query)
```

### Delete a board

Delete a board by id. 

Specify the data you want returned in the query.

```ts
const query: string = `
   mutation {
	delete_board (board_id: ${BOARD_ID}) {
		id
        name
	}
  }`;
const resultData = await api.post<Record<string,any>>(query)
```

## References

- [API documentation](https://developer.monday.com/api-reference/docs) 
- [Website](https://monday.com/)
