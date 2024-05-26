// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { IS_BROWSER } from "@fresh/core/runtime";
import { Button, type ButtonProps } from "./button.tsx";
import { useDarkMode } from "./use-dark-mode.ts";
import { cn } from "./utils.ts";

export type ButtonDarkModeProps = ButtonProps;

export function ButtonDarkMode({ className, ...props }: ButtonDarkModeProps) {
  const darkMode = useDarkMode();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => darkMode.value = !darkMode.value}
      className={cn(className)}
      {...props}
      disabled={IS_BROWSER ? !!props.disabled : true}
    >
      <div
        className={cn(
          "mdi-white-balance-sunny h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
          darkMode.value === true && "hidden",
        )}
      />
      <div
        className={cn(
          "mdi-weather-night h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
          !darkMode.value && "hidden",
        )}
      />
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}
