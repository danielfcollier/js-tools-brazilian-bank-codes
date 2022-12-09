import fs from 'fs';
import arrayToCSV from './arrayToCSV.js';
import arrayToJSON from './arrayToJSON.js';

function readCSV(file, { delimiter, key }) {
  const result = new Map();
  const content = fs.readFileSync(file, 'utf-8');
  content.split(/\r?\n/).forEach(row => {
    if (row !== '') {
      const elements = row.split(delimiter ?? ',');
      result.set(elements[key - 1], elements);
    }
  });

  return result;
}

function saveCSV(varMap, file = 'output.csv') {
  const array = Array.from(varMap.values());
  const writeStream = fs.createWriteStream(file);
  array.forEach(element => {
    const string = `${arrayToCSV(element)}\n`;
    writeStream.write(string);
  });
}

function readJSON(file) {
  const content = fs.readFileSync(file, 'utf-8');

  return JSON.parse(content);
}

function saveJSON(varMap, schema = null, file = 'output.json', jsonIndentation = 2) {
  const array = (Array.from(varMap.values())).slice(1);
  const data = schema ? arrayToJSON(array, schema) : array;
  const json = {
    source: 'https://www.bcb.gov.br',
    updatedAt: (new Date()).toISOString().slice(0, 10),
    data,
  };
  fs.writeFile(file, JSON.stringify(json, null, jsonIndentation), 'utf8', error => {
    if (error) {
      throw new Error(`Could not save file: ${file}`);
    }
  });
}

export { readCSV, saveCSV, readJSON, saveJSON };