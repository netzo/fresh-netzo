import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Contact } from "../../data/contacts.ts";
import { FormContact } from "../../islands/contacts/Form.tsx";
import { $client } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await $client.contacts.get(id) as Contact;

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormContact
              data={data}
              method="POST"
              action={`/api/contacts`}
            />
          )
          : (
            <FormContact
              data={data}
              method="PATCH"
              action={`/api/contacts/${id}`}
            />
          )}
      </div>
    </div>
  );
});
