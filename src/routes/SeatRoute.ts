import express from "express";
import { getSeats } from "../controllers/SeatController";
import { postSeats } from "../controllers/TicketController";

const router = express.Router();

router.get("/shows/:id/:theatre_name/:timing/seats/:date/", getSeats);
router.post("/shows/:id/:theatre_name/:timing/seats/:date/", postSeats);

export default router;