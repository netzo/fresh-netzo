import { Head } from "fresh/runtime.ts";
import Statuspage from "../islands/Statuspage.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Statuspage />
    </>
  );
}
