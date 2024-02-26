import { defineRoute } from "$fresh/server.ts";
import { Notes } from "../../../islands/notes.tsx";
import { DealState } from "./_layout.tsx";

export default defineRoute<DealState>((req, ctx) => {
  const { id, deal } = ctx.state.data;

  return (
    <div>
      <Notes data={deal.notes ?? []} />
    </div>
  );
});
