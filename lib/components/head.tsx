import type { ComponentChildren } from "preact";
import { Head as _Head } from "$fresh/runtime.ts";

export type HeadOptions = {
  title?: string;
  description?: string;
  href?: string;
  favicon?: string;
  image?: string;
  children?: ComponentChildren;
};

export const Head = (props: HeadOptions) => {
  return (
    <_Head>
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

export const Meta = (props: HeadOptions) => {
  return (
    <>
      {/* HTML Meta Tags */}
      <title>{props.title}</title>
      <meta name="description" content={props.description} />

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
