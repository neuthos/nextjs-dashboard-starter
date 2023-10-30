function snakeToCapitalized(text: string) {
  const words = text.split('_');
  const capitalizedWords = words.map((word) => {
    const lowercaseWord = word.toLowerCase();
    return lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
  });
  return capitalizedWords.join(' ');
}

export default snakeToCapitalized;
