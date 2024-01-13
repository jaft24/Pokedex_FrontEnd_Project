import { singleComponents } from "@/data/styles/singleComponentStyles";
import { Box, Image, Text } from "@chakra-ui/react";

const LoadingComponent = () => (
  <Box sx={singleComponents}>
    <Image src="/pikachu_walking.gif" alt="Pokemon Loading Image" />
    <Text>Loading . . . from a database with limited resources. </Text>
    <Text>Please be patient, and consider refreshing.</Text>
  </Box>
);

export default LoadingComponent;
