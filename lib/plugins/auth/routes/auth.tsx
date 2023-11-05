import { PageProps } from "$fresh/server.ts";
import { AuthForm } from "../components/AuthForm.tsx";
import { NetzoState } from "netzo/config/mod.ts";

export type AuthPageProps = PageProps<unknown, NetzoState>;

export default (props: AuthPageProps) => {
  const { options } = props.state?.auth ?? {};
  return (
    <section className="flex-1 grid place-items-center p-4">
      <div className="grid gap-6 w-full xs:w-[350px] max-w-[350px]">
        <AuthForm {...props} />

        {options?.caption && (
          <p className="px-8 text-center text-sm text-muted-foreground">
          Continuing means you agree to the {" "}
          <a
            href={options.caption.url}
            target="_blank"
            className="underline underline-offset-4 hover:text-primary"
          >
            {options.caption.text}
          </a>.
        </p>
        )}
      </div>
    </section>
  );
};
