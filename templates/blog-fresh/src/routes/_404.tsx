/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { Post } from "@/utils/posts.ts";

export default function Blog404Page(props: PageProps<Post[]>) {
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">Oops!</h1>
      <div class="mt-8">
        <p>404 Error</p>
        <p>Sorry about that!</p>
      </div>
    </main>
  );
}
