import { Flex, Image } from "@chakra-ui/react";
import { Pokemon } from "@/models/pokemon";
import {
  getPokemonGifBackByName,
  getPokemonGifByName,
} from "../../../../utils/pokemonGif";

const GifCard = ({ pokemon }: { pokemon: Pokemon }) => (
  <Flex flexDirection="column" alignContent="space-between" w="15%">
    <Image
      src={getPokemonGifByName(pokemon.name)}
      alt={`Pokemon: ${pokemon.name}'s Front Gif`}
      m="-2%"
      mb="5%"
    />
    <Image
      src={getPokemonGifBackByName(pokemon.name)}
      alt={`Pokemon: ${pokemon.name}'s Back Gif`}
      m="-2%"
      mt="5%"
    />
  </Flex>
);

export default GifCard;
