import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // 🔴 IMPORTANTE: padronização PlayGold
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
