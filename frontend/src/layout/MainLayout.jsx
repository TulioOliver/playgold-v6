// src/layout/MainLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuroraGold from "../features/AuroraGold/AuroraGold";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AuroraGold />
    </div>
  );
}
