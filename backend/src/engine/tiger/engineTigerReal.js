import gerarSpinOriginal from './fortunetiger.js';

/**
 * Adapter REAL — Fortune Tiger (PlayGold V6)
 * -----------------------------------------
 * NÃO cria lógica do jogo.
 * Apenas chama o gerador oficial preservado (fortunetiger.js).
 */

function normalizeRoundType(roundType) {
  const allowed = ['dead', 'mini', 'win', 'big', 'ultra'];
  if (!roundType) return 'dead';
  return allowed.includes(roundType) ? roundType : 'dead';
}

export async function executeSpin({ bet, multiplier = 1, roundType }) {
  const cs = Number(bet);
  const ml = Number(multiplier);

  if (!cs || cs <= 0) throw new Error('Aposta inválida (bet)');
  if (!ml || ml <= 0) throw new Error('Multiplicador inválido (multiplier)');

  const tipoRodada = normalizeRoundType(roundType);

  // gerarSpinOriginal é async
  return await gerarSpinOriginal(cs, ml, tipoRodada);
}

export default {
  executeSpin
};
