// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { useEffect } from "preact/hooks";
import { useDarkMode } from "../deps/usehooks-ts.ts";
import { cn } from "../utils.ts";
import { Button } from "./button.tsx";

export function ButtonDarkMode() {
  const { isDarkMode, toggle } = useDarkMode();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
    >
      <div
        className={cn(
          "mdi-white-balance-sunny h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
          isDarkMode === true && "hidden",
        )}
      />
      <div
        className={cn(
          "mdi-weather-night h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
          !isDarkMode && "hidden",
        )}
      />
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}
