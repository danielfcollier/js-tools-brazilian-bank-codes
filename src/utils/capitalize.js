import capitalizationFilter from './capitalizationFilter.js';

function capitalizePhrase(phrase) {
  const words = phrase.trim().split(' ');
  const wordConcatenation = (previous, current) => {
    if (previous) {
      return `${previous} ${current}`;
    }

    return current;
  };
  const capitalizedPhrase = words
    .map(word => capitalizeWord(word, capitalizationFilter))
    .reduce(wordConcatenation);

  return capitalizedPhrase.trim();
}

function capitalizeWord(word, helperFunction) {
  if (helperFunction) {
    const result = helperFunction(word);
    if (result) {
      return result;
    }
  }

  if (word.length == 2) {
    return word.toLowerCase();
  }

  const firstLetter = word.slice(0, 1).toUpperCase();
  const wordBody = word.slice(1).toLowerCase();
  const capitalized = `${firstLetter}${wordBody}`;

  return capitalized;
}

export { capitalizePhrase, capitalizeWord };