import { useEffect, useRef } from "preact/compat";
import { IS_BROWSER } from "../../../deps/$fresh/runtime.ts";
import * as Plot from "../../../deps/@observablehq/plot.ts";

export function usePlot<T = Plot.Data>(options: Plot.PlotOptions) {
  if (!IS_BROWSER) return;

  const containerRef = useRef();

  useEffect(() => {
    const plot = Plot.plot(options);
    // .replaceWith() to replace the server-side rendered plot with
    // the client-side (hydrated) plot entirely (avoids flickering)
    containerRef.current.replaceWith(plot);
  }, []);

  return containerRef;
}
