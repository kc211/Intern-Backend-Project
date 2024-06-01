import { Request,Response } from "express";
import db from "../dbconfig/dbconfig";

 export const getMovie= async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await db("Movies").select("*").where({id});
    console.log(data);
    try{
  
        if(data.length===0)
          {
              return res.status(404).json({message:"Movie Not Found"});
          }
          return res.json(data[0]);
      }
      catch(err)
      {
          console.error("error :",err);
         return res.status(500).json({message:"Failed to fetch movie."});
      }
  
  }