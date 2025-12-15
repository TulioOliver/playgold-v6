// /frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";

// IMPORTAR AS PÁGINAS DO CASSINO
import Casino from "./pages/Casino";
import FortuneTiger from "./pages/FortuneTiger";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        
        {/* Página inicial */}
        <Route index element={<Home />} />

        {/* Acesso público */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Dashboard protegida */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Carteira protegida */}
        <Route
          path="wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />

        {/* Histórico protegido */}
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* ================================
            ROTAS DO CASSINO (NOVAS)
           ================================ */}

        {/* Hub de jogos — protegido */}
        <Route
          path="casino"
          element={
            <ProtectedRoute>
              <Casino />
            </ProtectedRoute>
          }
        />

        {/* Fortune Tiger — protegido */}
        <Route
          path="fortune-tiger"
          element={
            <ProtectedRoute>
              <FortuneTiger />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}
