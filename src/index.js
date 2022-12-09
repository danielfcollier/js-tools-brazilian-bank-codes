import { capitalizePhrase } from './utils/capitalize.js';
import { readCSV, saveCSV, readJSON, saveJSON } from './utils/fileHandlers.js';
import parseArguments from './utils/parseArguments.js';

import configurations from '../config.js';

const args = parseArguments();
const {
  inputCSV,
  updatedCSV,
  updatedJSON,
  indentation,
  configFile,
} = args ?? {};

let config;
if (configFile) {
  config = readJSON(`./${configFile}`);
} else {
  config = configurations;
}

const rawCSV = readCSV(inputCSV ?? config.inputCSV, { delimiter: ',', key: 3 });
const targetCSV = [];
const header = config.schema;

rawCSV.forEach((value, key) => {
  const bankCode = key;
  if (parseInt(bankCode, 10) >= 1) {
    const countryId = 1;
    const ispb = value[0];
    const bankName = value[1];
    const bankCode = value[2];
    const fullName = value[5];
    const since = value[6];

    targetCSV.push([countryId, bankCode, ispb, capitalizePhrase(bankName).trim()]);
  }
});

const columnKey = 2;
const sorterMethod = (a, b) => {
  const aCode = parseInt(a[columnKey - 1], 10);
  const bCode = parseInt(b[columnKey - 1], 10);

  return aCode > bCode ? 1 : -1;
};
const sortedCSV = [header, ...targetCSV.sort(sorterMethod)];
const sortedMap = new Map();
sortedCSV.forEach(element => sortedMap.set(element[columnKey - 1], element));

try{
  saveCSV(sortedMap, updatedCSV ?? config.updatedCSV);
  console.log(`Generated file: ${updatedCSV ?? config.updatedCSV}`);
} catch {
  console.log(`Error to generate file: ${updatedCSV ?? config.updatedCSV}`);
}

try{
  saveJSON(sortedMap, config.schema, updatedJSON ?? config.updatedJSON, indentation ? parseInt(indentation, 10) : config.json.indentation);
  console.log(`Generated file: ${updatedJSON ?? config.updatedJSON}`);
} catch {
  console.log(`Error to generate file: ${updatedJSON ?? config.updatedJSON}`);
}

