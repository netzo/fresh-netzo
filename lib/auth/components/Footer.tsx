import { SITE_BAR_STYLES, SITE_NAME } from "netzo/auth/utils/constants.ts";

export interface FooterProps {
  /**
   * URL of the current page. This is used for highlighting the currently
   * active page in navigation.
   */
  url: URL;
}

export default function Footer(props: FooterProps) {
  return (
    <footer
      class={`${SITE_BAR_STYLES} flex-col md:flex-row mt-8 mx-auto`}
    >
      <a href="https://netzo.io" target="_blank">Built with Netzo</a>
    </footer>
  );
}
