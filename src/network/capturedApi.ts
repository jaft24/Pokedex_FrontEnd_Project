import { Pokemon } from "@/models/pokemon";
import api from "./axiosInstance";

export async function getCapturedPokemonList() {
  const token = "";
  const response = await api.get<Array<Pokemon>>("/api/capture/getAll", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
