import { Head } from "$fresh/runtime.ts";
import Demo from "@/islands/Demo.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>netzo/ui/components</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <main class="p-4 mx-auto">
        <Demo />
      </main>
    </>
  );
}
