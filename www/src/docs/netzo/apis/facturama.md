<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/facturama.svg" alt="netzo/apis/facturama" class="mb-5 w-75px">

# Facturama

Facturama provides a cloud-based platform for the management of mexican electronic invoices, electronic receipts, and electronic payment receipts.

- **labels:** `accounting`, `invoicing`, `billing`, `finance`
- **authentication:** `basic`

## Usage

```ts
import { facturama } from 'https://deno.land/x/netzo/apis/facturama/mod.ts'
const { api } = facturama({
  username: Deno.env.get('FACTURAMA_USERNAME'),
  password: Deno.env.get('FACTURAMA_PASSWORD')
})
```

## Configuration

The `facturama` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param      | Type   | Default                              | Description        |
|------------|--------|--------------------------------------|--------------------|
| `username` | string | `Deno.env.get('FACTURAMA_USERNAME')` | Facturama username |
| `password` | string | `Deno.env.get('FACTURAMA_PASSWORD')` | Facturama password |


::: tip Refer to the [API documentation](https://apisandbox.facturama.mx/Docs) to get the required information.
:::

## Examples

The following examples assume you have [created an api client instance](#usage). Refer to the [type definitions](https://deno.land/x/netzo/apis/facturama/types.ts) for all exported types to pass to the `api` client for typed responses.

### Get product

Get a product by id.

```ts
import type { Product } from 'netzo/apis/facturama/types.ts'

const resultData = await api.Product[PRODUCT_ID].get<Product>()
```

### Add product

Add a new product.

```ts
import type { Product, QueryAddProduct } from 'netzo/apis/facturama/types.ts'

const payload: QueryAddProduct = {
  name: 'New Product',
  description: 'Product description',
  price: 100,
  unit: 'service'
}
const resultData = await api.Product.post<Product>(payload)
```

### Update product

Update a product by id.

```ts
import type { QueryUpdateProduct } from 'netzo/apis/facturama/types.ts'

const payload: QueryUpdateProduct = { description: 'Updated description' }
await api.Product[PRODUCT_ID].put<void>(payload)
```

### Delete product

Delete a product by id.

```ts
import type { Product } from 'netzo/apis/facturama/types.ts'

const resultData = await api.Product[PRODUCT_ID].delete<Product>()
```

## References

- [API Documentation](https://apisandbox.facturama.mx/Docs)
- [Website](https://facturama.mx/)
