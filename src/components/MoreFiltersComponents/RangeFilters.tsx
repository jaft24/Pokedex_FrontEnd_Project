import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const RangeFilters = ({
  title,
  minValue,
  maxValue,
  selectedValue,
  onSelectedValueChange,
  convertBy,
  unit,
  step,
  decimalPlaces,
}: {
  title: string;
  minValue: number;
  maxValue: number;
  selectedValue: number;
  onSelectedValueChange: (value: number) => void;
  convertBy: number;
  unit: string;
  step: number;
  decimalPlaces: number;
}) => {
  return (
    <Flex align="center" justify="space-between" marginBottom="-5">
      <Text>{title}:</Text>
      <Slider
        min={minValue}
        max={maxValue}
        value={selectedValue ?? ""}
        onChange={(value) => onSelectedValueChange(value)}
        height={10}
        width="70%"
        colorScheme="blue"
        step={step}
        maxWidth="115px"
        marginTop="-3"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>
        {selectedValue
          ? `${(selectedValue * convertBy).toFixed(decimalPlaces)} `
          : ` - `}
        {unit}
      </Text>
    </Flex>
  );
};

export default RangeFilters;
