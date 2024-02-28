// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import type { ComponentChildren } from "preact";
import { Head as _Head } from "../deps/$fresh/runtime.ts";

export type HeadProps = {
  /** A short title for the app to be used in head of the page. */
  title?: string;
  /** A short description for the app to be used in head of the page. */
  description?: string;
  /** An https or data URL of the favicon to be shown in browser tabs */
  favicon?: string;
  /** An https or data URL of a cover image shown when sharing the link */
  image?: string;
  /** The canonical URL of the page */
  href: string;
  /** Optional JSX content */
  children?: ComponentChildren;
};

export const Head = (props: HeadProps) => {
  return (
    <_Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Meta
        title={props.title}
        description={props.description}
        href={props.href}
        image={props.image}
      />
      {props.children}
    </_Head>
  );
};

export const Meta = (props: HeadProps) => {
  return (
    <>
      {/* HTML Meta Tags */}
      <title>{props.title} | Netzo</title>
      <meta name="description" content={props.description} />
      <link rel="icon" href={props.favicon ?? "/favicon.svg"} />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={props.title} />
      <meta itemProp="description" content={props.description} />
      {props.image && <meta itemProp="image" content={props.image} />}

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:locale" content="en" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      {/* <meta property="og:url" content={props.href} /> */}
      <meta property="og:image" content={props.image} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </>
  );
};
