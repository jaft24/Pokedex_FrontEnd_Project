import { Pokemon } from "@/models/pokemon";
import api from "./axiosInstance";
import { PokemonPage } from "@/models/pokemonPage";

export async function getPokemon(id: number) {
  const response = await api.get<Pokemon>("/api/pokemon/byId/" + id);
  return response.data;
}

export async function getAllPokemon({
  page = 0,
  id,
  name,
  sort,
  genus,
  height,
  weight,
  type,
  ability,
  eggGroup,
}: {
  page: number;
  id: number;
  name: string;
  sort: string;
  genus: string;
  height: number;
  weight: number;
  type: string;
  ability: string;
  eggGroup: string;
}) {
  const params = {
    page,
    id,
    name,
    sort,
    genus,
    height,
    weight,
    type,
    ability,
    eggGroup,
  };
  const response = await api.get<PokemonPage>("/api/pokemon/filter", {
    params,
  });

  return response.data;
}
