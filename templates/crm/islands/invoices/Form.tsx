import { useSignal } from "@preact/signals";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Button } from "netzo/components/button.tsx";
import { Invoice, invoiceSchema } from "../../data/invoices.ts";
// import { I18N } from "../../data/invoices.ts";

type FormProps = {
  data?: Invoice;
  action: string;
  method: "POST" | "PATCH";
};

// use z.omit()/z.pick() to filter out fields
const formSchema = invoiceSchema.omit({
  _id: true,
  updatedAt: true,
  createdAt: true,
});

export function FormInvoice({ data = {}, method, action }: FormProps) {
  const values = useSignal(data);

  return (
    <Form
      values={values.value}
      formSchema={formSchema}
      onSubmit={createOnSubmit(method, action)}
    >
      <Button type="submit" className="mt-8">
        {method === "POST" ? "Create" : "Update"}
      </Button>
    </Form>
  );
}
