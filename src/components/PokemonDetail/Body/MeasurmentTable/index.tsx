import { Divider, Table } from "@chakra-ui/react";
import InfoDisplay from "./InfoDisplay";
import { Pokemon } from "@/models/pokemon";

const MeasurmentTable = ({
  pokemon,
  backgroundColor,
}: {
  pokemon: Pokemon;
  backgroundColor: string;
}) => (
  <Table mr="-5" width="10%" size="xs">
    <InfoDisplay
      label="Weight"
      value={pokemon.weight}
      unit="Kg"
      convertedUnit="lbs"
      isWeight
      backgroundColor={backgroundColor}
    />
    <Divider
      borderColor={backgroundColor}
      borderWidth="1px"
      ml={75}
      mb={2}
      mt={1}
    />
    <InfoDisplay
      label="Height"
      value={pokemon.height}
      unit="cm"
      convertedUnit="in"
      backgroundColor={backgroundColor}
    />
  </Table>
);

export default MeasurmentTable;
