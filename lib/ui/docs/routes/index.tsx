import { Head } from "fresh/runtime.ts";
import Docs from "../islands/Docs.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>netzo/components | Netzo</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <main class="p-4 mx-auto max-w-screen-lg">
        <Docs />
      </main>
    </>
  );
}
