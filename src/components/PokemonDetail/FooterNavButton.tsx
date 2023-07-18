import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const FooterNavButton = ({
  pokemonId,
  currentPage,
  isNextButton = false,
  bgColor,
}: {
  pokemonId: number;
  currentPage: number;
  isNextButton?: boolean;
  bgColor: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${pokemonId}?page=${currentPage}`);
  };

  return (
    <Button
      onClick={handleClick}
      width="50%"
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
      {isNextButton ? `# 0${pokemonId} Next →` : `← # 0${pokemonId} Prev`}
    </Button>
  );
};

export default FooterNavButton;
