<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/discord.svg" alt="netzo/apis/discord" class="mb-5 w-75px">

# Discord

Discord is a voice, video and text communication service to talk and hang out with your friends and communities.

- **labels:** `communication`, `chat`, `voice`, `video`, `gaming`
- **authentication:** `apiKey`

## Usage

```ts
import { discord } from 'https://deno.land/x/netzo/apis/discord/mod.ts'
const { api } = discord({
  tokenType: Deno.env.get('DISCORD_TOKEN_TYPE') ?? 'Bot',
  token: Deno.env.get('DISCORD_TOKEN')
})
```

## Configuration

The `discord` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param       | Type   | Default                                       | Description                         |
|-------------|--------|-----------------------------------------------|-------------------------------------|
| `tokenType` | string | `Deno.env.get("DISCORD_TOKEN_TYPE") ?? "Bot"` | the token type                      |
| `token`     | string | `token: Deno.env.get("DISCORD_TOKEN")`        | the token to use for authentication |

::: tip Refer to the [API documentation](https://discord.com/developers/docs/intro) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/discord/types.ts) for all exported types to pass to the `api` client for typed responses.

### Get channel

Get a channel by id.

```ts
import type { Channel } from 'netzo/apis/discord/types.ts'

const resultData = await api.channels[CHANNEL_ID].get<Channel>()
```

### Find messages

Find all messages on a specific channel.

```ts
import type { Message, QueryMessages } from 'netzo/apis/discord/types.ts'

const query: QueryMessages = {}
const resultData = await api.channels[CHANNEL_ID].messages.get<Message[]>(query)
```

### Add message

Post a message to a channel.

```ts
import type { Message, QueryAddOrUpdateMessage } from 'netzo/apis/discord/types.ts'

const payload: QueryAddOrUpdateMessage = { content: 'New message' }
const resultData = await api.channels[CHANNEL_ID].messages.post<Message>(payload)
 ```

### Update Message

Update a message by id.

```ts
import type { Message, QueryAddOrUpdateMessage } from 'netzo/apis/discord/types.ts'

const payload: QueryAddOrUpdateMessage = { content: 'Updated message' }
const resultData = await api.channels[CHANNEL_ID].messages[MESSAGE_ID].patch<Message>(payload)
```

## References

- [API documentation & reference](https://discord.com/developers/docs/intro)
- [Website](https://discord.com)


