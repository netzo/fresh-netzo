import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/ui/button.tsx";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Invoice, invoiceSchema } from "@/database/invoices.ts";
// import { ALIASES } from "@/database/invoices.ts";

type FormProps = {
  data?: Invoice;
  action: string;
  method: "POST" | "PATCH";
};

export function FormInvoice({ data, method, action }: FormProps) {
  const values = useSignal(data);

  return (
    <Form
      values={values.value}
      formSchema={invoiceSchema}
      onSubmit={createOnSubmit(method, action)}
    >
      <Button type="submit" className="mt-8">
        {method === "POST" ? "Create" : "Update"}
      </Button>
    </Form>
  );
}
