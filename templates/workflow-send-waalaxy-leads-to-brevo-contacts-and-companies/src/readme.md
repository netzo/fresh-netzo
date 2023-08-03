# workflow-send-waalaxy-leads-to-brevo-contacts-and-companies

An open-source source template for Netzo.

## Configuration

This project does not require additional configuration.

## Development

1. Install the `Deno` runtime

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

2. Start the server for development

```sh
deno task start # start using pre-defined task (if any)
deno run -A --watch <entrypoint> # or run the entrypoint file directly
```

This will watch the project directory and restart as necessary.

## Deployment

1. Install the `netzo/cli` command line tool

```sh
deno install -Arf https://deno.land/x/netzo/cli/netzo.ts
```

2. Configure your API key as an environment variable

```sh
export NETZO_API_KEY=... # Linux / MacOS
set NETZO_API_KEY=... # Windows
```

3. Create a project in [Netzo](https://app.netzo.io) if you haven't and copy the
   project UID.

4. Deploy the project (pass the `--prod` flag to deploy to production)

```sh
netzo deploy --project=my-project <entrypoint>
```

## References

- [Homepage](https://app.netzo.io/templates/workflow-send-waalaxy-leads-to-brevo-contacts-and-companies)

<div align="center">
  <h4>© Netzo</h4>
</div>
