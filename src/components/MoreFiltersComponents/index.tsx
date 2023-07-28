import { typeHexColor } from "@/data/pokemon/colors";
import { eggGroupHexColor } from "@/data/pokemon/colors";
import { abilities } from "@/data/pokemon/abilities";
import { genuses } from "@/data/pokemon/genuses";
import { pokemonValues } from "@/data/pokemon/pokemonValues";
import { Flex, Box, useMediaQuery } from "@chakra-ui/react";
import FilterButtons from "./FilterButtons";
import RangeFilters from "./RangeFilters";
import SelectFilters from "./SelectFilters";
import FooterButtons from "./FooterButtons";
import TextHeader from "./TextHeader";
import { Button } from "react-bootstrap";

const MoreFilters = ({
  selectedHeight,
  onSelectedHeightChange,
  selectedWeight,
  onSelectedWeightChange,
  selectedType,
  onSelectedTypeChange,
  selectedGenus,
  onSelectedGenusChange,
  selectedEggGroup,
  onSelectedEggGroupChange,
  selectedAbility,
  onSelectedAbilityChange,
  onClickAdvancedSearch,
}: {
  selectedHeight: number;
  onSelectedHeightChange: (value: number) => void;
  selectedWeight: number;
  onSelectedWeightChange: (value: number) => void;
  selectedType: string;
  onSelectedTypeChange: (value: string) => void;
  selectedGenus: string;
  onSelectedGenusChange: (value: string) => void;
  selectedEggGroup: string;
  onSelectedEggGroupChange: (value: string) => void;
  selectedAbility: string;
  onSelectedAbilityChange: (value: string) => void;
  onClickAdvancedSearch: () => void;
}) => {
  const [isDesktop] = useMediaQuery("(min-width: 1200px)");
  const [isTablet] = useMediaQuery("(min-width: 574px)");

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      gap={5}
      margin={3}
      padding={10}
      background="rgba(255, 255, 255, 0.1)"
      borderRadius="16px"
      boxShadow="0 0px 10px rgba(0, 0, 0, 0.5)"
      fontFamily="monospace"
      _hover={{ background: "rgba(255, 255, 255, 0.5)" }}
      borderTopWidth="10px"
      borderColor="gray.200"
    >
      <TextHeader />
      <Flex
        w={isDesktop ? "" : isTablet ? "450px" : "250px"}
        justify="center"
        wrap="wrap"
        gap="10"
      >
        <FilterButtons
          title="Type"
          data={typeHexColor}
          selectedValue={selectedType}
          onSelectedValueChange={onSelectedTypeChange}
        />
        <FilterButtons
          title="Egg"
          data={eggGroupHexColor}
          selectedValue={selectedEggGroup}
          onSelectedValueChange={onSelectedEggGroupChange}
        />
        <Box display="flex" flexDirection="column" gap="35">
          <RangeFilters
            title="Height"
            minValue={pokemonValues.minHeight}
            maxValue={pokemonValues.maxHeight}
            selectedValue={selectedHeight}
            onSelectedValueChange={onSelectedHeightChange}
            convertBy={10}
            unit="Cm"
            step={1}
            decimalPlaces={0}
          />
          <RangeFilters
            title="Weight"
            minValue={pokemonValues.minWeight}
            maxValue={pokemonValues.maxWeight}
            selectedValue={selectedWeight}
            onSelectedValueChange={onSelectedWeightChange}
            convertBy={0.1}
            unit="Kg"
            step={0.1}
            decimalPlaces={2}
          />
          <SelectFilters
            title="Ability"
            options={abilities}
            selectedValue={selectedAbility}
            onSelectedValueChange={onSelectedAbilityChange}
          />
          <SelectFilters
            title="Genus"
            options={genuses}
            selectedValue={selectedGenus}
            onSelectedValueChange={onSelectedGenusChange}
          />
        </Box>
      </Flex>
      <FooterButtons onClickAdvancedSearch={onClickAdvancedSearch} />
    </Flex>
  );
};

export default MoreFilters;
