import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/ui/separator.tsx";
import type { Activity } from "@/components/tables/activities/data/schema.ts";
import type { FormActivity } from "@/islands/activities/FormActivity.tsx";
import { app } from "@/netzo.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new" ? {} : await app.db.get<Activity>("activities", id);
  if (!data) return ctx.renderNotFound();

  const url = id === "new"
    ? `${ctx.url.origin}/api/activities`
    : `${ctx.url.origin}/api/activities/${id}`;

  return (
    <div className="my-4 overflow-auto">
      <Separator></Separator>
      <div className="p-10 max-w-500px">
        <FormActivity
          data={data}
          method={id === "new" ? "POST" : "PATCH"}
          url={url}
        />
      </div>
    </div>
  );
});
