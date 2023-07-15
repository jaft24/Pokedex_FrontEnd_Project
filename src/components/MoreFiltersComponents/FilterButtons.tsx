import { Box, Grid } from "@chakra-ui/react";
import FilterButton from "../FilterButtons";
import beautifyString from "../../../utils/beautifyString";

const FilterButtons = ({
  title,
  data,
  selectedValue,
  onSelectedValueChange,
}: {
  title: string;
  data: {
    id: number;
    name: string;
    color: string;
  }[];
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      gap={5}
    >
      {title}
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows={`repeat(6, 1fr)`}
        gap={2.5}
      >
        {data.map((item) => (
          <Box key={item.id} display="flex" justifyContent="space-around">
            <FilterButton
              filterName={beautifyString(item.name)}
              filterColor={item.color}
              isSelected={selectedValue === item.name}
              onClick={() => onSelectedValueChange(item.name)}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default FilterButtons;
