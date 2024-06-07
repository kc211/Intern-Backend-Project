import express from "express";
import { getmovies } from "../controllers/HomeController";
const router = express.Router();

router.get("/", getmovies);

export default router;
