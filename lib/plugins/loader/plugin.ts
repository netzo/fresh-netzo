// see https://github.com/nesterow/tailored#preloader-plugin
import type { App } from "fresh";
import type { NetzoState } from "../../mod.ts";

export type LoaderOptions = {
  color?: string;
  height?: string;
};

// deno-lint-ignore ban-types
export type LoaderState = {};

const COLOR = "hsl(var(--primary) / var(--un-bg-opacity))";

const ANIMATION = "loader 12s ease infinite";

/**
 * Plugin to add a page loader
 *
 * @example Add the following scripts and styles to the _app.tsx file:
 * <link id="__loader" rel="stylesheet" href="netzo/plugins/loader.css" />
 * <script type="module" src="netzo/plugins/loader.js" />
 */
export const loader = (app: App<NetzoState>, {
  color = `linear-gradient(to right, ${COLOR} 0%, ${COLOR} 51%, ${COLOR} 100%)`,
  height = "4px",
}: LoaderOptions = {}) => {
  console.log("TODO: port loader() plugin to fresh@2.0");

  // Add a middleware to handle requests for the generated CSS file with no-cache
    // FIXME: this custom route is not working somehow
  app.get("/netzo/plugins/loader.css", (_ctx) => {
    return new Response(`body:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height};
  background: ${color};
  animation: ${ANIMATION};
}
@keyframes loader {
  0% {
    width: 10%;
  }
  50% {
    width: 60%;
  }
  100% {
    width: 100%;
  }
}
`, {
      headers: {
        "content-type": "text/css",
        "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  });

  app.get("/netzo/plugins/loader.js", (_ctx) => {
    return new Response(`const loader = document.getElementById("__loader");
const rules = loader.sheet.rules[0];
globalThis.showLoader = () => {
  rules.style.display = "block";
  rules.style.animation = "${ANIMATION}";
};
globalThis.hideLoader = () => {
  rules.style.animationDuration = ".3s";
  setTimeout(() => {
    rules.style.display = "none";
    rules.style.animation = "none";
  }, 300);
};
globalThis.addEventListener('load', hideLoader);
`, {
      headers: {
        "content-type": "application/javascript",
        "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  });
};
