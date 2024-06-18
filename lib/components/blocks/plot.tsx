// adapted from https://github.com/oaarnikoivu/shadcn-virtualized-combobox
// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { type Signal } from "@preact/signals-core";
import { createElement as h } from "preact";
import * as Plot from "../../deps/@observablehq/plot.ts";
import { useResizeObserver } from "../../deps/usehooks-ts.ts";

export * from "../../deps/@observablehq/plot.ts";

/**
 * Isomorphic, responsive Plot component for rendering charts on the server
 * and hydrating them on the client for client-side interactivity. The
 * plot will be re-rendered on the client when the options change
 * via setOptions of `const [options, setOptions] = useState({...})`
 *
 * @example import * as Plot from "netzo/components/blocks/plot/plot.tsx";
 * export default () => <Plot.Figure options={options} />;
 *
 * @param {Plot.PlotOptions} options - the plot options
 * @returns {JSX.Element} the plot figure
 */
export function Figure({ options }: { options: Plot.PlotOptions }) {
  const containerRef = React.useRef<HTMLElement>();
  const ref = React.useRef<HTMLElement>();
  // IMPORTANT: leave default of width, height undefined for the initial SSR render
  // and let the useResizeObserver hook take over on the client on resize events
  const { width, height } = useResizeObserver({ ref, box: "border-box" });

  // client-side: uses a real DOM container and the usePlot() hook for mounting
  React.useEffect(() => {
    // replace server-side rendered plot with client-side (hydrated) plot entirely
    const plot = Plot.plot(options);
    ref.current = plot;
  }, [options]);

  // server-side: uses a virtual Document implementation to generate HTML
  return (
    <figure ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <PlotSSR ref={ref} options={{ ...options, width, height }} />
    </figure>
  );
}

function PlotSSR({ options }: { options: Plot.PlotOptions }) {
  return Plot.plot({ ...options, document: new Document() }).toHyperScript();
}

// (virtual) Document implementation for SSR:

class Document {
  constructor() {
    this.documentElement = new Element(this, "html");
  }
  createElementNS(namespace, tagName) {
    return new Element(this, tagName);
  }
  createElement(tagName) {
    return new Element(this, tagName);
  }
  createTextNode(value) {
    return new TextNode(this, value);
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
}

class Style {
  static empty = new Style();
  setProperty() {}
  removeProperty() {}
}

class Element {
  constructor(ownerDocument, tagName) {
    this.ownerDocument = ownerDocument;
    this.tagName = tagName;
    this.attributes = {};
    this.children = [];
    this.parentNode = null;
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }
  setAttributeNS(namespace, name, value) {
    this.setAttribute(name, value);
  }
  getAttribute(name) {
    return this.attributes[name];
  }
  getAttributeNS(name) {
    return this.getAttribute(name);
  }
  hasAttribute(name) {
    return name in this.attributes;
  }
  hasAttributeNS(name) {
    return this.hasAttribute(name);
  }
  removeAttribute(name) {
    delete this.attributes[name];
  }
  removeAttributeNS(namespace, name) {
    this.removeAttribute(name);
  }
  addEventListener() {
    // ignored; interaction needs real DOM
  }
  removeEventListener() {
    // ignored; interaction needs real DOM
  }
  dispatchEvent() {
    // ignored; interaction needs real DOM
  }
  append(...children) {
    for (const child of children) {
      this.appendChild(
        child?.ownerDocument ? child : this.ownerDocument.createTextNode(child),
      );
    }
  }
  appendChild(child) {
    this.children.push(child);
    child.parentNode = this;
    return child;
  }
  insertBefore(child, after) {
    if (after == null) {
      this.children.push(child);
    } else {
      const i = this.children.indexOf(after);
      if (i < 0) throw new Error("insertBefore reference node not found");
      this.children.splice(i, 0, child);
    }
    child.parentNode = this;
    return child;
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
  set textContent(value) {
    this.children = [this.ownerDocument.createTextNode(value)];
  }
  set style(value) {
    this.attributes.style = value;
  }
  get style() {
    return Style.empty;
  }
  toHyperScript() {
    return h(
      this.tagName,
      this.attributes,
      this.children.map((c) => c.toHyperScript()),
    );
  }
}

class TextNode {
  constructor(ownerDocument, nodeValue) {
    this.ownerDocument = ownerDocument;
    this.nodeValue = String(nodeValue);
  }
  toHyperScript() {
    return this.nodeValue;
  }
}

// from https://github.com/denoland/fresh/blob/97ac05912cdff99a208720c95fed6ec5d68a4b8e/src/runtime/server/preact_hooks.tsx#L351
function isSignal(x: any): x is Signal {
  return (
    x !== null &&
    typeof x === "object" &&
    typeof x.peek === "function" &&
    "value" in x
  );
}
