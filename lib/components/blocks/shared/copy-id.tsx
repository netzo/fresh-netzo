import { useSignal } from "@preact/signals";
import { cn } from "../../utils.ts";

interface CopyIdProps {
  id: string;
  title?: string;
}

export function CopyId({ id, title = "Copy ID" }: CopyIdProps) {
  const isCopied = useSignal(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    isCopied.value = true;
    setTimeout(() => isCopied.value = false, 500);
  };

  return (
    <div
      onClick={handleCopy}
      title={title}
      className={cn(
        "mdi-content-copy mx-2 text-xs",
        isCopied.value ? "text-primary" : "text-gray-500 cursor-pointer",
      )}
    />
  );
}
