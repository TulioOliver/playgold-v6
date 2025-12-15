// ======================================================================
//  SERVICE — http.js (PlayGold V6)
//  Configuração global do Axios para comunicação com o backend
// ======================================================================

import axios from "axios";

// ==========================================================
// BASE URL DO BACKEND
// Ajuste conforme o ambiente (local, produção, etc.)
// ==========================================================

const api = axios.create({
    baseURL: "http://localhost:5000/api", // ajuste se necessário
});

// ==========================================================
// INTERCEPTOR — Envia o token JWT automaticamente
// ==========================================================

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

// ==========================================================
// INTERCEPTOR — Tratamento global de erros
// ==========================================================

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("ERRO NA API:", error.response?.data || error);
        return Promise.reject(error);
    }
);

export default api;