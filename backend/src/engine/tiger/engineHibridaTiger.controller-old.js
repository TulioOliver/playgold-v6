import engineTigerReal from './tiger/engineTigerReal.js';
import controleDeBanca from './controleDeBanca.js';

/**
 * Engine Híbrida — Fortune Tiger
 * ----------------------------------
 * Decide o tipo de rodada (dead / mini / win / big / ultra)
 * e executa o spin REAL via engineTigerReal.
 * O controle de banca atua ANTES da execução,
 * decidindo o timing da rodada, não o resultado.
 */

export async function playFortuneTiger(req, res) {
  try {
    const { bet, multiplier, userId } = req.body;

    // 1️⃣ Controle de banca decide tipo da rodada
    const roundType = await controleDeBanca.decidirRodada({
      userId,
      bet,
      game: 'fortune-tiger'
    });

    // 2️⃣ Executa spin REAL conforme JSON do jogo
    const result = engineTigerReal.executeSpin({
      bet,
      multiplier,
      roundType
    });

    // 3️⃣ Atualiza histórico (mock — integração real no controller)
    const gameResult = {
      userId,
      game: 'fortune-tiger',
      roundType,
      bet,
      result
    };

    // 4️⃣ Retorna resposta oficial
    return res.status(200).json({
      success: true,
      data: gameResult
    });
  } catch (error) {
    console.error('Erro na engine híbrida:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno na engine híbrida Fortune Tiger'
    });
  }
}

export default {
  playFortuneTiger
};
