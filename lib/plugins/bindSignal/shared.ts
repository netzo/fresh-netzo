import { options, VNode } from "preact";
import { Signal } from "@preact/signals";

// Add `bind:value` to JSX types
declare global {
  namespace preact.createElement.JSX {
    interface HTMLAttributes {
      "bind:value"?: Signal<string | string[] | number | undefined>;
    }
  }
}

export function setup() {
  const oldVNodeHook = options.vnode;
  options.vnode = (vnode: VNode<any>) => {
    const { type, props } = vnode;
    if (
      typeof type === "string" &&
      props?.["bind:value"] &&
      isSignal(props["bind:value"])
    ) {
      const signal = props["bind:value"];
      props.value = signal;
      let oldOnInput = props.onInput;
      props.onInput = (event: any) => {
        signal.value = event.target.value;
        oldOnInput?.(event);
      };
    }
    oldVNodeHook?.(vnode);
  };
}

function isSignal(x: any): x is Signal {
  return (
    x !== null &&
    typeof x === "object" &&
    typeof x.peek === "function" &&
    "value" in x
  );
}
