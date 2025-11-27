export default function Header() {
  return (
    <header className="w-full bg-black border-b border-yellow-700 px-6 py-5 flex items-center justify-between shadow-[0_0_18px_gold]">
      <a href="/" className="text-yellow-400 text-2xl font-extrabold">PlayGold</a>

      <nav className="hidden md:flex items-center gap-8">
        <a href="/" className="text-yellow-400 font-semibold hover:text-yellow-500">Home</a>
        <a href="/dashboard" className="text-yellow-400 font-semibold hover:text-yellow-500">Dashboard</a>
        <a href="/wallet" className="text-yellow-400 font-semibold hover:text-yellow-500">Carteira</a>
        <a href="/history" className="text-yellow-400 font-semibold hover:text-yellow-500">Histórico</a>
      </nav>

      <div className="flex items-center gap-4">
        <a href="/login" className="text-yellow-300 border border-yellow-300 py-2 px-4 rounded-md hover:bg-yellow-400 hover:text-black">Entrar</a>
        <a href="/register" className="bg-yellow-500 text-black py-2 px-4 rounded-md font-bold hover:bg-yellow-400">Criar Conta</a>
      </div>
    </header>
  );
}
