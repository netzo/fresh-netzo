import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/button.tsx";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Contact, contactSchema } from "../../data/contacts.ts";
// import { I18N } from "../../data/contacts.ts";

type FormProps = {
  data?: Contact;
  action: string;
  method: "POST" | "PATCH";
};

// use z.omit()/z.pick() to filter out fields
const formSchema = contactSchema.omit({
  _id: true,
  updatedAt: true,
  createdAt: true,
});

export function FormContact({ data = {}, method, action }: FormProps) {
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
