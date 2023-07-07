import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import { AxiosError } from "axios";

/*
I mentioned this in another file, but if it is possible it's better to get
models by their ID rather than name. However, sometimes when you are searching for
text that cannot be avoided.
 */

export default function usePokemon(name: string) {

    const { data, isLoading, mutate } = useSWR(name, async () => {
        try {
            return await PokemonApi.getPokemon(name);
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
        mutatePokemon: mutate,
    }
}