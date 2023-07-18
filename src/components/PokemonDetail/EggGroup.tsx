import { HStack, Text } from "@chakra-ui/react";
import FilterButtonWrapper from "./FIlterButtonWrapper";
import { Pokemon } from "@/models/pokemon";
import { eggGroupHexColor } from "@/data/pokemon/colors";

const EggGroup = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <HStack>
      <Text as="strong">Egg Groups: </Text>
      <FilterButtonWrapper
        data={pokemon.eggGroups}
        colorData={eggGroupHexColor}
        isType={false}
      />
    </HStack>
  );
};

export default EggGroup;
