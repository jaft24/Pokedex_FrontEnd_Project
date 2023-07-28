import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Link,
  Image,
  Avatar,
  AvatarBadge,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  authComponents,
  singleComponents,
} from "@/data/styles/singleComponentStyles";

const SignInCard = ({
  handleLogin,
  wrongCredentialWarning,
  isInvalid,
}: {
  handleLogin: (username: string, password: string) => Promise<void>;
  wrongCredentialWarning: boolean;
  isInvalid: { username: boolean; password: boolean };
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Center
      position="relative"
      sx={singleComponents}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      className="font-monospace"
      w="350px"
      rounded={"md"}
      py={3}
      mt={
        wrongCredentialWarning || isInvalid.username || isInvalid.password
          ? 20
          : 0
      }
    >
      <Image
        w={"full"}
        h={"170px"}
        src="/pikachuProfileCard.gif"
        objectFit={"cover"}
      />
      <Flex mt={-5} justify={"center"}>
        <Avatar
          size="xl"
          css={{
            border: "2px solid white",
          }}
        >
          <AvatarBadge boxSize="1em" bg="red.500" />
        </Avatar>
      </Flex>
      <Flex align="center" justify="center" fontSize="l" fontWeight="medium">
        <Stack spacing={5} mx="auto" p={5}>
          <Text pt={5} fontSize="xl" as="b" margin="auto">
            Welcome to your Pokedex
          </Text>

          {(wrongCredentialWarning ||
            isInvalid.username ||
            isInvalid.password) && (
            <Box
              rounded={"lg"}
              bg={useColorModeValue("red.100", "gray.700")}
              p={3}
              maxW={320}
            >
              <Text align={"center"}>
                {wrongCredentialWarning
                  ? "Incorrect username or password."
                  : "Please type your username and password"}
              </Text>
            </Box>
          )}
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="userName">
                <FormLabel>User name</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  errorBorderColor="red.300"
                  isInvalid={isInvalid.username}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    errorBorderColor="red.300"
                    isInvalid={isInvalid.password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                onClick={() => {
                  handleLogin(username, password);
                }}
              >
                Sign in
              </Button>
              <Text align={"center"}>
                New Trainer?{" "}
                <Link href="/signup" color={"blue.400"}>
                  SignUp
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Center>
  );
};

export default SignInCard;
