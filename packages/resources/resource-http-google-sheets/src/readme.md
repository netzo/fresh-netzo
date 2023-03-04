# resource-http-google-sheets

An open-source source resource for the Google Sheets API.

## Configuration

You will require OAuth2 client credentials to set up this API. Please refer to
Google's documentation on obtaining OAuth2 credentials
[here](https://developers.google.com/identity/protocols/oauth2) or refer to
further docs.

## API Reference

> For more information refer to the official [documentation](#links)

The following operations are supported by the API:

#### spreadhseets

- **batchUpdate**: Applies one or more updates to the spreadsheet.
  - `GET /spreadsheets/{spreadsheetId}:batchUpdate`
  - `netzo.resource("RESOURCE_ID").spreadhseets.batchUpdate()`
- **create**: Creates a spreadsheet, returning the newly created spreadsheet.
  - `POST /spreadsheets`
  - `netzo.resource("RESOURCE_ID").spreadhseets.create()`
- **get**: Returns the spreadsheet at the given ID.
  - `GET /spreadsheets/{spreadsheetId}`
  - `netzo.resource("RESOURCE_ID").spreadhseets[spreadsheetId].get()`
- **getByDataFilter**: Returns the spreadsheet at the given ID. The caller must
  specify the spreadsheet ID.
  - `GET /spreadsheets/{spreadsheetId}:getByDataFilter`
  - `netzo.resource("RESOURCE_ID").spreadhseets[spreadsheetId].get()`

#### developerMetadata

- **get**: Returns the developer metadata with the specified ID.
  - `GET /spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}`
  - `netzo.resource("RESOURCE_ID").developermetadata[metadataId].get()`
- **search**: Returns all developer metadata matching the specified DataFilter.
  - `GET /spreadsheets/{spreadsheetId}/developerMetadata:search`
  - `netzo.resource("RESOURCE_ID").developermetadata.search()`

#### sheets

- **copyTo**: Copies a single sheet from a spreadsheet to another spreadsheet.
  - `POST /spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo`
  - `netzo.resource("RESOURCE_ID").sheets[sheetId].copyTo()`

#### values

- **append**: Appends values to a spreadsheet. The input range is used to search
  for existing data and find a "table" within that range. Values will be
  appended to the next row of the table, starting with the first column of the
  table.
  - `POST /spreadsheets/{spreadsheetId}/values/{range}:append`
  - `netzo.resource("RESOURCE_ID").values[range].append()`
- **batchClear**: Clears one or more ranges of values from a spreadsheet.
  - `POST /spreadsheets/{spreadsheetId}/values:batchClear`
  - `netzo.resource("RESOURCE_ID").values.batchClear()`
- **batchClearByDataFilter**: Clears one or more ranges of values from a
  spreadsheet. The caller must specify the spreadsheet ID and one or more
  DataFilters. Ranges matching any of the specified data filters will be
  cleared.
  - `POST /spreadsheets/{spreadsheetId}/values:batchClearByDataFilter`
  - `netzo.resource("RESOURCE_ID").values.batchClearByDataFilter()`
- **batchGet**: Returns one or more ranges of values from a spreadsheet. The
  caller must specify the spreadsheet ID and one or more ranges.
  - `GET /spreadsheets/{spreadsheetId}/values:batchGet`
  - `netzo.resource("RESOURCE_ID").values.batchGet()`
- **batchGetByDataFilter**: Returns one or more ranges of values that match the
  specified data filters. The caller must specify the spreadsheet ID and one or
  more DataFilters. Ranges that match any of the data filters in the request
  will be returned.
  - `GET /spreadsheets/{spreadsheetId}/values:batchGetByDataFilter`
  - `netzo.resource("RESOURCE_ID").values.batchGetByDataFilter()`
- **batchUpdate**: Sets values in one or more ranges of a spreadsheet. The
  caller must specify the spreadsheet ID, a valueInputOption, and one or more
  ValueRanges.
  - `POST /spreadsheets/{spreadsheetId}/values:batchUpdate`
  - `netzo.resource("RESOURCE_ID").values.batchUpdate()`
- **batchUpdateByDataFilter**: Sets values in one or more ranges of a
  spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption,
  and one or more DataFilterValueRanges.
  - `POST /spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter`
  - `netzo.resource("RESOURCE_ID").values.batchUpdateByDataFilter()`
- **clear**: Clears values from a spreadsheet.
  - `POST /spreadsheets/{spreadsheetId}/values/{range}:clear`
  - `netzo.resource("RESOURCE_ID").values[range].clear()`
- **get**: Returns a range of values from a spreadsheet. The caller must specify
  the spreadsheet ID and a range.
  - `GET /spreadsheets/{spreadsheetId}/values/{range}`
  - `netzo.resource("RESOURCE_ID").values[range].get()`
- **update**: Updates values in a range of a spreadsheet. The caller must
  specify the spreadsheet ID, range, and a valueInputOption.
  - `PUT /spreadsheets/{spreadsheetId}/values/{range}`
  - `netzo.resource("RESOURCE_ID").values[range].update()`

## Links

- [Marketplace](https://app.netzo.io/resources/resource-http-google-sheets)
- [Documentation](https://developers.google.com/sheets/api)
- [API Reference](https://developers.google.com/sheets/api/reference/rest)

<div align="center">
  <h4>© Netzo</h4>
</div>
