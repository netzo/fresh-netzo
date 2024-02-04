import AutoFormCheckbox from "./fields/checkbox.tsx";
import AutoFormDate from "./fields/date.tsx";
import AutoFormEnum from "./fields/enum.tsx";
import AutoFormInput from "./fields/input.tsx";
import AutoFormNumber from "./fields/number.tsx";
import AutoFormRadioGroup from "./fields/radio-group.tsx";
import AutoFormSwitch from "./fields/switch.tsx";
import AutoFormTextarea from "./fields/textarea.tsx";

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  fallback: AutoFormInput,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS;
} = {
  ZodBoolean: "checkbox",
  ZodDate: "date",
  ZodEnum: "select",
  ZodNativeEnum: "select",
  ZodNumber: "number",
};
