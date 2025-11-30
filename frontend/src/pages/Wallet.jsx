export default function Wallet() {
  return (
    <div className="p-6 max-w-6xl mx-auto text-white">

      <h1 className="text-3xl font-bold text-yellow-400">
        Carteira
      </h1>

      <p className="text-zinc-400 mt-2">
        Gerencie seus depósitos, saques e saldo geral.
      </p>

      <div className="mt-10 bg-zinc-900/60 p-6 rounded-xl border border-yellow-500/20">
        <h3 className="text-yellow-400 font-semibold text-xl mb-4">
          Saldo Atual
        </h3>

        <p className="text-3xl font-bold">R$ 0,00</p>
      </div>

    </div>
  );
}
