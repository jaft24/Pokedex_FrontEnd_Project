import { Box, Input, List, ListItem } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  searchText,
  onInputChange,
  onSearchSubmit,
  matchedPokemon,
  onListClick,
}: {
  searchText: string | number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  matchedPokemon: string[] | number[];
  onListClick: (pokemon: string | number) => void;
}) => {
  const handleListClick = (pokemon: string | number) => {
    onListClick(pokemon);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        height="2.5rem"
        border="1px"
        w="450px"
        borderColor="gray.300"
        borderRadius="10px"
        padding="0 15px"
        boxShadow="0px 0px 8px #ddd"
        bg="rgba(255, 255, 255, 0)"
        display="flex"
        alignItems="center"
      >
        <FaSearch id="search-icon" />
        <Input
          flex="1"
          bg="transparent"
          border="none"
          height="100%"
          marginLeft="5px"
          type="text"
          value={searchText}
          onChange={(e) => onInputChange(e)}
          placeholder="Search Pokémon"
          onKeyDown={onSearchSubmit}
        />
      </Box>

      <Box
        width="100%"
        bg="rgba(255, 255, 255, 0.25)"
        display="flex"
        flexDirection="column"
        boxShadow="0px 0px 8px #ddd"
        borderRadius="10px"
        mt="1rem"
        maxH="400px"
        overflowY="auto"
      >
        <List marginBottom="0" ml="-5" mr="2">
          {matchedPokemon.map((pokemon) => (
            <ListItem
              padding={3}
              fontWeight={100}
              _hover={{ bg: "rgb(255, 255, 255)" }}
              onClick={() => handleListClick(pokemon)}
              key={pokemon}
            >
              {pokemon}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SearchBar;
