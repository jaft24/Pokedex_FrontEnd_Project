import { HStack } from "@chakra-ui/react";
import FooterNavButton from "@/components/PokemonDetail/FooterNavButton";

const FooterNavigation = ({
  previousPokemonId,
  nextPokemonId,
  currentPage,
  backgroundColor,
}: {
  previousPokemonId: number | null;
  nextPokemonId: number | null;
  currentPage: number;
  backgroundColor: string;
}) => {
  return (
    <HStack spacing={3} justify="center">
      {previousPokemonId && (
        <FooterNavButton
          pokemonId={previousPokemonId}
          currentPage={currentPage}
          bgColor={backgroundColor}
        />
      )}
      {nextPokemonId && (
        <FooterNavButton
          pokemonId={nextPokemonId}
          currentPage={currentPage}
          isNextButton
          bgColor={backgroundColor}
        />
      )}
    </HStack>
  );
};

export default FooterNavigation;
