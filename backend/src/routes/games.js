import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  playTiger,
  getTiger
} from "../controllers/games/fortuneTiger.controller.js";

const router = Router();

// ======================================================
// ROTAS OFICIAIS DO FORTUNE TIGER REAL
// ======================================================

router.post("/fortune-tiger/play", auth, playTiger);
router.post("/fortune-tiger/get", auth, getTiger);

export default router;
