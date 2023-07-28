import { Button } from "@chakra-ui/react";

const MyButton = ({
  children,
  onClick,
  isCapture = false,
}: {
  children: string;
  onClick: () => void;
  isCapture?: boolean;
}) => (
  <Button
    className="font-monospace"
    height="2.5rem"
    borderRadius="10px"
    padding="5"
    boxShadow="0px 0px 8px #ddd"
    alignItems="center"
    backgroundColor={isCapture ? "#fff" : "rgba(153, 182, 214, 0.5)"}
    backgroundSize="cover"
    marginTop="5%"
    width="100%"
    cursor="pointer"
    fontSize="16px"
    color={isCapture ? "black" : "white"}
    _hover={{ backgroundColor: "rgba(153, 182, 214, 1)" }}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default MyButton;
