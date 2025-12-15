// ======================================================================
//  AUTH MIDDLEWARE — PlayGold V6
//  Protege rotas que exigem usuário autenticado
// ======================================================================

const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "Usuário inválido" });
        }

        req.user = { id: user._id };
        next();

    } catch (err) {
        console.error("ERRO NO AUTH MIDDLEWARE:", err);
        return res.status(401).json({ error: "Falha na autenticação" });
    }
};
