import { singleComponents } from "@/data/styles/singleComponentStyles";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  AvatarBadge,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import BlurOverlay from "../BlueOverlay";
import SignOutConfirmation from "./SignOutConfirmation";
import { RefObject, useRef } from "react";
import React from "react";
import { useRouter } from "next/router";

const ProfileCard = ({
  handleCloseProfile,
}: {
  handleCloseProfile: () => void;
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: RefObject<HTMLDivElement> | null =
    useRef<HTMLDivElement>(null);
  return (
    <>
      <SignOutConfirmation isOpen onClose={onClose} cancelRef={cancelRef} />
      <Center
        position="relative"
        sx={singleComponents}
        className="font-monospace"
        py={6}
        zIndex={100}
      >
        <Button
          backgroundColor="rgba(255,255,255,0)"
          position="fixed"
          top="6"
          right="0"
          borderRadius={0}
          onClick={handleCloseProfile}
        >
          x
        </Button>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"150px"}
            w={"full"}
            src="/pokeball.gif"
            objectFit={"cover"}
            alt = "Pokemon Ball"
          />
          <Flex mt={-5} justify={"center"}>
            <Avatar
              size="xl"
              /* User Image Storage, Picking, Editing is not implemented yet. (Coming soon in the next release ...)
                 So for now here is a demo sample picture for all users */
              src={"https://avatars3.githubusercontent.com/u/100200?s=460&v=4"}
              name="Author"
              css={{
                border: "2px solid white",
              }}
            >
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"}>
              <Heading
                as="h4"
                fontSize={"2xl"}
                fontWeight={500}
                fontFamily={"body"}
              >
                Alex Smith
              </Heading>
              <Text color={"gray.500"}>asmith@gmail.com</Text>
            </Stack>

            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>2/5</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Captured
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>553</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Pokémon
                </Text>
              </Stack>
            </Stack>

            <HStack>
              <Button onClick={() => router.push("/captured")} w={"full"}>
                CAPTURED
              </Button>
              <Button onClick={onOpen} w={"full"}>
                SIGN OUT
              </Button>
            </HStack>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default ProfileCard;
