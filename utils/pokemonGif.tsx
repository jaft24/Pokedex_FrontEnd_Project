export function getPokemonGifByName(name: string) {
  let properName = name
    .toLowerCase()
    .replace("♂", "_m")
    .replace("♀", "_f")
    .replace("’", "");
  if (properName == "mime jr.") {
    properName = "mime_jr";
  } else if (properName == "mr. mime") {
    properName = "mr.mime";
  }
  return (
    "https://projectpokemon.org/images/normal-sprite/" + properName + ".gif"
  );
}

export function getPokemonGifBackByName(name: string) {
  let properName = name
    .toLowerCase()
    .replace("♂", "_m")
    .replace("♀", "_f")
    .replace("’", "");
  if (properName == "mime jr.") {
    properName = "mime_jr";
  } else if (properName == "mr. mime") {
    properName = "mr._mime";
  }
  return (
    "https://projectpokemon.org/images/sprites-models/normal-back/" +
    properName +
    ".gif"
  );
}
