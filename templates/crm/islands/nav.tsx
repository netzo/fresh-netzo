import {
  NavHeader,
  NavItem,
  NavItemUser,
  NavRoot,
  NavSeparator,
  NavSpacer,
} from "netzo/components/blocks/nav/nav.tsx";
import type { NetzoState } from "netzo/mod.ts";

export const Nav = (props: { state: NetzoState }) => {
  return (
    <NavRoot>
      <NavHeader title="Netzo CRM" image="/logo.svg" />
      <NavSeparator />
      <NavItem icon="mdi-view-dashboard" text="Dashboard" href="/" exact />
      <NavItem icon="mdi-tag" text="Deals" href="/deals" />
      <NavSeparator />
      <NavItem icon="mdi-storefront" text="Accounts" href="/accounts" />
      <NavItem icon="mdi-contacts" text="Contacts" href="/contacts" />
      <NavSpacer />
      <NavItem
        icon="mdi-comment-question"
        text="Feedback"
        href="https://github.com/netzo/netzo/issues/new?title=[templates/crm]%20general%20feedback"
        target="_blank"
      />
      <NavItem
        icon="mdi-github"
        text="Open in GitHub"
        href="https://github.com/netzo/netzo/tree/main/templates/crm"
        target="_blank"
      />
      <NavSeparator />
      <NavItemUser state={props.state} />
    </NavRoot>
  );
};
