export type Ref = {
  $key: string; // e.g. ["todos", "123"]
  $query: Record<string, string>; // e.g. { userId: "321" }
} | {
  $prefix: string[]; // e.g. ["todos"]
};

export type Ref = {
  index: number; // index of record in data array
  prefix: string[]; // e.g. ["contacts"]
  foreignKey: string; // e.g. "id"
  data: unknown; // e.g. { id: "123", name: "John Doe" }
};

export const resolveRef = async (
  prefix: string,
  query: Record<string, string> = {},
  data: T | T[] = [],
): Promise<[string, (T & { [k: string]: unknown })[]]> => {
  const idsToValues = new Map<string, T>();

  const array = Array.isArray(data) ? data : [data];

  const refs: Ref[] = data.reduce((acc, item, index) => {
    const refs = Object.entries(item).reduce((acc, [key, value]) => {
      if (key.startsWith("$")) {
        // TODO: handle nested refs
      }
      return acc;
    }, [] as Ref[]);
    return [...acc, ...refs];
  });
  return data;
};
