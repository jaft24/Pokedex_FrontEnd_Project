import { Box, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import StatProgressChart from "./StatProgressChart";
import { maxStatValues } from "@/data/pokemon/maxStatValues";
import { Pokemon } from "@/models/pokemon";

const StatWrapper = ({
  pokemon,
  backgroundColor,
}: {
  pokemon: Pokemon;
  backgroundColor: string;
}) => {
  const [isDesktop] = useMediaQuery("(min-width: 960px)");

  return (
    <Box marginBottom="3%">
      <Text as="strong">Stats:</Text>
      <Grid
        marginTop="2%"
        marginLeft="-2%"
        alignItems="center"
        justifyContent="space-around"
        gridTemplateColumns={isDesktop ? "repeat(6, 0fr)" : "repeat(3, 0fr)"}
        gap={30}
      >
        <StatProgressChart
          statValue={pokemon.stat.hp}
          maxstatValue={maxStatValues.hp}
          label={"Hp"}
          color={backgroundColor}
        />
        <StatProgressChart
          statValue={pokemon.stat.speed}
          maxstatValue={maxStatValues.speed}
          label={"Speed"}
          color={backgroundColor}
        />
        <StatProgressChart
          statValue={pokemon.stat.attack}
          maxstatValue={maxStatValues.attack}
          label={"Attack"}
          color={backgroundColor}
        />
        <StatProgressChart
          statValue={pokemon.stat.defense}
          maxstatValue={maxStatValues.defense}
          label={"Defense"}
          color={backgroundColor}
        />
        <StatProgressChart
          statValue={pokemon.stat.specialAttack}
          maxstatValue={maxStatValues.specialAttack}
          label={"S.A"}
          color={backgroundColor}
        />
        <StatProgressChart
          statValue={pokemon.stat.specialDefense}
          maxstatValue={maxStatValues.specialDefense}
          label={"S.D"}
          color={backgroundColor}
        />
      </Grid>
    </Box>
  );
};

export default StatWrapper;
