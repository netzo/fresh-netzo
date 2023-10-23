// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import {  SITE_BAR_STYLES,  FOOTER_TEXT } from "@/utils/constants.ts";
import { cx } from "@twind/core";

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
      class={`${SITE_BAR_STYLES} flex-col md:flex-row mt-8 m-auto`}
    >
      <p>{FOOTER_TEXT}</p>
    </footer>
  );
}
