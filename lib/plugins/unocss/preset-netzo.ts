import { /*mergeDeep*/ type PresetOrFactory } from "../../deps/@unocss/core.ts";
import { presetIcons } from "../../deps/@unocss/preset-icons/browser.ts";
import { presetTypography } from "../../deps/@unocss/preset-typography.ts";
import { presetUno, type PresetUnoOptions, type Theme } from "../../deps/@unocss/preset-uno.ts";
import { presetShadcn } from "./preset-shadcn/mod.ts";
import type { PresetShadcnOptions } from "./preset-shadcn/types.ts";
// IMPORTANT: rather than importing dynamically at runtime using via
// async import(https://esm.sh/@iconify-json/mdi@1.1.66/icons.json),
// we vendor the MDI collection isntead to avoid network request and we
// also add ALL icons to the safelist to avoid having to have CSR mode enabled
import mdi from "./preset-icons/collections/mdi.json" with { type: "json" };

// @unocss-include

export type PresetNetzoOptions = PresetUnoOptions & {
  /**
   * @default 'blue'
   */
  color?: PresetShadcnOptions["color"];
  /**
   * @default 0.5
   */
  radius?: PresetShadcnOptions["radius"];
};

export function presetNetzo(
  options: PresetNetzoOptions = {},
): PresetOrFactory<Theme> | PresetOrFactory<Theme>[] {
  const { color = "zinc", radius = 0.5, ...unoOptions } = options ?? {};
  // IMPORTANT: note that functions are dropped for CSR mode due to by
  // esbuild serialization so we use non-function syntax where possible
  return {
    ...unoOptions,

    name: "unocss-preset-netzo",

    presets: [
      presetShadcn({ color, radius }),
      presetUno(), // IMPORTANT: slows hydration when CSR mode from ~600ms to ~30s (use presetMini() instead)
      presetTypography(),
      // IMPORTANT: the presetIcons() preset bloats bundle size of unocss config object so
      // it results in very slow hydration when CSR mode is enabled with the netzo.unocss plugin.
      // To avoid this, we omit the presetIcons() preset from the unocss config object in the
      // entrypoint script of the plugin so it does not have bloat bundle after being serialized by esbuild.
      presetIcons({
        // NOTE: each added collection bloats bundle size (e.g. logos collection weights ~7MB)
        // see https://esbuild.github.io/analyze/ to analyze bundle size of _fresh/metafile.json
        collections: {
          mdi: () => mdi, // vendored MDI collection to avoid extra network request
          netzo: {
            symbol:
              '<svg xmlns="http://www.w3.org/2000/svg" width="172" height="171" viewBox="0 0 172 171" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M85.6636 170.884C105.14 170.884 123.094 164.366 137.462 153.391L124.712 140.641C113.709 148.394 100.289 152.948 85.806 152.948C71.2195 152.948 57.7117 148.329 46.6654 140.475L33.7996 153.34C48.1788 164.346 66.1576 170.884 85.6636 170.884ZM17.6955 137.205L30.5656 124.335C22.7694 113.314 18.1884 99.8572 18.1884 85.3304C18.1884 70.8469 22.7421 57.4271 30.4958 46.4243L17.7457 33.6743C6.77083 48.0426 0.251953 65.9964 0.251953 85.4727C0.251953 104.919 6.75096 122.848 17.6955 137.205ZM171.075 85.4727C171.075 104.949 164.556 122.903 153.582 137.271L140.88 124.569C148.777 113.505 153.424 99.9603 153.424 85.3304C153.424 70.7439 148.805 57.2361 140.95 46.1898L153.531 33.6086C164.537 47.9879 171.075 65.9667 171.075 85.4727ZM137.396 17.5046C123.039 6.56004 105.11 0.0610352 85.6636 0.0610352C66.1873 0.0610352 48.2336 6.5799 33.8653 17.5547L46.5669 30.2563C57.6314 22.359 71.1761 17.7128 85.806 17.7128C100.333 17.7128 113.79 22.2938 124.811 30.0899L137.396 17.5046Z" fill="#0080FF"/> <path d="M107.016 85.4728C107.016 97.2657 97.4564 106.826 85.6635 106.826C73.8706 106.826 64.3105 97.2657 64.3105 85.4728C64.3105 73.6799 73.8706 64.1199 85.6635 64.1199C97.4564 64.1199 107.016 73.6799 107.016 85.4728Z" fill="#0080FF"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M78.3418 32.5173C54.6677 35.7365 35.928 54.4762 32.709 78.1503H50.6419C53.5633 64.3412 64.4923 53.4875 78.3418 50.6763V32.5173ZM120.277 78.1503C117.375 64.4361 106.576 53.6368 92.8617 50.7354V32.5173C116.536 35.7364 135.276 54.4761 138.495 78.1503H120.277ZM92.8617 120.37C106.671 117.448 117.524 106.52 120.336 92.6703H138.495C135.275 116.344 116.536 135.084 92.8617 138.303V120.37ZM50.5829 92.6703C53.4135 106.615 64.3973 117.599 78.3418 120.429V138.303C54.6678 135.084 35.9282 116.344 32.709 92.6703H50.5829Z" fill="#0080FF"/> </svg>',
            logo:
              '<svg width="460" height="172" viewBox="0 0 460 172" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M231.821 59.9616C243.71 59.9616 249.655 67.0952 249.655 81.3623V108.311C249.655 109.632 249.192 110.755 248.268 111.68C247.409 112.605 246.286 113.067 244.899 113.067C243.578 113.067 242.455 112.605 241.531 111.68C240.672 110.755 240.242 109.632 240.242 108.311V81.4614C240.242 77.5644 239.351 74.4599 237.567 72.1481C235.784 69.8363 232.878 68.6804 228.849 68.6804C226.207 68.6804 223.796 69.2749 221.616 70.4638C219.502 71.5867 217.818 73.1389 216.563 75.1205C215.374 77.036 214.78 79.1496 214.78 81.4614V108.311C214.78 109.632 214.317 110.755 213.392 111.68C212.534 112.605 211.411 113.067 210.024 113.067C208.637 113.067 207.514 112.638 206.655 111.779C205.797 110.854 205.367 109.699 205.367 108.311V65.9062C205.367 64.5852 205.797 63.4623 206.655 62.5376C207.58 61.6129 208.703 61.1505 210.024 61.1505C211.411 61.1505 212.534 61.6129 213.392 62.5376C214.317 63.4623 214.78 64.5852 214.78 65.9062V69.374C216.497 66.7319 218.875 64.5192 221.913 62.7358C225.018 60.8863 228.32 59.9616 231.821 59.9616Z" fill="black"/> <path d="M309.286 85.1273C309.22 86.3162 308.725 87.34 307.8 88.1987C306.876 88.9913 305.786 89.3876 304.531 89.3876H269.655C270.118 94.2094 271.934 98.0734 275.105 100.98C278.341 103.886 282.271 105.339 286.895 105.339C290.065 105.339 292.641 104.877 294.623 103.952C296.604 103.027 298.355 101.838 299.874 100.385C300.865 99.7908 301.823 99.4935 302.747 99.4935C303.87 99.4935 304.795 99.8898 305.521 100.682C306.314 101.475 306.71 102.4 306.71 103.457C306.71 104.844 306.05 106.099 304.729 107.222C302.813 109.137 300.27 110.755 297.1 112.076C293.929 113.397 290.693 114.058 287.39 114.058C282.04 114.058 277.317 112.935 273.222 110.689C269.193 108.444 266.056 105.306 263.81 101.277C261.63 97.2478 260.54 92.6902 260.54 87.6042C260.54 82.0559 261.663 77.2011 263.909 73.0398C266.221 68.8125 269.226 65.576 272.925 63.3302C276.69 61.0845 280.719 59.9616 285.012 59.9616C289.24 59.9616 293.203 61.0514 296.902 63.2312C300.601 65.4109 303.573 68.4162 305.819 72.2472C308.064 76.0782 309.22 80.3716 309.286 85.1273ZM285.012 68.6804C281.313 68.6804 278.11 69.7372 275.402 71.8509C272.694 73.8985 270.91 77.102 270.052 81.4614H299.28V80.6688C298.949 77.1681 297.364 74.2948 294.524 72.0491C291.75 69.8033 288.579 68.6804 285.012 68.6804Z" fill="black"/> <path d="M334.285 70.3647V99.8898C334.285 103.192 335.771 104.844 338.743 104.844C339.206 104.844 339.833 104.745 340.626 104.546C341.418 104.282 342.046 104.15 342.508 104.15C343.367 104.15 344.094 104.513 344.688 105.24C345.283 105.967 345.58 106.891 345.58 108.014C345.58 109.401 344.787 110.59 343.202 111.581C341.617 112.572 339.833 113.067 337.852 113.067C335.672 113.067 333.657 112.836 331.808 112.374C330.025 111.911 328.406 110.755 326.953 108.906C325.566 106.99 324.873 104.117 324.873 100.286V70.3647H319.126C317.871 70.3647 316.814 69.9684 315.956 69.1758C315.163 68.3171 314.767 67.2603 314.767 66.0053C314.767 64.7503 315.163 63.7265 315.956 62.9339C316.814 62.1413 317.871 61.745 319.126 61.745H324.873V53.4225C324.873 52.1014 325.302 50.9786 326.161 50.0538C327.085 49.1291 328.241 48.6667 329.628 48.6667C330.949 48.6667 332.039 49.1291 332.898 50.0538C333.823 50.9786 334.285 52.1014 334.285 53.4225V61.745H342.508C343.763 61.745 344.787 62.1743 345.58 63.033C346.438 63.8256 346.868 64.8494 346.868 66.1044C346.868 67.3594 346.438 68.3832 345.58 69.1758C344.787 69.9684 343.763 70.3647 342.508 70.3647H334.285Z" fill="black"/> <path d="M390.747 104.348C392.002 104.348 393.059 104.778 393.918 105.636C394.777 106.429 395.206 107.453 395.206 108.708C395.206 109.963 394.777 111.02 393.918 111.878C393.059 112.671 392.002 113.067 390.747 113.067H358.745C357.49 113.067 356.434 112.605 355.575 111.68C354.782 110.755 354.386 109.798 354.386 108.807C354.452 107.948 354.584 107.255 354.782 106.726C354.98 106.132 355.344 105.471 355.872 104.745L381.831 70.0675H360.331C359.076 70.0675 358.019 69.6382 357.16 68.7795C356.302 67.9208 355.872 66.864 355.872 65.609C355.872 64.354 356.269 63.3302 357.061 62.5376C357.92 61.745 359.01 61.3487 360.331 61.3487H390.747C392.002 61.3487 393.026 61.811 393.819 62.7358C394.678 63.6605 395.074 64.7834 395.008 66.1044C394.942 66.7649 394.81 67.3594 394.612 67.8878C394.479 68.3502 394.149 68.8786 393.621 69.473L367.464 104.348H390.747Z" fill="black"/> <path d="M453.826 87.1088C453.826 92.2609 452.67 96.8845 450.358 100.98C448.046 105.075 444.876 108.278 440.847 110.59C436.884 112.902 432.491 114.058 427.669 114.058C422.848 114.058 418.422 112.902 414.393 110.59C410.43 108.278 407.292 105.075 404.981 100.98C402.669 96.8845 401.513 92.2609 401.513 87.1088C401.513 81.9568 402.669 77.3002 404.981 73.1389C407.292 68.9777 410.43 65.7411 414.393 63.4293C418.422 61.1175 422.848 59.9616 427.669 59.9616C432.491 59.9616 436.884 61.1175 440.847 63.4293C444.876 65.7411 448.046 68.9777 450.358 73.1389C452.67 77.3002 453.826 81.9568 453.826 87.1088ZM444.413 87.1088C444.413 83.542 443.654 80.3716 442.135 77.5974C440.682 74.7572 438.667 72.5775 436.091 71.0583C433.581 69.473 430.774 68.6804 427.669 68.6804C424.565 68.6804 421.725 69.473 419.149 71.0583C416.639 72.5775 414.624 74.7572 413.105 77.5974C411.652 80.3716 410.925 83.542 410.925 87.1088C410.925 90.6096 411.652 93.747 413.105 96.5212C414.624 99.2954 416.639 101.475 419.149 103.06C421.725 104.58 424.565 105.339 427.669 105.339C430.774 105.339 433.581 104.58 436.091 103.06C438.667 101.475 440.682 99.2954 442.135 96.5212C443.654 93.747 444.413 90.6096 444.413 87.1088Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M85.4644 171.147C104.941 171.147 122.895 164.628 137.263 153.653L124.513 140.903C113.51 148.657 100.09 153.211 85.6068 153.211C71.0203 153.211 57.5125 148.592 46.4662 140.737L33.6003 153.603C47.9796 164.608 65.9584 171.147 85.4644 171.147ZM17.4963 137.468L30.3664 124.598C22.5702 113.577 17.9892 100.12 17.9892 85.5932C17.9892 71.1097 22.5428 57.6899 30.2965 46.6872L17.5465 33.9371C6.57162 48.3054 0.0527344 66.2592 0.0527344 85.7355C0.0527344 105.182 6.55174 123.111 17.4963 137.468ZM170.876 85.7355C170.876 105.212 164.357 123.166 153.382 137.534L140.681 124.832C148.578 113.768 153.224 100.223 153.224 85.5932C153.224 71.0067 148.606 57.4989 140.751 46.4526L153.332 33.8715C164.337 48.2507 170.876 66.2295 170.876 85.7355ZM137.197 17.7674C122.84 6.82286 104.911 0.323853 85.4644 0.323853C65.9881 0.323853 48.0344 6.84271 33.6661 17.8175L46.3677 30.5192C57.4322 22.6218 70.9769 17.9756 85.6068 17.9756C100.134 17.9756 113.591 22.5566 124.612 30.3528L137.197 17.7674Z" fill="#0080FF"/> <path d="M106.817 85.7355C106.817 97.5284 97.2571 107.088 85.4642 107.088C73.6714 107.088 64.1113 97.5284 64.1113 85.7355C64.1113 73.9427 73.6714 64.3826 85.4642 64.3826C97.2571 64.3826 106.817 73.9427 106.817 85.7355Z" fill="#0080FF"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M78.1425 32.7803C54.4685 35.9994 35.7289 54.7389 32.5098 78.413H50.4428C53.3642 64.6039 64.2932 53.7502 78.1425 50.939V32.7803ZM120.077 78.413C117.176 64.6987 106.377 53.8994 92.6625 50.998V32.7803C116.337 35.9994 135.076 54.7389 138.295 78.413H120.077ZM92.6625 120.633C106.472 117.711 117.325 106.782 120.136 92.933H138.295C135.076 116.607 116.337 135.347 92.6625 138.566V120.633ZM50.3838 92.933C53.2144 106.877 64.1981 117.861 78.1425 120.692V138.566C54.4685 135.347 35.7288 116.607 32.5098 92.933H50.3838Z" fill="#0080FF"/> </svg>',
          }, // NOTE: custom inline collection must be used with 'i-' prefix (see https://unocss.dev/presets/icons#configuring-collections-and-icons-resolvers)
        },
        prefix: "i-", // prefer default "i-" and avoid having multiple prefixes to reduce bundle size
        scale: 1.2,
        extraProperties: {
          "display": "inline-block",
          "vertical-align": "middle",
        },
      }),
    ],

    // WORKAROUND: force include dynamically injected classes (e.g. when opening dialog)
    // for netzo/components which dynamically mount/unmount with additional classes.
    safelist: [
      ...new Set([
        // icons/@iconify-json/mdi:
        ...Object.keys(mdi.icons).map((icon) => `i-mdi-${icon}`), // single prefix "i-mdi-" (no "mdi-", "i-mdi:", "mdi:") to reduce bundle size
        // table-filters:
        "flex",
        "space-x-2",
        "h-8",
        "px-2",
        "lg:px-3",
        "i-mdi-close",
        "w-4",
        "ml-2",
        "border-dashed",
        "i-mdi-plus-circle",
        "mr-2",
        "h-4",
        "mx-2",
        "rounded-sm",
        "px-1",
        "font-normal",
        "lg:hidden",
        "hidden",
        "space-x-1",
        "lg:flex",
        "w-[200px]",
        "p-0",
        "mr-2",
        "items-center",
        "justify-center",
        "rounded-sm",
        "border",
        "border-primary",
        "bg-primary",
        "text-primary-foreground",
        "i-mdi-checkbox-marked",
        "opacity-50",
        "i-mdi-checkbox-blank-outline",
        "text-muted-foreground",
        "ml-auto",
        "font-mono",
        "text-xs",
        "justify-center",
        "text-center",
        // components/table-view-options:
        ...[
          "ml3",
          "hidden",
          "lg:flex",
          "i-mdi-tune-variant",
          "h-4",
          "w-4",
          "max-h-[50vh]",
          "overflow-y-auto",
          "capitalize",
        ],
        // components/netzo-toolbar:
        ...[
          "i-mdi-white-balance-sunny",
          "i-mdi-weather-night",
          "i-mdi-share-variant",
          "i-mdi-comment-question",
          "i-mdi-information",
          "i-mdi-apps",
          "i-mdi-menu",
          "h-[300px]",
          "overflow-y-auto",
          "-mx-[24px]",
          "px-4",
          "text-zinc-100",
          "rounded-full",
          "hover:bg-gray-600",
          "hover:text-zinc-100",
          "flex",
          "items-center",
          "justify-center",
          "bg-zinc-800",
          "p-2",
          "max-w-max",
          "fixed",
          "bottom-20px",
          "-translate-x-2/4",
          "translate-y-0",
          "left-2/4",
          "space-x-1",
          "pr-2",
          "border-r",
          "border-zinc-600",
          "h-6",
          "w-6",
          "sr-only",
          "px-2",
          "rounded-full",
          "border-2",
          "border-red-500",
          "bg-gray-500",
          "border-green-500",
          "relative",
          "border-[#666666]",
          "bg-gray-700",
          "opacity-50",
          "absolute",
          "top-0",
          "left-0",
          "w-full",
          "h-full",
          "text-white",
          "text-xs",
          "font-bold",
          "text-left",
          "text-right",
          "pl-2",
        ],
        // components/button-dark-mode:
        ...[
          "i-mdi-white-balance-sunny",
          "h-[1.2rem]",
          "w-[1.2rem]",
          "rotate-0",
          "scale-100",
          "transition-all",
          "dark:-rotate-90",
          "dark:scale-0",
          "hidden",
          "i-mdi-weather-night",
          "rotate-90",
          "dark:rotate-0",
          "dark:scale-100",
          "sr-only",
        ],
        // components/nav:
        ...[
          "!md:hidden",
          "w-[250px]",
          "w-[28px]",
          "h-full",
          "fixed",
          "top-0",
          "left-0",
          "z-1000",
          "hover:bg-background",
          "hover:bg-opacity-80",
          "hover:cursor-pointer",
          "flex",
          "items-center",
          "justify-center",
          "!hidden",
          "i-mdi-menu-open",
          "rotate-180",
          "h-[1.2rem]",
          "w-[1.2rem]",
          "sr-only",
          "p-0",
          "h-screen",
          "overflow-y-auto",
          "group",
          "flex-col",
          "bg-primary-foreground",
          "w-full",
          "p-3",
          "b-t-1",
          "mx-auto",
          "h-[32px]",
          "!hidden",
          "!md:flex",
          "md:b-r-1",
          "flex-1",
          "mt-3",
          "mb-1",
          "mx-4",
          "text-xs",
          "font-medium",
          "text-muted-foreground",
          "rounded-none",
          "flex",
          "w-full",
          "justify-start",
          "h-[40px]",
          "hover:cursor-pointer",
          "hover:bg-muted",
          "aria-[current='true']:bg-border",
          "aria-[current='page']:bg-border",
          "w-4",
          "h-4",
          "mr-3",
          "py-3",
          "px-2",
          "text-xl",
          "font-bold",
          "w-auto",
          "h-9",
          "my-auto",
          "mr-2",
          "h-9",
          "w-9",
          "mr-2",
          "text-sm",
          "leading-none",
          "text-xs",
          "text-muted-foreground",
          "i-mdi-account-circle",
          "ml-0.5",
          "mr-1.5",
          "flex-col",
          "space-y-1",
          "i-mdi-unfold-more-horizontal",
          "h-6",
          "ml-auto",
          "font-normal",
          "gap-4",
          "w-full",
          "pl-2",
          "pr-3",
          "h-[56px]",
        ],
      ]),
    ],
    // NOTE: build step required for transformers (see @unocss/unocss#1673)
    // transformers: [transformerDirectives(), transformerVariantGroup()],
  };
}

export default presetNetzo;
