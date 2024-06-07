import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../dbconfig/dbconfig";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/jwtHelper";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const data = await db("registered_users").select("*").where({
      email: email,
    });

    if (data.length > 0) {
      const user = data[0];
      const isValidPassword = bcrypt.compareSync(password, user.password);
      console.log(isValidPassword)
      if (isValidPassword) {
        const payload = {
          email: user.email,
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);
        return res.json({ accessToken, refreshToken });
      }
      return res.status(401).json("Invalid Credentials");
    } else {
      return res.status(404).json("Please Register");
    }
  } catch (err) {
    return res.status(500).json("login Failed");
  }
};

export default login;
