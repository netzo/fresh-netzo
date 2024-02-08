import { HookContext, NextFunction } from "../../deps/@feathersjs/hooks.ts";

export * from "../../deps/@feathersjs/hooks.ts";

export const logRuntime = async (_context: HookContext, next: NextFunction) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`[api] ${duration}ms`);
};

// TODO: add support for $ref via a resolveRef hook (refer to drizzle ORM for inspiration)

// export type Ref = {
//   $key: string; // e.g. ["todos", "123"]
//   $query: Record<string, string>; // e.g. { userId: "321" }
// } | {
//   $prefix: string[]; // e.g. ["todos"]
// };

// export const resolveRef = async (context: HookContext, next: NextFunction) => {
//   const { app, resource, method, id, params } = context;
//   const { query } = params;

//   const refs = Object.entries(query).reduce((acc, [key, value]) => {
//     if (key.startsWith("$")) {
//       const [prefix, ...rest] = value.split(".");
//       const ref = {
//         prefix: [prefix],
//         foreignKey: rest[0],
//       };
//       return [...acc, ref];
//     }
//     return acc;
//   }
//   , [] as { prefix: string[], foreignKey: string }[]);
//   console.log({ refs });
//   await next();
// };
