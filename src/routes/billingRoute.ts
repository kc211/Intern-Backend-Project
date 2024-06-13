import express from "express";
import { verifyAccessToken } from "../middleware/jwtHelper";
import { getBill } from "../controllers/billingController";

const router = express.Router();

router.post("/billing/:id/:theatre_name/:show_time/seats/:date/", verifyAccessToken, getBill);

export default router;
