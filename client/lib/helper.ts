export function convertDashToUpperCase(dashed: string): string {
  const words = dashed.split('-');
  const capitalizedWords = words.map((word: string) => {
    const capitalizedFirstLetter = word[0].toUpperCase();
    const finalWord = `${capitalizedFirstLetter}${word.slice(1)}`;
    return finalWord;
  })

  return capitalizedWords.join(' ');


}
