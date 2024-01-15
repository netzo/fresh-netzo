import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/ui/button.tsx";
import { Invoice, invoiceSchema } from "@/data/invoices.ts";
// import { ALIASES } from "@/data/invoices.ts";
import { Form } from "netzo/components/blocks/form/form.tsx";

interface FormProps {
  data?: Invoice;
  url: string;
  method: "POST" | "PATCH";
}

export function FormInvoice({ data, method, url }: FormProps) {
  const values = useSignal(data);

  async function onSubmit(data: Invoice) {
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
      window.location.href = "/invoices";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      values={values.value}
      formSchema={invoiceSchema}
      onSubmit={onSubmit}
    >
      <Button type="submit" className="mt-8">
        {method === "POST" ? "Create" : "Update"}
      </Button>
    </Form>
  );
}
