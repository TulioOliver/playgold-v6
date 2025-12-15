const API_URL = "http://localhost:5000/api/users";

// SALVA TOKEN PADRÃO DO SISTEMA
export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.message || "Erro ao fazer login");

  // AQUI SALVA O TOKEN CORRETO
  saveToken(data.token);

  // RETORNA TUDO (token + user)
  return data;
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.message || "Erro ao registrar");

  // SALVA O TOKEN AO REGISTRAR
  saveToken(data.token);

  return data;
}
