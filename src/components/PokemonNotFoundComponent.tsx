import { Box, Image, Text } from "@chakra-ui/react";

const PokemonNotFoundComponent = () => (
  <Box transform="scale(0.85)" marginTop="-30">
    <Image src="/pikachu_no.gif" alt="Pikachu Not Found Image" />
    <Text fontFamily="monospace" textAlign="center" textTransform="capitalize">
      Opps, Nothing to see here.
      <br />
      Please clear All your filters and try again.
    </Text>
  </Box>
);

export default PokemonNotFoundComponent;
