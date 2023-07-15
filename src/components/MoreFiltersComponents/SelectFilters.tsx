import { Flex, Text, Select } from "@chakra-ui/react";
import beautifyString from "../../../utils/beautifyString";

const SelectFilters = ({
  title,
  options,
  selectedValue,
  onSelectedValueChange,
}: {
  title: string;
  options: {
    id: number;
    name: string;
  }[];
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
}) => {
  return (
    <Flex justify="space-around" marginBottom="-3">
      <Text>{title}: </Text>
      <Select
        height="2rem"
        borderRadius="10px"
        boxShadow="0px 0px 8px #ddd"
        backgroundColor="rgba(255, 255, 255, 0.5)"
        marginLeft="3"
        width={225}
        value={selectedValue ?? ""}
        onChange={(event) => onSelectedValueChange(event.target.value)}
      >
        <option value={""}></option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {beautifyString(option.name)}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default SelectFilters;
