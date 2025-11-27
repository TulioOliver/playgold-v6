import { useEffect, useState } from "react";
import { fetchUser } from "../services/userService";
import { getToken } from "../services/authService";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = getToken();
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const data = await fetchUser();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex justify-center items-center text-2xl">
        Carregando...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-black text-red-500 flex justify-center items-center text-2xl">
        Erro: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        Dashboard
      </h1>

      <div className="bg-zinc-900 border border-yellow-700 p-6 rounded-xl shadow-[0_0_20px_gold]">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">
          Sua conta
        </h2>

        <p className="text-gray-300 text-lg">
          Olá,{" "}
          <span className="text-yellow-400 font-bold">{user?.name}</span>
        </p>

        <p className="text-gray-300 mt-4">Saldo:</p>
        <p className="text-4xl text-yellow-400 font-bold mt-2">
          R$ {user?.balance?.toFixed(2)}
        </p>

        <div className="flex gap-4 mt-6">
          <a
            href="/wallet"
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400"
          >
            Depositar
          </a>

          <a
            href="/wallet"
            className="bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500"
          >
            Sacar
          </a>
        </div>
      </div>
    </div>
  );
}
