import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import History from "../models/History.js";

// === REGISTRO ===
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Usuário já existe" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Erro interno", error: err.message });
  }
};

// === LOGIN ===
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Senha inválida" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Erro interno", error: err.message });
  }
};

// === DEPÓSITO ===
export const deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ msg: "Valor inválido" });

    const user = await User.findById(req.user.id);

    user.balance += amount;
    await user.save();

    // Registrar histórico
    await History.create({
      userId: user._id,
      type: "deposit",
      amount,
      balanceAfter: user.balance,
    });

    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: "Erro interno", error: err.message });
  }
};

// === SAQUE ===
export const withdraw = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ msg: "Valor inválido" });

    const user = await User.findById(req.user.id);

    if (user.balance < amount)
      return res.status(400).json({ msg: "Saldo insuficiente" });

    user.balance -= amount;
    await user.save();

    // Registrar histórico
    await History.create({
      userId: user._id,
      type: "withdraw",
      amount,
      balanceAfter: user.balance,
    });

    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: "Erro interno", error: err.message });
  }
};

// === LISTAR HISTÓRICO ===
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await History.find({ userId }).sort({ createdAt: -1 });

    res.json({ history });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao carregar histórico", error: err.message });
  }
};
