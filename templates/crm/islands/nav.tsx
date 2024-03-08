import {
  NavHeader,
  NavItem,
  NavItemUser,
  NavRoot,
  NavSeparator,
  NavSpacer,
} from "netzo/components/blocks/nav.tsx";
import type { NetzoState } from "netzo/mod.ts";

export const Nav = (props: { state: NetzoState }) => {
  return (
    <NavRoot>
      <NavHeader title="Netzo CRM" image="/logo.svg" />
      <NavSeparator />
      <NavItem icon="mdi-view-dashboard" text="Dashboard" href="/" exact />
      <NavSeparator />
      <NavItem icon="mdi-tag" text="Deals" href="/deals" />
      <NavItem
        icon="mdi-radiobox-marked"
        text="Activities"
        href="/activities"
      />
      <NavSeparator />
      <NavItem icon="mdi-storefront" text="Accounts" href="/accounts" />
      <NavItem icon="mdi-contacts" text="Contacts" href="/contacts" />
      <NavSpacer />
      <NavSeparator />
      <NavItemUser state={props.state} />
    </NavRoot>
  );
};
