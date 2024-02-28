import { defineRoute } from "$fresh/server.ts";
import { DealCardForm } from "../../../islands/deal.tsx";
import { DealState } from "./_layout.tsx";

export default defineRoute<DealState>((req, ctx) => {
  const { id, deal } = ctx.state.data;

  return (
    <div className="h-full overflow-y-auto">
      <div class="flex flex-col gap-4 p-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <DealCardForm deal={deal} />
        </div>
      </div>
    </div>
  );
});
