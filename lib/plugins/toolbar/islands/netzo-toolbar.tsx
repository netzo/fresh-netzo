// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
// import { ButtonDarkMode } from "../../components/button-dark-mode.tsx";
import { Button } from "../../../components/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogContentControlled,
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
import { cn } from "../../../components/utils.ts";
import { useLocalStorage } from "../../../deps/usehooks-ts.ts";
import { NetzoState } from "../../../mod.ts";

// created using v0 by Vercel see https://v0.dev/t/aLUPWlh

export type NetzoToolbarProps = JSX.IntrinsicElements["menu"] & {
  state: NetzoState;
};

export function NetzoToolbar({ state, className }: NetzoToolbarProps) {
  const { links = [] } = state?.toolbar ?? {};

  const [
    expanded,
    setExpanded,
    // removeExpanded
  ] = useLocalStorage<boolean>("netzo:toolbar", globalThis?.innerWidth >= 768);

  const styles = {
    toolbarButton: "text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100",
  };

  const onClickShare = () => {
    globalThis.navigator.share({
      title: globalThis.document.title,
      text: "Open in Netzo",
      url: globalThis.location.href,
    });
  };

  return (
    <menu
      className={cn(
        "flex items-center justify-center",
        "rounded-full bg-zinc-800 p-2 max-w-max",
        "fixed bottom-20px -translate-x-2/4 translate-y-0 left-2/4",
        className,
      )}
    >
      {expanded && (
        <>
          <div className="flex space-x-1 pr-2 border-r border-zinc-600">
            {
              /* FIXME: requires cookies or some server-side state to persist darkMode state
            or else the darkMode state will be reset on every page load  since it's client-side only
            <ButtonDarkMode
              size="icon"
              variant="ghost"
              title="Toggle dark mode"
              className={cn(styles.toolbarButton)}
            /> */
            }
            <Button
              size="icon"
              variant="ghost"
              title="Share"
              className={cn(styles.toolbarButton)}
              onClick={onClickShare}
            >
              <i className="mdi-share-variant h-6 w-6" />
              <span className="sr-only">Share</span>
            </Button>
            <DialogFeedbackNetzolabs state={state}>
              <Button
                size="icon"
                variant="ghost"
                title="Feedback"
                className={cn(styles.toolbarButton)}
              >
                <i className="mdi-comment-question h-6 w-6" />
                <span className="sr-only">Feedback</span>
              </Button>
            </DialogFeedbackNetzolabs>
            <DialogInfo state={state}>
              <Button
                size="icon"
                variant="ghost"
                title="Info"
                className={cn(styles.toolbarButton)}
              >
                <i className="mdi-information h-6 w-6" />
                <span className="sr-only">Information</span>
              </Button>
            </DialogInfo>
          </div>

          <div className="flex space-x-1 px-2 border-r border-zinc-600">
            {links.slice(0, 3).map((link) => (
              <a key={link.href} href={link.href} target={link.target}>
                <img
                  {...link}
                  className={cn("rounded-full bg-white border-2", link.className)}
                  style={{ height: "32px", width: "32px", aspectRatio: "32/32" }}
                />
              </a>
            ))}
            {
              /* <div className="relative">
              <img
                alt="Avatar 3"
                className="rounded-full border-2 border-[#666666] bg-gray-700 opacity-50"
                src="https://v0.dev/placeholder.svg"
                style={{ height: "32px", width: "32px", aspectRatio: "32/32", objectFit: "cover" }}
              />
              <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white text-xs font-bold">
                9+
              </span>
            </div> */
            }
          </div>
        </>
      )}
      <div className={cn("flex", expanded ? "pl-2" : "")}>
        <Button
          size="icon"
          variant="ghost"
          title={expanded ? "Collapse toolbar" : "Expand toolbar"}
          className={cn(styles.toolbarButton)}
          onClick={() => setExpanded(!expanded)}
        >
          <i className="mdi-menu h-6 w-6" />
          <span className="sr-only">Expand</span>
        </Button>
      </div>
    </menu>
  );
}

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

export function DialogFeedbackNetzolabs(props: { state: NetzoState; children: ComponentChildren }) {
  const open = useSignal(false);

  const { locale = "es" } = props.state?.toolbar ?? {};

  const id = "nav-item-feedback-form";

  const form = useForm<Issue>({
    defaultValues: {
      projectId: props.state?.toolbar?.projectId,
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
    await fetch(`https://netzolabs-oms.deno.dev/api/issues`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    form.reset();
    open.value = false;
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
            { value: "feature", label: "Solicitud de nueva funcionalidad" },
            { value: "feedback", label: "Comentarios generales" },
            { value: "question", label: "Pregunta" },
          ],
        },
        title: { label: "Título" },
        description: { label: "Descripción" },
        submit: "Enviar",
      },
    },
  })?.[locale];

  // NOTE: must manually invoke submit because submit button isteleported
  // by dialog out of form (see https://github.com/shadcn-ui/ui/issues/709)
  // IMPORTANT: When utilizing <Input type="file" /> alongside React Hook Form,
  // it is important to have an uncontrolled input (i.e. without value prop).
  // see https://github.com/shadcn-ui/ui/discussions/2137#discussioncomment-7907793
  return (
    <Dialog open={open.value} onOpenChange={(value) => !open.value && (open.value = value)}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContentControlled className="sm:max-w-[425px]" onClick={() => open.value = false}>
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
            {t.form.submit}
          </Button>
        </DialogFooter>
      </DialogContentControlled>
    </Dialog>
  );
}

export function DialogInfo(props: { state: NetzoState; children: ComponentChildren }) {
  const { locale = "es", denoJson } = props.state?.toolbar ?? {};

  const t = ({
    en: {
      title: "Appllication Information",
      content: {
        name: "Name",
        description: "Description",
        version: "Version",
      },
    },
    es: {
      title: "Información de la aplicación",
      content: {
        name: "Nombre",
        description: "Descripción",
        version: "Versión",
      },
    },
  })?.[locale];

  const TH = "text-left font-bold text-sm text-gray-500 dark:text-gray-400";
  const TD = "text-right text-sm text-gray-500 dark:text-gray-400";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>
        <table className="w-full space-y-2 mt-3">
          <tr>
            <th className={TH}>{t.content.name}</th>
            <td className={TD}>{denoJson?.name}</td>
          </tr>
          <tr>
            <th className={TH}>{t.content.description}</th>
            <td className={TD}>{denoJson?.description}</td>
          </tr>
          <tr>
            <th className={TH}>{t.content.version}</th>
            <td className={TD}>{denoJson?.version}</td>
          </tr>
        </table>
      </DialogContent>
    </Dialog>
  );
}
