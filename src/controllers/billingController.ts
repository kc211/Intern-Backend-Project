import { Request, Response } from "express";
import db from "../dbconfig/dbconfig";
import { formatDate } from "../middleware/jwtHelper";

export const getBill = async (req: Request, res: Response) => {
  const billingDetails = req.body;
  console.log(billingDetails);
  const email = billingDetails.email;
  const movie_id =billingDetails.movie_id;
  const theatre_name=billingDetails.theatre_name;
  const show_time=billingDetails.show_time;
  const date=formatDate(JSON.stringify(billingDetails.date));
  const seats = 
    await db("Billing_tickets").select("selectedSeats").where({ u_email: email,movie_id:movie_id,theatre_name:theatre_name,show_timing:show_time,date_:date });
  
  const Movie=await db("Movies").select("name","rating").where({id:movie_id});
  console.log(Movie)
  // console.log(seats[1].selectedSeats)
  return res.json({
    message: "This is a protected route",
    email: res.locals.u_email,
    seats: seats,
    Movie_details:Movie,
    date:date
  });
};
