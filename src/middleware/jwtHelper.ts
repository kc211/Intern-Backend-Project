// middleware/auth.js
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET_KEY: string =
  process.env.ACCESS_TOKEN_SECRET_KEY ?? "";
const REFRESH_TOKEN_SECRET_KEY: string =
  process.env.REFRESH_TOKEN_SECRET_KEY ?? "";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token: string | undefined = req.headers["authorization"];
console.log("verifying the protected route");
  if (!token) {
    return res.status(401).json({
      error: {
        code: 401.0,
        message: "Request missing Authorization Data",
      },
    });
  }

  jwt.verify(
    token.split(" ")[1],
    ACCESS_TOKEN_SECRET_KEY,
    (err, decoded): Response | void => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          error: {
            code: 401.01,
            message: "Token expired or invalid",
          },
        });
      }
      if (!decoded || typeof decoded !== "object" || !("email" in decoded)) {
        return res.status(401).json({
          error: {
            code: 401.02,
            message: "Invalid Payload",
          },
        });
      }
      res.locals.u_email = decoded.email;
      next();
    }
  );
};

export const generateAccessToken = (payload: object) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1m",
  });
  return accessToken;
};

export const generateRefreshToken = async (payload: object) => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
  return refreshToken;
};

export const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  const { refreshToken } = req.body;
  console.log("verifying refresh token");
  console.log(refreshToken);
  if (!refreshToken) return res.status(401).json("unauthorised mannnnn");
  jwt.verify(
    refreshToken,  
    REFRESH_TOKEN_SECRET_KEY,
    (err:any, decoded:any): Response | void => {
      console.log(decoded);
      const payLoad=
      {
       email: decoded.email
      }
      console.log(payLoad);
      if (err) return res.status(403).json({ "error:": err });
      const newAccessToken = generateAccessToken(payLoad);
      return res.json({
        accessToken: newAccessToken,
      });
    });
  next();
};

export const formatDate = (dateStr: string) => {
  console.log("in formatdate function",dateStr);
  if (typeof dateStr !== "string") {
      throw new Error("Invalid date format");
    }
  const year: string = dateStr.substring(1,5);
  if (dateStr.length === 9) {
    const month: string = dateStr.substring(5, 6);
    const date_: string = dateStr.substring(6,8);
    return `${year}-0${month}-${date_}`;
  }
  const month: string = dateStr.substring(5, 7);
  const date_: string = dateStr.substring(7, 9);

  console.log(`${year}-${month}-${date_}`);
  return `${year}-${month}-${date_}`;
};
