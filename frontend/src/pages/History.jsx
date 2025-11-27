import { useEffect, useState } from "react";
import { getToken } from "../services/authService";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const token = getToken();
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          "https://api.playgold.bet/api/users/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.msg || "Erro ao carregar histórico");

        setHistory(data.history || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex justify-center items-center text-2xl">
        Carregando histórico...
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
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Histórico</h1>

      <div className="bg-zinc-900 border border-yellow-700 rounded-xl p-6 shadow-[0_0_20px_gold]">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Suas transações</h2>

        {history.length === 0 ? (
          <p className="text-gray-400">Nenhuma transação encontrada.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {history.map((item, index) => (
              <li
                key={index}
                className="bg-black border border-yellow-700 p-4 rounded-lg text-gray-300 flex justify-between"
              >
                <span>{item.type}</span>
                <span className="text-yellow-400 font-bold">
                  R$ {item.amount.toFixed(2)}
                </span>
                <span>
                  {new Date(item.createdAt).toLocaleString("pt-BR")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
