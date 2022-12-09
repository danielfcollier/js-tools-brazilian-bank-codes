export default function parseArguments() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    const array = args.map(arg => {
      const [key, value] = arg.replace('--', '').split('=');
      return { [key]: value ?? '' };
    });

    const objectReducer = (previous, current) => {
      return { ...previous, ...current };
    };
    const result = array.reduce(objectReducer);

    return result;
  }
}