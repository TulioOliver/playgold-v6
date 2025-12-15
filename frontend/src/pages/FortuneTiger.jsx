import { useState } from "react";
import gameService from "../services/gameService";

export default function FortuneTiger() {
  const [bet, setBet] = useState(1);
  const [result, setResult] = useState(null);

  async function play() {
    try {
      const data = await gameService.playTiger(bet);
      setResult(data);
    } catch (err) {
      console.log("ERRO AO JOGAR TIGER", err);
    }
  }

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1>Fortune Tiger</h1>

      <div>
        <button onClick={() => setBet(Math.max(1, bet - 1))}>-</button>
        <span style={{ margin: "0 12px" }}>Aposta: {bet}</span>
        <button onClick={() => setBet(bet + 1)}>+</button>
      </div>

      <button onClick={play} style={{ padding: 12, marginTop: 20 }}>
        GIRAR
      </button>

      {result && (
        <pre style={{ marginTop: 30, background: "#222", padding: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
