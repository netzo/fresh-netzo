import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Interaction } from "@/resources/interactions.ts";
import { FormInteraction } from "@/islands/interactions/Form.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await netzo.resource("interactions").get<Interaction>(id);

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
