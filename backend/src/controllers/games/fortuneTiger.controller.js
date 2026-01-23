import engineHibridaTiger from "../../engine/engineHibridaTiger.js";
import GameHistory from "../../models/GameHistory.js";

export async function playTiger(req, res) {
  try {
    const { cs, ml } = req.body;

    // valida aposta
    if (!cs || Number(cs) <= 0) {
      return res.status(400).json({ error: "Aposta inválida" });
    }

    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    // saldo ANTES (fallback seguro)
    const balanceBefore = Number(user.balance ?? 0);

    // roda o jogo (ENGINE HÍBRIDA EXPORTA DEFAULT)
    const result = await engineHibridaTiger(
      user,
      Number(cs),
      Number(ml ?? 1)
    );

    // valores para histórico
    const betAmount = Number(cs) * Number(ml ?? 1);

    // Fortune Tiger real retorna normalmente totalGain + tabela
    const winAmount = Number(
      result?.totalGain ??
      result?.winAmount ??
      result?.win ??
      0
    );

    const profitImpact = winAmount - betAmount;
    const balanceAfter = balanceBefore + profitImpact;

    // pattern é obrigatório no schema (Array). No Tiger real costuma vir como "tabela"
    const pattern = Array.isArray(result?.tabela)
      ? result.tabela
      : Array.isArray(result?.pattern)
        ? result.pattern
        : [];

    // salva histórico (campos conforme GameHistory.js)
    await GameHistory.create({
      userId: user._id,
      gameName: "fortune-tiger",
      betAmount,
      winAmount,
      balanceBefore,
      balanceAfter,
      pattern,
      profitImpact,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (err) {
    console.error("Erro no playTiger:", err);
    return res.status(500).json({
      error: "Erro interno ao jogar Tiger.",
    });
  }
}

export default { playTiger };
