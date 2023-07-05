export function getPokemonGifByName(name: string) {
  const properName = name.toLowerCase();
  return (
    "https://projectpokemon.org/images/normal-sprite/" + properName + ".gif"
  );
}

export function getPokemonGifBackByName(name: string) {
  const properName = name.toLowerCase();
  return (
    "https://projectpokemon.org/images/sprites-models/normal-back/" +
    properName +
    ".gif"
  );
}
