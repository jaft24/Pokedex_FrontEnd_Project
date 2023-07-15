import { Box, Spinner } from "@chakra-ui/react";
import PokemonImage from "./PokemonImage";
import PokemonName from "./PokemonName";
import PokemonTypeSection from "./PokemonTypeSection";
import usePokemon from "@/hooks/usePokemon";

const PokemonEntry = ({ name }: { name: string }) => {
  const { pokemon, pokemonLoading } = usePokemon(name);
  return (
    <Box
      display="felx"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="black"
      minWidth="180px"
      minHeight="225px"
    >
      {pokemonLoading && <Spinner animation="grow" />}
      {pokemon && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          background="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(5px)"
          borderRadius="16px"
          padding=".9rem"
          width="100%"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          _hover={{ transform: "scale(1.1)" }}
        >
          <PokemonImage id={pokemon.id} name={pokemon.name} />
          <PokemonName id={pokemon.id} name={pokemon.name} />
          <PokemonTypeSection types={pokemon.types} />
        </Box>
      )}
    </Box>
  );
};

export default PokemonEntry;
