import { cn } from "../utils.ts";

function Skeleton({
  className,
  ...props
}: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
