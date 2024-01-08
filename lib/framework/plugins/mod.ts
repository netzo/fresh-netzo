// deno-lint-ignore no-explicit-any
export const enabled = (obj: any) => !!obj && obj?.enabled !== false;
