import { Pokemon } from "@/models/pokemon";
import api from "./axiosInstance";
import axios from "axios";


export async function getLoginToken(username: string, password: string) {
  const secret = process.env.NEXT_PUBLIC_KEYCLOAK_TRAINER_SECRET
  const keycloakAxiosInstance = axios.create({
    baseURL: "https://usw2.auth.ac",
    timeout: 30000,
  });
  try {
        const response = await keycloakAxiosInstance.post("/auth/realms/pokedex-realm/protocol/openid-connect/token", {
            client_id: "trainer",
            username: username,
            password: password,
            grant_type: "password",
            client_secret: secret,
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
