import { effect, signal } from "../../deps/@preact/signals.ts";
import { IS_BROWSER } from "../../deps/$fresh/runtime.ts";

export const isNavOpen = signal<boolean>(false);
export const isMobile = signal<boolean>(window.innerWidth < 768);

export function useLayout() {
  effect(() => {
    function handleResize() {
      isMobile.value = window.innerWidth < 768;
    }

    if (IS_BROWSER) {
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  });

  return { isNavOpen, isMobile };
}
