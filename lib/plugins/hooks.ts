// adapted from https://github.com/oaarnikoivu/shadcn-virtualized-combobox
// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { IS_BROWSER } from "fresh/runtime";

// use custom useLocalStorage hook (instead of that of e.g. usehooks-ts) to
// avoid using the window object on the server-side which might throw errors
export function useLocalStorage(key: string, initialValue: string) {
  if (!IS_BROWSER) return [initialValue, () => {}, () => {}];

  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = React.useState(initial);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeValue = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, updateValue, removeValue];
}
