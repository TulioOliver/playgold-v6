// /frontend/src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuroraGold from "../features/AuroraGold/AuroraGold";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AuroraGold />
    </div>
  );
}
