import { defineRoute } from "$fresh/server.ts";
import { Notes } from "../../../islands/notes.tsx";
import { ContactState } from "./_layout.tsx";

export default defineRoute<ContactState>((req, ctx) => {
  const { id, contact, deals: allDeals } = ctx.state.data;

  return (
    <div>
      <Notes data={contact.notes ?? []} />
    </div>
  );
});
