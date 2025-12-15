// /backend/src/routes/index.js
import { Router } from "express";
import authRoutes from "./user.routes.js";
import gamesRoutes from "./games.js";

const router = Router();

router.use("/users", authRoutes);
router.use("/games", gamesRoutes);

export default router;
