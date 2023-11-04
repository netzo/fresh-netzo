# Netzo App Template

An open-sourced, highly performant
template to get you started building [Netzo](https://netzo.io) apps.

## Features

- Deno's built-in [formatter](https://deno.land/manual/tools/formatter),
  [linter](https://deno.land/manual/tools/linter) and
  [test runner](https://deno.land/manual/basics/testing) and TypeScript support
- Next-gen web framework with [Fresh](https://fresh.deno.dev/)
- In-built data persistence with [Deno KV](https://deno.com/kv)
- High-level OAuth with [Deno KV OAuth](https://deno.land/x/deno_kv_oauth)
- Modern CSS framework with [Tailwind CSS](https://tailwindcss.com/)
- Responsive, SaaS-oriented design
- Dashboard with users view and statistics chart
- First-class web performance
- [REST API](#rest-api-reference)
- HTTP security headers

## Get Started

### Get Started Locally

Before starting, you'll need:

- A GitHub account
- The [Deno CLI](https://deno.com/manual/getting_started/installation) and
  [Git](https://github.com/git-guides/install-git) installed on your machine

To get started:

1. Clone this repo:
   ```bash
   git clone https://github.com/denoland/saaskit.git
   cd saaskit
   ```
1. Create a new `.env` file.
1. Navigate to GitHub's
   [**New OAuth Application** page](https://github.com/settings/applications/new).
1. Set **Application name** to your desired application name. E.g. `ACME, Inc`.
1. Set **Homepage URL** to `http://localhost:8000`.
1. Set **Authorization callback URL** to `http://localhost:8000/oauth/callback`.
1. Click **Register application**.
1. Copy the **Client ID** value to the `.env` file:
   ```bash
   GITHUB_CLIENT_ID=<GitHub OAuth application client ID>
   ```
1. On the same web page, click **Generate a new client secret**.
1. Copy the **Client secret** value to the `.env` file on a new line:
   ```bash
   GITHUB_CLIENT_SECRET=<GitHub OAuth application client secret>
   ```
1. Start the server:
   ```bash
   deno task start
   ```
1. Navigate to `http://localhost:8000` to start playing with your new SaaS app.

### Bootstrap the Database (Optional)

Use the following commands to work with your local Deno KV database:

- `deno task db:seed` - Populate the database with data from the
  [Hacker News API](https://github.com/HackerNews/API).
- `deno task db:dump > backup.json` - Write all database entries to
  `backup.json`.
- `deno task db:restore backup.json` - Restore the database from `backup.json`.
- `deno task db:reset` - Reset the database. This is not recoverable.

## Customize and Extend

### Global Constants

The [utils/constants.ts](utils/constants.ts) file includes global values used
across various aspects of the codebase. Update these values according to your
needs.

### Themes

You can customize theme options such as spacing, color, etc. By default, Deno
SaaSKit comes with `primary` and `secondary` colors predefined within
`twind.config.ts`. Change these values to match your desired color scheme.

### Cover Image

To replace the cover image, replace the [/static/cover.svg](/static/cover.svg)
file. If you'd like to change the filename, also be sure to change the
`imageUrl` property in the [`<Head />`](/components/Head.tsx) component.

## Deploy to Production

This section assumes that a
[local development environment](#getting-started-locally) is already set up.

1. Navigate to your
   [GitHub OAuth application settings page](https://github.com/settings/developers).
1. Set the **Homepage URL** to your production URL. E.g.
   `https://{uid}.deno.dev`.
1. Set the **Authorization callback URL** to your production URL with the
   `/oauth/callback` path. E.g. `https://{uid}.deno.dev/oauth/callback`.
1. Copy all the environment variables in your `.env` file to your production
   environment.

### Deploy to [Netzo](https://app.netzo.io)

1. Clone this repository for your project.
1. Sign into [Netzo](https://app.netzo.io).
1. Deploy using the Netzo CLI `netzo deploy` subcommand.
1. Once the deployment is complete, go to **Project > Settings** and add the
   production environmental variables.

You should now be able to visit your newly deployed SaaS.

## REST API Reference

### `GET /api/items`

Get all items in chronological order. Add `?cursor=<cursor>` URL parameter for
pagination. Limited to 10 items per page.

Example 1:

```jsonc
// https://{uid}.deno.dev/api/items
{
  "values": [
    {
      "id": "01HAY7A4ZD737BHJKXW20H59NH",
      "userLogin": "Deniswarui4",
      "title": "czxdczs",
      "url": "https://wamufx.co.ke/",
      "score": 0
    },
    {
      "id": "01HAD9KYMCC5RS2FNPQBMYFRSK",
      "userLogin": "jlucaso1",
      "title": "Ok",
      "url": "https://github.com/jlucaso1/crunchyroll-quasar",
      "score": 0
    },
    {
      "id": "01HA7YJJ2T66MSEP78NAG8910A",
      "userLogin": "BrunoBernardino",
      "title": "LockDB: Handle process/event locking",
      "url": "https://lockdb.com",
      "score": 2
    }
    // 7 more items...
  ],
  "cursor": "AjAxSDdUNTBBUkY0QzhEUjRXWjkyVDJZSFhZAA=="
}
```

Example 2 (using `cursor` field from page 1):

```jsonc
// https://{uid}.deno.dev/api/items?cursor=AjAxSDdUNTBBUkY0QzhEUjRXWjkyVDJZSFhZAA==
{
  "values": [
    {
      "id": "01H777YG17VY8HANDHE84ZXKGW",
      "userLogin": "BrunoBernardino",
      "url": "https://asksoph.com",
      "title": "Ask Soph about a dead philosopher",
      "score": 2
    },
    {
      "id": "01H6RG2V3AV82FJA2VY6NJD9EP",
      "userLogin": "retraigo",
      "url": "https://github.com/retraigo/appraisal",
      "title": "Appraisal: Feature Extraction, Feature Conversion in TypeScript",
      "score": 0
    },
    {
      "id": "01H64TZ3TNKFWS35MJ9PSGNWE1",
      "userLogin": "lambtron",
      "url": "https://www.zaynetro.com/post/2023-how-deno-works",
      "title": "How Deno works (blog post)",
      "score": 2
    }
    // 7 more items...
  ],
  "cursor": "AjAxSDJUSlBYWUJRM1g0OEo2UlIzSFgyQUQ0AA=="
}
```

### `GET /api/items/:id`

Get the item with the given ID.

Example:

```jsonc
// https://{uid}.deno.dev/api/items/01H5379J1VZ7EB54KSCSQSCRJC
{
  "id": "01H5379J1VZ7EB54KSCSQSCRJC",
  "userLogin": "lambtron",
  "url": "https://github.com/Savory/saaskit-danet",
  "title": "saaskit-danet: a modern SaaS template built for Fresh for SSR and Danet for the API",
  "score": 10
}
```

### `GET /api/users`

Get all users in alphabetical order by GitHub login. Add `?cursor=<cursor>` URL
parameter for pagination. Limited to 10 users per page.

Example 1:

```jsonc
// https://{uid}.deno.dev/api/users
{
  "values": [
    {
      "login": "51chengxu",
      "sessionId": "9a6745a1-3a46-45c8-a265-c7469ff73678",
      "isSubscribed": false
    },
    {
      "login": "AiridasSal",
      "sessionId": "adb25cac-9be7-494f-864b-8f05b80f7168",
      "isSubscribed": false
    },
    {
      "login": "ArkhamCookie",
      "sessionId": "fd8e7aec-2701-44ae-925b-25e17ff288c4",
      "isSubscribed": false
    }
    // 7 more users...
  ],
  "cursor": "AkVob3ItZGV2ZWxvcGVyAA=="
}
```

Example 2 (using `cursor` field from page 1):

```jsonc
// https://{uid}.deno.dev/api/users?cursor=AkVob3ItZGV2ZWxvcGVyAA==
{
  "values": [
    {
      "login": "EthanThatOneKid",
      "sessionId": "ae7425c1-7932-412a-9956-e456787d557f",
      "isSubscribed": false
    },
    {
      "login": "Fleury99",
      "sessionId": "2e4920a3-f386-43e1-8c0d-61b5e0edfc0d",
      "isSubscribed": false
    },
    {
      "login": "FriendlyUser",
      "sessionId": "508ff291-7d1c-4a67-b19f-447ad73b5914",
      "isSubscribed": false
    }
    // 7 more users...
  ],
  "cursor": "Ak5ld1lhbmtvAA=="
}
```

### `GET /api/users/:login`

Get the user with the given GitHub login.

Example:

```jsonc
// https://{uid}.deno.dev/api/users/hashrock
{
  "login": "hashrock",
  "sessionId": "97eec97a-6636-485e-9b14-253bfa3ce1de",
  "isSubscribed": true
}
```

## Goals and Philosophy

For the user, the website should be fast, secure and have a design with clear
intent. Additionally, the HTML should be well-structured and indexable by search
engines. The defining metrics for these goals are:

- A perfect [PageSpeed Insights](https://pagespeed.web.dev/) score.
- Fully valid HTML, as measured by
  [W3C's Markup Validation Service](https://validator.w3.org/).

For the developer, the codebase should minimize the steps and amount of time
required to get up and running. From there, customization and extension of the
web app should be simple. The characteristics of a well-written codebase also
apply, such as:

- Easy to understand
- Modular functionality
- Clearly defined behavior with validation through tests
