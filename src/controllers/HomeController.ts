import db from '../dbconfig/dbconfig'
import { Request,Response } from 'express';

export interface Movie{
    id:number,
    title:string,
    description:string,
    genre:string,
    rating:string,
    release_date:Date,
    src:string
}

const MovieModel = {
    async getAllMovies(): Promise<Movie[]> {
        return await db("Movies").select("*");
    }
};

export const getAllmovies = async (req: Request, res: Response) => {
    try {
        const movies = await MovieModel.getAllMovies();
        console.log(movies);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};