const API_URL = "http://localhost:5000/api/users";


export function saveToken(token) {
  localStorage.setItem("playgold_token", token);
}

export function getToken() {
  return localStorage.getItem("playgold_token");
}

export function logout() {
  localStorage.removeItem("playgold_token");
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.msg || "Erro ao fazer login");

  saveToken(data.token);
  return data.user;
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.msg || "Erro ao registrar");

  saveToken(data.token);
  return data.user;
}
