import { Pokemon } from "@/models/pokemon";
import api from "./axiosInstance";
import axios from "axios";


export async function getLoginToken(username: string, password: string) {
  try {
        const response = await axios.post(
          "https://pokedex-backend-project.fly.dev:8083/realms/pokedexapi/protocol/openid-connect/token",
          {
            client_id: "trainer",
            username: username,
            password: password,
            grant_type: "password",
            client_secret: "sHXxsqaebT4jeGWlLqTHLs4EUqMG31R5",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const { access_token } = response.data;
        return access_token;
  } catch (error) {
        console.error("Login Token Generation Failed:", error);
      }
}

export async function getCapturedPokemonList(token: string) {
  const response = await api.get<Array<Pokemon>>("/api/capture/getAll", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
