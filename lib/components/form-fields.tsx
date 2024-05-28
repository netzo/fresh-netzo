import {
  ComboboxVirtualized,
  type ComboboxVirtualizedProps,
} from "netzo/components/combobox-virtualized.tsx";
import { Checkbox } from "./checkbox.tsx";
import { Combobox, ComboboxProps } from "./combobox.tsx";
import type { UseFormReturn } from "./form.tsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form.tsx";
import { Input, InputProps } from "./input.tsx";
import { RadioGroup, RadioGroupItem } from "./radio-group.tsx";
import { SelectMultiple, SelectMultipleProps } from "./select-multiple.tsx";
import { Slider } from "./slider.tsx";
import { Switch } from "./switch.tsx";
import { Textarea, TextareaProps } from "./textarea.tsx";
import { cn } from "./utils.ts";

export type FormFieldProps = {
  name: string;
  label: string;
  form: UseFormReturn;
  className?: string;
};

export const FormFieldInput = ({
  name,
  label,
  form,
  className,
  ...props
}: FormFieldProps & InputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldTextarea = ({
  name,
  label,
  form,
  className,
  ...props
}: FormFieldProps & TextareaProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldCombobox = ({
  name,
  label,
  form,
  options,
  className,
  ...props
}: FormFieldProps & ComboboxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Combobox {...field} {...props} options={options} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldComboboxVirtualized = ({
  name,
  label,
  form,
  options,
  className,
  ...props
}: FormFieldProps & ComboboxVirtualizedProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <ComboboxVirtualized {...field} {...props} options={options} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldSelect = ({
  name,
  label,
  form,
  options,
  className,
  ...props
}: FormFieldProps & ComboboxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Combobox {...field} {...props} options={options} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldSelectMultiple = ({
  name,
  label,
  form,
  options,
  className,
  ...props
}: FormFieldProps & SelectMultipleProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <SelectMultiple {...field} {...props} options={options} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldCheckbox = ({
  name,
  label,
  form,
  className,
  ...props
}: FormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormControl>
            <Checkbox {...field} {...props} />
            {label && <FormLabel>{label}</FormLabel>}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldRadioGroup = ({
  name,
  label,
  form,
  options,
  className,
  ...props
}: FormFieldProps & { options: ComboboxProps["options"] }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormControl>
            <RadioGroup {...field} {...props}>
              {options.map((option) => (
                <RadioGroupItem key={option.value} value={option.value}>
                  {option.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
            {label && <FormLabel>{label}</FormLabel>}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldSwitch = (
  { name, label, form, className, ...props }: FormFieldProps,
) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormControl>
            <Switch {...field} {...props} />
            {label && <FormLabel>{label}</FormLabel>}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormFieldSlider = (
  { name, label, form, className, ...props }: FormFieldProps,
) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormControl>
            <Slider {...field} {...props} />
            {label && <FormLabel>{label}</FormLabel>}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
