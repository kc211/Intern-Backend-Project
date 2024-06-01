import express,{Express, Request, Response} from 'express';
import { getAllmovies } from "../controllers/HomeController";

const router = express.Router();


router.get("/", getAllmovies);

export default router;