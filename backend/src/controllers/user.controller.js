import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import GameHistory from "../models/GameHistory.js";

// =============================================================
// REGISTER
// =============================================================
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "E-mail já registrado." });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      balance: 0,
    });

    return res.json({
      message: "Conta criada com sucesso!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao registrar usuário." });
  }
}

// =============================================================
// LOGIN
// =============================================================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "E-mail ou senha incorretos." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "E-mail ou senha incorretos." });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno no login." });
  }
}

// =============================================================
// GET BALANCE  (FUNÇÃO QUE ESTAVA FALTANDO)
// =============================================================
export async function getBalance(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.json({ balance: user.balance });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar saldo." });
  }
}

// =============================================================
// PROFILE
// =============================================================
export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar perfil." });
  }
}

// =============================================================
// HISTORY
// =============================================================
export async function getUserHistory(req, res) {
  try {
    const history = await GameHistory.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json(history);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar histórico." });
  }
}

// =============================================================
// DEPOSIT
// =============================================================
export async function deposit(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Valor inválido." });

    const user = await User.findById(req.user.id);
    user.balance += amount;
    await user.save();

    return res.json({
      message: "Depósito realizado com sucesso",
      balance: user.balance,
    });

  } catch (err) {
    return res.status(500).json({ message: "Erro ao depositar." });
  }
}

// =============================================================
// WITHDRAW
// =============================================================
export async function withdraw(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Valor inválido." });

    const user = await User.findById(req.user.id);

    if (user.balance < amount)
      return res.status(400).json({ message: "Saldo insuficiente." });

    user.balance -= amount;
    await user.save();

    return res.json({
      message: "Saque realizado com sucesso",
      balance: user.balance,
    });

  } catch (err) {
    return res.status(500).json({ message: "Erro ao sacar." });
  }
}
