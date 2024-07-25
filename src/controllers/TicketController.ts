import { Request, Response } from "express";
import db from "../dbconfig/dbconfig";
import { formatDate } from "../middleware/jwtHelper";
export const postSeats = async (req: Request, res: Response) => {
  const ticketDetails = req.body;
  
  const formattedDate = formatDate(JSON.stringify(ticketDetails.date));
  try {
    await db("Billing_tickets").insert({
      u_email: ticketDetails.user_email,
      movie_id: ticketDetails.movieId,
      selectedSeats: ticketDetails.selectedSeats.join(","),
      theatre_name: ticketDetails.theatre_name,
      show_timing: ticketDetails.show_time,
      date_: formattedDate,
    });
  } catch (err) {
    console.log("error occured", err);
  }
  return res.status(200).json({ success: true, ticketDetails: ticketDetails });
};
