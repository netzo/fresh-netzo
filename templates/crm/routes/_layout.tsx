import { defineLayout } from "$fresh/server.ts";

export default defineLayout((req, ctx) => {
  return (
    <div class="w-full h-full flex flex-col">
      <ctx.Component />
    </div>
  );
});
