import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Product } from "../../data/products.ts";
import { FormProduct } from "../../islands/products/Form.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await $client.products.get(id) as Product;

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormProduct
              data={data}
              method="POST"
              action={`/api/products`}
            />
          )
          : (
            <FormProduct
              data={data}
              method="PATCH"
              action={`/api/products/${id}`}
            />
          )}
      </div>
    </div>
  );
});
