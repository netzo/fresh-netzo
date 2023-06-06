/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { asset, Head } from "$fresh/runtime.ts";
import App from "../islands/App.tsx";
import apps from "../data/apps.json" assert { type: "json" };

const meta = {
  title: "App Launcher",
  description: "An list of quick links for important apps and services.",
};

export default () => {
  return (
    <>
      <Head>
        <title>{`${meta.title} | Netzo`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <body class="flex flex-col">
        <header class="flex justify-between items-center py-6 px-10">
          <span class="flex items-center">
            <img src={asset("/logo.svg")} class="block h-8" />
            <div class="ml-4">
              <h1>{meta.title}</h1>
              <p>{meta.description}</p>
            </div>
          </span>
          <a href="https://netzo.io" target="_blank">
            <img src={asset("/built-with-netzo.svg")} class="block h-8" />
          </a>
        </header>

        <main class="flex-1 h-full">
          <App apps={apps} />
        </main>
      </body>
    </>
  );
};
