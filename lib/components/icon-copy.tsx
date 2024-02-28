// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { useSignal } from "@preact/signals";
import { cn } from "./utils.ts";

type IconCopyProps = {
  value: string;
  tooltip?: string;
};

export function IconCopy({ value, tooltip = "Copy" }: IconCopyProps) {
  const isCopied = useSignal(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    isCopied.value = true;
    setTimeout(() => isCopied.value = false, 500);
  };

  return (
    <div
      onClick={handleCopy}
      title={tooltip}
      className={cn(
        "mdi-content-copy mx-2 text-xs",
        isCopied.value ? "text-primary" : "text-gray-500 cursor-pointer",
      )}
    />
  );
}
