The OpenAI API for access to ChatGPT-3, which performs a variety of natural
language tasks, Codex, which translates natural language to code, and DALL·E,
which creates and edits original images. The models are hosted under different
endpoints of the same API, for example.

- `/completions` for ChatGPT-3
- `/generations` for DALL-E 2

Refer to the official documentation for more.

## Configuration

The supported auth mechanism is HTTP Bearer.

You will require your OpenAI `apiKey`, obtainable
[here](https://beta.openai.com/account/api-keys).

> For use with the Netzo SDK you will be required to build the remaining request
> URL with any of the available endpoints. The following is an example of SDK
> usage for the `/completions` endpoint:

```js
import { Netzo } from 'https://deno.land/x/netzo@v0.1.44/mod.ts'

const netzo = Netzo({ apiKey: Deno.env.get('NETZO_API_KEY') })
const RESOURCE_ID_OPENAI = 'YOUR_RESOURCE_ID'

const client = await netzo.resource(RESOURCE_ID_OPENAI)

const result = await client.completions.post({
  model: 'text-davinci-003',
  prompt:
    `Create a random tweet with a maximum of 280 characters that talks about cars and targets Formula1 enthsiasts`,
  temperature: 0,
  max_tokens: 140,
})
```

## API Reference

> For more information refer to the official documentation

## Links

- [Marketplace](https://app.netzo.io/resources/resource-https-openai)
- [API Reference](https://beta.openai.com/docs/api-reference/introduction)

<div align="center">
  <h4>© Netzo</h4>
</div>
