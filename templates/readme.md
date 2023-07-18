<p align="center">
  <a href="https://netzo.io" rel="noopener" target="_blank">
    <img width="150" src="https://netzo.io/images/netzo-symbol-light.svg" alt="Netzo logo" />
  </a>
</p>

<h1 align="center">Netzo Repository</h1>

<p align="center">
  Open source repository for the <a href="https://app.netzo.io" target="_blank">Netzo</a>, the scripting platform for developers.
</p>

<div align="center">

[![MIT Licensed](https://img.shields.io/github/license/netzo/netzo)](https://github.com/netzo/netzo/tree/main/license)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
[![Discord](https://discord.com/api/guilds/1069584352415068251/widget.png)](https://discord.gg/tbDUpRQCTk)
[![Follow on Twitter](https://img.shields.io/twitter/follow/netzoio.svg?label=follow+netzoio)](https://twitter.com/netzoio)
[![Visit our Channel](https://img.shields.io/youtube/channel/views/UCHFSTwM7-ZjeJRI0RwtlFmg)](https://www.youtube.com/channel/UCHFSTwM7-ZjeJRI0RwtlFmg)

</div>

> This repository is still a Work in Progress. If you feel like contributing, do
> let us know!

## Quick Start

This repository lists all officially supported templates listed on
[here](https://app.netzo.io/templates) and used by the
[Netzo Web Platform](https://app.netzo.io).

We review all templates before they are published. This means that it may take
some time before we can review your template.

To submit an template for review:

1. Fork this repository
2. Select and copy any other template as a starting template
3. Develop the template by modifying the copied files accordingly
4. Add the URL of the `template.json` file to `templates/templates.json`
5. Create a pull request

> Feel free to contribute template requests. We continuously select popular
> template requests (based on upvotes and other factors) to implement them and
> make them available as core templates. The source code for relevant templates
> (those with `main` field in its `template.json` file) can be stored directly
> at the template's directory, feel free to contribute the template
> implementation as well. After a quick review they would also appear as
> community templates.

## template.json

To be valid, `template.json` file must validate against the
[template.schema.json](./template.schema.json) JSON Schema. You can use a tool
like [JSON Schema Validator](https://www.jsonschemavalidator.net/) for quickly
testing your `template.json` files.

Note that fields at the root level will be merged (to the first level) with
those under the `item` field when forking templates. In this way, the fields
under the `item` field may override the default values at the root level.

The following table summarizes the fields in a `template.json` file.

| Property      | Type                             | Required | Description                                                                                   |
| ------------- | -------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `uid`         | `string`                         | `true`   | unique ID in kebab-case (e.g. `app-sales-dashboard`)                                          |
| `status`      | `published` \| `requested`       | `true`   | if template is published or in requested status for upvotes.                                  |
| `name`        | `string`                         | `true`   | human-friendly display name for the template                                                  |
| `description` | `string`                         | `true`   | brief description of template                                                                 |
| `labels`      | `string[]` (see [Label](#label)) | `false`  | relevant keywords (tags) (kebab-case)                                                         |
| `display`     | [Display](#display)              | `true`   | relevant details for rendering the template in the UI                                         |
| `links`       | [Link](#link)[]                  | `false`  | [link relations](https://www.w3.org/TR/image-resource/#sizes-member) to related web resources |
| `item`*       | [ItemProject](#itemproject)      | `true`   | project defaults when forking the template                                                    |

_\*_ Values for common fields like `name`, `description`, `labels` and `display`
can be specified only once at the root. Any field specified under `item` will
override its default value at the root. Refer to existing templates for examples
of this.

### Label

The following table provides some examples of labels grouped by category.

| Category    | Values                                                          |
| ----------- | --------------------------------------------------------------- |
| `framework` | `fresh`, `preact`...                                            |
| `usecase`   | `blog`, `ecommerce`, `portfolio`, `documentation`, `website`... |
| `api`       | `graphql`, `rest`, `json`, `yaml`, `xml`...                     |
| `auth`      | `jwt`, `oauth`, `saml`...                                       |
| `css`       | `tailwind`, `unocss`, `bulma`...                                |
| `cms`       | `wordpress`, `ghost`, `prismic`, `contentful`...                |
| `database`  | `mongodb`, `mysql`, `postgresql`, `sqlite`...                   |
| `website`   | `github`, `netlify`, `vercel`, `surge`...                       |
| `workflow`  | `ci`, `cd`, `testing`, `deployment`...                          |

### Display

| Property | Type     | Required | Description                                    |
| -------- | -------- | -------- | ---------------------------------------------- |
| `avatar` | `string` | `true`   | URL of an image or an icon to use as an avatar |

### Link

| Property | Type     | Required | Description                                                                                 |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------- |
| `rel`    | `string` | `false`  | link relation (see possible values [here](https://www.iana.org/assignments/link-relations)) |
| `href`   | `string` | `true`   | URL to the link resource in the internet                                                    |
| `title`  | `string` | `false`  | human-friendly title                                                                        |

### ItemProject

| Property        | Type                | Required | Description                                           |
| --------------- | ------------------- | -------- | ----------------------------------------------------- |
| `_type_`*       | `'project'`         | `true`   | constant (forking template will create a project)     |
| `uid`*          | `string`            | `true`   | initial uid (unique suffix appended when forking)     |
| `name`*         | `string`            | `false`  | human-friendly display name for the template          |
| `description`*  | `string`            | `false`  | brief description of template                         |
| `labels`*       | `string[]`          | `false`  | relevant keywords (tags) (kebab-case)                 |
| `display`*      | [Display](#display) | `false`  | relevant details for rendering the template in the UI |
| `request`*      | `object`            | `false`  | initial configuration for the default request         |
| `configuration` | `object`            | `true`   | deployment configuration                              |

## Example template.json

Here's a reduced example of `template.json` file. You can also always have a
look at other templates for further reference.

```json
{
  "uid": "app-statuspage",
  "status": "requested",
  "name": "Statuspage",
  "description": "A status page to track the 'up', 'down' and 'maintenance' status of (multiple) services over time.",
  "labels": [
    "category:app"
  ],
  "display": {
    "avatar": "https://raw.githubusercontent.com/netzo/netzo/main/templates/app-statuspage/icon.svg"
  },
  "links": [
    {
      "rel": "repository",
      "href": "https://github.com/netzo/netzo/tree/main/templates/app-statuspage"
    },
    {
      "rel": "readme",
      "href": "https://raw.githubusercontent.com/netzo/netzo/main/templates/app-statuspage/src/readme.md"
    }
  ],
  "item": {
    "_type": "project",
    "src": "https://api.github.com/repos/netzo/netzo/contents/templates/app-statuspage/src",
    "configuration": {
      "entrypoint": "main.ts",
      "envVars": {},
      "permissions": {
        "net": true
      }
    }
  }
}
```

## License

Copyright (c) 2022 [Netzo](https://netzo.io)

Licensed under the [MIT license](LICENSE)
