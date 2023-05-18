# `netzo` CLI

`netzo` is the command line tool for Netzo. This repository also contains the
`netzo/github-action` GitHub Action.

## Install

```shell
deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/netzo/cli/netzo.ts
```

## Usage

Before being able to deploy, you need to get an API key from the
[Workspace > Settings > API keys](https://netzo.io/docs/platform/workspaces#api-keys)
page. Store this token in a `NETZO_API_KEY` environment variable, or pass it to
`netzo` with the `--api-key` flag.

```shell
netzo deploy --project=hello-world ./examples/hello.ts
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
          project: my-project # the name of the project on Netzo
          entrypoint: main.ts # the entrypoint to deploy
```

To learn more about the action, checkout [action readme](./action/README.md).
