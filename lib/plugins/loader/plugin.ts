// see https://github.com/nesterow/tailored#preloader-plugin
import { Plugin } from "fresh";
import type { NetzoState } from "../../mod.ts";

export type LoaderOptions = {
  color?: string;
  height?: string;
};

// deno-lint-ignore ban-types
export type LoaderState = {};

const COLOR = "hsl(var(--primary) / var(--un-bg-opacity))";

const ANIMATION = "loader 12s ease infinite";

export const loader = ({
  color = `linear-gradient(to right, ${COLOR} 0%, ${COLOR} 51%, ${COLOR} 100%)`,
  height = "4px",
}: LoaderOptions = {}): Plugin<NetzoState> => {
  const main = `data:application/javascript,
  export default function(_) {
    const loader = document.getElementById("__loader");
    const rules = loader.sheet.rules[0];
    window.showLoader = () => {
      rules.style.display = "block";
      rules.style.animation = "${ANIMATION}";
    };
    window.hideLoader = () => {
      rules.style.animationDuration = ".3s";
      setTimeout(() => {
        rules.style.display = "none";
        rules.style.animation = "none";
      }, 300);
    };
    window.addEventListener('load', hideLoader);
  }
  `;
  return {
    name: "loader",
    entrypoints: { main },
    render(ctx) {
      ctx.render();
      const cssText = `
        body:before {
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
      `;
      return {
        scripts: [{ entrypoint: "main", state: {} }],
        styles: [{ cssText, id: "__loader" }],
      };
    },
  };
};
