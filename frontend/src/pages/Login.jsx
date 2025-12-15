import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(email, password);

      // TOKEN CORRETO DO BACKEND
      const token = res?.token;

      if (!token) {
        setError("Erro ao obter token.");
        return;
      }

      // SALVA O TOKEN (FUNCIONAL)
      localStorage.setItem("token", token);

      window.location.href = "/dashboard";

    } catch {
      setError("Credenciais inválidas.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black py-20">
      <div className="bg-zinc-900 p-10 rounded-xl shadow-[0_0_25px_gold] border border-yellow-700 w-96 text-center">

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Entrar</h2>

        {error && (
          <p className="text-red-500 mb-4 font-bold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="bg-black border border-yellow-700 p-3 rounded-lg text-white"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="bg-black border border-yellow-700 p-3 rounded-lg text-white"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold shadow-[0_0_15px_gold]"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-5">
          Não tem conta?{" "}
          <a href="/register" className="text-yellow-400 underline">
            Criar agora
          </a>
        </p>

      </div>
    </div>
  );
}
