import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://pokedex-backend-project.fly.dev",
  timeout: 7000,
});

export default axiosInstance;
