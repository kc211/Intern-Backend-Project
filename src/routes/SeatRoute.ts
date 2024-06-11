import express from "express";
import { getSeats } from "../controllers/SeatController";

const router = express.Router();

export default router.get("/shows/:id/:theatre_name/:timing/seats/:date/", getSeats);
