## Configuration

This resource connects to Plain's GraphQL API and sets the Authorization header with the provided API key while using the Netzo SDK.
Queries and mutations can be executed using the `query` and `mutation` methods respectively and be sent in the `body` of the request.

You will require a valid `PLAIN_WORKSPACE_ID` to call the respective `queries` and `mutations`.

An example POST body for a `query` could look like:

```json
{
  "query":"query getWorkspace($workspaceId: ID!) { workspace(workspaceId: $workspaceId) { id name publicName } }",
  "variables":{"workspaceId":"$PLAIN_WORKSPACE_ID"},
  "operationName":"getWorkspace"}
```

> Hint: Build your GraphQL queries through the
> [API explorer](#Links)

Check out the documentation for more information.

## API Reference

> For more information refer to the official [documentation](#links)

## Links

- [Marketplace](https://app.netzo.io/resources/resource-http-activecampaign)
- [Documentation](https://docs.plain.com/)
- [API Explorer](https://app.plain.com/developer/api-explorer/)

<div align="center">
  <h4>© Netzo</h4>
</div>
