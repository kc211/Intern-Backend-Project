import { Request,Response } from "express";
import db from "../dbconfig/dbconfig";

 export const getMovieandTheatre= async (req: Request, res: Response) => {
    const { id } = req.params;
    const Movie = await db("Movies").select("*").where({id}).first();
    const Theatre = await db("Theatres as t2").innerJoin("movie_theatre as t1","t2.id","t1.theatre_id")
                    .select("t2.*")
                    .where("t1.movie_id",id);
    const Timings=await db("Timings").select("*");
    console.log(Theatre);
    try{
  
        if(!Movie)
          {
              return res.status(404).json({message:"Movie Not Found"});
          }
          return res.json({Movie,Theatre,Timings});
      }
      catch(err)
      {
          console.error("error :",err);
         return res.status(500).json({message:"Failed to fetch movie."});
      }
  
  }