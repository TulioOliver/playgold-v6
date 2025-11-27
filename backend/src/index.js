import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("PlayGold API funcionando!");
});

// Banco de dados
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado.");
    app.listen(process.env.PORT, () => {
      console.log("Servidor rodando na porta " + process.env.PORT);
    });
  })
  .catch((err) => console.error("Erro ao conectar:", err));


-----------------------------------------------------------------------
(Agora crie as pastas:)

controllers/
routes/
models/
middleware/
config/

