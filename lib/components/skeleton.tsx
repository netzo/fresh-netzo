// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { cn } from "./utils.ts";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-opacity-10", className)}
      {...props}
    />
  );
}

export { Skeleton };
