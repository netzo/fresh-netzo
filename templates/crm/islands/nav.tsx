import {
  NavHeader,
  NavItem,
  NavItemAuth,
  NavRoot,
  NavSeparator,
  NavSpacer,
} from "netzo/components/blocks/nav/nav.tsx";
import type { AuthUser } from "netzo/plugins/auth/utils/db.ts";

export const Nav = (props: { sessionUser?: AuthUser }) => (
  <NavRoot sessionUser={props.sessionUser}>
    <NavHeader title="Netzo CRM" image="/logo.svg" />
    <NavSeparator />
    <NavItem icon="mdi-view-dashboard" text="Dashboard" href="/" exact />
    <NavItem icon="mdi-tag" text="Deals" href="/deals" />
    <NavSeparator />
    <NavItem icon="mdi-storefront" text="Accounts" href="/accounts" />
    <NavItem icon="mdi-contacts" text="Contacts" href="/contacts" />
    {/* <NavItem icon="mdi-file-document" text="Quotes" href="/quotes" /> */}
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
    {props.sessionUser && <NavItemAuth sessionUser={props.sessionUser} />}
  </NavRoot>
);
