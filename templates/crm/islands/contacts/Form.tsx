import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/ui/button.tsx";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Contact, contactSchema } from "@/database/contacts.ts";
// import { ALIASES } from "@/database/contacts.ts";

type FormProps = {
  data?: Contact;
  action: string;
  method: "POST" | "PATCH";
};

export function FormContact({ data, method, action }: FormProps) {
  const values = useSignal(data);

  return (
    <Form
      values={values.value}
      formSchema={contactSchema}
      onSubmit={createOnSubmit(method, action)}
    >
      <Button type="submit" className="mt-8">
        {method === "POST" ? "Create" : "Update"}
      </Button>
    </Form>
  );
}
