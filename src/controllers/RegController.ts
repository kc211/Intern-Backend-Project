import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../dbconfig/dbconfig";

const Register = async (req: Request, res: Response) => {
  const { name, email, password_, confirm_password, Phone_number } = req.body;
  if (!name || !email || !password_ || !Phone_number) {
    res.status(400).send("Incomplete Data");
  }
  if (password_ !== confirm_password) {
    return res.status(400).json(`Password doesn't match, please check it!!`);
  } else {
    try {
      const password = await bcrypt.hash(password_, 12);
      const data = await db("registered_users").insert({
        name,
        email,
        password,
        Phone_number,
      });
      return res.json({ message: "Registered Successfully", data });
    } catch (error) {
      console.error("An error occurred:", error);
      return res.json("Registration Failed");
    }
  }
};

export default Register;
