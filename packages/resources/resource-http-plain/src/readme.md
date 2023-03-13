## Configuration

This resource connects to Plain's GraphQL API and sets the Authorization header with the provided `PLAIN_API_KEY` while using the Netzo SDK.
You can generate a new `PLAIN_API_KEY` by navigating to your Plain Account > Developer Settings > Machine Users. Additionally, you will require your `PLAIN_WORKSPACE_ID` which you can find in Plain Account > General.

GraphQL queries and mutations can be executed using the `query` and `mutation` methods respectively and be sent in the `body` of the request.

An example POST body for a `query` could look as follows:

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
