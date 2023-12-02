import type { JSX } from "preact";
import {
  ACTIVE_ANCESTOR_LINK_STYLES,
  LINK_STYLES,
  SITE_BAR_STYLES,
} from "@/utils/constants.ts";
import { Cross1Icon } from "@radix-ui/react-icons";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import { User } from "netzo/plugins/portals/utils/db.ts";
import { UserNav } from "netzo/plugins/portals/components/UserNav.tsx";

export type HeaderNavItemProps = JSX.HTMLAttributes<HTMLAnchorElement> & {
  text: string;
};

export type HeaderProps = {
  /** Currently signed-in user */
  sessionUser?: User;
  /**
   * URL of the current page. This is used for highlighting the currently
   * active page in navigation.
   */
  url: URL;
  nav?: HeaderNavItemProps[];
};

export default (props: HeaderProps) => {
  const NAV_ITEM = "text-gray-500 px-3 py-4 sm:py-2";
  return (
    <header
      class={clsx(
        SITE_BAR_STYLES,
        "flex-col sm:flex-row",
      )}
    >
      <input
        type="checkbox"
        id="nav-toggle"
        class="hidden [:checked&+*>:last-child>*>:first-child]:hidden [:checked&+*>:last-child>*>:last-child]:block checked:siblings:last-child:flex"
      />

      <div class="flex justify-between items-center">
        <a href="/" class="shrink-0">
          <img src="/logo.svg" alt="Logo" class="h-8" />
        </a>
        <div class="flex gap-4 items-center">
          <label
            tabIndex={0}
            class="sm:hidden"
            id="nav-toggle-label"
            htmlFor="nav-toggle"
          >
            <HamburgerMenuIcon class="w-6 h-6" />
            <Cross1Icon class="hidden w-6 h-6" />
          </label>
        </div>
      </div>
      <script>
        {`
          const navToggleLabel = document.getElementById('nav-toggle-label');
          navToggleLabel.addEventListener('keydown', () => {
            console.log('keydown');
            if (event.code === 'Space' || event.code === 'Enter') {
              navToggleLabel.click();
              event.preventDefault();
            }
          });
        `}
      </script>
      <nav
        class={"hidden flex-col gap-x-4 divide-y divide-solid sm:flex sm:items-center sm:flex-row sm:divide-y-0"}
      >
        {props.sessionUser && props.nav?.map((item) => (
          <a
            {...item}
            class={clsx(
              LINK_STYLES,
              ACTIVE_ANCESTOR_LINK_STYLES,
              NAV_ITEM,
            )}
          >
            {item.text}
          </a>
        ))}
        <UserNav {...props} />
      </nav>
    </header>
  );
};
