<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/stripe.svg" alt="netzo/apis/stripe" class="mb-5 w-75px">

# Stripe

Stripe is a payments gateway for digital transactions and online business. It is a platform that allows you to send and receive payments over the internet.

- **labels:** `billing/payment`, `accounting/finance`
- **authentication:** `apiKey`

## Usage

```ts
import { stripe } from 'https://deno.land/x/netzo/apis/stripe/mod.ts'
const { api } = stripe({
  apiKey: Deno.env.get('STRIPE_API_KEY')
})
```

## Configuration

The `stripe` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                          | Description                           |
|----------|--------|----------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('STRIPE_API_KEY')` | the API key to use for authentication |


::: tip Refer to the [API documentation](https://stripe.com/docs/api) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/stripe/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find subscriptions

Find all subscriptions that match the query.

```ts
import type { QuerySubscriptions, Subscriptions } from 'netzo/apis/stripe/types.ts'

const query: QuerySubscriptions = {}
const result = await api.subscriptions.get<Subscriptions>(query)
const resultData = result.data
```

### Find subscription items

Find all subscription items that correspond to a specific subscription.

```ts
import type { QuerySubscriptionItems, SubscriptionItems } from 'netzo/apis/stripe/types.ts'

const query: QuerySubscriptionItems = { subscription: SUBSCRIPTION_ID }
const result = await api.subscription_items.get<SubscriptionItems>(query)
const resultData = result.data
```

###  Find customers

Find all customers that match the query.

```ts
import type { Customers, QueryCustomers } from 'netzo/apis/stripe/types.ts'

const query: QueryCustomers = {}
const result = await api.customers.get<Customers>(query)
const resultData = result.data
```

### Find invoices

Find all invoices that match the query.

```ts
import type { Invoices, QueryInvoices } from 'netzo/apis/stripe/types.ts'

const query: QueryInvoices = {}
const result = await api.invoices.get<Invoices>(query)
const resultData = result.data
```

### Find charges

Find all charges that match the query.

```ts
import type { Charges, QueryCharges } from 'netzo/apis/stripe/types.ts'

const query: QueryCharges = {}
const result = await api.charges.get<Charges>(query)
const resultData = result.data
```

### Find plans

Find all plans that match the query.

```ts
import type { Plans, QueryPlans } from 'netzo/apis/stripe/types.ts'

const query: QueryPlans = {}
const result = await api.plans.get<Plans>(query)
const resultData = result.data
```

### Find transactions

Find all transactions that have contributed to the Stripe account balance.

```ts
import type { QueryTransactions, Transactions } from 'netzo/apis/stripe/types.ts'

const query: QueryTransactions = {}
const result = await api.balance_transactions.get<Transactions>(query)
const resultData = result.data
```

## References

- [API documentation & reference](https://stripe.com/docs/api)
- [Website](https://stripe.com)
