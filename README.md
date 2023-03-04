<div align="center" style="padding-top: 12px;">
  <a href="https://netzo.io" target="_blank">
    <img style="background: transparent; height: 96px;" src="https://netzo.io/images/netzo-symbol-light.svg" alt="Netzo logo" />
  </a>
</div>

<h3 align="center">Netzo</h3>

<p align="center">
  Code. Deploy. Repeat.
</p>

<p align="center">
  <a href="https://netzo.io"><strong>Website</strong></a> ·
  <a href="https://netzo.io/docs/getting-started/introduction"><strong>Documentation</strong></a> ·
  <a href="https://app.netzo.io/templates"><strong>Templates</strong></a>
</p>

<div align="center" style="margin-top: 24px;">
  
  [![Discord](https://discord.com/api/guilds/1069584352415068251/widget.png)](https://discord.gg/tbDUpRQCTk)
  [![Follow on Twitter](https://img.shields.io/twitter/follow/netzoio.svg?label=follow+netzoio)](https://twitter.com/netzoio)
</div>

## Documentation

Refer to the
[Netzo documentation](https://netzo.io/docs/getting-started/introduction) for
more details.

## Installation

### Deno

```ts
import { Netzo } from "https://deno.land/x/netzo/mod.ts";
```

### Node

```bash
npm install @netzo/sdk
```

### Browser

```html
<script type="module">
  import * as NetzoSDK from 'https://esm.sh/@netzo/sdk?bundle'
  window.NetzoSDK = NetzoSDK
</script>
```

## Usage

```ts
const netzo = Netzo({ apiKey: NETZO_API_KEY });

// api:
const resources = await netzo.api.resources.get();

// resource: create client by ID (recommended):
const { client } = await netzo.resource(RESOURCE_ID);
const users = await client.users.get();

// resource: create client from scratch:
const { client } = netzo.resource({
  baseURL: "https://jsonplaceholder.typicode.com",
});
const users = await client.users.get();
```

## Project Structure

```
.
├─ .github/
│   └─ workflows/
│       └─ ci.yml
├─ .vscode/
│   └─ extensions.json
│   └─ settings.json
├── src/
├─ .gitattributes
├─ .gitignore
├─ CHANGELOG.md
├─ LICENSE
├─ mod.ts
├─ mod.test.ts
├─ types.ts
└─ README.md
```

1. **`.github`**: repository settings for GitHub

2. **`.vscode`**: workspace settings for VSCode (apply when the workspace is
   opened)

3. **`src/`**: main directory where source code is located

4. **`mod.ts`**: entry point for the main module

5. **`mod.test.ts`**: simple test for the main module entry point `mod.ts`

6. **`types.ts`**: entry point for TypeScript types

7. **`.gitattributes`**: a simple text file that gives `attributes` to pathnames

8. **`.gitignore`**: specifies which files git should not track (not maintain a
   version history for)

9. **`CHANGELOG.md`**: a curated, chronologically ordered list of notable
   changes for each version of a project (format based on
   [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), this project
   adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html))

10. **`LICENSE`**: license for the project

11. **`README.md`**: text file containing useful reference information about the
    project

<br>

> The filename mod.ts doesn’t come with any preconceived notions about how it
> might work. Deno does not treat `index.(js|ts)` in a special way.
> `mod.(js|ts)` is prefered over `index.(js|ts)` to avoid confusion of wether
> the filename can be left out of the module specifier.

> Each module should come with its test as a sibling with the name
> `modulename.test.(js|ts)`. For example the module `foo.(js|ts)` should come
> with its sibling `foo.test.(js|ts)`.

## License

Copyright (c) 2022 [Netzo](https://netzo.io)

Licensed under the [MIT license](LICENSE).
