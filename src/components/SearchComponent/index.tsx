import { Flex, Box, useOutsideClick, useMediaQuery } from "@chakra-ui/react";
import { RefObject, useRef } from "react";
import SearchBy from "./SearchBy";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";

const SearchComponent = ({
  selectedSortBy,
  onSortByChange,
  searchText,
  onSearchTextChange,
  selectedSearchBy,
  onSearchByChange,
  matchedPokemon,
  onMatchedPokemonChange,
  onInputChange,
  onSearchSubmit,
  onListClick,
}: {
  selectedSortBy: string;
  onSortByChange: (value: string) => void;
  searchText: string | number;
  onSearchTextChange: (value: string | number) => void;
  selectedSearchBy: string;
  onSearchByChange: (value: string) => void;
  matchedPokemon: string[] | number[];
  onMatchedPokemonChange: (value: string[] | number[]) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onListClick: (pokemon: string | number) => void;
}) => {
  const [isDesktop] = useMediaQuery("(min-width: 1200px)");
  const handleListClick = (pokemon: string | number) => {
    onListClick(pokemon);
    onSearchTextChange(pokemon);
    onMatchedPokemonChange([]);
  };

  const ref: RefObject<HTMLDivElement> | null = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: ref,
    handler: () => onMatchedPokemonChange([]),
  });

  return (
    <Flex
      align="flex-start"
      justify="center"
      paddingLeft="3"
      wrap="wrap"
      gap="10"
    >
      <SearchBy
        selectedSearchBy={selectedSearchBy}
        onSearchByChange={onSearchByChange}
      />
      <Box ref={ref} mt={isDesktop ? "" : "-5"} order={isDesktop ? [2] : [3]}>
        <SearchBar
          searchText={searchText}
          onInputChange={onInputChange}
          onSearchSubmit={onSearchSubmit}
          matchedPokemon={matchedPokemon}
          onListClick={handleListClick}
        />
      </Box>
      <Box order={isDesktop ? [3] : [2]}>
        <SortBy
          selectedSortBy={selectedSortBy}
          onSortByChange={onSortByChange}
        />
      </Box>
    </Flex>
  );
};

export default SearchComponent;
