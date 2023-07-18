import { Button } from "@chakra-ui/react";

const FilterButton = ({
  filterName,
  filterColor,
  isSelected,
  onClick = () => null,
}: {
  filterName: string;
  filterColor: string;
  isSelected: boolean;
  onClick?: () => void;
}) => (
  <Button
    w={61}
    h={25}
    bg={isSelected ? filterColor + "9d" : filterColor + "0d"}
    borderRadius={4}
    borderWidth={1.5}
    borderColor={filterColor}
    justifyContent="center"
    alignItems="center"
    display="inline-flex"
    fontFamily="Roboto"
    fontWeight="bold"
    letterSpacing={0.5}
    fontSize={12}
    color={filterColor}
    _hover={{
      bg: filterColor + "9d",
    }}
    onClick={onClick}
  >
    {filterName.length > 8 ? `${filterName.substring(0, 6)}...` : filterName}
  </Button>
);

export default FilterButton;
