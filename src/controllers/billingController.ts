import { Request, Response } from "express";

export const getBill = async (req: Request, res: Response) => {
  return res.json({
    message: "This is a protected route",
    email: res.locals.u_email,
  });
};