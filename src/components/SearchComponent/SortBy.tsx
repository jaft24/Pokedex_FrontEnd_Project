import { Flex, Select, Text } from "@chakra-ui/react";

const SortBy = ({
  selectedSortBy,
  onSortByChange,
}: {
  selectedSortBy: string;
  onSortByChange: (value: string) => void;
}) => {
  return (
    <Flex w="200px" align="flex-start" justifyContent="space-around">
      <Text mt="5px">Sort By:</Text>
      <Select
        w="120px"
        value={selectedSortBy}
        onChange={(event) => {
          onSortByChange(event.target.value);
        }}
      >
        <option value="">Id (Asc)</option>
        <option value="Desc">Id (Desc)</option>
        <option value="A-Z">Name (A-Z)</option>
        <option value="Z-A">Name (Z-A)</option>
      </Select>
    </Flex>
  );
};

export default SortBy;
