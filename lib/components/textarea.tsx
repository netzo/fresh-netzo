// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { IS_BROWSER } from "$fresh/runtime.ts";
import { cn } from "./utils.ts";

// deno-lint-ignore no-empty-interface
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
        disabled={IS_BROWSER ? !!props.disabled : true}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
