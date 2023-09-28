export function injectStylesheet(options: Partial<HTMLLinkElement>) {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.type = "text/css";
  Object.entries(options).forEach(([key, value]) => {
    // deno-lint-ignore no-explicit-any
    (stylesheet as any)[key] = value;
  });
  document.head.appendChild(stylesheet);
}

export function injectScript(
  options: Partial<HTMLScriptElement & Record<string, unknown>>,
) {
  const script = document.createElement("script");
  Object.entries(options).forEach(([key, value]) => {
    // deno-lint-ignore no-explicit-any
    (script as any)[key] = value;
  });
  document.head.appendChild(script);
}
