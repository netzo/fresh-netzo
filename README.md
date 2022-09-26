<p align="center">
  <a href="https://netzo.io" rel="noopener" target="_blank">
    <img width="150" src="https://netzo.io/images/netzo-symbol-light.svg" alt="Netzo logo" />
  </a>
</p>

<h1 align="center">Netzo Web SDK</h1>

<p align="center">
  Software development kit (SDK) for <a href="https://app.netzo.io" target="_blank">Netzo</a>, the open Web platform to unify IoT devices, applications and services.
</p>

<div align="center">

[![MIT Licensed](https://img.shields.io/github/license/netzoio/plugins)](https://github.com/netzoio/netzo/tree/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![Discord](https://discord.com/api/guilds/790465167523577887/widget.png)](https://discord.gg/6wQRmrcPXp)
[![Follow on Twitter](https://img.shields.io/twitter/follow/netzoio.svg?label=follow+netzoio)](https://twitter.com/netzoio)
[![Hashnode Blog](https://img.shields.io/badge/hashnode-blog-blue)](https://blog.netzo.io)
[![Visit our Channel](https://img.shields.io/youtube/channel/views/UCHFSTwM7-ZjeJRI0RwtlFmg)](https://www.youtube.com/channel/UCHFSTwM7-ZjeJRI0RwtlFmg)

</div>

## Documentation

Refer to the
[Netzo Web SDK documentation](https://netzo.io/reference/web-sdk/overview) for
more details.

## Project Structure

```
.
├─ .github/
│   └─ workflows/
│       └─ ci.yml
├─ .vscode/
│   └─ extensions.json
│   └─ settings.json
├── lib/
│   ├── http/
│   ├── ...
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

3. **`lib/`**: main directory where source code is located

4. **`mod.ts`**: entry point for the main module

5. **`mod.test.ts`**: simple test for the main module entry point `mod.ts`

6. **`types.ts`**: entry point for TypeScript types

7. **`.gitattributes`**: a simple text file that gives `attributes` to pathnames

8. **`.gitignore`**: specifies which files git should not track (not maintain a
   version history for)

9.  **`CHANGELOG.md`**: a curated, chronologically ordered list of notable
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

Copyright (c) 2022 [ROKAWARE SL](https://netzo.io)

Licensed under the [MIT license](LICENSE).
