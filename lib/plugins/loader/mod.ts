// see https://github.com/nesterow/tailored#preloader-plugin
import { Plugin } from "$fresh/src/server/mod.ts";
import type { NetzoState } from "netzo/config/mod.ts";

export type LoaderOptions = {
  color?: string;
  height?: string;
};

export type LoaderState = {};

const ANIMATION = "loader 12s ease infinite";

export const loader = ({
  color = "linear-gradient(to right, #000000 0%, #434343 51%, #000000 100%)",
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
