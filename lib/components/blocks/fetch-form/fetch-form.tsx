// adapted from https://stackoverflow.com/a/74202858
import type { ComponentChildren, JSX } from "preact";

export type FetchFormProps = JSX.IntrinsicElements["form"] & {
  id: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  action: string;
  children?: ComponentChildren;
};

export const FetchForm = ({
  id,
  action,
  method = "post",
  ...props
}: FetchFormProps) => {
  return (
    <>
      <form id={id} method={method} action={action} {...props}>
        {props.children}
      </form>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          const form = document.getElementById("${id}");
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            try {
              const response = await fetch("${action}", {
                method: "${method.toUpperCase()}",
                body: JSON.stringify(Object.fromEntries(formData))
              });
              const data = await response.json();
              globalThis.location.reload();
            } catch (error) {
              console.error(error);
            }
          });
        `,
        }}
      />
    </>
  );
};
