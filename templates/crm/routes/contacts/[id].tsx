import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Contact as TData } from "../../data/contacts.ts";
import * as Contact from "../../islands/contact.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await $client.contacts.get(id) as TData;

  return (
    <div className="overflow-auto">
      <Separator />
      <Contact.Header data={data} />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <Contact.CardFormGeneral
              data={data}
              method="POST"
              action={`/api/contacts`}
            />
          )
          : (
            <Contact.CardFormGeneral
              data={data}
              method="PATCH"
              action={`/api/contacts/${id}`}
            />
          )}
      </div>
    </div>
  );
});
