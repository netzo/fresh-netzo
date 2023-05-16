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

This repository lists all officially supported items listed on the
[Netzo Templates](https://app.netzo.io/templates) and used by the
[Netzo Web Platform](https://app.netzo.io).

We review all items before they are published. This means that it may take some
time before we can review your item.

To submit an item for review:

1. Fork this repository
2. Select and copy any other item as a starting template
3. Develop the item by modifying the copied files accordingly
4. Add the URL of the `item.json` file to `scripts/items.json`
5. Create a pull request

> Feel free to contribute item requests. We continuously select popular item
> requests (based on upvotes and other factors) to implement them and make them
> available as core items. The source code for relevant items (those with `main`
> field in its `item.json` file) can be stored directly at the item's directory,
> feel free to contribute the item implementation as well. After a quick review
> they would also appear as community items.

## item.json

To be valid, `item.json` file must validate against the
[item.schema.json](./item.schema.json) JSON Schema. You can use a tool like
[JSON Schema Validator](https://www.jsonschemavalidator.net/) for quickly
testing your `item.json` files.

Note that fields at the root level will be merged (to the first level) with
those under the `item` field when forking items. In this
way, the fields under the `item` field may override the default values at the
root level.

The following table summarizes the fields in a `item.json` file.

| Property      | Type                                                           | Required | Description                                                                                   |
| ------------- | -------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `uid`         | `string`                                                       | `true`   | unique ID (kebab-case) prefixed by the item type (e.g. `resource-` or `template-`)            |
| `type`        | `'resource'` \| `'template'`                                   | `true`   | type of item                                                                                  |
| `status`      | `published` \| `requested`                                     | `true`   | if item is published or in requested status for upvotes.                                      |
| `name`        | `string`                                                       | `true`   | human-friendly display name for the item                                                      |
| `description` | `string`                                                       | `true`   | brief description of item                                                                     |
| `labels`      | `string[]` (see [Label](#label))                               | `false`  | relevant keywords (tags) (kebab-case)                                                         |
| `display`     | [Display](#display)                                            | `true`   | relevant details for rendering the item in the UI                                             |
| `links`       | [Link](#link)[]                                                | `false`  | [link relations](https://www.w3.org/TR/image-resource/#sizes-member) to related web resources |
| `item`*       | [ResourceItem](#resourceitem) \| [TemplateItem](#templateitem) | `true`   | Additional properties specific to each item based on the value of its `item._type` field.     |

_\*_ Values for common fields like `name`, `description`, `labels` and `display`
can be specified only once at the root. Any field specified under `item` will
override its default value at the root. Refer to existing items for examples of
this.

### Label

The following table provides some examples of labels grouped by category.

| Category    | Values                                                                          |
| ----------- | ------------------------------------------------------------------------------- |
| `framework` | `react`, `fresh`, `alephjs`...                                                  |
| `usecase`   | `blog`, `ecommerce`, `portfolio`, `documentation`, `landing-page`, `website`... |
| `api`       | `graphql`, `rest`, `json`, `yaml`, `xml`...                                     |
| `auth`      | `jwt`, `oauth`, `saml`...                                                       |
| `css`       | `tailwind`, `bootstrap`, `bulma`...                                             |
| `cms`       | `wordpress`, `ghost`, `prismic`, `contentful`...                                |
| `database`  | `mongodb`, `mysql`, `postgresql`, `sqlite`...                                   |
| `website`   | `github`, `netlify`, `vercel`, `surge`...                                       |
| `workflow`  | `ci`, `cd`, `testing`, `deployment`...                                          |

### Display

| Property | Type     | Required | Description                                    |
| -------- | -------- | -------- | ---------------------------------------------- |
| `avatar` | `string` | `true`   | URL of an image or an icon to use as an avatar |

### Link

| Property | Type     | Required | Description                                                                                 |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------- |
| `rel`    | `string` | `false`  | link relation (see possible values [here](https://www.iana.org/assignments/link-relations)) |
| `name`   | `string` | `false`  | human-friendly display name                                                                 |
| `href`   | `string` | `true`   | URL to the link resource in the internet                                                    |

### Form

| Property  | Type     | Required | Description                                                                                 |
| --------- | -------- | -------- | ------------------------------------------------------------------------------------------- |
| `model`   | `string` | `false`  | link relation (see possible values [here](https://www.iana.org/assignments/link-relations)) |
| `options` | `string` | `true`   | URL to the link resource in the internet                                                    |

### ResourceItem

| Property       | Type                | Required | Description                                       |
| -------------- | ------------------- | -------- | ------------------------------------------------- |
| `name`*        | `string`            | `false`  | human-friendly display name for the item          |
| `description`* | `string`            | `false`  | brief description of item                         |
| `labels`*      | `string[]`          | `false`  | relevant keywords (tags) (kebab-case)             |
| `display`*     | [Display](#display) | `false`  | relevant details for rendering the item in the UI |
| `base`*        | `object`            | `true`   | base configuration for the Resource               |

### TemplateItem

| Property        | Type                | Required | Description                                       |
| --------------- | ------------------- | -------- | ------------------------------------------------- |
| `type`*         | `string`            | `false`  | type of template (e.g. `code`, `workflow`)        |
| `name`*         | `string`            | `false`  | human-friendly display name for the item          |
| `description`*  | `string`            | `false`  | brief description of item                         |
| `labels`*       | `string[]`          | `false`  | relevant keywords (tags) (kebab-case)             |
| `display`*      | [Display](#display) | `false`  | relevant details for rendering the item in the UI |
| `base`*         | `object`            | `false`  | base configuration for the Template               |
| `fs`            | `object`            | `true`   | the file system structure of the template         |
| `configuration` | `object`            | `true`   | deployment configuration                          |

## Example item.json

Here's a reduced example of `item.json` file. You can also always have a look at
other items for further reference.

```json
{
  "uid": "resource-http-netzo",
  "type": "resource",
  "status": "published",
  "name": "Netzo",
  "description": "Resource for the Netzo API",
  "labels": [
    "framework"
  ],
  "display": {
    "avatar": "https://raw.githubusercontent.com/netzo/netzo/main/packages/resources/resource-http-netzo/icon.webp"
  },
  "links": [
    {
      "rel": "repository",
      "href": "https://github.com/netzo/netzo/tree/main/packages/resources/resource-http-netzo"
    },
    {
      "rel": "readme",
      "href": "https://raw.githubusercontent.com/netzo/netzo/main/packages/resources/resource-http-netzo/src/readme.md"
    }
  ],
  "item": {
    "_type": "resource",
    "type": "http",
    "base": {
      "baseURL": "https://api.netzo.io",
      "headers": {
        "Content-Type": "application/json"
      },
      "authorization": {
        "type": "apiKey",
        "in": "header",
        "name": "x-api-key",
        "value": "{{apiKey}}"
      }
    }
  }
}
```

## License

Copyright (c) 2022 [Netzo](https://netzo.io)

Licensed under the [MIT license](LICENSE)
