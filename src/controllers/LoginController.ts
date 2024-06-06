import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../dbconfig/dbconfig";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN ?? "";
console.log(accessToken);

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const data = await db("registered_users").select("*").where({
      email: email,
    });

    if (data.length > 0) {
      const user = data[0];
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (isValidPassword) {
        const payload = {
          email: user.email,
          // Add other user information as needed
        };
        const token = jwt.sign(payload,accessToken,{expiresIn:'1m'});
        return res.json(token);
      }
      return res.status(401).json("Invalid Credentials");
    } else {
      return res.status(404).json("Please Register");
    }
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json("login Failed");
  }
};

export default login;
