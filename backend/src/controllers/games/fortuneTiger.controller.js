import engineHibridaTiger from "../../engine/engineHibridaTiger.js";
import User from "../../models/User.js";
import GameHistory from "../../models/GameHistory.js";

// ===========================================================
// CONTROLLER OFICIAL DO FORTUNE TIGER REAL
// ===========================================================

export const playTiger = async (req, res) => {
  try {
    const userId = req.userId;
    const { cs, ml } = req.body; // cs = aposta base | ml = multiplicador

    if (!cs || !ml) {
      return res.status(400).json({ error: "Aposta inválida." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "Usuário não encontrado." });

    const apostaFinal = cs * ml * 5; // regra do Tiger real

    if (user.balance < apostaFinal) {
      return res.status(400).json({ error: "Saldo insuficiente." });
    }

    // DESCONTAR APOSTA
    user.balance -= apostaFinal;
    await user.save();

    // GERAR O RESULTADO (Tiger Real + Banca PlayGold)
    const resultado = await engineHibridaTiger(user, cs, ml);

    const ganho = resultado.totalGain || 0;

    // PAGAR GANHO (se houver)
    if (ganho > 0) {
      user.balance += ganho;
      await user.save();
    }

    // SALVAR NO HISTÓRICO
    await GameHistory.create({
      userId,
      game: "fortune-tiger",
      bet: apostaFinal,
      win: ganho,
      type: resultado.tipo,
      result: JSON.stringify(resultado)
    });

    return res.json({
      status: "ok",
      tipo: resultado.tipo,
      aposta: apostaFinal,
      ganho: ganho,
      saldo: user.balance,
      result: resultado
    });

  } catch (err) {
    console.error("Erro no playTiger:", err);
    return res.status(500).json({ error: "Erro interno ao jogar Tiger." });
  }
};



// ===========================================================
// GET TIGER (CARREGAR ESTADO INICIAL DO JOGO)
// ===========================================================

export const getTiger = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "Usuário não encontrado." });

    return res.json({
      status: "ok",
      saldo: user.balance
    });

  } catch (err) {
    console.error("Erro no getTiger:", err);
    return res.status(500).json({ error: "Erro interno ao carregar Tiger." });
  }
};
