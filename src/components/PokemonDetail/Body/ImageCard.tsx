import { Image } from "@chakra-ui/react";
import { getPokemonImageUrl } from "../../../../utils/pokemonImage";
import { Pokemon } from "@/models/pokemon";

const ImageCard = ({ pokemon }: { pokemon: Pokemon }) => (
  <Image
    src={getPokemonImageUrl(pokemon.id)}
    alt={`Pokemon: ${pokemon.name}'s Image`}
    width="40%"
    ml="-5"
  />
);

export default ImageCard;
