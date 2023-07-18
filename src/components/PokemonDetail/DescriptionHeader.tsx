import { Box, Text, Flex } from "@chakra-ui/react";
import FilterButtonWrapper from "./FIlterButtonWrapper";
import { typeHexColor } from "@/data/pokemon/colors";
import { Pokemon } from "@/models/pokemon";

const DescriptionHeader = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Flex justifyContent="space-between" mt={4} alignItems="center">
      <Box>
        <Text mb={0} fontSize="sm" fontWeight="light">
          #{pokemon.id < 10 ? `0${pokemon.id}` : pokemon.id}
        </Text>
        <Text as="h4" fontFamily="monospace" textTransform="capitalize">
          {pokemon.name}
        </Text>
        <Text as="p" fontFamily="monospace" textTransform="capitalize" mb={0}>
          {pokemon.genus}
        </Text>
      </Box>
      <FilterButtonWrapper
        data={pokemon.types}
        colorData={typeHexColor}
        isType={true}
      />
    </Flex>
  );
};

export default DescriptionHeader;
