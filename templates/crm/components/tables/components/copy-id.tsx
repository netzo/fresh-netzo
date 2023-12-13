import { CopyIcon } from "netzo/deps/@radix-ui/react-icons.ts";
import { useSignal } from "@preact/signals";

interface CopyIdProps {
  id: string;
}

export function CopyId({ id }: CopyIdProps) {
  const isCopied = useSignal(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    isCopied.value = true;
    setTimeout(() => isCopied.value = false, 500);
  };

  return (
    <CopyIcon
      onClick={handleCopy}
      className={isCopied.value
        ? "mx-2 text-blue-500"
        : "mx-2 text-gray-500 cursor-pointer"}
    />
  );
}
