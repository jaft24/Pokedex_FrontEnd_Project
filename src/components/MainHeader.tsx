import { HStack, Image } from "@chakra-ui/react";
import SignInButton from "./AuthenticationComponents/SignInHeader";

const MainHeader = () => (
  <HStack gap={5}>
    <Image src="/pokedex.png" alt="Pokemon Logo" width={275} height={120} />
    <SignInButton />
  </HStack>
);

export default MainHeader;
