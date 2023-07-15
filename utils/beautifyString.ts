const beautifyString = (str: string): string => {
  const words: string[] = str.split("-");
  return words
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export default beautifyString;
