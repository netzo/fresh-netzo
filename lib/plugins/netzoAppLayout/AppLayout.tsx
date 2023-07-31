import { type AppProps, Head } from "../deps.ts";
import { type NetzoAppLayoutOptions } from "./mod.ts";

export default (options: NetzoAppLayoutOptions) => {
  return ({ Component }: AppProps) => {
    return (
      <>
        <Head>
          <title>{options.title}</title>
          <meta name="description" content={options.description} />
          <link rel="icon" type="image/svg+xml" href={`/${options.favicon}`} />
        </Head>
        <main class="p-4 mx-auto max-w-screen-lg">
          <Component />
        </main>
      </>
    );
  };
};
