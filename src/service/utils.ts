/**
 * Parse a string as an ES Module and return its module exports object
 *
 * @param esm {string} - a string representing an ES Module
 * @returns {object} - an object containing all module exports
 */
export const importFromString = (esm = "") => {
  return import(/* @vite-ignore */ `data:text/javascript;base64,${btoa(esm)}`);
};

/**
 * Parse a string as an ESModule and return its named or default export
 *
 * @param esm {string} -  a string representing an ES Module
 * @param name {string} - the name of function (named export) to
 * @returns {object} - a parsed named or default export
 */
export const importFromStringByName = async (
  esm = "export default {}",
  name = "default",
) => {
  const mod = await importFromString(esm);
  return mod?.[name] ?? mod?.default;
};
