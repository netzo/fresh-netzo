import { AutoFormInputComponentProps } from "../types.ts";
import AutoFormInput from "./input.tsx";

export default function AutoFormNumber({
  fieldProps,
  ...props
}: AutoFormInputComponentProps) {
  return (
    <AutoFormInput
      fieldProps={{
        type: "number",
        ...fieldProps,
      }}
      {...props}
    />
  );
}
