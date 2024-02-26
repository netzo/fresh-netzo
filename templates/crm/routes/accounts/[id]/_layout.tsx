import { defineLayout } from "$fresh/server.ts";
import { buttonVariants } from "netzo/components/button.tsx";
import { Separator } from "netzo/components/separator.tsx";
import { cn } from "netzo/components/utils.ts";
import type { NetzoState } from "netzo/mod.ts";
import type { Account as TAccount } from "../../../data/accounts.ts";
import type { Deal } from "../../../data/deals.ts";
import { AccountHeader } from "../../../islands/account.tsx";
import { $client } from "../../../netzo.config.ts";

const Link = (props: JSX.IntrinsicElements["a"]) => {
  const styles =
    "inline-block relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-sm font-medium text-muted-foreground shadow-none transition-none focus-visible:ring-0 aria-[current='page']:border-b-primary aria-[current='page']:text-foreground aria-[current='page']:shadow-none";
  return (
    <a
      {...props}
      className={cn(buttonVariants({ variant: "ghost" }), styles)}
    />
  );
};

export type AccountState = NetzoState & {
  resource: "accounts";
  idField: "id";
  id: string;
  account: TAccount;
  deals: Deal[];
};

export default defineLayout<AccountState>(async (req, ctx) => {
  const { id } = ctx.params;
  const [account, deals] = await Promise.all([
    $client.accounts.get(id) as TAccount,
    $client.deals.find() as Deal[],
  ]);

  ctx.state.data = { resource: "accounts", idField: "id", id, account, deals };

  return (
    <>
      <AccountHeader account={account} />

      <nav className="sticky top-0 bg-background z-10">
        <Link href={`/accounts/${id}`}>
          Overview
        </Link>
        <Link href={`/accounts/${id}/notes`}>
          Notes
        </Link>
        <Separator />
      </nav>

      <div className="h-full overflow-y-auto">
        <ctx.Component />
      </div>
    </>
  );
});
