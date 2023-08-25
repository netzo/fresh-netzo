<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/chartmogul.svg" alt="netzo/apis/chartmogul" class="mb-5 w-75px">

# ChartMogul

ChartMogul is a subscription analytics platform, helping you to measure, understand and grow your subscription business.

- **labels:** `sales`, `analytics`
- **authentication:** `apiKey`

## Usage

```ts
import { chartmogul } from 'https://deno.land/x/netzo/apis/chartmogul/mod.ts'
const { api } = chartmogul({
  apiKey: Deno.env.get('CHARTMOGUL_API_KEY')
})

```

## Configuration

The `chartmogul` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param    | Type   | Default                              | Description                           |
|----------|--------|--------------------------------------|---------------------------------------|
| `apiKey` | string | `Deno.env.get('CHARTMOGUL_API_KEY')` | the api key to use for authentication |


::: tip Refer to the [API documentation](https://dev.chartmogul.com/reference) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/chartmogul/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find customers

Find all records that match the query.

```ts
import type { Customers, QueryCustomers } from 'netzo/apis/chartmogul/types.ts'

const query: QueryCustomers = {}
const result = await api.customers.get<Customers>(query)
const resultData = result.entries
```

### Get customer

Get a customer by id.

```ts
import type { Customer } from 'netzo/apis/chartmogul/types.ts'

const resultData = await api.customers[CUSTOMER_UUID].get<Customer>()
```

### Add customer

Add a new customer.

```ts
import type { AddOrUpdateCustomerResponse, QueryAddCustomer } from 'netzo/apis/chartmogul/types.ts'

const payload: QueryAddCustomer = { data_source_uuid: DATA_SOURCE_UUID, external_id: EXTERNAL_ID, email: 'example@email.com'; }
const resultData = await api.customers.post<AddOrUpdateCustomerResponse>(payload)
```

### Update customer

Update a customer by id.

```ts
import type { AddOrUpdateCustomerResponse, QueryUpdateCustomer } from 'netzo/apis/chartmogul/types.ts'

const payload: QueryUpdateCustomer = { email: 'updated-email@email.com' }
const resultData = await api.customers[CUSTOMER_UUID].patch<AddOrUpdateCustomerResponse>(payload)
```

### Delete customer

Delete a customer by id.

```ts
const resultData = await api.customers[CUSTOMER_UUID].delete<{}>()
```

### Find customer subscriptions

Find all subscriptions that correspond to a specific customer by customer id.

```ts
import type { Customersubscription, QueryCustomerSubscriptions } from 'netzo/apis/chartmogul/types.ts'

const query: QueryCustomerSubscriptions = {}
const result = await api.import.customers[CUSTOMER_UUID].subscriptions.get<CustomerSubscriptions>(query)
const resultData = result.subscriptions
```

### Find customer invoices

Find all invoices that correspond to a specific customer by customer id.

```ts
import type { CustomerInvoices, QueryCustomerInvoices } from 'netzo/apis/chartmogul/types.ts'

const query: QueryCustomerInvoices = {}
const result = await api.import.customers[CUSTOMER_UUID].invoices.get<CustomerInvoices>(query)
const resultData = result.invoices
```

### Find invoices

Find all invoices that match the query.

```ts
import type { Invoices, QueryInvoices } from 'netzo/apis/chartmogul/types.ts'

const query: QueryInvoices = {}
const result = await api.invoices.get<Invoices>(query)
const resultData = result.invoices
```

### Get invoice

Get an invoice by id.

```ts
import type { Invoice, QueryInvoice } from 'netzo/apis/chartmogul/types.ts'

const query: QueryInvoice = {}
const resultData = await api.invoices[INVOICE_UUID].get<Invoice>(query)
```

## References

- [API documentation](https://dev.chartmogul.com/reference)
- [Website](https://chartmogul.com)
