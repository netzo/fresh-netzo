import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/ui/button.tsx";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Account, accountSchema } from "@/data/accounts.ts";
// import { ALIASES } from "@/data/accounts.ts";

type FormProps = {
  data?: Account;
  action: string;
  method: "POST" | "PATCH";
}

export function FormAccount({ data, method, action }: FormProps) {
  const values = useSignal(data);

  return (
    <Form
      values={values.value}
      formSchema={accountSchema}
      onSubmit={createOnSubmit(method, action)}
    >
      <Button type="submit" className="mt-8">
        {method === "POST" ? "Create" : "Update"}
      </Button>
    </Form>
  );
}
