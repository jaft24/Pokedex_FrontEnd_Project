import { Box, Grid } from "@chakra-ui/react";
import FilterButton from "../FilterButtons";
import beautifyString from "../../../utils/beautifyString";
import { typeHexColor } from "@/data/pokemon/colors";

const PokemonTypeSection = ({
  types,
}: {
  types: { id: number; type: string }[];
}) => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(2, 1fr)"
    gap={15}
    paddingBottom="5%"
    marginTop="-2%"
  >
    {types.map((type) => (
      <Box key={type.id} display="flex" justifyContent="space-around">
        <FilterButton
          filterName={beautifyString(type.type)}
          filterColor={
            typeHexColor.find((t) => t.name === type.type)?.color || ""
          }
          isSelected={false}
          onClick={() => {}}
        />
      </Box>
    ))}
  </Box>
);

export default PokemonTypeSection;
