import express from "express";
import { verifyAccessToken } from "../middleware/jwtHelper";
import { getBill } from "../controllers/billingController";

const router = express.Router();

router.get("/billing/:id", verifyAccessToken, getBill);

export default router;
