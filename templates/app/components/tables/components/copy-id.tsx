import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "preact/hooks";

interface CopyIdProps {
  id: string;
}

export function CopyId({ id }: CopyIdProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="float-right text-gray-400 mx-2">
      {isCopied
        ? <p className="text-xs">ID copied</p>
        : <CopyIcon onClick={handleCopy} className="cursor-pointer" />}
    </div>
  );
}
