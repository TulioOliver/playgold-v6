export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      
      <h1 className="text-3xl font-bold text-yellow-400">
        Olá, {user.name || "Jogador"}
      </h1>

      <p className="text-zinc-400 mt-2">
        Bem-vindo ao seu painel exclusivo do PlayGold.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="bg-zinc-900/70 border border-yellow-500/20 p-6 rounded-xl">
          <h3 className="text-yellow-400 font-semibold">Saldo</h3>
          <p className="text-2xl font-bold mt-2">R$ 0,00</p>
        </div>

        <div className="bg-zinc-900/70 border border-yellow-500/20 p-6 rounded-xl">
          <h3 className="text-yellow-400 font-semibold">Apostas Hoje</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>

        <div className="bg-zinc-900/70 border border-yellow-500/20 p-6 rounded-xl">
          <h3 className="text-yellow-400 font-semibold">Bônus Ativos</h3>
          <p className="text-2xl font-bold mt-2">Nenhum</p>
        </div>

      </div>
    </div>
  );
}
