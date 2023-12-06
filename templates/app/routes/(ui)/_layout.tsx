import { defineLayout } from "$fresh/src/server/mod.ts";

export default defineLayout((req, ctx) => {
  return (
    <div class="w-full h-full flex flex-col">
      <ctx.Component />
    </div>
  );
});
