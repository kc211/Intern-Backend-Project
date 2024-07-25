import express from "express";
import { getMovieandTheatre } from "../controllers/MovieController";

const router = express.Router();

 export default router.get("/shows/:id/:date",getMovieandTheatre);
