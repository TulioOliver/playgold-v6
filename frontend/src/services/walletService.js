// /frontend/src/services/walletService.js
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/users";

export async function getBalance() {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || "Erro ao obter saldo");

  return data.balance;
}

export async function deposit(amount) {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || "Erro ao depositar");

  return data.balance;
}

export async function withdraw(amount) {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");

  const response = await fetch(`${API_URL}/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.msg || "Erro ao sacar");

  return data.balance;
}
