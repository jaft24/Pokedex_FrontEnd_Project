import { Pokemon } from "@/models/pokemon";
import api, { axiosInstance2 } from "./axiosInstance";
import { PokemonPage } from "@/models/pokemonPage";
import axiosInstance from "./axiosInstance";


//This function could be called getPokemonByName() to be more explicit
export async function getPokemon(name: string) {
  const response = await api.get<Pokemon>("byName/" + name);
  return response.data;
}

export async function getPokemonbyId(id: number) {
  const response = await api.get<Pokemon>("byId/" + id);
  return response.data;
}

//From this line down to line 44, none of the functions are used in the app
export async function getPokemonPageReverseId(page: number) {
  const response = await api.get<PokemonPage>(`/allRev?page=${page - 1}`);
  return response.data;
}

export async function getPokemonPageAlphabet(page: number) {
  const response = await api.get<PokemonPage>(`/allByName?page=${page - 1}`);
  return response.data;
}

export async function getPokemonPageReverseAlphabet(page: number) {
  const response = await api.get<PokemonPage>(`/allByNameRev?page=${page - 1}`);
  return response.data;
}

export async function getAllPokemonNames() {
  const response = await api.get<string[]>("/allNames");
  const pokemonNames: string[] = response.data;
  return pokemonNames;
}

export async function getAllPokemonList() {
  const response = await api.get<Pokemon[]>("/allList");
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
  id?: string;
  name?: string;
  sort?: string;
  genus?: string;
  height?: number;
  weight?: number;
  type?: string;
  ability?: string;
  eggGroup?: string;
}) {
  const params: Record<string, string | number> = {};

  //As I'll highlight below, there is a much better way to deal with all of these query params
  params.page = page;
  if (id) params.id = id;
  if (name) params.name = name;
  if (sort) params.sort = sort;
  if (genus) params.genus = genus;
  if (height) params.height = height;
  if (weight) params.weight = weight;
  if (type) params.type = type;
  if (ability) params.ability = ability;
  if (eggGroup) params.eggGroup = eggGroup;

  const response = await axiosInstance2.get<PokemonPage>(
    "/api/pokemon/filter",
    { params }
  );

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
  //Rather than doing this all manually, axios.get() can take an object with the params
  // so you don't have to manually build up the query string

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

  //Additionally, if you are finding these requests are challenging to deal with
  // or are looking for some extra curricular stuff to try out, I would recoomend react query.
}
