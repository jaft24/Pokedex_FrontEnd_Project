import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { getPokemonImageUrl } from "@/image/pokemonImage";

const PokemonImage = ({ id, name }: { id: number; name: string }) => (
  <Box>
    <Image
      src={getPokemonImageUrl(id)}
      alt={"Pokemon: " + name}
      width={190}
      height={190}
    />
  </Box>
);

export default PokemonImage;
