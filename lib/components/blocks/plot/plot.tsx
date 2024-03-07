import { createElement as h } from "preact";
import * as Plot from "../../../deps/@observablehq/plot.ts";
import { usePlot } from "./use-plot.ts";

export * from "../../../deps/@observablehq/plot.ts";

/**
 * Isomorphic Plot component for rendering charts on the server and
 * hydrating them on the client for client-side interactivity.
 *
 * @example import * as Plot from "netzo/components/blocks/plot/plot.tsx";
 * export default () => <Plot.Figure options={options} />;
 *
 * @param {Plot.PlotOptions} options - the plot options
 * @returns {JSX.Element} the plot figure
 */
export function Figure({ options }: { options: Plot.PlotOptions }) {
  // // server-side render: uses a virtual Document implementation to generate HTML
  // if (!IS_BROWSER) return <PlotSSR options={options} />;

  // // client-side render: uses a real DOM container and the usePlot() hook for mounting
  // const containerRef = usePlot(options);
  // return <figure ref={containerRef} />;

  // client-side render: uses a real DOM container and the usePlot() hook for mounting
  const containerRef = usePlot(options);
  return (
    <figure ref={containerRef}>
      <PlotSSR options={options} />
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
