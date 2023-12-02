import { PageProps } from "$fresh/src/server/mod.ts";
import { AuthForm } from "./components/AuthForm.tsx";
import type { NetzoStatePortals } from "./mod.ts";

export default (props: PageProps<unknown, NetzoStatePortals>) => {
  const {
    // title = "Sign In",
    // description,
    // color = "primary",
    backgroundColor = "hsl(var(--muted))",
    // logo,
    caption,
  } = props.state.portals!.options;

  return (
    <main
      className={`h-[100dvh] w-[100dvw] flex flex-col bg-[${backgroundColor}]`}
    >
      <section className="grid flex-1 p-4 place-items-center">
        <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
          <AuthForm {...props.state.portals} />

          {caption && (
            <p className="px-8 text-sm text-center text-muted-foreground">
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

      <footer className="flex items-center justify-center p-4">
        <a href="https://netzo.io/" target="_blank">
          <img
            src="https://netzo.io/logos/built-with-netzo-light.svg"
            alt="Built with Netzo"
            class="h-[42px]"
          />
        </a>
      </footer>
    </main>
  );
};
