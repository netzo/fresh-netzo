import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/ui/button.tsx";
import { Account, accountSchema } from "@/data/accounts.ts";
// import { ALIASES } from "@/data/accounts.ts";
import { Form } from "netzo/components/blocks/form/form.tsx";

interface FormProps {
  data?: Account;
  url: string;
  method: "POST" | "PATCH";
}

export function FormAccount({ data, method, url }: FormProps) {
  const values = useSignal(data);

  async function onSubmit(data: Account) {
    const updatedAt = new Date().toISOString();
    const createdAt = data?.createdAt || updatedAt;
    try {
      await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          createdAt,
          updatedAt,
        }),
      });
      window.location.href = "/accounts";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      values={values.value}
      formSchema={accountSchema}
      onSubmit={onSubmit}
    >
      <Button type="submit" className="mt-8">
        {method === "POST" ? "Create" : "Update"}
      </Button>
    </Form>
  );
}
