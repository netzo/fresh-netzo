import { defineRoute } from "$fresh/server.ts";
import { AuthForm } from "../components/AuthForm.tsx";
import { NetzoState } from "netzo/config/mod.ts";
import { cn } from "netzo/components/utils.ts";

const kv = await Deno.openKv();

export default defineRoute<NetzoState>(async (req, ctx) => {
  const { options = {} } = ctx.state?.auth ?? {};
  const { value: config } = await kv.get(["netzo", "auth", "branding"]);
  console.log({ config });
  const {
    oauth2,
    title,
    description,
    color = "primary",
    backgroundColor = "muted",
    logo,
    caption,
  } = options;

  return (
    <main className={`h-[100dvh] w-[100dvw] flex flex-col bg-${backgroundColor}`}>
      {(title || description || logo) && (
          <header className="flex justify-between items-center p-4">
          <div className="flex">
            {/* NOTE: use dark:filter-invert (in image.class) to invert color on dark */}
            {logo && (
              <img
                src={logo}
                className={cn("w-auto h-12 my-auto mr-3")}
              />
            )}
            <div className="grid">
              <h1 className="my-auto text-2xl font-semibold dark:text-white">
                {title}
              </h1>
              <p className="text-sm dark:text-gray-300">{description}</p>
            </div>
          </div>
        </header>
      )}
      <section className="flex-1 grid place-items-center p-4">
        <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
          <AuthForm {...ctx.state} />

          {caption && (
            <p className="px-8 text-center text-sm text-muted-foreground">
              Continuing means you agree to the{"  "}
              <a
                href={caption.url}
                target="_blank"
                className="underline underline-offset-4 hover:text-primary"
              >
                {caption.text}
              </a>.
            </p>
          )}
        </div>
      </section>

      <footer className="flex justify-center items-center p-4">
        <a
          href="https://netzo.io"
          target="_blank"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Built with Netzo
        </a>
      </footer>
    </main>
  );
});
