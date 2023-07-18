import { Flex, Tr, Td, Text } from "@chakra-ui/react";
import SvgIcon from "./SvgIcon";

const InfoDisplay = ({
  label,
  value,
  unit,
  convertedUnit,
  isWeight = false,
  backgroundColor,
}: {
  label: string;
  value: number;
  unit: string;
  convertedUnit: string;
  isWeight?: boolean;
  backgroundColor: string;
}) => (
  <>
    <Tr>
      <Td rowSpan={3} borderBottom="0px">
        <Flex margin={5}>
          <SvgIcon
            isWeight={isWeight ? true : false}
            setBackgroundColor={backgroundColor}
          />
        </Flex>
      </Td>

      <Td borderBottom="0px">
        <Text fontSize="15" fontWeight="lighter">
          {label}
        </Text>
      </Td>
    </Tr>

    <Tr>
      <Td display="flex" borderBottom="0px" gap={3}>
        {isWeight ? value / 10 : value * 10}
        <Text fontSize="12" fontWeight="lighter">
          {unit}
        </Text>
      </Td>
    </Tr>

    <Tr>
      <Td display="flex" gap={3} borderBottom="0px">
        {isWeight
          ? ((value / 10) * 2.20462).toFixed(2)
          : ((value * 10) / 0.393701).toFixed(2)}
        <Text fontSize="12" fontWeight="lighter">
          {convertedUnit}
        </Text>
      </Td>
    </Tr>
  </>
);

export default InfoDisplay;
