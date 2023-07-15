import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";

export default function Captured() {
  const { data, error, isLoading } = useSWR(
    ["getCapturedPokemonList"],
    async () => {
      return await PokemonApi.getCapturedPokemonList();
    }
  );

  return (
    <div>
      <h1>Hello World</h1>
      {isLoading && <p> Data is Loading </p>}
      {error && <p> Error in fetching request </p>}
      {data?.toString()}
    </div>
  );
}
