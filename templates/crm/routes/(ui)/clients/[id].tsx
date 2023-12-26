import { defineRoute } from "$fresh/server.ts";
import { EditForm } from "@/islands/Clients.tsx";
import { Separator } from "netzo/components/ui/separator.tsx";
import { Client } from "@/components/tables/clients/data/schema.ts";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await app.db.get<Client>("clients", id);

  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <EditForm data={data} />
    </div>
  );
});
