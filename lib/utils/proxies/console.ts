/**
 * Silence globalThis.console for selected messages by substrings
 *
 * @param substringsToSkip {string[]} - substrings to skip
 * @returns {Proxy} - a proxied console object
 */
export const proxyConsole = (...substringsToSkip: string[]) => {
  return new Proxy(console, {
    get(target, prop, receiver) {
      const method = target[prop]; // intercept method calls
      return (...args) => {
        const message = args.join(" ");
        const skip = substringsToSkip.some((s) => message.includes(s));
        if (!skip) method.apply(target, args);
      };
    },
  });
};
