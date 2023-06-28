export function getPokemonGifByName(name: string) {
  const properName = name.toLowerCase();
  return (
    "https://projectpokemon.org/images/shiny-sprite/" + properName + ".gif"
  );
}
