<img src="https://raw.githubusercontent.com/netzo/netzo/main/assets/apis/contpaqicomercial.svg" alt="netzo/apis/contpaqicomercial" class="mb-5 w-75px">

# CONTPAQi Comercial

CONTPAQi Comercial is an accounting and billing software for small and medium-sized businesses in Mexico. This API allows you to integrate an on-premise CONTPAQi Comercial server through use of a third-party web API. The third-party CONTPAQi API is a separate application that requires a license. [Contact the developer](https://www.arsoft.net/) or send an [email](mailto:andres@arsoft.net) to obtain an API key and installation instructions.

- **labels:** `billing`,
- **authentication:** `apiKey`

## Usage

```ts
import { contpaqicomercial } from 'https://deno.land/x/netzo/apis/contpaqicomercial/mod.ts'

const { api } = contpaqicomercial({
  apiKey: Deno.env.get('CONTPAQICOMERCIAL_API_KEY'),
  companyRfc: Deno.env.get('CONTPAQICOMERCIAL_COMPANY_RFC'),
})
```

## Configuration

The `contpaqicomercial` factory function expects an object with the following, and returns an object with an HTTP client `api`.

| Param         | Type   | Default                                       | Description                           |
|---------------|--------|-----------------------------------------------|---------------------------------------|
| `apiKey`      | string | `Deno.env.get('CONTPAQICOMERCIAL_API_KEY')`      | the api key to use for authentication |
| `companyRfc` | string | `Deno.env.get('CONTPAQICOMERCIAL_COMPANY_RFC')` | the rfc (mexican taxId) of the company               |


::: tip Refer to the [API documentation](https://github.com/AndresRamos/ARSoftware.Contpaqi.Comercial.Api/wiki) to get the required information.
:::


## References

- [API documentation](https://github.com/AndresRamos/ARSoftware.Contpaqi.Comercial.Api/wiki)
- [Website](https://www.arsoft.net/)
- [CONTPAQi Website](https://www.contpaqi.com)
