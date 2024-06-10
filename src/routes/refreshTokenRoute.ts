import express from "express";
import { refreshToken } from "../controllers/refreshController";
import { verifyRefreshToken } from "../middleware/jwtHelper";

const router = express.Router();


export default router.post("/token",verifyRefreshToken,refreshToken);


