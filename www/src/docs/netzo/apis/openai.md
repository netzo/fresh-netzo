<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/openai.svg" alt="netzo/apis/openai" class="mb-5 w-75px">

# OpenAI

OpenAI is an artificial intelligence research laboratory consisting of the for-profit corporation OpenAI LP and its parent company, the non-profit OpenAI Inc.

- **labels:** `artificial-intelligence`, `ai`, `machine-learning`, `deep-learning`
- **authentication:** `apiKey`

## Usage

```ts
import { openai } from 'https://deno.land/x/netzo/apis/openai/mod.ts'
const { api } = openai({
  apiKey: Deno.env.get('OPENAI_API_KEY')
})
```

## Configuration

The `openai` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                           | Description                           |
|----------|--------|-----------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('OPENAI_API_KEY') ` | the api key to use for authentication |

::: tip Refer to the [API documentation](https://platform.openai.com/docs/api-reference) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/openai/types.ts) for all exported types to pass to the `api` client for typed responses.

### Create chat completion

Obtain a model response for the given chat conversation.

```ts 
import type { ChatCompletion, QueryChatCompletion } from 'netzo/apis/openai/types.ts'

const payload: QueryChatCompletion = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: 'Hello!'
      }
    ]
  }
const result = await api.chat.completions.post<ChatCompletion>(payload)
const data = result.choices
 ```

## References

- [API Documentation](https://platform.openai.com/docs/api-reference)
- [Website](https://openai.com/)
