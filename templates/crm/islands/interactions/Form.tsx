import { useSignal } from "@preact/signals";
import { Button } from "netzo/components/button.tsx";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Interaction, interactionSchema } from "@/data/interactions.ts";
// import { I18N } from "@/data/interactions.ts";

type FormProps = {
  data?: Interaction;
  action: string;
  method: "POST" | "PATCH";
};

// use z.omit()/z.pick() to filter out fields
const formSchema = interactionSchema.omit({
  _id: true,
  updatedAt: true,
  createdAt: true,
});

export function FormInteraction({ data = {}, method, action }: FormProps) {
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
