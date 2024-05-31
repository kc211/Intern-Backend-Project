import  express, {Express, Request, Response} from "express";
import Login from '../controllers/LoginController';
const router =express.Router();

router.post("/login", Login);

export default router;