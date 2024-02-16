import type { FunctionalComponent, JSX } from "preact";
import {
  ControllerRenderProps,
  FieldValues,
} from "../../../deps/react-hook-form.ts";
import * as z from "../../../deps/zod/mod.ts";
import { INPUT_COMPONENTS } from "./config.ts";

export type FieldConfigItem = {
  description?: React.ReactNode;
  inputProps?: JSX.HTMLAttributes<HTMLInputElement> & {
    showLabel?: boolean;
  };
  fieldType?:
    | keyof typeof INPUT_COMPONENTS
    | FunctionalComponent<AutoFormInputComponentProps>;

  renderParent?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement | null;
};

export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
  // If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
  [Key in keyof SchemaType]?: SchemaType[Key] extends object
    ? FieldConfig<z.infer<SchemaType[Key]>>
    : FieldConfigItem;
};

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export type AutoFormInputComponentProps = {
  zodInputProps: JSX.HTMLAttributes<HTMLInputElement>;
  field: ControllerRenderProps<FieldValues, any>;
  fieldConfigItem: FieldConfigItem;
  label: string;
  isRequired: boolean;
  fieldProps: any;
  zodItem: z.ZodAny;
};
