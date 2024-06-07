import express from "express";
import Register from "../controllers/RegController";

const router = express.Router();

router.post("/register", Register);

export default router;
