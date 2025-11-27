import { Router } from "express";
import {
  register,
  login,
  deposit,
  withdraw,
  getHistory
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// ROTAS ABERTAS
router.post("/register", register);
router.post("/login", login);

// ROTAS PROTEGIDAS
router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.get("/history", auth, getHistory);

export default router;
