import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/ui/button.tsx";
import { Contact, contactSchema } from "@/data/contacts.ts";
// import { ALIASES } from "@/data/contacts.ts";
import { Form } from "netzo/components/blocks/form/form.tsx";

interface FormProps {
  data?: Contact;
  url: string;
  method: "POST" | "PATCH";
}

export function FormContact({ data, method, url }: FormProps) {
  const values = useSignal(data);

  async function onSubmit(data: Contact) {
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
      window.location.href = "/contacts";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      values={values.value}
      formSchema={contactSchema}
      onSubmit={onSubmit}
    >
      <Button type="submit" className="mt-8">
        {method === "POST" ? "Create" : "Update"}
      </Button>
    </Form>
  );
}
