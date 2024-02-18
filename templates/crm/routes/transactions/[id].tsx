import { defineRoute } from "$fresh/server.ts";
import { Separator } from "netzo/components/separator.tsx";
import type { Transaction } from "../../data/transactions.ts";
import { FormTransaction } from "../../islands/transactions/Form.tsx";
import { api } from "../../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const { id } = ctx.params;
  const data = id === "new"
    ? {}
    : await api.transactions[id].get<Transaction>();

  return (
    <div className="my-4 overflow-auto">
      <Separator />
      <div className="p-10 max-w-500px">
        {id === "new"
          ? (
            <FormTransaction
              data={data}
              method="POST"
              action={`/api/transactions`}
            />
          )
          : (
            <FormTransaction
              data={data}
              method="PATCH"
              action={`/api/transactions/${id}`}
            />
          )}
      </div>
    </div>
  );
});
