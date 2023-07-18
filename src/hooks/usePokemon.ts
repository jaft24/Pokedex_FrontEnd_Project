import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import { AxiosError } from "axios";

export default function usePokemon(id: number) {
  const { data, isLoading, error, mutate } = useSWR(id.toString(), async () => {
    try {
      return await PokemonApi.getPokemon(id);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      } else {
        throw error;
      }
    }
  });

  return {
    pokemon: data,
    pokemonLoading: isLoading,
    pokemonError: error,
    mutatePokemon: mutate,
  };
}
