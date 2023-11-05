import { PageProps, RouteConfig } from "$fresh/server.ts";
import { AuthForm } from "../components/AuthForm.tsx";
import { NetzoState } from "netzo/config/mod.ts";

export type AuthPageProps = PageProps<unknown, NetzoState>;

// export const config: RouteConfig = {
//   skipInheritedLayouts: true, // Skip already inherited layouts
// };

export default (props: AuthPageProps) => {
  const { title, description, favicon, image } = props.state?.meta ?? {};
  return (
    <section className="flex-1 grid place-items-center p-4">
      <div className="grid gap-6 max-w-[350px]">
        <AuthForm {...props} />

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};
