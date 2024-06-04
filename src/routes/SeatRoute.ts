import express from "express";
import { getSeats } from "../controllers/SeatController";

const router=express.Router();

 export default router.get("/shows/seats/:id",getSeats);