import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8081/",
  timeout: 5000,
});

export const keycloakAxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8083/",
  timeout: 5000,
});

export default axiosInstance;
