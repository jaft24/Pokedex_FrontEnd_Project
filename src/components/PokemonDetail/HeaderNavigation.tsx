import { Box } from "@chakra-ui/react";
import HeaderNavButton from "@/components/PokemonDetail/HeaderNavButton";

const HeaderNavigation = ({
  currentPage,
  backgroundColor,
}: {
  currentPage: number;
  backgroundColor: string;
}) => {
  return (
    <Box
      mt="-7%"
      mb="2%"
      fontFamily="monospace"
      display="flex"
      justifyContent="center"
      gap={3}
    >
      <HeaderNavButton currentPage={currentPage} bgColor={backgroundColor} />
      <HeaderNavButton
        currentPage={currentPage}
        bgColor={backgroundColor}
        isHomeButton
      />
    </Box>
  );
};

export default HeaderNavigation;
