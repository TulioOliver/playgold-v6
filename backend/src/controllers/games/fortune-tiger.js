// /backend/src/controllers/games/fortune-tiger.js
import User from "../../models/User.js";
import GameHistory from "../../models/GameHistory.js";
import { getRoundType, updatePlayerWinCooldown } from "../../engine/bancaEngine.js";
import { generateSpin } from "../../engine/tigerEngine.js";

export default async function playTiger(req, res) {
  try {
    const userId = req.user.id;
    const { bet } = req.body;

    if (!bet || bet <= 0)
      return res.status(400).json({ error: "Aposta inválida" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    if (!user.balance || user.balance < bet)
      return res.status(400).json({ error: "Saldo insuficiente" });

    const balanceBefore = user.balance;

    const round = getRoundType({
      user,
      totalApostadoHoje: 0,
      totalPagoHoje: 0,
    });

    const spin = generateSpin(round.type, bet);

    user.balance = Number(user.balance - bet + spin.winAmount);
    await user.save();

    updatePlayerWinCooldown(user, round.type);

    await GameHistory.create({
      userId,
      gameName: "fortune-tiger",
      betAmount: bet,
      winAmount: spin.winAmount,
      balanceBefore,
      balanceAfter: user.balance,
      pattern: spin.pattern,
      profitImpact: bet - spin.winAmount,
      timestamp: new Date(),
    });

    return res.json({
      type: spin.type,
      multiplier: spin.multiplier,
      winAmount: spin.winAmount,
      pattern: spin.pattern,
      balanceAfter: user.balance,
    });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno" });
  }
}
