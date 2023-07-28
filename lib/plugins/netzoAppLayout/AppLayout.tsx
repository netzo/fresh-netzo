import { type AppProps, Head } from "../deps.ts";
import { type NetzoAppLayoutOptions } from "./mod.ts";

export default (options: NetzoAppLayoutOptions) => {
  return ({ Component }: AppProps) => {
    return (
      <>
        <Head>
          <title>{options.title}</title>
        </Head>
        <main class="max-w-screen-md px-4 pt-16 mx-auto">
          <Component />
        </main>
      </>
    );
  };
};
