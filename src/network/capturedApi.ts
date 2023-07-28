import { Pokemon } from "@/models/pokemon";
import api from "./axiosInstance";

export async function getLoginToken(username: string, password: string) {
  const response = await api.post("/api/auth/token", {
    username,
    password,
  });
  const { access_token } = response.data;
  return access_token;
}

export async function getCapturedPokemonList(token: string) {
  const response = await api.get<Array<Pokemon>>("/api/capture/getAll", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
