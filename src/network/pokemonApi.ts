import { Pokemon } from '@/models/pokemon'
import api from './axiosInstance'
import { PokemonPage } from '@/models/pokemonPage';

export async function getPokemon(name: string){
    const response = await api.get<Pokemon>("byName/" + name);
    return response.data
}

export async function getPokemonbyId(id: number){
    const response = await api.get<Pokemon>("byId/" + id);
    return response.data
}

export async function getPokemonPage(page: number){
    const response = await api.get<PokemonPage>((`/all?page=${(page - 1)}`));
    return response.data
}

export async function getAllPokemonNames(){
    const response = await api.get<string[]>('/allNames');
    const pokemonNames: string[] = response.data;
    return pokemonNames;
}

export async function getAllPokemonList(){
    const response = await api.get<Pokemon[]>('/allList');
    return response.data.length;
}

export async function combinedPokemonFilter(type: string, genus: string, height: number, weight: number, egg: string, ability: string, page: number){
    const response = await api.get<PokemonPage>(( `filter?type=${type}&genus=${genus}&height=${height}&weight=${weight}&eggGroup=${egg}&ability=${ability}&page=${(page - 1)}` ));
    return response.data
}