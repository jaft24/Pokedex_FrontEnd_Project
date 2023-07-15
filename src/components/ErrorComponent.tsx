import { Box, Image, Text } from "@chakra-ui/react";
import { singleComponents } from "@/data/styles/singleComponentStyles";
import MyButton from "./MyButton";

const ErrorComponent = () => (
  <Box sx={singleComponents}>
    <Image src="/pikachu_404Error.gif" alt="Pikachu Error Image" />
    <Text>
      404 Not Found!
      <br />
      The Page You Requested Is Not Found.
      <br />
      Go back to the Home Page.
    </Text>
    <MyButton onClick={() => (window.location.href = "/")}>← Home</MyButton>
  </Box>
);

export default ErrorComponent;
