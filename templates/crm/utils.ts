import { signal } from "@preact/signals";
import { useForm } from "netzo/components/form.tsx";

export function useFormState<T = unknown>(
  form: ReturnType<typeof useForm>,
  onSubmitFn: (data: T) => Promise<unknown>,
) {
  const values = signal<T>(form.getValues());
  const status = signal<"disabled" | "enabled" | "loading">("disabled");

  const onInput = () => {
    if (!["enabled"].includes(status.value)) status.value = "enabled";
  };

  const onReset = () => {
    form.reset();
    values.value = form.getValues();
    status.value = "disabled";
  };

  const onSubmit = async () => {
    status.value = "loading";
    try {
      await onSubmitFn(values.value);
      setTimeout(() => status.value = "disabled", 1000);
    } catch {
      setTimeout(() => status.value = "enabled", 1000);
    }
  };

  return { values, status, onInput, onReset, onSubmit };
}
