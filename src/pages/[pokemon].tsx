import { useRouter } from "next/router";
import Head from "next/head";
import { getPokemonImageUrl } from "../../utils/pokemonImage";
import Color from "color-thief-react";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { pokemonIds } from "@/data/pokemon/PokemonId";
import usePokemon from "@/hooks/usePokemon";
import PokemonDetail from "@/components/PokemonDetail";

export default function PokemonDetailsPage() {
  const [backgroundColor, setBackgroundColor] = useState("white");

  const router = useRouter();
  const currentPage = parseInt(router.query.page?.toString() || "0");
  const { pokemon, pokemonLoading, pokemonError } = usePokemon(
    parseInt(router.query.pokemon?.toString() || "")
  );

  const previousPokemonId = pokemon && pokemon.id > 1 ? pokemon?.id - 1 : null;
  const nextPokemonId =
    pokemon && pokemon?.id < pokemonIds.length ? pokemon?.id + 1 : null;

  if (pokemonError) {
    return <ErrorComponent />;
  } else if (pokemonLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Head>{pokemon && <title> {pokemon.name} </title>}</Head>
      {pokemon && (
        <Box
          minW="356px"
          padding={50}
          display="flex"
          flexDirection="column"
          alignItems="center"
          className="font-monospace"
        >
          <Color
            src={getPokemonImageUrl(pokemon.id)}
            crossOrigin="anonymous"
            format="hex"
          >
            {({ data }) => {
              if (typeof data === "string") {
                setBackgroundColor(data);
                document.body.style.background = data;
              }
              return null;
            }}
          </Color>

          <PokemonDetail
            pokemon={pokemon}
            backgroundColor={backgroundColor}
            currentPage={currentPage}
            previousPokemonId={previousPokemonId}
            nextPokemonId={nextPokemonId}
          />
        </Box>
      )}
    </>
  );
}
