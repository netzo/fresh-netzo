import { defineLayout } from "$fresh/server.ts";
import { buttonVariants } from "netzo/components/button.tsx";
import { Separator } from "netzo/components/separator.tsx";
import { cn } from "netzo/components/utils.ts";
import type { NetzoState } from "netzo/mod.ts";
import type { Contact as TContact } from "../../../data/contacts.ts";
import type { Deal } from "../../../data/deals.ts";
import { ContactHeader } from "../../../islands/contact.tsx";
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

export type ContactState = NetzoState & {
  resource: "contacts";
  idField: "id";
  id: string;
  contact: TContact;
  deals: Deal[];
};

export default defineLayout<ContactState>(async (req, ctx) => {
  const { id } = ctx.params;
  const [contact, deals] = await Promise.all([
    $client.contacts.get(id) as TContact,
    $client.deals.find() as Deal[],
  ]);

  ctx.state.data = { resource: "contacts", idField: "id", id, contact, deals };

  return (
    <>
      <ContactHeader contact={contact} />

      <nav className="sticky top-0 bg-background z-10">
        <Link href={`/contacts/${id}`}>
          Overview
        </Link>
        <Link href={`/contacts/${id}/notes`}>
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
