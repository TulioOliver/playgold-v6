import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ENVIA O TOKEN DO JEITO EXATO QUE O BACKEND ESPERA
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
