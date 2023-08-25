<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/mailchimp.svg" alt="netzo/apis/mailchimpmarketing" class="mb-5 w-75px">

# Mailchimp Marketing

Mailchimp Marketing is an all-in-one marketing platform that helps you manage and talk to your clients, customers, and other interested parties.

- **labels:** `email-marketing`, `marketing-automation`, `email`, `marketing`, `crm`
- **authentication:** `apiKey`

## Usage

```ts
import { mailchimpmarketing } from 'https://deno.land/x/netzo/apis/mailchimpmarketing/mod.ts'
const { api } = mailchimpmarketing({
  marketingApiKey: Deno.env.get('MAILCHIMP_MARKETING_API_KEY'),
  dataCenter: Deno.env.get('MAILCHIMP_DATA_CENTER'),
})
```

## Configuration

The `mailchimpmarketing` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param             | Type   | Default                                       | Description                           |
|-------------------|--------|-----------------------------------------------|---------------------------------------|
| `marketingApiKey` | string | `Deno.env.get('MAILCHIMP_MARKETING_API_KEY')` | the api key to use for authentication |
| `dataCenter`      | string | `Deno.env.get('MAILCHIMP_DATA_CENTER')`       | the data center for your account      |

::: tip Refer to the [API documentation](https://mailchimp.com/developer/marketing/) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/mailchimpmarketing/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find campaigns

Find all campaigns that match the query.

```ts
import type { Campaigns, QueryCampaigns } from 'netzo/apis/mailchimpmarketing/mod.ts'

const query: QueryCampaigns = {}
const result = await api.campaigns.get<Campaigns>(query)
const data = result.campaigns
```

### Get campaign

Get a campaign by id.

```ts
import type { Campaign, QueryCampaign } from 'netzo/apis/mailchimpmarketing/mod.ts'

const query: QueryCampaign = {}
const data = await api.campaigns[CAMPAIGN_ID].get<Campaign>(query)
```

### Get campaign content

Get the content of a campaign by id.

```ts
import type { CampaignContent, QueryCampaign } from 'netzo/apis/mailchimpmarketing/mod.ts'

const query: QueryCampaign = {}
const data = await api.campaigns[CAMPAIGN_ID].content.get<CampaignContent>(query)
```

### Update campaign content

Set the content of a campaign by id.

```ts
import type { CampaignContent, QueryUpdateCampaignContent } from 'netzo/apis/mailchimpmarketing/mod.ts'

const payload: QueryUpdateCampaignContent = { url: 'html-source@example.com' }
const data = await api.campaigns[CAMPAIGN_ID].content.put<CampaignContent>(payload)
```

### Schedule campaign

Schedule a campaign for delivery.

```ts
import type { QueryScheduleCampaign } from 'netzo/apis/mailchimpmarketing/mod.ts'

const payload: QueryScheduleCampaign = { schedule_time: '2024-05-30T15:00' }
const data = await api.campaigns[CAMPAIGN_ID].post<{}>(payload)
```

## References

- [API Documentation](https://mailchimp.com/developer/marketing/)
- [Website](https://mailchimp.com/)
