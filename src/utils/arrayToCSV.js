export default function arrayToCSV(array) {
  const csvFormatter = (previous, current) => {
    if (previous) {
      return `${previous},${current}`;
    }

    return `${current}`;
  };

  return array.reduce(csvFormatter);
}