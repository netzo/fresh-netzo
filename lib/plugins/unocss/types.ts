import type { UserConfig } from "../../deps/@unocss/core.ts";
import type { Theme } from "../../deps/@unocss/preset-uno.ts";

export type UnocssConfig<T extends object = Theme> = UserConfig<T> & {
  /**
   * File URL to the UnoCSS config file (MUST be set to `import.meta.url`)
   */
  url: string;
  /**
   * Enable AOT mode - run UnoCSS to extract styles during the build task.
   * Enabled by default.
   */
  aot?: boolean;
  /**
   * Enable CSR mode - run the UnoCSS runtime on the client.
   * It will generate styles live in response to DOM events.
   * Note that this might signiticantly slow-down hydration, one
   * can always use "safelist" in unocss.config as a workaround.
   * Disabled by default.
   */
  csr?: boolean;
};

export const defineUnocssConfig = <T extends object = Theme>(
  config: UnocssConfig<T>,
): UnocssConfig<T> => config;
