// NOTE: using "--quiet" flag since question module hasn't received updates since 0.0.2
// and Deno >= 1.4 has deprecated several API methods (e.g. Deno.{stdin/stdout}) which
// is causing the question module to throw many warnings, so we vendor what's needed
export { default as question } from "https://deno.land/x/question@0.0.2/mod.ts";