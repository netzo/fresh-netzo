import {
  SITE_BAR_STYLES,
  SITE_NAME,
} from "netzo/plugins/auth/utils/constants.ts";
import { Cross1Icon } from "@radix-ui/react-icons";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cx } from "@twind/core";
import { User } from "netzo/plugins/auth/utils/db.ts";
import { UserNav } from "@/islands/UserNav.tsx";

export type HeaderProps = {
  /** Currently signed-in user */
  sessionUser?: User;
  /**
   * URL of the current page. This is used for highlighting the currently
   * active page in navigation.
   */
  url: URL;
};

export default function Header(props: HeaderProps) {
  const NAV_ITEM = "text-gray-500 px-3 py-4 sm:py-2";
  return (
    <header
      class={cx(
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
          <img
            src="/logo.svg"
            alt={SITE_NAME + " logo"}
            class="h-8"
          />
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
            if (event.code === 'Space' || event.code === 'Enter') {
              navToggleLabel.click();
              event.preventDefault();
            }
          });
        `}
      </script>
      <nav
        class={"hidden flex-col gap-x-4 divide-y divide-solid sm:(flex items-center flex-row divide-y-0)"}
      >
        <UserNav {...props} />
      </nav>
    </header>
  );
}
