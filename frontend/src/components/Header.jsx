// /frontend/src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout as doLogout } from "../services/authService";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = getToken(); 
    setLogged(!!token);
  }, []);

  const logout = () => {
    doLogout();
    setLogged(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold text-yellow-400 tracking-wide">
          PLAY<span className="text-white">GOLD</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-white">
          <Link to="/" className="hover:text-yellow-400 transition">Início</Link>
          <Link to="/dashboard" className="hover:text-yellow-400 transition">Dashboard</Link>
          <Link to="/wallet" className="hover:text-yellow-400 transition">Carteira</Link>
          <Link to="/history" className="hover:text-yellow-400 transition">Histórico</Link>

          {!logged ? (
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 border border-yellow-500/40 rounded hover:bg-yellow-500 hover:text-black transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
              >
                Registrar
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600/80 text-white font-semibold rounded hover:bg-red-500 transition"
            >
              Sair
            </button>
          )}
        </nav>

        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-yellow-500/20">
          <nav className="flex flex-col px-6 py-4 text-white gap-4 text-lg">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Início</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Dashboard</Link>
            <Link to="/wallet" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Carteira</Link>
            <Link to="/history" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Histórico</Link>

            {!logged ? (
              <>
                <button
                  onClick={() => { setMenuOpen(false); navigate("/login"); }}
                  className="py-2 border border-yellow-500/40 rounded hover:bg-yellow-500 hover:text-black"
                >
                  Login
                </button>

                <button
                  onClick={() => { setMenuOpen(false); navigate("/register"); }}
                  className="py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                >
                  Registrar
                </button>
              </>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); logout(); }}
                className="py-2 bg-red-600/80 text-white font-semibold rounded hover:bg-red-500"
              >
                Sair
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
