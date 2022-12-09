# Brazillian Bank Codes

> This package is a tool to format and generate (csv and/or json) files from the official source at https://www.bcb.gov.br/

Source of truth: https://www.bcb.gov.br/

Keep in mind:
- Keep your information updated and with a single source of truth
- This is not an API, but we will try to keep updated the base 'bc.csv' and sample files
- Download this repository to manage your updates by always downloading the official source

Usage:
node src/index.js
npm start

Configuration file: node src/index.js --configFile=config.json
```json
{
  "inputCSV": "bc.csv",
  "updatedCSV": "./sample/output.csv",
  "updatedJSON": "./sample/output.json",
  "schema": ["countryId", "bankCode", "ispb", "bankName"],
  "json": {
    "indentation": 2
  }
}
```
CLI parameters:
  --inputCSV,
  --updatedCSV,
  --updatedJSON,
  --indentation,
  --configFile,

node src/index.js --indentation=4 --updatedJSON=output.json

