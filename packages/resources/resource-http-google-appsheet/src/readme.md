## Configuration

You will require a Google AppSheet `tableName`, your `appId` and
`applicationAccessKey`.

If you are an Admin, you may find your keys by navigating to
`Manage > Integration > IN: from cloud resources to your app`

Here you will find your:

- `appId`,
- `applicationAccessKey`

**Important:**

- You may find available tableNames by navigating to `Data`. `tableName` (Hint:
  caseSensitive).
- Be sure to pass-in `tableNames` in URL encoded format, e.g
  `"my Table" = "my%20Table"`

> Note that this resource template uses baseURL:
> `https://api.appsheet.com/api/v2/apps/{appId}/tables`. For use with the Netzo
> SDK you will be required to build the remaining,requestURL:
> `/{{tableName}}/Action`. An example of SDK usage is found below:

```ts
import { Netzo } from "https://deno.land/x/netzo@v0.1.44/mod.ts";

const netzo = Netzo({ apiKey: Deno.env.get("NETZO_API_KEY") })
const RESOURCE_ID_APPSHEET = "YOUR_RESOURCE_ID"

const { client: appsheet } = await netzo.resource(RESOURCE_ID_APPSHEET)

const result = await appsheet.{{tableName}}.Action.post({
      Action: "Find",
      Properties: {
        Locale: "en-US",
        Selector: `Select(contacts[_id], [email] = ${event.email}, TRUE)`
      },
      Rows: []
    });
```

## API Reference

> For more information refer to the official documentation

You can use the API to make the following changes to your app.

- Add table records
- Delete table records
- Read a table record
- Update table records
- Invoke an action you have defined in AppSheet (limited to certain action
  types)

## Links

- [Marketplace](https://app.netzo.io/resources/resource-http-google-appsheet)
- [API Reference](https://support.google.com/appsheet/answer/10105768?hl=en)

<div align="center">
  <h4>© Netzo</h4>
</div>
