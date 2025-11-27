import PromoSection from "../components/PromoSection";
import GamesSection from "../components/GamesSection";

export default function Home() {
  return (
    <div className="text-white">
      <section className="w-full bg-gradient-to-b from-black to-yellow-900 py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-[0_0_15px_gold]">
          Bem-vindo à PlayGold
        </h1>
        <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
          O cassino online mais elegante e sofisticado do Brasil.
        </p>

        <a
          href="/register"
          className="inline-block mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-[0_0_20px_gold]"
        >
          Criar Conta Agora
        </a>
      </section>

      <PromoSection />
      <GamesSection />
    </div>
  );
}

