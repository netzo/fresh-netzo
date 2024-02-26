import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../form.tsx";
import { Textarea } from "../../../textarea.tsx";
import { AutoFormInputComponentProps } from "../types.ts";

export default function AutoFormTextarea({
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
        <Textarea {...fieldPropsWithoutShowLabel} />
      </FormControl>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
