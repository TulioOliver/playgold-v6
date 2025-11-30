// /frontend/src/services/userService.js
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/users";

export async function fetchUser() {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || "Erro ao carregar usuário");

  return data; // { user }
}

export async function fetchBalance() {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || "Erro ao carregar saldo");

  return data.balance;
}

export async function updateBalance(amount) {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/balance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || "Erro ao atualizar saldo");

  return data.balance;
}
