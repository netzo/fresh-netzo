# workflow-send-waalaxy-leads-to-holded-contacts

An open-source source template for Netzo.

## Configuration

This project does not require additional configuration.

## Development

Install the `Deno` runtime

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Start the server for development

```sh
deno task start # start using pre-defined task (if any)
deno run -A --watch <entrypoint> # or run the entrypoint file directly
```

## Deployment

Install the `netzo/cli` command line tool

```sh
deno install -Arf https://deno.land/x/netzo/cli/netzo.ts
```

Configure your API key as an environment variable

```sh
export NETZO_API_KEY=... # Linux / MacOS
set NETZO_API_KEY=... # Windows
```

Create a project in [Netzo](https://app.netzo.io) if you haven't and copy the
project UID.

Deploy the project (pass the `--prod` flag to deploy to production)

```sh
netzo deploy --project=my-project <entrypoint>
```

This will watch the project directory and restart as necessary.

## Links

- [Homepage](https://app.netzo.io/templates/workflow-send-waalaxy-leads-to-holded-contacts)

<div align="center">
  <h4>© Netzo</h4>
</div>
