import { useSignal } from "@preact/signals";
import { createOnSubmit, Form } from "netzo/components/blocks/form/form.tsx";
import { Button } from "netzo/components/button.tsx";
import { Deal, dealSchema } from "../../data/deals.ts";
// import { I18N } from "../../data/deals.ts";

type FormProps = {
  data?: Deal;
  action: string;
  method: "POST" | "PATCH";
};

// use z.omit()/z.pick() to filter out fields
const formSchema = dealSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export function FormDeal({ data = {}, method, action }: FormProps) {
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
