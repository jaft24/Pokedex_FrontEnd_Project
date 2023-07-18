import { useMediaQuery, HStack } from "@chakra-ui/react";
import { Pokemon } from "@/models/pokemon";
import ImageCard from "./ImageCard";
import GifCard from "./GifCard";
import MeasurmentTable from "./MeasurmentTable";

const BodyComponent = ({
  pokemon,
  backgroundColor,
}: {
  pokemon: Pokemon;
  backgroundColor: string;
}) => {
  const [isDesktop] = useMediaQuery("(min-width: 960px)");
  return (
    <HStack
      alignItems="center"
      justifyContent={isDesktop ? "space-evenly" : "space-between"}
      mb={3}
    >
      <ImageCard pokemon={pokemon} />
      <GifCard pokemon={pokemon} />
      <MeasurmentTable pokemon={pokemon} backgroundColor={backgroundColor} />
    </HStack>
  );
};

export default BodyComponent;
