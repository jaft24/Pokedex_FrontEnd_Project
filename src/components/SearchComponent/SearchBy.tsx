import { Flex, Select, Text } from "@chakra-ui/react";

const SearchBy = ({
  selectedSearchBy,
  onSearchByChange,
}: {
  selectedSearchBy: string;
  onSearchByChange: (value: string) => void;
}) => {
  return (
    <Flex w="200px" align="flex-start" justifyContent="space-around">
      <Text mt="5px">Search By:</Text>
      <Select
        value={selectedSearchBy}
        onChange={(event) => onSearchByChange(event.target.value)}
        w="100px"
      >
        <option value="Name">Name</option>
        <option value="Id">Id</option>
      </Select>
    </Flex>
  );
};

export default SearchBy;
