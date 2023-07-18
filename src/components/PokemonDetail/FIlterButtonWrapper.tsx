import { Box } from "@chakra-ui/react";
import FilterButton from "../FilterButtons";
import beautifyString from "../../../utils/beautifyString";
import { PokemonEggGroup, PokemonType } from "@/models/pokemon";

const FilterButtonWrapper = ({
  isType,
  data,
  colorData,
}: {
  isType: boolean;
  data: PokemonType[] | PokemonEggGroup[];
  colorData: {
    id: number;
    name: string;
    color: string;
  }[];
}) => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={5}>
      {data.map((item) => (
        <Box key={item.id} marginRight="auto" transform="scale(1.15)">
          <FilterButton
            filterName={beautifyString(
              isType
                ? (item as PokemonType).type
                : (item as PokemonEggGroup).eggGroup
            )}
            filterColor={
              colorData.find((colorItem) =>
                isType
                  ? colorItem.name === (item as PokemonType).type
                  : colorItem.name === (item as PokemonEggGroup).eggGroup
              )?.color || ""
            }
            isSelected={false}
          />
        </Box>
      ))}
    </Box>
  );
};

export default FilterButtonWrapper;
