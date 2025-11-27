import { useEffect, useState } from "react";
import { fetchUser } from "../services/userService";
import { getToken } from "../services/authService";
import { deposit, withdraw } from "../services/walletService";

export default function Wallet() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    loadUser();
  }, []);

  async function handleDeposit() {
    try {
      const value = parseFloat(amount);

      if (!value || value <= 0) {
        setMessage("Valor inválido");
        return;
      }

      const newBalance = await deposit(value);
      setUser((prev) => ({ ...prev, balance: newBalance }));

      setMessage("Depósito realizado!");
      setAmount("");
      setShowDeposit(false);
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function handleWithdraw() {
    try {
      const value = parseFloat(amount);

      if (!value || value <= 0) {
        setMessage("Valor inválido");
        return;
      }

      const newBalance = await withdraw(value);
      setUser((prev) => ({ ...prev, balance: newBalance }));

      setMessage("Saque realizado!");
      setAmount("");
      setShowWithdraw(false);
    } catch (err) {
      setMessage(err.message);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex justify-center items-center text-2xl">
        Carregando carteira...
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
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">Carteira</h1>

      {message && (
        <p className="text-center mb-4 text-yellow-400 font-bold">{message}</p>
      )}

      <div className="bg-zinc-900 border border-yellow-700 rounded-xl p-6 shadow-[0_0_20px_gold]">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Saldo Atual</h2>

        <p className="text-4xl text-yellow-400 font-bold mt-2">
          R$ {user?.balance?.toFixed(2)}
        </p>

        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => setShowDeposit(true)}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400"
          >
            Depositar
          </button>

          <button
            onClick={() => setShowWithdraw(true)}
            className="bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500"
          >
            Sacar
          </button>
        </div>
      </div>

      {/* MODAL DEPÓSITO */}
      {showDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-zinc-900 p-8 rounded-xl shadow-xl border border-yellow-700 w-96 text-center">
            <h2 className="text-2xl text-yellow-400 font-bold mb-4">Depositar</h2>

            <input
              type="number"
              className="w-full p-3 bg-black border border-yellow-700 text-white rounded mb-4"
              placeholder="Valor"
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleDeposit}
                className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
              >
                Confirmar
              </button>

              <button
                onClick={() => setShowDeposit(false)}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SAQUE */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-zinc-900 p-8 rounded-xl shadow-xl border border-yellow-700 w-96 text-center">
            <h2 className="text-2xl text-yellow-400 font-bold mb-4">Sacar</h2>

            <input
              type="number"
              className="w-full p-3 bg-black border border-yellow-700 text-white rounded mb-4"
              placeholder="Valor"
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleWithdraw}
                className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
              >
                Confirmar
              </button>

              <button
                onClick={() => setShowWithdraw(false)}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
