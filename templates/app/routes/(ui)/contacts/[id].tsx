import { defineRoute } from "$fresh/src/server/mod.ts";
import { EditForm } from "@/islands/Contacts.tsx";
import { Separator } from "netzo/components/ui/separator.tsx";
import { Contact } from "@/components/tables/contacts/data/schema.ts";
import { db } from "@/utils/db.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = await db.get<Contact>("contacts", id);
  if (!data) return ctx.renderNotFound();

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <EditForm data={data} />
    </div>
  );
});
