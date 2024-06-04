import type { ComponentChildren } from "preact";
import { useState } from "preact/compat";
import { Button } from "../../../components/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/dialog.tsx";
import {
  FormFieldCombobox,
  FormFieldInput,
  FormFieldTextarea,
} from "../../../components/form-fields.tsx";
import { Form, useForm } from "../../../components/form.tsx";
import type { NetzoState } from "../../../mod.ts";

export const NETZOLABS_API_URL = "https://netzolabs-ops.deno.dev";

export type Issue = {
  // hidden:
  id: string;
  projectId: string;
  userId: string;
  userEmail: null | string;
  // public:
  type: "bug" | "enhancement" | "feature" | "feedback" | "question";
  title: string;
  description: string;
  // private:
  status: null | "backlog" | "stuck" | "todo" | "in-progress" | "done" | "waiting" | "deprecated";
  priority: null | "low" | "medium" | "high" | "critical";
  complexity: null | "low" | "medium" | "high" | "very-high";
  // metadata:
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};

export function DialogIssuesCreate(props: {
  locale: "en" | "es";
  state: NetzoState;
  children: ComponentChildren;
}) {
  const id = "nav-item-feedback-form";
  const [open, setOpen] = useState(false);

  const form = useForm<Issue>({
    defaultValues: {
      projectId: props.state?.netzolabs?.projectId,
      userId: props.state?.auth?.sessionUser?.id,
      userEmail: props.state?.auth?.sessionUser?.email,
      type: "feedback",
      title: "",
      description: "",
      status: null,
      priority: null,
      complexity: null,
    },
  });

  const onSubmit = async ({ ...data }: Issue) => {
    await fetch(`${NETZOLABS_API_URL}/api/issues`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    form.reset();
    setOpen(false);
  };

  const t = ({
    en: {
      title: "Report an Issue",
      description: "Please provide details about the issue encountered.",
      form: {
        type: {
          label: "Type",
          options: [
            { value: "bug", label: "Bug Report" },
            { value: "enhancement", label: "Enhancement Request" },
            { value: "feature", label: "Feature Request" },
            { value: "feedback", label: "General Feedback" },
            { value: "question", label: "Question" },
          ],
        },
        title: { label: "Title" },
        description: { label: "Description" },
        submit: "Submit",
        cancel: "Cancel",
      },
    },
    es: {
      title: "Reportar incidencia",
      description: "Proporcione detalles sobre la incidencia encontrada.",
      form: {
        type: {
          label: "Tipo",
          options: [
            { value: "bug", label: "Reporte de error" },
            { value: "enhancement", label: "Solicitud de mejora" },
            { value: "feature", label: "Solicitud de nueva función" },
            { value: "feedback", label: "Comentarios generales" },
            { value: "question", label: "Pregunta" },
          ],
        },
        title: { label: "Título" },
        description: { label: "Descripción" },
        submit: "Enviar",
        cancel: "Cancelar",
      },
    },
  })?.[props.locale ?? "es"];

  // NOTE: must manually invoke submit because submit button isteleported
  // by dialog out of form (see https://github.com/shadcn-ui/ui/issues/709)
  // IMPORTANT: When utilizing <Input type="file" /> alongside React Hook Form,
  // it is important to have an uncontrolled input (i.e. without value prop).
  // see https://github.com/shadcn-ui/ui/discussions/2137#discussioncomment-7907793
  return (
    <Dialog open={open} onOpenChange={() => !open && setOpen(true)}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id={id}
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={() => form.reset(props.defaultValues)}
          >
            <FormFieldCombobox
              name="type"
              label={t.form.type.label}
              options={t.form.type.options}
              required={true}
              form={form}
            />
            <FormFieldInput
              name="title"
              label={t.form.title.label}
              type="text"
              required={true}
              form={form}
            />
            <FormFieldTextarea
              name="description"
              label={t.form.description.label}
              required={true}
              rows={6}
              form={form}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button form={id} type="submit">
            {t.submit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
