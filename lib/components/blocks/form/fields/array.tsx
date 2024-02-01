import { useFieldArray, useForm } from "../../../../deps/react-hook-form.ts";
import * as z from "../../../../deps/zod/mod.ts";
import { beautifyObjectName } from "../utils.ts";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion.tsx";
import AutoFormObject from "./object.tsx";
import { Button } from "../../../ui/button.tsx";
import { Separator } from "../../../ui/separator.tsx";
import { FieldConfig } from "../types.ts";

export default function AutoFormArray({
  name,
  item,
  form,
  path = [],
  fieldConfig,
}: {
  name: string;
  item: z.ZodArray<any>;
  form: ReturnType<typeof useForm>;
  path?: string[];
  fieldConfig?: any;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });
  const title = item._def.description ?? beautifyObjectName(name);

  return (
    <AccordionItem value={name}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="border-l p-3 pl-6">
        {fields.map((_field, index) => {
          const key = [...path, index.toString()].join(".");
          return (
            <div className="mb-4 grid gap-6" key={`${key}`}>
              <AutoFormObject
                schema={item._def.type as z.ZodObject<any, any>}
                form={form}
                fieldConfig={fieldConfig}
                path={[...path, index.toString()]}
              />
              <Button
                variant="secondary"
                size="icon"
                type="button"
                onClick={() => remove(index)}
              >
                <i className="mdi-delete h-4 w-4" />
              </Button>
              <Separator />
            </div>
          );
        })}
        <Button
          type="button"
          onClick={() => append({})}
          className="flex items-center"
        >
          <i className="mdi-plus mr-2 h-4 w-4" />
          Add
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
