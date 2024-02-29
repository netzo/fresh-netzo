import { Partial } from "$fresh/runtime.ts";
import { defineLayout } from "$fresh/server.ts";
import { NavLink } from "netzo/components/nav-link.tsx";
import { Separator } from "netzo/components/separator.tsx";
import type { NetzoState } from "netzo/mod.ts";
import type { Contact as TContact } from "../../../data/contacts.ts";
import type { Deal } from "../../../data/deals.ts";
import { ContactHeader } from "../../../islands/contact.tsx";
import { $client } from "../../../netzo.config.ts";

export type ContactState = NetzoState & {
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

  ctx.state.data = { id, contact, deals };

  return (
    <>
      <ContactHeader contact={contact} />

      <nav f-client-nav className="sticky top-0 bg-background z-10">
        <NavLink href={`/contacts/${id}`}>
          Overview
        </NavLink>
        <NavLink href={`/contacts/${id}/events`}>
          Events
        </NavLink>
        <Separator />
      </nav>

      <Partial name="main-content">
        <div className="h-screen">
          <ctx.Component />
        </div>
      </Partial>
    </>
  );
});
