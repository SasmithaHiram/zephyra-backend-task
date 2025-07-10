import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  protectedRoute,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/protected", authMiddleware, protectedRoute);

export default router;
