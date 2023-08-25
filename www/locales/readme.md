# i18n

## Steps to translate the website

Using [mololab/json-translator](https://github.com/mololab/json-translator)

1) Convert JS Object to JSON using https://www.convertsimple.com/convert-javascript-to-json/ (comments should be auto-removed)
2) Paste JSON into locales/en.json file ensuring it is valid
3) Translate the JSON file by running 'npm run translate' (or 'jsontt locales/en.json' directly)
4) Follow the instructions in the terminal to translate the JSON file
5) Manually revert translated URLs, icon names, etc to their english (original) counterparts. Check specifically for the following keys: `icon`, `href`, `type`, etc
