import  express, {Express, Request, Response} from "express";
import bcrypt from "bcrypt";
import db from '../dbconfig/db.config';
import Login from '../controllers/LoginController';
const router =express.Router();

router.post("/login", Login);

export default router;