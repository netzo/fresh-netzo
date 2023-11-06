import { Head } from "$fresh/runtime.ts";
import type { HeadOptions } from "./mod.ts";

export default (props: HeadOptions) => {
  return (
    <Head>
      <Meta
        title={props?.title}
        description={props?.description}
        href={props.href}
        imageUrl="/cover.png"
      />
      {props.children}
    </Head>
  );
}
