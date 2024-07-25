import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> => {
  return res;
};
