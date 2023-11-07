import { PageProps } from "$fresh/server.ts";
import { AuthForm } from "../components/AuthForm.tsx";
import { NetzoState } from "netzo/config/mod.ts";

export default (props: PageProps<unknown, NetzoState>) => {
  const {
    // title = "Sign In",
    // description,
    // color = "primary",
    backgroundColor = "muted",
    // logo,
    caption,
  } = props.state.auth!.options;

  return (
    <main
      className={`h-[100dvh] w-[100dvw] flex flex-col bg-[${backgroundColor}]`}
    >
      <section className="flex-1 grid place-items-center p-4">
        <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
          <AuthForm {...props.state.auth} />

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
};
