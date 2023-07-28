import {
  Avatar,
  AvatarBadge,
  Button,
  Collapse,
  Flex,
  Text,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const SignInHeader = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoginCliked, setIsLoginCliked] = useState(false);
  const router = useRouter();
  const handleLoginClick = () => {
    setIsLoginCliked(true);
    router.push("/signin");
  };
  return (
    <Flex
      w={"100%"}
      className="font-monospace"
      gap={5}
      alignItems="center"
      justifyContent="center"
      mt={3}
    >
      <Image src="/pokedex.png" alt="Pokemon Logo" width={245} height={100} />
      <Button
        background="rgba(255, 255, 255, 0.1)"
        borderRadius="16px"
        boxShadow="0 0px 10px rgba(0, 0, 0, 0.5)"
        padding={2}
        height="55px"
        width="60px"
        zIndex="1"
        mt={2}
        className="font-monospace"
        onMouseEnter={onToggle}
        onMouseLeave={onToggle}
        onClick={handleLoginClick}
      >
        {isLoginCliked ? (
          <Spinner />
        ) : (
          <Flex
            gap={1}
            flexDirection="column"
            align="center"
            justifyContent="center"
          >
            <Avatar marginRight={0} margin="auto" size="sm">
              <AvatarBadge boxSize="1.25em" bg="red.500" />
            </Avatar>
            <Collapse in={isOpen} animateOpacity>
              <Text>LOGIN</Text>
            </Collapse>
          </Flex>
        )}
      </Button>
    </Flex>
  );
};

export default SignInHeader;
