import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form.tsx";
import { Input } from "../../../ui/input.tsx";
import { AutoFormInputComponentProps } from "../types.ts";

export default function AutoFormInput({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  return (
    <FormItem>
      {showLabel && (
        <FormLabel>
          {label}
          {isRequired && <span className="text-destructive">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Input type="text" {...fieldPropsWithoutShowLabel} />
      </FormControl>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
