import { Pokemon } from "@/models/pokemon";
import api from "./axiosInstance";
import { PokemonPage } from "@/models/pokemonPage";
import axiosInstance from "./axiosInstance";

export async function getPokemon(name: string) {
  const response = await api.get<Pokemon>("/api/pokemon/byName/" + name);
  return response.data;
}

export async function getPokemonbyId(id: number) {
  const response = await api.get<Pokemon>("/api/pokemon/byId/" + id);
  return response.data;
}

export async function getPokemonPageReverseId(page: number) {
  const response = await api.get<PokemonPage>(
    `/api/pokemon/allRev?page=${page - 1}`
  );
  return response.data;
}

export async function getPokemonPageAlphabet(page: number) {
  const response = await api.get<PokemonPage>(
    `/api/pokemon/allByName?page=${page - 1}`
  );
  return response.data;
}

export async function getPokemonPageReverseAlphabet(page: number) {
  const response = await api.get<PokemonPage>(
    `/api/pokemon/allByNameRev?page=${page - 1}`
  );
  return response.data;
}

export async function getAllPokemonNames() {
  const response = await api.get<string[]>("/api/pokemon//allNames");
  const pokemonNames: string[] = response.data;
  return pokemonNames;
}

export async function getAllPokemonList() {
  const response = await api.get<Pokemon[]>("/api/pokemon/allList");
  return response.data.length;
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
  // const params: Record<string, string | number> = {};
  // params.page = page;
  // params.id = id;
  // params.name = name;
  // params.sort = sort;
  // params.genus = genus;
  // params.height = height;
  // params.weight = weight;
  // params.type = type;
  // params.ability = ability;
  // params.eggGroup = eggGroup;

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

export async function getPokemonPage({
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
}: {
  page: number;
  id?: number;
  name?: string;
  sort?: string;
  genus?: string;
  height?: number;
  weight?: number;
  type?: string;
  ability?: string;
  eggGroup?: string;
}) {
  let url: string = `/filter?page=${page - 1}`;
  if (id) url = url + `&id=${id}`;
  if (name) url = url + `&name=${name}`;
  if (sort) url = url + `&sort=${sort}`;
  if (genus) url = url + `&genus=${genus}`;
  if (height) url = url + `&height=${height}`;
  if (weight) url = url + `&weight=${weight}`;
  if (type) url = url + `&type=${type}`;
  if (ability) url = url + `&ability=${ability}`;
  if (eggGroup) url = url + `&eggGroup=${eggGroup}`;

  const response = await axiosInstance.get<PokemonPage>(url);
  return response.data;
}

export async function getCapturedPokemonList() {
  const token = "";
  const response = await api.get<Array<Pokemon>>("/api/capture/getAll", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
