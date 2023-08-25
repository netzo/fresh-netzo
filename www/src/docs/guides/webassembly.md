# WebAssembly

[WebAssembly](https://webassembly.org/) (abbreviated `WASM`) is a binary instruction format for the web. It is designed to be a portable target for compilation of higher-level programming languages like C, C++, Rust, Go, Python, AssemblyScript and more, enabling deployment on the web for client and server applications.

WebAssembly is supported by Deno natively with the same [web APIs](https://developer.mozilla.org/en-US/docs/WebAssembly) used accross browsers. This can be leveraged to write performant, low-level code that can be compiled to WebAssembly and run in the browser.

The following examples demonstrate how to use WebAssembly with Netzo. The source code for these examples is the following Rust program exporting a single function `main` which returns the number 42:

```rust
pub fn main() -> u32 {
  42
}
```

## Load from byte Array

```ts
const wasmCode = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 133, 128, 128, 128, 0, 1, 96, 0, 1, 127,
  3, 130, 128, 128, 128, 0, 1, 0, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0,
  5, 131, 128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128, 0, 0, 7, 145,
  128, 128, 128, 0, 2, 6, 109, 101, 109, 111, 114, 121, 2, 0, 4, 109, 97,
  105, 110, 0, 0, 10, 138, 128, 128, 128, 0, 1, 132, 128, 128, 128, 0, 0,
  65, 42, 11
])
const wasmModule = new WebAssembly.Module(wasmCode)
const wasmInstance = new WebAssembly.Instance(wasmModule)
const main = wasmInstance.exports.main as CallableFunction
console.log(main().toString()) // 42
```

## Load from file

```ts
const wasmCode = await Deno.readFile('main.wasm')
const wasmModule = new WebAssembly.Module(wasmCode)
const wasmInstance = new WebAssembly.Instance(wasmModule)
const main = wasmInstance.exports.main as CallableFunction
console.log(main().toString()) // 42
```

## Load from URL

::: warning The `.wasm` file must be served with `"application/wasm"` MIME type
:::

```ts
const { instance, module } = await WebAssembly.instantiateStreaming(
  fetch('https://wpt.live/wasm/incrementer.wasm'),
)
const increment = instance.exports.increment as (input: number) => number
console.log(increment(41)) // 42
```
