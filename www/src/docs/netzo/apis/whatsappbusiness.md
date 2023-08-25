
<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/whatsappbusiness.svg" alt="netzo/apis/whatsappbusiness" class="mb-5 w-75px">

# WhatsApp Business

WhatsApp Business is a messaging platform for businesses to communicate with their customers. WhatsApp Business API is a paid service provided by Facebook.

- **labels:** `messaging`, `chat`, `sms`, `whatsapp`
- **authentication:** `bearer`

## Usage

```ts
import { whatsappbusiness } from 'https://deno.land/x/netzo/apis/whatsappbusiness/mod.ts'
const { api } = whatsappbusiness({
  businessAccountId: Deno.env.get('WHATSAPPBUSINESS_BUSINESS_ACCOUNT_ID'),
  permanentToken: Deno.env.get('WHATSAPPBUSINESS_PERMANENT_TOKEN'),
})
```

## Configuration

The `whatsappbusiness` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param               | Type   | Default                                                | Description                         |
|---------------------|--------|--------------------------------------------------------|-------------------------------------|
| `businessAccountId` | string | `Deno.env.get('WHATSAPPBUSINESS_BUSINESS_ACCOUNT_ID')` | the account id                      |
| `permanentToken`    | array  | `Deno.env.get('WHATSAPPBUSINESS_PERMANENT_TOKEN')`     | the token to use for authentication |

::: tip Refer to the [API documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/whatsappbusiness/types.ts) for all exported types to pass to the `api` client for typed responses.

### Get business profile

Get information about your business profile.

```ts
import type { Profile, QueryProfile } from 'netzo/apis/whatsappbusiness/mod.ts'

const query: QueryProfile = {}
const result = await api[PHONE_NUMBER_ID].whatsapp_business_profile.get<Profile>(query)
const data = result.data
 ```

### Update business profile

Update your business profile.

```ts
import type { QueryUpdateProfile, UpdateProfileResponse } from 'netzo/apis/whatsappbusiness/mod.ts'

const payload: QueryUpdateProfile = {
  messaging_product: 'whatsapp',
  about: 'About my business'
}
const data = await api[PHONE_NUMBER_ID].whatsapp_business_profile.post<UpdateProfileResponse>(payload)
 ```

## References

- [API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
- [Website](https://business.whatsapp.com/)
