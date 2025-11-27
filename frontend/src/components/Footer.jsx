export default function Footer() {
  return (
    <footer className="py-10 text-center bg-black border-t border-yellow-800 text-gray-400">
      <p className="text-yellow-400 font-bold text-lg">
        © {new Date().getFullYear()} PlayGold — Todos os direitos reservados
      </p>
    </footer>
  );
}


