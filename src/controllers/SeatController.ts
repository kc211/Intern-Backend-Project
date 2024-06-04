import { Response,Request } from "express";
import db from "../dbconfig/dbconfig";

export const getSeats=async(req:Request,res:Response)=>
{
    const id = req.params.id;
    const Movie = await db("Movies").select('*').where({id});

    try{
        if(!Movie)
            {
                res.status(404).json("Movie not found");
            }
            return res.status(200).json(Movie[0]);
        }
        catch(err)
        {
            console.error("error", err);
            return res.status(500).json("Failed to fetch data")
        }

}