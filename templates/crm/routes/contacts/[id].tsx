import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Contact } from "@/data/contacts.ts";
import { FormContact } from "@/islands/contacts/Form.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Contact>(["contacts", id]);

  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormContact
              data={data}
              method="POST"
              url={`${ctx.url.origin}/api?$prefix=contacts`}
            />
          )
          : (
            <FormContact
              data={data}
              method="PATCH"
              url={`${ctx.url.origin}/api?$key=contacts,${id}`}
            />
          )}
      </div>
    </div>
  );
});
