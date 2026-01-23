import { useState } from 'react';
import gameService from '../services/gameService';

export default function FortuneTiger() {
  const [bet, setBet] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handlePlay() {
    try {
      setLoading(true);
      setError(null);

      const response = await gameService.playFortuneTiger({
        bet,
        multiplier: 1
      });

      setResult(response.data);
    } catch (err) {
      setError('Erro ao executar o Fortune Tiger');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🐯 Fortune Tiger</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Aposta:</label>
        <input
          type="number"
          value={bet}
          min={1}
          onChange={e => setBet(Number(e.target.value))}
        />
        <button onClick={handlePlay} disabled={loading}>
          {loading ? 'Jogando...' : 'SPIN'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h3>Resultado</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
