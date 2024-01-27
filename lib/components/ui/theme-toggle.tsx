import { Button } from "./button.tsx";
import { cn } from "../utils.ts";
import { useTheme } from "../../composables/use-theme.ts";

export function ThemeToggle() {
  const { theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => theme.value = theme.value === "light" ? "dark" : "light"}
    >
      <div
        className={cn(
          "mdi-white-balance-sunny h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
          ["dark"].includes(theme.value) && "hidden",
        )}
      />
      <div
        className={cn(
          "mdi-weather-night h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
          ["light"].includes(theme.value) && "hidden",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
