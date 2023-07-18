import { Box, Text } from "@chakra-ui/react";
import beautifyString from "../../../utils/beautifyString";
import { Pokemon } from "@/models/pokemon";

const Abilities = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Box mt={2} mb={2}>
      <Text as="strong">Abilities: </Text>
      {pokemon.abilities
        .map((ability: any) => beautifyString(ability.ability))
        .join(", ")}
    </Box>
  );
};

export default Abilities;
