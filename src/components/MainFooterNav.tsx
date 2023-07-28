import { HStack, useMediaQuery } from "@chakra-ui/react";
import MyButton from "./MyButton";
import { useRouter } from "next/router";
import { PokemonPage } from "@/models/pokemonPage";

const MainFooterNav = ({
  data,
  page,
}: {
  data: PokemonPage | undefined;
  page: number;
}) => {
  const [isDesktop] = useMediaQuery("(min-width: 1116px)");
  const router = useRouter();

  return (
    <HStack mt={isDesktop ? -15 : 0} mb={70} gap={10}>
      {!data?.first && (
        <MyButton
          onClick={() =>
            router.push({
              query: { ...router.query, page: page - 1 },
            })
          }
        >
          ← Previous
        </MyButton>
      )}
      {!data?.last && (
        <MyButton
          onClick={() =>
            router.push({
              query: { ...router.query, page: page + 1 },
            })
          }
        >
          Next →
        </MyButton>
      )}
    </HStack>
  );
};

export default MainFooterNav;
