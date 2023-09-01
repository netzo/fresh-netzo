# Notifications

**Notifications are messages you can trigger from within projects to notify users of project activity.** Notifications are meant to be triggered programmatically from within your projects. You can use them to notify users of project activity, such as when a new user joins a project or when a payment is received. Notifications will appear in real-time on a user's inbox where they can be viewed and dismissed.

<!-- [![Notifications](/docs/images/notifications/notifications.webp)](https://app.netzo.io/notifications) -->

## Creating Notifications

There are two ways to create notifications:

1. Using the `createNotification` function from `netzo/apis/netzo` (**recommended**)

```ts
import { netzo } from 'https://deno.land/x/netzo/apis/netzo/mod.ts'

const { createNotification } = netzo({ apiKey: Deno.env.get('NETZO_API_KEY') })

const notification = await createNotification({
  type: 'success',
  title: 'Payment successful',
  body: `A payment for ${amount} was received from ${payer}.`,
})
```

2. Using the `api` client directly from `netzo/apis/netzo`

```ts
import { netzo } from 'https://deno.land/x/netzo/apis/netzo/mod.ts'

const { api } = netzo({ apiKey: Deno.env.get('NETZO_API_KEY') })

const notification = await api.notifications.post({
  data: {
    type: 'success',
    title: 'Payment successful',
    body: `A payment for ${amount} was received from ${payer}.`,
  },
  // the following are required and MUST be set manually:
  denoDeploymentId: Deno.env.get('DENO_DEPLOYMENT_ID')!,
  denoRegion: Deno.env.get('DENO_REGION')!,
})
```