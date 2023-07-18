import { Box, Text } from "@chakra-ui/react";
import { Pokemon } from "@/models/pokemon";

const Description = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Box>
      <Text as="strong">Description: </Text>
      <Text as="i">{pokemon.description}</Text>
    </Box>
  );
};

export default Description;
