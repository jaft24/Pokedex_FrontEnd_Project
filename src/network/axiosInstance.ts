import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokedex-backend-project.fly.dev",
  timeout: 7000,
});

export default axiosInstance;
