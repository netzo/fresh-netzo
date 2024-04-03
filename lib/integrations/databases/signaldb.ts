import preactReactivityAdapter from "npm:signaldb-plugin-preact@1.0.1";
import {
  createPersistenceAdapter,
  PersistentCollection,
} from "npm:signaldb@0.8.7";

const createNetzoDBAdapter = (name: string, data: any[]) => {
  let firstRender = true;
  return createPersistenceAdapter({
    async load() {
      if (firstRender) {
        firstRender = false;
        return { items: data };
      }
      const response = await fetch(`/rest/${name}`);
      const items = await response.json();
      return { items };
    },
    async save(_items, { added, modified, removed }) {
      await Promise.all([
        ...added.map(({ id, ...item }) =>
          fetch(`/rest/${name}`, {
            method: "POST",
            body: JSON.stringify(item),
          })
        ),
        ...modified.map(({ id, ...item }) =>
          fetch(`/rest/${name}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(item),
          })
        ),
        ...removed.map(({ id }) =>
          fetch(`/rest/${name}/${id}`, {
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

export const createCollection = (name: string, data: any[]) => {
  return new PersistentCollection(name, {
    reactivity: preactReactivityAdapter,
    persistence: createNetzoDBAdapter(name, data),
  });
};
