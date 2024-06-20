// IMPORTANT: use >=8.10.0 to ensure date-fns is v3 since v2 is causing the
// fresh server to crash (due to some esbuild issue with unsupported types)
// see https://blog.date-fns.org/v3-is-out/ and https://github.com/date-fns/date-fns/issues/1783
export * from "https://esm.sh/react-day-picker@8.10.0?external=react,react-dom,react/jsx-runtime&target=es2022";
