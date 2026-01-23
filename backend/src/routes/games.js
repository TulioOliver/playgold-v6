import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { playTiger } from "../controllers/games/fortuneTiger.controller.js";


const router = express.Router();

// Fortune Tiger REAL
router.post("/fortune-tiger/play", authMiddleware, playTiger);

export default router;
