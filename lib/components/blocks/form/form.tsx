// adapted from https://github.com/vantezzen/auto-form
import type { ComponentChildren } from "../../../deps/preact.ts";
import { z } from "../../../deps/zod/mod.ts";
import { Form as _Form } from "../../ui/form.tsx";
import { DefaultValues, useForm } from "../../../deps/react-hook-form.ts";
import { zodResolver } from "../../../deps/@hookform/resolvers/zod.ts";
import { Button } from "../../ui/button.tsx";
import { cn } from "../../utils.ts";
import { FieldConfig } from "./types.ts";
import {
  getDefaultValues,
  getObjectFormSchema,
  ZodObjectOrWrapped,
} from "./utils.ts";
import AutoFormObject from "./fields/object.tsx";

export { createOnSubmit } from "./utils.ts";

export function FormSubmit({ children }: { children?: ComponentChildren }) {
  return <Button type="submit">{children ?? "Submit"}</Button>;
}

export function Form<SchemaType extends ZodObjectOrWrapped>({
  formSchema,
  values: valuesProp,
  onValuesChange: onValuesChangeProp,
  onParsedValuesChange,
  onSubmit: onSubmitProp,
  fieldConfig,
  children,
  className,
}: {
  formSchema: SchemaType;
  values?: Partial<z.infer<SchemaType>>;
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onSubmit?: (values: z.infer<SchemaType>) => void;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  children?: ComponentChildren;
  className?: string;
}) {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> =
    getDefaultValues(objectFormSchema);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: valuesProp,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data);
    }
  }

  return (
    <_Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e);
        }}
        onChange={() => {
          const values = form.getValues();
          onValuesChangeProp?.(values);
          const parsedValues = formSchema.safeParse(values);
          if (parsedValues.success) {
            onParsedValuesChange?.(parsedValues.data);
          }
        }}
        className={cn("space-y-5", className)}
      >
        <AutoFormObject
          schema={objectFormSchema}
          form={form}
          fieldConfig={fieldConfig}
        />

        {children}
      </form>
    </_Form>
  );
}
