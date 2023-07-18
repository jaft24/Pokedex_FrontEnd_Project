import { Button } from "@chakra-ui/react";

const MyButton = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => (
  <Button
    height="2.5rem"
    borderRadius="10px"
    padding="5"
    boxShadow="0px 0px 8px #ddd"
    alignItems="center"
    backgroundColor="rgba(153, 182, 214, 0.5)"
    marginTop="5%"
    width="100%"
    cursor="pointer"
    fontSize="16px"
    color="white"
    fontFamily="inherit"
    _hover={{ backgroundColor: "rgba(153, 182, 214, 1)" }}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default MyButton;
