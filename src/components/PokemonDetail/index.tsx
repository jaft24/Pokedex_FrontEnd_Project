import { Box, Divider } from "@chakra-ui/react";
import { Pokemon } from "@/models/pokemon";
import HeaderNavigation from "./HeaderNavigation";
import DescriptionHeader from "./DescriptionHeader";
import EggGroup from "./EggGroup";
import Abilities from "./Abilities";
import StatWrapper from "./Stat/StatWrapper";
import Description from "./Description";
import FooterNavigation from "./FooterNavigation";
import BodyComponent from "./Body";

const PokemonDetail = ({
  pokemon,
  backgroundColor,
  currentPage,
  previousPokemonId,
  nextPokemonId,
}: {
  pokemon: Pokemon;
  backgroundColor: string;
  currentPage: number;
  previousPokemonId: number | null;
  nextPokemonId: number | null;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="rgb(153,182,214)"
      backgroundImage="linear-gradient(180deg, rgba(153,182,214,1) 0%, rgba(255,255,255,1) 100%)"
      padding={50}
      maxW={900}
      minW="356px"
      borderRadius={20}
    >
      <HeaderNavigation
        currentPage={currentPage}
        backgroundColor={backgroundColor}
      />
      <DescriptionHeader pokemon={pokemon} />
      <Divider borderColor={backgroundColor} borderWidth="1px" marginY="4" />
      <BodyComponent pokemon={pokemon} backgroundColor={backgroundColor} />
      <EggGroup pokemon={pokemon} />
      <Abilities pokemon={pokemon} />
      <StatWrapper pokemon={pokemon} backgroundColor={backgroundColor} />
      <Description pokemon={pokemon} />
      <FooterNavigation
        previousPokemonId={previousPokemonId}
        nextPokemonId={nextPokemonId}
        currentPage={currentPage}
        backgroundColor={backgroundColor}
      />
    </Box>
  );
};

export default PokemonDetail;
