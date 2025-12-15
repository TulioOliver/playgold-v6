// /backend/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user.routes.js";
import gamesRoutes from "./routes/games.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ROTAS
app.use("/api/users", userRoutes);
app.use("/api/games", gamesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API PlayGold V6 funcionando." });
});

// MONGO
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB conectado com sucesso."))
  .catch(() => console.log("Erro ao conectar no MongoDB."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
