import { defineRoute } from "$fresh/server.ts";
import { Notes } from "../../../islands/notes.tsx";
import { AccountState } from "./_layout.tsx";

export default defineRoute<AccountState>((req, ctx) => {
  const { id, account, deals: allDeals } = ctx.state.data;

  return (
    <div>
      <Notes data={account.notes ?? []} />
    </div>
  );
});
