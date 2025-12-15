// ======================================================================
//  PAGE — Casino.jsx (PlayGold V6)
//  Hub central de jogos do cassino
// ======================================================================

import { Link } from "react-router-dom";

export default function Casino() {
    return (
        <div className="flex flex-col items-center p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Cassino PlayGold</h1>
            <p className="mb-6 text-lg opacity-80">Escolha um jogo para começar</p>

            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                <Link to="/fortune-tiger">
                    <button className="w-full bg-yellow-500 text-black font-bold py-4 rounded-lg text-xl">
                        Fortune Tiger
                    </button>
                </Link>

                {/* Exemplos de futuros jogos */}
                <button className="w-full bg-gray-700 text-white py-4 rounded-lg text-xl opacity-50 cursor-not-allowed">
                    Fortune Ox (em breve)
                </button>
                <button className="w-full bg-gray-700 text-white py-4 rounded-lg text-xl opacity-50 cursor-not-allowed">
                    Mines (em breve)
                </button>
            </div>
        </div>
    );
}
