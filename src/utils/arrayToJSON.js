export default function arrayToJSON(array, schema) {
  return array.map((element) => {
    const result = {};
    element.forEach((value, index) => {
      if (schema[index] !== "") {
        result[schema[index]] = value;
      }
    });

    return result;
  });
}
