import express, { Express, Request, Response } from "express";
import { getMovie } from "../controllers/MovieController";
const router = express.Router();

 export default router.get("/shows/:id",getMovie);
