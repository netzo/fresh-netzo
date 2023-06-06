/** @jsx h */
import { h, JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      className="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    />
  );
}
