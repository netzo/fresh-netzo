import preactReactivityAdapter from "npm:signaldb-plugin-preact@1.0.1";
import {
  createPersistenceAdapter,
  PersistentCollection,
} from "npm:signaldb@0.8.7";

const createNetzoDBAdapter = (name: string) => {
  return createPersistenceAdapter({
    async load() {
      const response = await fetch(`/api/${name}`);
      const items = await response.json();
      return { items };
    },
    async save(_items, { added, modified, removed }) {
      await Promise.all([
        ...added.map(({ id, ...item }) =>
          fetch(`/api/${name}`, {
            method: "POST",
            body: JSON.stringify(item),
          })
        ),
        ...modified.map(({ id, ...item }) =>
          fetch(`/api/${name}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(item),
          })
        ),
        ...removed.map(({ id }) =>
          fetch(`/api/${name}/${id}`, {
            method: "DELETE",
          })
        ),
      ]);
    },
    register(_onChange) {
      return Promise.resolve();
    },
  });
};

export const createCollection = (name: string) => {
  return new PersistentCollection(name, {
    reactivity: preactReactivityAdapter,
    persistence: createNetzoDBAdapter(name),
  });
};
