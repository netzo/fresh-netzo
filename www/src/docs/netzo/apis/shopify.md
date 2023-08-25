<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/shopify.svg" alt="netzo/apis/shopify" class="mb-5 w-75px">

# Shopify

Shopify is a complete commerce platform that lets you start, grow, and manage a business. Create and customize an online store, sell in multiple places, and manage integrations with third-party apps. The Admin API lets you build apps and other integrations for your own Shopify store.

- **labels:** `ecommerce`, `commerce`, `shopping-cart`, `store`
- **authentication:** `apiKey`

## Usage

```ts
import { shopify } from 'https://deno.land/x/netzo/apis/shopify/mod.ts'
const { api } = shopify({
  storeName: Deno.env.get('SHOPIFY_STORE_NAME'),
  apiVersion: Deno.env.get('SHOPIFY_API_VERSION'),
  apiKey: Deno.env.get('SHOPIFY_API_KEY'),
})
```

## Configuration

The `shopify` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param        | Type   | Default                               | Description                           |
|--------------|--------|---------------------------------------|---------------------------------------|
| `storeName`  | string | `Deno.env.get('SHOPIFY_STORE_NAME')`  | the store name                        |
| `apiKey`     | string | `Deno.env.get('SHOPIFY_API_KEY')`     | the api key to use for authentication |
| `apiVersion` | string | `Deno.env.get('SHOPIFY_API_VERSION')` | the api version                       |

::: tip Refer to the [API documentation](https://shopify.dev/docs/api) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/shopify/types.ts) for all exported types to pass to the `api` client for typed responses.

### Find customers

Find all customers that match the query.

```ts
import type { Customers, QueryCustomers } from 'netzo/apis/shopify/types.ts'

const query: QueryCustomers = {}
const result = await api['customers.json'].get<Customers>(query)
const resultData = result.customers
```

### Get customer

Get a customer by id.

To limit the search to certain fields, specify a comma-separated list of field names.

```ts
import type { Customer } from 'netzo/apis/shopify/types.ts'

const query: { fields: string } = {}
const result = await api.customers[`${CUSTOMER_ID}.json`].get<Customer>(fields)
const resultData = result.customer
```

### Find customer's orders

Find all orders belonging to a specific customer.

```ts
import type { OrderStatus, OrdersByCustomer } from 'netzo/apis/shopify/types.ts'

const query: OrderStatus = 'any'
const result = await api.customers[CUSTOMER_ID]['orders.json'].get<OrdersByCustomer>(query)
const resultData = result.orders
```

###  Add customer

Add a new customer.

```ts
import type { AddOrUpdateCustomer, AddOrUpdateCustomerResponse } from 'netzo/apis/shopify/types.ts'

const data: AddOrUpdateCustomer = {
  customer: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'example@email.com'
  }
}
const result = await api['customers.json'].post<AddOrUpdateCustomerResponse>(data)
const resultData = result.customer
```

###  Update customer

Update a customer by id.

```ts
import type { AddOrUpdateCustomer, AddOrUpdateCustomerResponse } from 'netzo/apis/shopify/types.ts'

const data: AddOrUpdateCustomer = {
  customer: {
    email: 'new-email@email.com'
  }
}
const result = await api.customers[`${CUSTOMER_ID}.json`].put<AddOrUpdateCustomerResponse>(data)
const resultData = result.customer
```

### Find orders

Find all orders that match the query.

```ts
import type { Orders, QueryOrders } from 'netzo/apis/shopify/types.ts'

const query: QueryOrders = {}
const result = await api['orders.json'].get<Orders>(query)
const resultData = result.orders
```

### Get order

Get an order by id.

To limit the search to certain fields, specify a comma-separated list of field names.

```ts
import type { Order } from 'netzo/apis/shopify/types.ts'

const query: { fields: string } = {}
const result = await api.orders[`${ORDER_ID}.json`].get<Order>(fields)
const resultData = result.order
```

###  Find products

Find all products that match the query.

```ts
import type { Products, QueryProducts } from 'netzo/apis/shopify/types.ts'

const query: QueryProducts = {}
const result = await api['products.json'].get<Products>(query)
const resultData = result.products
```

### Get product

Get a product by id.

To limit the search to certain fields, specify a comma-separated list of field names.

```ts
import type { Product } from 'netzo/apis/shopify/types.ts'

const query: { fields: string } = {}
const result = await api.products[`${PRODUCT_ID}.json`].get<Product>(fields)
const resultData = result.product
```

### Find payouts

Find all payouts that match the query.

```ts
import type { Payouts, QueryPayouts } from 'netzo/apis/shopify/types.ts'

const query: QueryPayouts = {}
const result = await api.shopify_payments['payouts.json'].get<Payouts>(query)
const resultData = result.payouts
```

## References

- [API Documentation](https://shopify.dev/docs/api/admin-rest)
- [Website](https://www.shopify.com/)
