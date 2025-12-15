import { Router } from "express";
import { auth } from "../middleware/auth.js";

import {
  register,
  login,
  getUserProfile,
  getUserHistory,
  deposit,
  withdraw,
  getBalance,
} from "../controllers/user.controller.js";

const router = Router();

// ROTAS PÚBLICAS
router.post("/register", register);
router.post("/login", login);

// ROTAS PROTEGIDAS
router.get("/profile", auth, getUserProfile);
router.get("/balance", auth, getBalance);
router.get("/history", auth, getUserHistory);

router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);

export default router;
