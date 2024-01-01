import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Contact } from "@/components/tables/contacts/data/schema.ts";
import type { FormContact } from "@/islands/contacts/FormContact.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await app.db.get<Contact>("contacts", id);
  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormContact
          data={data}
          url={`${ctx.url.origin}/api/contacts/${id}`}
        />
      </div>
    </div>
  );
});
