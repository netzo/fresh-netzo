import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Interaction } from "../../data/interactions.ts";
import { FormInteraction } from "../../islands/interactions/Form.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await $client.interactions.get(id) as Interaction;

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormInteraction
              data={data}
              method="POST"
              action={`/api/interactions`}
            />
          )
          : (
            <FormInteraction
              data={data}
              method="PATCH"
              action={`/api/interactions/${id}`}
            />
          )}
      </div>
    </div>
  );
});
