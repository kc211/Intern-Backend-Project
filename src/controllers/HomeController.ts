import db from "../dbconfig/dbconfig";
import { Request, Response } from "express";

export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string;
  rating: string;
  release_date: Date;
  src: string;
}

const MovieModel = {
  async getAllMovies(): Promise<Movie[]> {
    const movieList = await db<Movie>("Movies").select("*");
    return movieList;
  },
};

export const getmovies = async (req: Request, res: Response) => {
  try {
    const movies = await MovieModel.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};
