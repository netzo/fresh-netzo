import { Button } from "../button.tsx";
import { cn } from "../utils.ts";
import { useDarkMode } from "../../composables/use-dark-mode.ts";

export function HeaderDarkMode() {
  const { darkMode } = useDarkMode();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => darkMode.value = !darkMode.value}
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
