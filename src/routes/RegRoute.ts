import express,{ Express,Response,Request } from "express";
import Register from "../controllers/RegController";

const router = express.Router();

router.post("/register",Register);

export default router;