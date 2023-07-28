import { HamburgerIcon } from "@chakra-ui/icons";
import { RefObject, useRef } from "react";
import {
  Avatar,
  AvatarBadge,
  Button,
  Text,
  Image,
  HStack,
  Flex,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useOutsideClick,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import SignOutConfirmation from "./SignOutConfirmation";
import { useAuth } from "@/hooks/AuthContext";
import decodeToken from "../../../utils/decodeToken";

const ProfileHeader = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const ref: RefObject<HTMLDivElement> | null = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: RefObject<HTMLDivElement> | null =
    useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: ref,
    handler: () => setIsCardOpen(false),
  });
  const { token } = useAuth();
  const decodedData = decodeToken(token);

  const name =
    typeof decodedData !== "string" ? decodedData.name : "Invalid Name";
  const imageSrc = "https://bit.ly/ryan-florence";
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <SignOutConfirmation
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
      {isCardOpen && (
        <Box ref={ref}>
          <ProfileCard handleCloseProfile={() => setIsCardOpen(false)} />
        </Box>
      )}
      <Flex
        w={"100%"}
        className="font-monospace"
        gap={5}
        alignItems="center"
        justifyContent="center"
        mt={3}
      >
        <Image src="/pokedex.png" alt="Pokemon Logo" width={245} height={100} />
        <HStack spacing={5}>
          <Avatar
            onClick={() => setIsCardOpen(true)}
            src={imageSrc}
            name={name}
            _hover={{ cursor: "grab" }}
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Text as="b" marginBottom={0}>
            {name}
          </Text>
          {isDesktop ? (
            <Button onClick={onOpen}> SIGN OUT </Button>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem onClick={onOpen}>SIGN OUT</MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
    </>
  );
};

export default ProfileHeader;
