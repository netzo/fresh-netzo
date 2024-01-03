import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Contact } from "@/data/contacts.schema.ts";
import type { FormContact } from "@/islands/contacts/FormContact.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Contact>("contacts", id);
  if (!data) return ctx.renderNotFound();

  const url = id === "new"
    ? `${ctx.url.origin}/api/contacts`
    : `${ctx.url.origin}/api/contacts/${id}`;

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormContact
          data={data}
          method={id === "new" ? "POST" : "PATCH"}
          url={url}
        />
      </div>
    </div>
  );
});
