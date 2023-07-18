import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const HeaderNavButton = ({
  currentPage,
  isHomeButton = false,
  bgColor,
}: {
  currentPage: number;
  isHomeButton?: boolean;
  bgColor: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    isHomeButton ? router.push(`/`) : router.push(`/?page=${currentPage}`);
  };

  return (
    <Button
      onClick={handleClick}
      width="30%"
      backgroundColor={bgColor}
      opacity={0.75}
      color="black"
      height="2.5rem"
      borderRadius="10px"
      padding="0 15px"
      boxShadow="0px 0px 8px #ddd"
      alignItems="center"
      marginTop="5%"
      fontSize="16px"
      _hover={{
        opacity: 1,
      }}
    >
      {isHomeButton ? `Home 🏠` : `← Back`}
    </Button>
  );
};

export default HeaderNavButton;
