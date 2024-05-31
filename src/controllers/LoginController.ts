import   { Request, Response} from "express";
import bcrypt from "bcrypt";
import db from '../dbconfig/db.config';

const Login= async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const data = await db("registered_users").select("*").where({
        email: email,
      });
      if (data.length > 0) {
        const user = data[0];
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          return res.json("Login Successful");
        }
        return res.status(401).json("Invalid Credentials");
      } else {
        return res.status(404).json("Please Register");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      return res.status(500).json("Login Failed");
    }
};

export default Login;