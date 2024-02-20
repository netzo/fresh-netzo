import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Quote } from "../../data/quotes.ts";
import { FormQuote } from "../../islands/quotes/Form.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await $client.quotes.get(id) as Quote;

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormQuote
              data={data}
              method="POST"
              action={`/api/quotes`}
            />
          )
          : (
            <FormQuote
              data={data}
              method="PATCH"
              action={`/api/quotes/${id}`}
            />
          )}
      </div>
    </div>
  );
});
