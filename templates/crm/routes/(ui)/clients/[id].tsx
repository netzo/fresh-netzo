import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Client } from "@/components/tables/clients/data/schema.ts";
import { FormClient } from "@/islands/clients/Form.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await app.db.get<Client>("clients", id);

  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormClient
          data={data}
          url={`${ctx.url.origin}/api/clients/${id}`}
        />
      </div>
    </div>
  );
});
