import { Text, HStack } from "@chakra-ui/react";

const PokemonName = ({ id, name }: { id: number; name: string }) => (
  <HStack align="center" justifyContent="space-between">
    <Text fontSize="14" fontWeight="lighter" mb="3">
      # 0{id}{" "}
    </Text>
    <Text
      fontFamily="monospace"
      textAlign="center"
      textTransform="capitalize"
      fontSize="19"
    >
      {name}
    </Text>
  </HStack>
);

export default PokemonName;
