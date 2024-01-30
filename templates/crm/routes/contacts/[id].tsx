import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Contact } from "@/resources/contacts.ts";
import { FormContact } from "@/islands/contacts/Form.tsx";
import { netzo } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await netzo.service("contacts").get<Contact>(id); // GET /api/contacts/:id

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormContact
              data={data}
              method="POST"
              action={`${ctx.url.origin}/db?$prefix=contacts`}
            />
          )
          : (
            <FormContact
              data={data}
              method="PATCH"
              action={`${ctx.url.origin}/db?$key=contacts,${id}`}
            />
          )}
      </div>
    </div>
  );
});
