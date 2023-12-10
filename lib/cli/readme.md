# `netzo` CLI

`netzo` is the command line tool for Netzo. This repository also contains the
`netzo/github-action` GitHub Action.

## Install

```shell
deno install -Arf https://deno.land/x/netzo/cli/netzo.ts
```

## Usage

Before being able to deploy, you need to get an API key from the
[Workspace > Settings > API keys](https://netzo.io/docs/platform/workspaces#api-keys)
page. Store this API key in a `NETZO_API_KEY` environment variable, or pass it
to `netzo` with the `--api-key` flag.

```shell
netzo deploy --project=<PROJECT_ID> ./examples/hello.ts
```

View the help:

```shell
netzo -h
```

## Action Example

```yml
name: Deploy

on: push

jobs:
  deploy:
    runs-on: ubuntu-latest

    permissions:
      id-token: write # This is required to allow the GitHub Action to authenticate with Netzo.
      contents: read

    steps:
      - name: Clone repository
        uses: actions/checkout@v3

      - name: Deploy to Netzo
        uses: netzo/github-action@v1
        with:
          project: <PROJECT_ID> # the ID of the project on Netzo
          entrypoint: main.ts # the entrypoint to deploy
```

To learn more about the action, checkout [action readme](./action/readme.md).

## Attribution

The Netzo CLI is heavily inspired by
[`deployctl`](https://github.com/denoland/deployctl) the official Deno Deploy
CLI ([MIT License](https://github.com/denoland/deployctl/blob/main/license))
