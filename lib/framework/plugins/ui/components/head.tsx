import { ComponentChildren } from "netzo/deps/preact.ts";
import { Head as _Head } from "netzo/deps/$fresh/src/runtime/head.ts";
import type { UiOptions } from "../mod.ts";

export const Head = (
  props: UiOptions["head"] & { href: string; children?: ComponentChildren },
) => {
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
      {/* {props.children} */}
    </_Head>
  );
};

export const Meta = (props: UiOptions["head"]) => {
  return (
    <>
      {/* HTML Meta Tags */}
      <title>{props.title}</title>
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
