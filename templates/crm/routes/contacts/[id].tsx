import { defineRoute } from "$fresh/server.ts";
import type { Contact } from "@/data/contacts.ts";
import { FormContact } from "@/islands/contacts/Form.tsx";
import { resource } from "@/netzo.ts";
import { Separator } from "netzo/components/separator.tsx";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await resource("contacts").get<Contact>(id);

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
